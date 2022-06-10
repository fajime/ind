import { ReactNode, useEffect, useState } from 'react';
import { Wrapper } from './Wrapper';
import { loadComponent } from './../../utils/loadComponent';
type ComponentsWrapperType = {
  component: ReactNode;
};

export const ComponentsWrapper = ({ component }: ComponentsWrapperType) => {
  const [loadedComponent, setLoaded] = useState<ReactNode>(null);

  useEffect(() => {
    setLoaded(loadComponent(component));
  }, [component]);

  return <>{loadedComponent && <Wrapper component={loadedComponent} />}</>;
};
