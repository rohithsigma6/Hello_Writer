import { Outlet, useRouteError } from 'react-router';
export const ErrorBoundary = () => {
  const error = useRouteError(); // Get the error details

  console.error("Caught error:", error); 
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return <Outlet />;
};

export default AppRoot;
