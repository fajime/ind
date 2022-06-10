export const Wrapper = ({ component: Component, ...rest }: any) => {
  return <Component {...rest} />;
};
