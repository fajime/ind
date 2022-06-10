import { useEffect, useState } from 'react';
import { Table } from '../../ant-modules';
import { RootState } from '../../store/store';
import { useAppSelector } from '../../hooks/useStore';

type TablaUsuariosType = {
  onClick: (param: any) => void;
};

export const TablaUsuarios = ({ onClick }: TablaUsuariosType) => {
  const [columns, setColumns] = useState<any[] | null>(null);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const { users } = useAppSelector((state: RootState) => state.auth);

  const handleDataSource = () => {
    return users.map((user: any) => {
      const { id, username, email, name, phone, website } = user;
      return {
        key: id.toString(),
        name,
        email,
        phone,
        username,
        website
      };
    });
  };
  const handleColumns = () => {
    return ['name', 'phone', 'username', 'email', 'website'].map((item: any) => {
      return {
        title: item.charAt(0).toUpperCase() + item.slice(1),
        dataIndex: item,
        key: item
      };
    });
  };
  useEffect(() => {
    setDataSource(handleDataSource());
    setColumns(handleColumns());
  }, [users]);

  return (
    <>
      {columns && dataSource && (
        <Table
          onRow={(record) => ({
            onClick: () => onClick(record)
          })}
          rowClassName={(record, index) => (index % 2 === 0 ? 'table-row' : 'table-row table-row--imp')}
          columns={columns}
          dataSource={dataSource}
        />
      )}
    </>
  );
};
export default TablaUsuarios;
