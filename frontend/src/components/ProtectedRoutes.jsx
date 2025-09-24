import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { authenticated, loading } = useSelector((state) => {
    
    return state.user;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;