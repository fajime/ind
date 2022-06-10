const readline = require('readline');
const fs = require('fs');
const pathBase = process.cwd();
const responses = [];
let index = 0;
const separator = process.platform === 'win32' ? '\\' : '/';

const inputConsole = readline.createInterface({
  input  : process.stdin,
  output : process.stdout
});

const configQuestions = {
  arrQuestions : [
    'Choose project: \n(A) Catalog\n(B) Components\n(C) Storybook',
    'Choose component type: \n(A) Atoms\n(B) Molecules\n(C) Organisms\n(D) Templates\n(E) Views',
    'Choose component alias (dl-xx-xx-....): ',
    'Choose component name (button-xx-....): '
  ],
  project : {
    'A' : 'catalog',
    'B' : 'components',
    'C' : 'storybook'
  },
  componentType : {
    'A' : 'atoms',
    'B' : 'molecules',
    'C' : 'organisms',
    'D' : 'templates',
    'E' : 'views'
  }
};

const templates = {
  indexTemplate : ({ name, description }) => `<!-- ${name}: ${description} -->
<script src="./${name}.js" />
<style src="./${name}.scss" lang="scss" />
<template src="./${name}.html" />
`,
  jsTemplate : ({ alias, name, isComponent = false }) => {
    const template = `export default {
  name : '${alias}-${name}'
};
`;
    const templateDemo = `// A generic import name will ease next developments
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : '${alias}-${name}',
  components : {
    theComponent,
    DlCompKitDemoTemplate
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        slots : [],
        props : [],
        style : {
          label   : 'estilo',
          type    : '${name}',
          value   : '${alias}-${name}',
          options : [
            { name : 'Default', value : '${alias}-${name}' },
            { name : 'Custom', value : 'custom-${name}' }
          ]
        }
      },
      component : theComponent
    };
  },
  mixins : [mixinPlayground]
};
`;
    return isComponent ? templateDemo : template;
  },
  jsDemoTemplate : ({ alias, name, type }) => {
    const iName = `${alias}-${name}`;
    const title = iName.split('-');
    const nameJS = title.map(w => Array.from(w).map((l, i) => (i === 0 ? l.toUpperCase() : l))
      .join('')).join('');
    return `export default {
  name                 : '${iName}',
  // DEMO META DATA
  titleName            : '${name}',
  nameJS               : '${nameJS}',
  type                 : '${type.slice(0, -1)}',
  nameScssMixin        : '${name}-style-config',
  nameScssDefaultClass : '${iName}',
  nameScssMixinFile    : '${name}',
  description          : '',
  slots                : [],
  events               : [],
  scss                 : [],
  notes                : ''
  // END META DATA
};
`;
  },
  scssTemplate : ({ name }) => `.${name} {
  // Remove this line
}
`,
  scssMixinTemplate : ({ alias, name }) => `@import 'mixins/${name}';

.${alias}-${name} {
  $default: ();

  @include ${name}-style-config($default);
}
`,
  htmlDemoTemplate : ({ name }) => `<dl-comp-kit-demo-template :component="component" :playground="playground" ref="demo">
  <div class="demo__${name}__wrapper">
    <theComponent
        :ref="setDemoRefs">
    </theComponent>
  </div>
</dl-comp-kit-demo-template>
`
};

const showQuestions = (i = 0) => {
  // eslint-disable-next-line no-console
  console.log(configQuestions.arrQuestions[i]);
  inputConsole.prompt();
};

const createInternalStruct = ({
  filename, html = '', scss = '', js = '', vue = '', path
}) => {
  fs.writeFileSync(`${path}${separator}${filename}.html`, html, { mode : 0o777 });
  fs.writeFileSync(`${path}${separator}${filename}.js`, js, { mode : 0o777 });
  fs.writeFileSync(`${path}${separator}${filename}.scss`, scss, { mode : 0o777 });
  fs.writeFileSync(`${path}${separator}index.vue`, vue, { mode : 0o777 });
};

const createComponent = () => {
  try {
    const [ option1, option2, option3, option4 ] = responses;
    if (!option1 && !option2 && !option3 && !option4) {
      throw new Error('YOU MUST COMPLETE ALL OPTIONS');
    }
    const OP1 = option1.toUpperCase();
    const OP2 = option2.toUpperCase();
    const OP3 = option3.toLowerCase();
    const OP4 = option4.toLowerCase();
    const folder = configQuestions.project[OP1];
    const type = configQuestions.componentType[OP2];
    const name = `${OP3}-${OP4}`;
    const isComponent = OP1.includes('B');
    const path = `${pathBase}${separator}src${separator}${folder}${isComponent ? separator : `${separator}components`}${separator}${type}${separator}${name}`;
    if (fs.existsSync(path)) {
      throw new Error('COMPONENT ALREADY EXISTS');
    }
    else {
      fs.mkdirSync(path, '0777');
    }
    createInternalStruct({
      path,
      filename : name,
      html     : '',
      js       : templates[isComponent ? 'jsDemoTemplate' : 'jsTemplate']({ alias : OP3, name : OP4, type }),
      scss     : templates.scssTemplate({ name }),
      vue      : templates.indexTemplate({ name, description : 'xxxxxxxx' })
    });
    if (isComponent) {
      const pathDemo = `${path}${separator}__DEMO`;
      const pathMixin = `${path}${separator}mixins`;
      fs.mkdirSync(pathDemo, '0777');
      fs.mkdirSync(pathMixin, '0777');
      createInternalStruct({
        path     : pathDemo,
        filename : `demo__${name}`,
        html     : templates.htmlDemoTemplate({ name }),
        js       : templates.jsTemplate({ alias : OP3, name : OP4, isComponent }),
        scss     : templates.scssTemplate({ name }),
        vue      : templates.indexTemplate({ name : `demo__${name}`, description : 'xxxxxxxx' })
      });
      fs.writeFileSync(`${pathMixin}${separator}_${OP4}.scss`, templates.scssMixinTemplate({ alias : OP3, name : OP4 }), { mode : 0o777 });
    }
    // eslint-disable-next-line no-console
    console.log('THE COMPONENT WAS CREATED SUCCESSFULLY');
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR: ', err);
  }
};

// eslint-disable-next-line no-console
console.log(process.platform);
showQuestions();

inputConsole.on('line', data => {
  responses.push(data);
  index++;
  if (index < configQuestions.arrQuestions.length) {
    showQuestions(index);
  }
  else {
    inputConsole.close();
  }
}).on('close', () => {
  try {
    createComponent();
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR: ', err);
  }
  finally {
    process.exit(0);
  }
});
