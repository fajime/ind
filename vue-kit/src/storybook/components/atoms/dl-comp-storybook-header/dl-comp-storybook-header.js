
export default {
  name  : 'dl-comp-storybook-header',
  props : {
    /** Card number */
    number : {
      type    : String,
      default : ''
    },
    /** Card title */
    title : {
      type    : String,
      default : ''
    },
    /** Card subtitle */
    subtitle : {
      type    : String,
      default : ''
    },
    /** Card description */
    description : {
      type    : String,
      default : ''
    }
  }
};
