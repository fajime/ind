import { createRouter, createWebHashHistory } from 'vue-router';
import Landing from '../../landing.vue';

// require won't accept variables as arguments:
const atomPaths = require.context(
  '@/components/atoms',
  true,
  /index.vue/
);
const moleculePaths = require.context(
  '@/components/molecules',
  true,
  /index.vue/
);
const organismPaths = require.context(
  '@/components/organisms',
  true,
  /index.vue/
);

const storybookMoleculePaths = require.context(
  '@/storybook/components/molecules',
  true,
  /index.vue/
);

const storybookViewsPaths = require.context(
  '@/storybook/components/views',
  true,
  /index.vue/
);

/**
 * Generate dynamically an array with all routes for an atomic model
 * AUTOMATIZES APP by responding to folder changes/creation
 * @param {Array} paths atomic model folder
 * @returns {Array} children Array with the branch children
 */
function makeChildrenArray(paths) {
  const children = [];
  const pathDemos = paths.keys().filter(path => path.includes('__DEMO'));
  pathDemos.forEach(fileName => {
    const path = fileName.replace('/__DEMO/index.vue', '').replace('.', '');
    const name = path.replace('/dl-ui-', '');
    const component = paths(fileName);
    const route = {
      path,
      name,
      component : component.default
    };
    children.push(route);

  });
  return children;
}

/**
 * Generate dynamically an array with all routes for an storybook model
 * AUTOMATIZES APP by responding to folder changes/creation
 * @param {Array} paths atomic
 * @param {String} mode values views, molecules
 * @returns {Array} children Array with the branch children
 */
function makeStorybookPaths(paths = [], mode = 'views') {
  const children = [];
  paths.keys().forEach(fileName => {
    if (fileName.includes('dl-comp-storybook')) {
      const name = fileName.replace('/index.vue', '').replace('./', '');
      const path = name.replace('dl-comp-', '');
      const route = {
        name       : path,
        path       : `/${path}`,
        components : {
          storybookBody : () => import(`@/storybook/components/${mode}/${name}/`)
        },
        children : []
      };
      children.push(route);
    }
  });
  return children;
}

const routes = [
  {
    path      : '/list',
    name      : 'list',
    component : () => import(/* webpackChunkName: "dl-comp-kit-development" */ '../components/views/dl-comp-kit-list-example/')
  },
  {
    path      : '/',
    name      : 'landing',
    component : Landing
  },
  {
    name      : 'storybook',
    path      : '/storybook',
    component : () => import(/* webpackChunkName: "storybook" */ '../../storybook/App.vue'),
    children  : [
      ...makeStorybookPaths(storybookMoleculePaths, 'molecules'),
      ...makeStorybookPaths(storybookViewsPaths, 'views')
    ]
  },
  {
    path      : '/catalog',
    name      : 'catalog',
    component : () => import(/* webpackChunkName: "catalog" */ '../Catalog.vue'),
    children  : [
      {
        path      : '/',
        name      : 'home',
        component : () => import(/* webpackChunkName: "dl-comp-kit-index" */ '../components/views/dl-comp-kit-index'),
        children  : [
          {
            path      : '/welcome',
            name      : 'welcome',
            component : () => import(/* webpackChunkName: "dl-comp-kit-welcome" */ '../components/views/dl-comp-kit-welcome')
          },
          {
            path      : '/howTo',
            name      : 'howTo',
            component : () => import(/* webpackChunkName: "dl-comp-kit-how-to" */ '../components/views/dl-comp-kit-how-to')
          },
          {
            path      : '/development',
            name      : 'development',
            component : () => import(/* webpackChunkName: "dl-comp-kit-development" */ '../components/views/dl-comp-kit-development')
          }
        ]
      },
      {
        path      : '',
        name      : 'atoms',
        component : () => import(/* webpackChunkName: "dl-comp-kit-index" */ '../components/views/dl-comp-kit-index'),
        children  : makeChildrenArray(atomPaths)
      },
      {
        name      : 'molecules',
        path      : '',
        component : () => import(/* webpackChunkName: "dl-comp-kit-index" */ '../components/views/dl-comp-kit-index'),
        children  : makeChildrenArray(moleculePaths)
      },
      {
        name      : 'organisms',
        path      : '',
        component : () => import(/* webpackChunkName: "dl-comp-kit-index" */ '../components/views/dl-comp-kit-index'),
        children  : makeChildrenArray(organismPaths)
      },
      {
        name      : 'templates',
        path      : '',
        component : () => import(/* webpackChunkName: "dl-comp-kit-index" */ '../components/views/dl-comp-kit-index'),
        children  : []
      }
    ]
  }
];

const router = createRouter({
  history : createWebHashHistory(),
  routes
});

export { routes };
export default router;
