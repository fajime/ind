import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RootState } from './../../store/store';
import { logout } from './../../store/actions/authActions';
import { useAppDispatch, useAppSelector } from './../../hooks/useStore';
import { useAppContext } from './../../providers/AppProvider';
import { DlButton } from '../dl';
import { Col, Row } from './../../ant-modules';

export const Menu = () => {
  const { user } = useAppContext();
  const [userMenu, setUserMenu] = useState<any>(user);
  const { name } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setUser = user ? name : user;
    setUserMenu(setUser);
  });

  return (
    <Row className="menu">
      <Col span={18} className="content-links">
        <NavLink to="/login" className="link-text">
          Login
        </NavLink>
        <NavLink to="/home" className="link-text">
          Home
        </NavLink>
        <NavLink to="/usuarios" className="link-text">
          Usuarios
        </NavLink>
        <NavLink to="/posts" className="link-text">
          Posts
        </NavLink>
        <NavLink to="/canvas" className="link-text">
          Canvas
        </NavLink>
      </Col>
      <Col className="content-links" span={3}>
        {userMenu && (
          <>
            Bienvenido: <strong>{userMenu.toUpperCase()}</strong>
          </>
        )}
      </Col>
      <Col className="content-links" span={3}>
        {userMenu && <DlButton onClick={() => dispatch(logout())} label="Logout" />}
      </Col>
    </Row>
  );
};
export default Menu;
