import { Button } from 'antd';

export const DlButton = ({ label = 'Boton', ...rest }: any) => {
  return (
    <Button className="button" {...rest}>
      {label}
    </Button>
  );
};
export default DlButton;
