import metadata from './_metadata';
export default {
  name  : 'dl-ui-progress-bar',
  props : {
    /**
     * Min value represented
     */
    min : {
      type    : [Number, String],
      default : 0,
      desc    : 'Valor mínimo del rango en el que se  mueve el progreso'
    },
    /**
     * Max value represented
     */
    max : {
      type    : [Number, String],
      default : 100,
      desc    : 'Valor máximo del rango en el que se  mueve el progreso'
    },
    /**
     * Actual value
     */
    value : {
      type    : [Number, String],
      default : 0,
      desc    : 'Valor actual del progreso, el cual se utiliza para calcular qué parte de la barra se rellena'
    }
  },
  computed : {
    /**
     * Calculate the percentage that represents the value regarding the Max - Min range
     *
     * @returns {Number} percent
     */
    percentValue() {
      let returnValue = ((this.value - this.min) * 100) / (this.max - this.min);
      if (returnValue > 100) {
        returnValue = 100;
      }
      else if (returnValue < 0) {
        returnValue = 0;
      }
      return returnValue;
    }
  },
  // DEMO META DATA
  ...metadata
};
