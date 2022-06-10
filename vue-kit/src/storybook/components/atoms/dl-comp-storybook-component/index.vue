<template src="./dl-comp-storybook-component.html" />
<script>
import { defineAsyncComponent } from 'vue';

export default {
  components : {
    DlCompStorybookHeader   : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-header" */ '@/storybook/components/molecules/dl-comp-storybook-header')),
    DlCompStorybookCard     : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-card" */ '@/storybook/components/molecules/dl-comp-storybook-card')),
    DlCompStorybookUpdates  : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-updates"*/ '@/storybook/components/molecules/dl-comp-storybook-updates')),
    DlUiActionButton        : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-action-button"*/ '@/components/atoms/dl-ui-action-button')),
    DlUiListbox             : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-listbox"*/ '@/components/atoms/dl-ui-listbox')),
    DlUiTooltip             : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tooltip"*/ '@/components/atoms/dl-ui-tooltip')),
    DlUiAccordion           : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-accordion"*/ '@/components/molecules/dl-ui-accordion')),
    DlUiCheckbox            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-checkbox"*/ '@/components/atoms/dl-ui-checkbox')),
    DlUiBreadcrumb          : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-breadcrumb"*/ '@/components/atoms/dl-ui-breadcrumb')),
    DlUiProgressCircle      : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-progress-circle"*/ '@/components/atoms/dl-ui-progress-circle')),
    DlUiInput               : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-input"*/ '@/components/atoms/dl-ui-input')),
    DlUiSelect              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-select"*/ '@/components/atoms/dl-ui-select')),
    DlUiChip                : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-chip"*/ '@/components/atoms/dl-ui-tag')),
    DlUiIcon                : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon"*/ '@/components/atoms/dl-ui-icon')),
    DlUiIconsSet            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icons-set"*/ '@/components/atoms/dl-ui-icons-set')),
    DlUiMultiselect         : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-updates"*/ '@/components/atoms/dl-ui-multiselect')),
    DlUiNumber              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-updates"*/ '@/components/atoms/dl-ui-number')),
    DlUiPassword            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-password"*/ '@/components/atoms/dl-ui-password')),
    DlUiProgressBar         : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-progress-bar"*/ '@/components/atoms/dl-ui-progress-bar')),
    DlUiRadio               : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-radio"*/ '@/components/atoms/dl-ui-radio')),
    DlUiRange               : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-range"*/ '@/components/atoms/dl-ui-range')),
    DlUiSwitch              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-switch"*/ '@/components/atoms/dl-ui-switch')),
    DlUiTextarea            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-textarea"*/ '@/components/atoms/dl-ui-textarea')),
    DlUiToggleButton        : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-toggle-button"*/ '@/components/atoms/dl-ui-toggle-button')),
    DlUiCheckboxGroup       : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-checkbox-group"*/ '@/components/molecules/dl-ui-checkbox-group')),
    DlUiFooter              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-footer"*/ '@/components/molecules/dl-ui-footer')),
    DlUiRating              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-rating"*/ '@/components/molecules/dl-ui-rating')),
    DlUiSnack               : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-snack"*/ '@/components/molecules/dl-ui-snack')),
    DlUiStepper             : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-stepper"*/ '@/components/molecules/dl-ui-stepper')),
    DlUiMenuBlocks          : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-menu-blocks"*/ '@/components/molecules/dl-ui-menu-blocks')),
    DlUiTabs                : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tabs"*/ '@/components/molecules/dl-ui-tabs')),
    DlUiSplitButton         : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-split-button"*/ '@/components/molecules/dl-ui-split-button')),
    DlUiTab                 : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tabs"*/ '@/components/atoms/dl-ui-tab')),
    DlCompKitDemoPagination : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-kit-demo-pagination"*/ '@/catalog/components/atoms/dl-comp-kit-demo-pagination')),
    DlUiMenu                : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tabs"*/ '@/components/molecules/dl-ui-menu')),
    DlUiDatepicker          : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-datepicker"*/ '@/components/molecules/dl-ui-datepicker')),
    DlUiAccordionList       : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-accordion-list"*/ '@/components/organisms/dl-ui-accordion-list'))

  },
  props : {
    /**
   * Override
   * @override
   */
    comp : {
      type    : Object,
      default : null
    },
    /**
   * Override
   * @override
   */
    index : {
      type    : Number,
      default : 0
    }
  },
  methods : {
    /**
   * Override
   * @override
   */
    goToComponent(path) {
      this.$router.push(path);
    }
  }
};
</script>

