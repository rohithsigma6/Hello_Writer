import { DashboardLayout } from '@/components/layouts';
import FilesLayout from '@/features/dashboard/components/files/files-layout';
import { useFolderFiles } from '@/features/folder/api/get-folder-file';
import React from 'react';
import { useParams } from 'react-router';
import { OwnedFileEmptyState } from '../dashboard/dashboard';

const FolderRoute = () => {
  const { folderId } = useParams();
  const { data } = useFolderFiles({ folderId: folderId! });
  console.log(data, folderId);
  return (
    <DashboardLayout>
      <div className="p-4">
        <FilesLayout
          folderTitle={data?.folder?.title!}
          emptyStateButton={<OwnedFileEmptyState />}
          filesData={data?.folder.Files!}
        />
      </div>
    </DashboardLayout>
  );
};

export default FolderRoute;
