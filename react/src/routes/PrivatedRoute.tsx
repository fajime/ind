import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { useAppSelector } from './../hooks/useStore';

export const PrivatedRoute = ({ children }: any) => {
  const { logged } = useAppSelector((state: RootState) => state.auth);

  return logged ? <>{children}</> : <Navigate to="/login" />;
};
