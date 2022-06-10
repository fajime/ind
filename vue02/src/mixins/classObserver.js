import { nextTick } from 'vue';
import ClassObserve from '../tools/dom/ClassObserve';

/**
 * Mixin with generic utils for components
 */
export default {
  /**
   * Override
   * @override
   */
  data() {
    return {
      observer      : null,
      classSize     : {},
      parentElement : undefined,
      parentClass   : '',
      changeDetect  : null,
      transform     : []
      /**
      * Example definition in data component
      sizeMapped : {
        options : {
          parentClass : 'dl-ui-select',
          parentRef   : 'root'
        },
        transform : [
          {
            parent   : 'default',
            children : [
              { name : 'icon', size : 'small' }
            ]
          },
          {
            parent   : 'large',
            children : [
              { name : 'listbox', size : 'large' },
              { name : 'dropdown', size : 'large' }
            ]
          },
        }
      */
    };
  },
  /**
   * Override
   * @override
   */
  created() {
    if (this.sizeMapped) {
      if (this.sizeMapped.transform) {
        this.transform = this.sizeMapped.transform;
      }
    }
    this.initializeClass();

  },
  /**
   * Mounted component
   */
  mounted() {
    if (this.sizeMapped) {
      if (this.sizeMapped.options) {
        this.parentElement = this.$refs[this.sizeMapped.options.parentRef];
        this.parentClass = this.sizeMapped.options.parentClass;
      }
    }

    if (this.parentElement !== undefined) {

      // initial values transform
      this.getSizeClasses(this.parentClass, this.parentElement);

      // recalculate values when detect change classlist
      this.createObserve(this.parentElement, (newValue, oldValue) => {

        this.initializeClass();
        this.getSizeClasses(this.parentClass, this.parentElement);

        // execute function if exist in component, if it needs to be controlled
        if (this.onClassChange !== undefined) {
          this.onClassChange(newValue, oldValue);
        }
      });
    }

  },
  methods : {
  /**
   * create element object empty, for vars to exist
   */
    initializeClass() {
      this.transform.forEach( element => {
        if (Array.isArray(element.children)) {
          element.children.forEach( child => {
            this.classSize[child.name] = '';
          });
        }
      });
    },
    /**
     * Generate a observe to watch class change
     * @param {Object} refElement ref element to observe
     * @param {Function} callback function on detect change
     */
    createObserve(refElement, callback) {

      this.observer = new ClassObserve(refElement, (newValue, oldValue) => {
        nextTick( () => {
          callback(newValue, oldValue);
        });
      });

    },
    /**
     * Destroy observe
     */
    destroyObserve() {
      this.observer.destroy();
    },

    /**
     * Generate a observe to watch class change
     * @param {String} classRoot class root
     * @param {Object} refElement ref element to observe
     */
    getSizeClasses(classRoot, refElement) {

      if (refElement) {
        const classList = refElement.classList;

        // loop sises (small, large, etc...)
        this.transform.forEach( element => {

          // loop child element
          if (Array.isArray(element.children)) {
            element.children.forEach( child => {

              let type = child.name;

              if (child.type) {
                type = child.type;
              }

              // set default size, when there is no definition
              if (element.parent === 'default') {
                this.classSize[child.name] = `dl-ui-${type}--${child.size}`;
              }

              // set preset size, defined in sizeMapped
              Array.from(classList).forEach(classElement => {
                if (classElement === `${classRoot}--${element.parent}`) {
                  this.classSize[child.name] = `dl-ui-${type}--${child.size}`;
                }
              });

            });
          }

        });
      }

    }

  }
};

