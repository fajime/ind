import { useEffect, useState } from 'react';
import { Table } from '../../ant-modules';
import { RootState } from '../../store/store';
import { useAppSelector } from '../../hooks/useStore';

export const TablaPosts = () => {
  const [columns, setColumns] = useState<any[] | null>(null);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const { posts } = useAppSelector((state: RootState) => state.auth);

  const handleDataSource = () => {
    return posts.map((post: any) => {
      const { userId, id, title, body } = post;
      return {
        key: id.toString(),
        userId,
        title,
        body
      };
    });
  };
  const handleColumns = () => {
    return ['userId', 'title', 'body'].map((item: any) => {
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
  }, [posts]);

  return (
    <>
      {columns && dataSource && (
        <Table
          rowClassName={(record, index) => (index % 2 === 0 ? 'table-row' : 'table-row table-row--imp')}
          columns={columns}
          dataSource={dataSource}
        />
      )}
    </>
  );
};
