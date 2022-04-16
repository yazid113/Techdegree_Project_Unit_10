import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ context, children, redirectTo }) => {
  const auth = context.authenticatedUser;
  return auth ? children : <Navigate to={redirectTo}/>;
};

export default PrivateRoute;