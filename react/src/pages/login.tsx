import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Content, Form, notification } from './../ant-modules';
import { DlButton, DlCheckbox, DlInput } from './../components/dl';
import { RootState } from './../store/store';
import { loadPosts, loadUsers, login } from './../store/actions/authActions';
import { useAppDispatch, useAppSelector } from './../hooks/useStore';

export const Login = () => {
  const dispatch = useAppDispatch();
  const { logged } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (logged) {
      dispatch(loadUsers());
      dispatch(loadPosts());
      navigate('/home', { replace: true });
    }
  }, [logged]);

  const handleFailed = () => {
    notification.open({
      message: 'Credenciales incorrectas',
      description: 'Inténtelo de nuevo...',
      onClick: () => {
        console.log('Notification Clicked!');
      }
    });
  };
  const handleLogin = (values: any) => {
    const { name, password, remember } = values;
    if (name === 'admin' && password) {
      dispatch(login(name, remember));
      return;
    }
    notification.open({
      message: 'Credenciales incorrectas',
      description: 'Inténtelo de nuevo...',
      onClick: () => {
        console.log('Notification Clicked!');
      }
    });
  };

  return (
    <>
      {!logged && (
        <Content>
          <Form
            style={{ paddingRight: '10em', paddingTop: '16em' }}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            onFinishFailed={handleFailed}
            autoComplete="off"
          >
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <DlInput />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <DlInput type="password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 24 }}>
              <DlCheckbox>Remember me</DlCheckbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 24 }}>
              <DlButton label="Hacer Login" htmlType="submit" />
            </Form.Item>
          </Form>
        </Content>
      )}
    </>
  );
};
