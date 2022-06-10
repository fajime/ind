import { Content, Footer, Layout } from './../ant-modules';
import { AppRoutes } from '../routes/Routes';
import { Menu } from '../components';

export const AppLayout = () => {
  return (
    <Layout className="app-layout">
      <Menu />
      <Content className="content-layout">
        <AppRoutes />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
