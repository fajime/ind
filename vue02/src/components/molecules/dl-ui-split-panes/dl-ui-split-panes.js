import { nextTick } from 'vue';
import metadata from './_metadata';

export default {
  name  : 'dl-ui-split-panes',
  emits : ['resized', 'pane-maximize'],
  props : {
    /** displayType */
    displayType : {
      type      : String,
      default   : 'vertical',
      validator : value => ['horizontal', 'vertical'].includes(value),
      desc      : 'Tipo de orientación de los paneles'
    },
    /** pushOtherPanes */
    pushOtherPanes : {
      type    : Boolean,
      default : true,
      desc    : 'Permite añadir nuevos paneles en caliente'
    },
    /** dblClickSplitter */
    dblClickSplitter : {
      type    : Boolean,
      default : true,
      desc    : 'Permite maximizar un panel haciendo doble click en el separador'
    },
    /** firstSplitter */
    firstSplitter : {
      type    : Boolean,
      default : false,
      desc    : 'Permite mostar el primer separador al primer elemento'
    }
  },
  /**
   * override
   * @override
   */
  provide() {
    return {
      requestUpdate : this.requestUpdate,
      onPaneAdd     : this.onPaneAdd,
      onPaneRemove  : this.onPaneRemove
    };
  },
  /**
   * override
   * @override
   */
  data : () => ({
    container : null,
    ready     : false,
    panes     : [],
    touch     : {
      mouseDown      : false,
      dragging       : false,
      activeSplitter : null
    },
    splitterTaps : {
      // Used to detect double click on touch devices.
      splitter  : null,
      timeoutId : null
    }
  }),
  computed : {
    /**
     * indicates if the spliter is horizontal or vertical
     * @returns {Boolean} falg
     */
    isSplitInHorizontal() {
      return this.displayType === 'horizontal';
    },
    /**
     * number of panes
     * @returns {Number} count
     */
    panesCount() {
      return this.panes.length;
    },
    /**
     * Indexed panes by `id` of Pane components for fast lookup.
     * Every time a pane is destroyed this index is recomputed.
     * @returns {Array} Array of panes
     */
    indexedPanes() {
      const obj = {};
      this.panes.forEach(pane => {
        obj[pane.id] = pane;
      });
      return obj;
    }
  },
  methods : {
    /**
     * update inner panes
     */
    updatePaneComponents() {
      // On update refresh the size of each pane through the registered `update` method (in onPaneAdd).
      this.panes.forEach(pane => {
        pane.update &&
          pane.update(
            {
              // Panes are indexed by Pane component uid, as they might be inserted at different index.
              [this.isSplitInHorizontal ? 'height' : 'width'] : `${
                this.indexedPanes[pane.id].size
              }%`
            },
            this.indexedPanes[pane.id].size
          );
      });
    },
    /** bind event to splitters */
    bindEvents() {
      document.addEventListener('mousemove', this.onMouseMove, {
        passive : false
      });
      document.addEventListener('mouseup', this.onMouseUp);
      // Passive: false to prevent scrolling while touch dragging.
      if ('ontouchstart' in window) {
        document.addEventListener('touchmove', this.onMouseMove, {
          passive : false
        });
        document.addEventListener('touchend', this.onMouseUp);
      }
    },
    /** unbind event to splitters */
    unbindEvents() {
      document.removeEventListener('mousemove', this.onMouseMove, {
        passive : false
      });
      document.removeEventListener('mouseup', this.onMouseUp);
      if ('ontouchstart' in window) {
        document.removeEventListener('touchmove', this.onMouseMove, {
          passive : false
        });
        document.removeEventListener('touchend', this.onMouseUp);
      }
    },
    /**
     * event on mouse down
     * @param {Number} splitterIndex index of splitter
     */
    onMouseDown(splitterIndex) {
      this.bindEvents();
      this.touch.mouseDown = true;
      this.touch.activeSplitter = splitterIndex;
    },
    /**
     * event on mouse move
     * @param {Object} event native event
     */
    onMouseMove(event) {
      if (this.touch.mouseDown) {
        // Prevent scrolling while touch dragging (only works with an active event, eg. passive: false).
        event.preventDefault();
        this.touch.dragging = true;
        this.calculatePanesSize(this.getCurrentMouseDrag(event));
      }
    },
    /**
     * event on mouse up
     */
    onMouseUp() {
      if (this.touch.dragging) {
        this.$emit(
          'resized',
          this.panes.map(pane => ({
            min  : pane.min,
            max  : pane.max,
            size : pane.size
          }))
        );
      }
      this.touch.mouseDown = false;
      /* Keep dragging flag until click event is finished (click happens immediately after mouseup)
         in order to prevent emitting `splitter-click` event if splitter was dragged. */
      setTimeout(() => {
        this.touch.dragging = false;
        this.unbindEvents();
      }, 100);
    },
    /**
     * event on click over splitter,If touch device, detect double tap manually (2 taps separated by less than 500ms).
     * @param {Object} event native event
     * @param {Number} splitterIndex index of splitter
     */
    onSplitterClick(event, splitterIndex) {
      if ('ontouchstart' in window) {
        event.preventDefault();
        // Detect splitter double taps if the option is on.
        if (this.dblClickSplitter) {
          if (this.splitterTaps.splitter === splitterIndex) {
            clearTimeout(this.splitterTaps.timeoutId);
            this.splitterTaps.timeoutId = null;
            this.onSplitterDblClick(splitterIndex);
            this.splitterTaps.splitter = null; // Reset for the next tap check.
          }
          else {
            this.splitterTaps.splitter = splitterIndex;
            this.splitterTaps.timeoutId = setTimeout(() => {
              this.splitterTaps.splitter = null;
            }, 500);
          }
        }
      }
    },
    /**
     * event on double click or double tap over splitter to maximize this pane
     * @param {Number} splitterIndex index of splitter
     */
    onSplitterDblClick(splitterIndex) {
      let totalMinSizes = 0;
      this.panes = this.panes.map((pane, i) => {
        pane.size = i === splitterIndex ? pane.max : pane.min;
        if (i !== splitterIndex) {
          totalMinSizes += pane.min;
        }
        return pane;
      });
      this.panes[splitterIndex].size -= totalMinSizes;
      this.$emit('pane-maximize', this.panes[splitterIndex]);
    },
    /**
     * Get the cursor position relative to the splitpane container.
     * @param {Object} event native event
     * @return {Object} coordinates
     */
    getCurrentMouseDrag(event) {
      const rect = this.container.getBoundingClientRect();
      const { clientX, clientY } =
        'ontouchstart' in window && event.touches ? event.touches[0] : event;
      return {
        x : clientX - rect.left,
        y : clientY - rect.top
      };
    },
    /**
     * Returns the drag percentage of the splitter relative to the 2 panes it's in between.
     * if the sum of size of the 2 cells is 60%, the dragPercentage range will be 0 to 100% of this 60%.
     * @param {Object} drag drag native event
     * @return {Number} percentage
     */
    getCurrentDragPercentage(drag) {
      drag = drag[this.isSplitInHorizontal ? 'y' : 'x'];
      // In the code bellow 'size' refers to 'width' for vertical and 'height' for horizontal layout.
      const containerSize =
        this.container[
          this.isSplitInHorizontal ? 'clientHeight' : 'clientWidth'
        ];
      return (drag * 100) / containerSize;
    },
    /**
     * calculate de new size for pane
     * @param {Object} drag drag native event
     */
    calculatePanesSize(drag) {
      const splitterIndex = this.touch.activeSplitter;
      let sums = {
        prevPanesSize       : this.sumPrevPanesSize(splitterIndex),
        nextPanesSize       : this.sumNextPanesSize(splitterIndex),
        prevReachedMinPanes : 0,
        nextReachedMinPanes : 0
      };
      const minDrag = 0 + (this.pushOtherPanes ? 0 : sums.prevPanesSize);
      const maxDrag = 100 - (this.pushOtherPanes ? 0 : sums.nextPanesSize);
      const dragPercentage = Math.max(
        Math.min(this.getCurrentDragPercentage(drag), maxDrag),
        minDrag
      );
      // If not pushing other panes, panes to resize are right before and right after splitter.
      let panesToResize = [splitterIndex, splitterIndex + 1];
      let paneBefore = this.panes[panesToResize[0]] || null;
      let paneAfter = this.panes[panesToResize[1]] || null;
      const paneBeforeMaxReached =
        paneBefore.max < 100 &&
        dragPercentage >= paneBefore.max + sums.prevPanesSize;
      const paneAfterMaxReached =
        paneAfter.max < 100 &&
        dragPercentage <=
          100 - (paneAfter.max + this.sumNextPanesSize(splitterIndex + 1));
      // Prevent dragging beyond pane max.
      if (paneBeforeMaxReached || paneAfterMaxReached) {
        if (paneBeforeMaxReached) {
          paneBefore.size = paneBefore.max;
          paneAfter.size = Math.max(
            100 - paneBefore.max - sums.prevPanesSize - sums.nextPanesSize,
            0
          );
        }
        else {
          const value =
            100 -
            paneAfter.max -
            sums.prevPanesSize -
            this.sumNextPanesSize(splitterIndex + 1);
          paneBefore.size = Math.max(value, 0);
          paneAfter.size = paneAfter.max;
        }
        return;
      }
      // When pushOtherPanes = true, find the closest expanded pane on each side of the splitter.
      if (this.pushOtherPanes) {
        const vars = this.doPushOtherPanes(sums, dragPercentage);
        if (!vars) {
          return;
        } // Prevent other calculation.
        ({ sums, panesToResize } = vars);
        paneBefore = this.panes[panesToResize[0]] || null;
        paneAfter = this.panes[panesToResize[1]] || null;
      }
      if (paneBefore !== null) {
        const value =
          dragPercentage - sums.prevPanesSize - sums.prevReachedMinPanes;
        paneBefore.size = Math.min(
          Math.max(value, paneBefore.min),
          paneBefore.max
        );
      }
      if (paneAfter !== null) {
        const value =
          100 - dragPercentage - sums.nextPanesSize - sums.nextReachedMinPanes;
        paneAfter.size = Math.min(
          Math.max(value, paneAfter.min),
          paneAfter.max
        );
      }
    },
    /**
     * calculate new size for other panes when ines push it
     * @param {Number} sums actual sum
     * @param {dragPercentage} dragPercentage percent of drag
     * @returns {Object} new config
     */
    doPushOtherPanes(sums, dragPercentage) {
      const splitterIndex = this.touch.activeSplitter;
      const panesToResize = [splitterIndex, splitterIndex + 1];
      /* Pushing Down.
         Going smaller than the current pane min size: take the previous expanded pane. */
      if (
        dragPercentage <
        sums.prevPanesSize + this.panes[panesToResize[0]].min
      ) {
        panesToResize[0] = this.findPrevExpandedPane(splitterIndex).index;
        sums.prevReachedMinPanes = 0;
        // If pushing a n-2 or less pane, from splitter, then make sure all in between is at min size.
        if (panesToResize[0] < splitterIndex) {
          this.panes.forEach((pane, i) => {
            if (i > panesToResize[0] && i <= splitterIndex) {
              pane.size = pane.min;
              sums.prevReachedMinPanes += pane.min;
            }
          });
        }
        sums.prevPanesSize = this.sumPrevPanesSize(panesToResize[0]);
        // If nothing else to push down, cancel dragging.
        if (panesToResize[0] === undefined) {
          sums.prevReachedMinPanes = 0;
          this.panes[0].size = this.panes[0].min;
          this.panes.forEach((pane, i) => {
            if (i > 0 && i <= splitterIndex) {
              pane.size = pane.min;
              sums.prevReachedMinPanes += pane.min;
            }
          });
          const value =
            100 -
            sums.prevReachedMinPanes -
            this.panes[0].min -
            sums.prevPanesSize -
            sums.nextPanesSize;
          this.panes[panesToResize[1]].size = value;
          return null;
        }
      }
      /* Pushing Up.
         Pushing up beyond min size is reached: take the next expanded pane. */
      if (
        dragPercentage >
        100 - sums.nextPanesSize - this.panes[panesToResize[1]].min
      ) {
        panesToResize[1] = this.findNextExpandedPane(splitterIndex).index;
        sums.nextReachedMinPanes = 0;
        // If pushing a n+2 or more pane, from splitter, then make sure all in between is at min size.
        if (panesToResize[1] > splitterIndex + 1) {
          this.panes.forEach((pane, i) => {
            if (i > splitterIndex && i < panesToResize[1]) {
              pane.size = pane.min;
              sums.nextReachedMinPanes += pane.min;
            }
          });
        }
        sums.nextPanesSize = this.sumNextPanesSize(panesToResize[1] - 1);
        // If nothing else to push up, cancel dragging.
        if (panesToResize[1] === undefined) {
          sums.nextReachedMinPanes = 0;
          this.panes[this.panesCount - 1].size =
            this.panes[this.panesCount - 1].min;
          this.panes.forEach((pane, i) => {
            if (i < this.panesCount - 1 && i >= splitterIndex + 1) {
              pane.size = pane.min;
              sums.nextReachedMinPanes += pane.min;
            }
          });
          const value =
            100 -
            sums.prevPanesSize -
            sums.nextReachedMinPanes -
            this.panes[this.panesCount - 1].min -
            sums.nextPanesSize;
          this.panes[panesToResize[0]].size = value;
          return null;
        }
      }
      return { sums, panesToResize };
    },
    /**
     * sum size of previous panel
     * @param {Number} splitterIndex index of splitter
     * @returns {Array} new configuration
     */
    sumPrevPanesSize(splitterIndex) {
      return this.panes.reduce(
        (total, pane, i) => total + (i < splitterIndex ? pane.size : 0),
        0
      );
    },
    /**
     * sum size of next panel
     * @param {Number} splitterIndex index of splitter
     * @returns {Array} new configuration
     */
    sumNextPanesSize(splitterIndex) {
      return this.panes.reduce(
        (total, pane, i) => total + (i > splitterIndex + 1 ? pane.size : 0),
        0
      );
    },
    /**
     * Return the previous pane from siblings which has a size (width for vert or height for horz) of more than 0.
     * @param {Number} splitterIndex index of splitter
     * @returns {Object} new pane configuration
     */
    findPrevExpandedPane(splitterIndex) {
      const pane = [...this.panes]
        .reverse()
        .find(p => p.index < splitterIndex && p.size > p.min);
      return pane || {};
    },
    /**
     * Return the next pane from siblings which has a size (width for vert or height for horz) of more than 0.
     * @param {Number} splitterIndex index of splitter
     * @returns {Object} new pane configuration
     */
    findNextExpandedPane(splitterIndex) {
      const pane = this.panes.find(
        p => p.index > splitterIndex + 1 && p.size > p.min
      );
      return pane || {};
    },
    /**
     * create splitter
     * @param {Number} paneIndex pane index
     * @param {Object} nextPaneNode next pane
     * @param {Boolean} isVeryFirst flag to indicates first pane
     */
    addSplitter(paneIndex, nextPaneNode, isVeryFirst = false) {
      const splitterIndex = paneIndex - 1;
      const elm = document.createElement('div');
      elm.classList.add('dl-ui-split-panes__splitter');
      if (!isVeryFirst) {
        elm.onmousedown = () => this.onMouseDown(splitterIndex);
        if (typeof window !== 'undefined' && 'ontouchstart' in window) {
          elm.ontouchstart = () => this.onMouseDown(splitterIndex);
        }
        elm.onclick = event => this.onSplitterClick(event, splitterIndex + 1);
      }
      if (this.dblClickSplitter) {
        elm.ondblclick = () => this.onSplitterDblClick(splitterIndex + 1);
      }
      nextPaneNode.parentNode.insertBefore(elm, nextPaneNode);
    },
    /**
     * remove splitter
     * @param {Object} node node to remove
     */
    removeSplitter(node) {
      node.onmousedown = undefined;
      node.onclick = undefined;
      node.ondblclick = undefined;
      node.parentNode.removeChild(node); // el.remove() doesn't work on IE11.
    },
    /**
     * delete and create all splitters
     */
    redoSplitters() {
      const children = Array.from(this.container.children);
      children.forEach(el => {
        if (el.className.split(' ').includes('dl-ui-split-panes__splitter')) {
          this.removeSplitter(el);
        }
      });
      let paneIndex = 0;
      children.forEach(el => {
        if (el.className.split(' ').includes('dl-ui-split-pane')) {
          if (!paneIndex && this.firstSplitter) {
            this.addSplitter(paneIndex, el, true);
          }
          else if (paneIndex) {
            this.addSplitter(paneIndex, el);
          }
          paneIndex++;
        }
      });
    },
    /**
     * Called by Pane component on programmatic resize.
     * @param {Object} configuration configuraction
     */
    requestUpdate({ target, ...args }) {
      const pane = this.indexedPanes[target.id];
      Object.entries(args).forEach(([key, value]) => (pane[key] = value));
    },
    /**
     * event to add a new panel
     * @param {Object} pane pane to add
     */
    onPaneAdd(pane) {
      // 1. Add pane to array at the same index it was inserted in the <dl-ui-split-panes> tag.
      let index = -1;
      Array.from(pane.$el.parentNode.children).some(el => {
        if (el.className.split(' ').includes('dl-ui-split-pane')) {
          index++;
        }
        return el === pane.$el;
      });
      const min = parseFloat(pane.minSize);
      const max = parseFloat(pane.maxSize);
      this.panes.splice(index, 0, {
        id        : pane.id,
        index,
        min       : isNaN(min) ? 0 : min,
        max       : isNaN(max) ? 100 : max,
        size      : pane.size === null ? null : parseFloat(pane.size),
        givenSize : pane.size,
        update    : pane.update
      });
      // Redo indexes after insertion for other shifted panes.
      this.panes.forEach((p, i) => (p.index = i));
      if (this.ready) {
        nextTick(() => {
          // 2. Add the splitter.
          this.redoSplitters();
          // 3. Resize the panes.
          this.resetPaneSizes({ addedPane : this.panes[index] });
        });
      }
    },
    /**
     * event to remove a new panel
     * @param {Object} pane pane to add
     */
    onPaneRemove(pane) {
      // 1. Remove the pane from array and redo indexes.
      const index = this.panes.findIndex(p => p.id === pane.id);
      const removed = this.panes.splice(index, 1)[0];
      this.panes.forEach((p, i) => (p.index = i));
      nextTick(() => {
        // 2. Remove the splitter.
        this.redoSplitters();
        // 3. Resize the panes.
        this.resetPaneSizes({ removedPane : { ...removed, index } });
      });
    },
    /**
     * reset pane configurations
     * @param {Object} changedPanes elements to repaint
     */
    resetPaneSizes(changedPanes = {}) {
      if (!changedPanes.addedPane && !changedPanes.removedPane) {
        this.initialPanesSizing();
      }
      else if (
        this.panes.some(
          pane => pane.givenSize !== null || pane.min || pane.max < 100
        )
      ) {
        this.equalizeAfterAddOrRemove(changedPanes);
      }
      else {
        this.equalize();
      }
      if (this.ready) {
        this.$emit(
          'resized',
          this.panes.map(pane => ({
            min  : pane.min,
            max  : pane.max,
            size : pane.size
          }))
        );
      }
    },
    /**
     * equalize
     */
    equalize() {
      const equalSpace = 100 / this.panesCount;
      let leftToAllocate = 0;
      const ungrowable = [];
      const unshrinkable = [];
      this.panes.forEach(pane => {
        pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min);
        leftToAllocate -= pane.size;
        if (pane.size >= pane.max) {
          ungrowable.push(pane.id);
        }
        if (pane.size <= pane.min) {
          unshrinkable.push(pane.id);
        }
      });
      if (leftToAllocate > 0.1) {
        this.readjustSizes(leftToAllocate, ungrowable, unshrinkable);
      }
    },
    /** set initial size in panes */
    initialPanesSizing() {
      let leftToAllocate = 100;
      const ungrowable = [];
      const unshrinkable = [];
      let definedSizes = 0;
      // Check if pre-allocated space is 100%.
      this.panes.forEach(pane => {
        leftToAllocate -= pane.size;
        if (pane.size !== null) {
          definedSizes++;
        }
        if (pane.size >= pane.max) {
          ungrowable.push(pane.id);
        }
        if (pane.size <= pane.min) {
          unshrinkable.push(pane.id);
        }
      });
      // set pane sizes if not set.
      let leftToAllocate2 = 100;
      if (leftToAllocate > 0.1) {
        this.panes.forEach(pane => {
          if (pane.size === null) {
            pane.size = Math.max(
              Math.min(
                leftToAllocate / (this.panesCount - definedSizes),
                pane.max
              ),
              pane.min
            );
          }
          leftToAllocate2 -= pane.size;
        });
        if (leftToAllocate2 > 0.1) {
          this.readjustSizes(leftToAllocate, ungrowable, unshrinkable);
        }
      }
    },
    /**
     * equalize after add or remove a pane
     * @param {Object} object config to use
     */
    equalizeAfterAddOrRemove({ addedPane } = {}) {
      let equalSpace = 100 / this.panesCount;
      let leftToAllocate = 0;
      const ungrowable = [];
      const unshrinkable = [];
      if (addedPane && addedPane.givenSize !== null) {
        equalSpace = (100 - addedPane.givenSize) / (this.panesCount - 1);
      }
      // Check if pre-allocated space is 100%.
      this.panes.forEach(pane => {
        leftToAllocate -= pane.size;
        if (pane.size >= pane.max) {
          ungrowable.push(pane.id);
        }
        if (pane.size <= pane.min) {
          unshrinkable.push(pane.id);
        }
      });
      if (Math.abs(leftToAllocate) < 0.1) {
        return;
      } // Ok.
      this.panes.forEach(pane => {
        if (
          addedPane &&
          addedPane.givenSize !== null &&
          addedPane.id === pane.id
        ) {
          // do nothing
        }
        else {
          pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min);
        }
        leftToAllocate -= pane.size;
        if (pane.size >= pane.max) {
          ungrowable.push(pane.id);
        }
        if (pane.size <= pane.min) {
          unshrinkable.push(pane.id);
        }
      });
      if (leftToAllocate > 0.1) {
        this.readjustSizes(leftToAllocate, ungrowable, unshrinkable);
      }
    },

    // Second loop to adjust sizes now that we know more about the panes constraints.
    /**
     * Second loop to adjust sizes now that we know more about the panes constraints.
     * @param {Number} leftToAllocate size to allocate
     * @param {Array} ungrowable elements ungrowable
     * @param {Array} unshrinkable elements unshrinkable
     */
    readjustSizes(leftToAllocate, ungrowable, unshrinkable) {
      let equalSpaceToAllocate;
      if (leftToAllocate > 0) {
        equalSpaceToAllocate =
          leftToAllocate / (this.panesCount - ungrowable.length);
      }
      else {
        equalSpaceToAllocate =
          leftToAllocate / (this.panesCount - unshrinkable.length);
      }
      this.panes.forEach(pane => {
        if (leftToAllocate > 0 && !ungrowable.includes(pane.id)) {
          // Need to diff the size before and after to get the exact allocated space.
          const newPaneSize = Math.max(
            Math.min(pane.size + equalSpaceToAllocate, pane.max),
            pane.min
          );
          const allocated = newPaneSize - pane.size;
          leftToAllocate -= allocated;
          pane.size = newPaneSize;
        }
        else if (!unshrinkable.includes(pane.id)) {
          // Need to diff the size before and after to get the exact allocated space.
          const newPaneSize = Math.max(
            Math.min(pane.size + equalSpaceToAllocate, pane.max),
            pane.min
          );
          const allocated = newPaneSize - pane.size;
          leftToAllocate -= allocated;
          pane.size = newPaneSize;
        }
        // Update each pane through the registered `update` method.
        pane.update(
          {
            [this.isSplitInHorizontal ? 'height' : 'width'] : `${
              this.indexedPanes[pane.id].size
            }%`
          },
          this.indexedPanes[pane.id].size
        );
      });
      if (Math.abs(leftToAllocate) > 0.1) {
        /* > 0.1: Prevent maths rounding issues due to bytes.
           Don't emit on hot reload when Vue destroys panes. */
        nextTick(() => {
          if (this.ready) {
            // eslint-disable-next-line no-console
            console.warn(
              'dl-ui-split-panes: Could not resize panes correctly due to their constraints.'
            );
          }
        });
      }
    }
  },
  watch : {
    panes : {
      // Every time a pane is updated, update the panes accordingly.
      deep      : true,
      immediate : false,
      /**
       * override
       * @override
       */
      handler() {
        this.updatePaneComponents();
      }
    },
    /** watch over horizontal value */
    isSplitInHorizontal() {
      this.updatePaneComponents();
    },
    /** watch over firstSplitter value */
    firstSplitter() {
      this.redoSplitters();
    },
    /**
     * watch over dblClickSplitter value
     * @param {Boolean} enable new value
     */
    dblClickSplitter(enable) {
      const splitters = [
        ...this.container.querySelectorAll('.dl-ui-split-panes__splitter')
      ];
      splitters.forEach((splitter, i) => {
        splitter.ondblclick = enable
          ? () => this.onSplitterDblClick(i)
          : undefined;
      });
    }
  },
  /**
   * override
   * @override
   */
  beforeDestroy() {
    // Prevent emitting console warnings on hot reloading.
    this.ready = false;
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.container = this.$refs.container;
    this.redoSplitters();
    this.resetPaneSizes();
    this.ready = true;
  },
  // DEMO META DATA
  ...metadata
};
