import metadata from './_metadata';
export default {
  name  : 'dl-ui-icon',
  props : {
    /**
     * Titulo de icono.
     */
    title : {
      type    : String,
      default : undefined,
      desc    : 'Título que se asigna al icono'
    },
    /**
     * Descripción del icono.
     */
    description : {
      type    : String,
      default : undefined,
      desc    : 'Descripción que se asigna al icono'
    },
    /**
     * Nombre del icono que se desea mostrar.
     */
    id : {
      type    : String,
      default : 'dl-ids-icon-user-single-outlined',
      desc    : 'Identificador del SVG que representa el icono'
    }
  },
  // DEMO META DATA
  ...metadata
};
