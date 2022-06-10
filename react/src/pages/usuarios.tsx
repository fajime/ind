import { useState } from 'react';
import { useAppContext } from './../providers/AppProvider';
import { Col, Row } from './../ant-modules';
import { DlInput, TablaUsuarios } from './../components';
import { addUsers } from './../store/actions/authActions';
import { useAppDispatch, useAppSelector } from './../hooks/useStore';
import { RootState } from './../store/store';

export const Usuarios = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<any>(null);
  const { users } = useAppSelector((state: RootState) => state.auth);

  const { changeUser } = useAppContext();
  const handleUser = (userSelect: any) => {
    changeUser(userSelect.username);
    setUser(userSelect);
  };
  const searchUsers = (event: any) => {
    const { value } = event.target;

    const result = users.filter((iterateUser: any) => {
      return (
        iterateUser.name.includes(value) || iterateUser.username.includes(value) || iterateUser.email.includes(value)
      );
    });

    if (result.length > 0) {
      dispatch(addUsers(result));
    }
  };

  return (
    <>
      <Row align="middle" className="header-row">
        <Col span={8} offset={4}>
          {user && (
            <h2>
              {user.name} - {user.email}
            </h2>
          )}
        </Col>
        <Col span={2} offset={10}>
          <DlInput placeholder="Buscar" onChange={searchUsers} />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={18}>
          <TablaUsuarios onClick={handleUser}></TablaUsuarios>
        </Col>
      </Row>
    </>
  );
};
