// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';
// import digitalLabsLogo from "../../../../assets/img/DL.png";
const digitalLabsLogo = require(`../../../../assets/img/DL.png`);

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-header',
  components : {
    theComponent,
    DlCompKitDemoTemplate
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props : [],
        slots : [
          {
            label : 'logo',
            type  : 'text',
            value :
              `<img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Indra-Sistemas-Logo.svg" style="height: 30px;"></img>
              <img src="${digitalLabsLogo}" style="height: 30px;"></img>`,
            placeholder : 'Logo'
          },
          {
            label : 'version',
            type  : 'text',
            value :
              '<span style="font-family: Arial;font-weight: bold;font-size: 10px;line-height: 8px;color: #41586E;">v. 2.0.0.des</span>',
            placeholder : 'Versión...'
          },
          {
            label : 'middle',
            type  : 'text',
            value :
              `<span style="font-family: Arial;font-weight: bold;font-size: 16px;line-height: 6px;color: #41586E;">${(new Date()).toLocaleDateString()}</span>`,
            placeholder : 'Hola'
          },
          {
            label : 'content',
            type  : 'text',
            value :
              `<span style="font-family: Arial;font-style: normal;font-weight: normal;font-size: 10px;line-height: 12px;">Alberto Rodriguez Álvarez</span>&nbsp;&nbsp;
              <span style="font-family: Arial;font-weight: bold;font-size: 12px;line-height: 14px;">Cerrar sesión</span>`,
            placeholder : 'Contenido...'
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-header' }
          ]
        }
      },
      component : theComponent
    };
  }
};
