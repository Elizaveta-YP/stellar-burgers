import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

export const UnauthOnlyRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user);

  if (user) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};
