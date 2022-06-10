import { ReactNode, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ComponentsWrapper, ListComponents } from './../components';
import { Col, Row } from './../ant-modules';

import * as dl from './../components/dl';

export const Home = () => {
  const [listado, setListado] = useState<string[]>(['']);
  const [loadedComponent, setComponent] = useState<ReactNode>(null);

  useEffect(() => {
    const keys = Object.keys(dl);

    const lista = keys.map((key: string) => {
      return key.replace('Dl', 'dl-').toLowerCase();
    });
    setListado(lista);
  }, [dl]);

  return (
    <Row className="content-home">
      <Col className="list-components" span={8}>
        <ListComponents components={listado} setComp={(data: ReactNode) => setComponent(data)} />
      </Col>
      <Col span={16}>
        <div className="content-links sublinks">
          <NavLink to="/home/canvas" className="link-text">
            Canvas
          </NavLink>
          <NavLink to="/home/docs" className="link-text">
            Docs
          </NavLink>
          <NavLink to="/home/tools" className="link-text">
            Tools
          </NavLink>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
        <Row justify="center">
          <Col className="comps-wrapper" span={24}>
            {loadedComponent && <ComponentsWrapper component={loadedComponent} />}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
