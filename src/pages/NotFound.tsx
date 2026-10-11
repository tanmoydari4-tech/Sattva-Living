import React from 'react';
import { Navigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  // Seamlessly navigate to the homepage when an unmatched route is accessed
  return <Navigate to="/" replace />;
};
