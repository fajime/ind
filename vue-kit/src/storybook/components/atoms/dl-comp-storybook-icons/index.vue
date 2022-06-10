<template src="./dl-comp-storybook-icons.html" />
<script>
import DlUiIcon from '@/components/atoms/dl-ui-icon';
import DlUiSwitch from '@/components/atoms/dl-ui-switch';
import DlCompKitDemoPagination from '@/catalog/components/atoms/dl-comp-kit-demo-pagination';

export default {
  components : {
    DlUiIcon,
    DlUiSwitch,
    DlCompKitDemoPagination
  },

  /**
   * Override
   * @override
   */
  data() {
    return {
      search     : '',
      showFilled : false,
      allicons   : null,
      page       : 1,
      pageSize   : 36
    };
  },
  computed : {
    /**
   * Override
   * @override
   */
    icons() {
      let allicons = [];
      if (Array.isArray(this.allicons)) {
        allicons = this.allicons;
      }
      const iconsFiltered = allicons.filter(icon => {

        const filterType = this.showFilled ? 'filled' : 'outlined';
        let hasKey = true;
        if (this.search !== '') {
          const label = icon.label.toLowerCase();
          const search = this.search.toLowerCase();
          hasKey = hasKey && label.indexOf(search) > -1;
        }
        hasKey = hasKey && icon.type === filterType;

        return hasKey;
      }
      );

      return iconsFiltered;
    },
    /**
   * Override
   * @override
   */
    iconsPaged() {
      const init = (this.page - 1) * this.pageSize;
      return this.icons.slice(init, init + this.pageSize);
    }

  },
  /**
   * Override
   * @override
   */
  mounted() {
    // load icon set from icon set
    const icons = Array.from(
      document.querySelectorAll('#dl-ui-icons-set symbol')
    ).map(node => {

      const id = node.id;
      let label = id.split('dl-ids-icon-').join('');
      let type = '';
      if (label.indexOf('-outlined') > -1) {
        type = 'outlined';
      }
      else {
        type = 'filled';
      }

      label = label.split(`-${ type}`).join('');
      label = label.split('-').join(' - ');
      label = label.split('_').join(' ');
      const icon = { id, label, type };
      return icon;
    });

    this.allicons = icons;
  }
};
</script>
<style src="./dl-comp-storybook-icons.scss" lang="scss" />
