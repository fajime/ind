import { lazy, ReactNode } from 'react';

export const loadComponent = (selected: ReactNode) => lazy(() => import(`./../components/dl/${selected}/${selected}`));

// lazy(() => import(/* webpackChunkName: "antSidebars", webpackPreload: true */ `antd/lib/${selected}`));
