import { Outlet } from 'react-router';

import { FileLayout } from '@/components/layouts';

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const FileRoot = () => {
  return (
    <FileLayout>
      <Outlet />
    </FileLayout>
  );
};

export default FileRoot;
