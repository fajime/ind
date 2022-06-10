import { Col, Row } from './../ant-modules';
import { TablaPosts } from './../components';

export const Posts = () => {
  return (
    <>
      <Row className="header-row" justify="space-between">
        <Col span={24}></Col>
      </Row>
      <Row justify="center">
        <Col span={18}>
          <TablaPosts />
        </Col>
      </Row>
    </>
  );
};
export default Posts;
