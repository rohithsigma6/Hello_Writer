import { DashboardLayout } from '@/components/layouts';
import Loader from '@/components/ui/loader/loader';
import { useFiles } from '@/features/dashboard/api/get-files';
import { useFolders } from '@/features/dashboard/api/get-folders';
import FilesLayout from '@/features/dashboard/components/files/files-layout';
import FolderGrid from '@/features/dashboard/components/folders/folder-grid';
import { WelcomeBanner } from '@/features/dashboard/components/welcome-banner';
import {
  SharedFileEmptyState,
  SharedFolderEmptyState,
} from '../dashboard/dashboard';

const SharedWithMeRoute = () => {
  const filesQuery = useFiles();
  const foldersQuery = useFolders();
  const isLoading = filesQuery.isLoading || foldersQuery.isLoading;
  const sharedFolders = foldersQuery?.data?.folders?.SHARED ?? [];
  const sharedFiles = filesQuery?.data?.Files?.SHARED ?? [];

  return (
    <DashboardLayout>
      {isLoading ? (
        <Loader
          title="Getting your Folders!"
          description="Hang tight while we are getting your folders"
          isLoading={isLoading}
        />
      ) : (
        <>
          <WelcomeBanner />

          <div className="pl-5 pt-7 text-2xl text-gray-800">
            <h1 className="flex flex-row items-start">Shared With Me</h1>
          </div>

          <FolderGrid
            emptyStateButton={
              <SharedFolderEmptyState description="You don’t have any folders shared with you yet. Once someone shares a folder, it will appear here." />
            }
            foldersData={sharedFolders}
          />
          <FilesLayout
            emptyStateButton={
              <SharedFileEmptyState description="You don’t have any files shared with you yet. Once someone shares a folder, it will appear here." />
            }
            filesData={sharedFiles}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default SharedWithMeRoute;
