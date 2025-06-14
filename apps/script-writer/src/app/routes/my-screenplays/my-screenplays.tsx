import { DashboardLayout } from '@/components/layouts';
import Loader from '@/components/ui/loader/loader';
import { useFiles } from '@/features/dashboard/api/get-files';
import { useFolders } from '@/features/dashboard/api/get-folders';
import FilesLayout from '@/features/dashboard/components/files/files-layout';
import FolderGrid from '@/features/dashboard/components/folders/folder-grid';
import { WelcomeBanner } from '@/features/dashboard/components/welcome-banner';
import {
  OwnedFileEmptyState,
  OwnedFolderEmptyState,
  SharedFileEmptyState,
  SharedFolderEmptyState,
} from '../dashboard/dashboard';

const MyScreenplaysRoute = () => {
  const filesQuery = useFiles();
  const foldersQuery = useFolders();
  const isLoading = filesQuery.isLoading || foldersQuery.isLoading;
  const ownedFolders = foldersQuery?.data?.folders?.OWNED ?? [];
  const sharedFolders = foldersQuery?.data?.folders?.SHAREDBYME ?? [];
  const ownedFiles = filesQuery?.data?.Files?.OWNED ?? [];
  const sharedFiles = filesQuery?.data?.Files?.SHAREDBYME ?? [];

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
            <h1 className="flex flex-row items-start">Created By Me</h1>
          </div>
          <FolderGrid
            emptyStateButton={<OwnedFolderEmptyState />}
            foldersData={ownedFolders}
          />
          <FilesLayout
            emptyStateButton={<OwnedFileEmptyState />}
            filesData={ownedFiles}
          />

          <div className="pl-5 pt-7 text-2xl text-gray-800">
            <h1 className="flex flex-row items-start">Shared By Me</h1>
          </div>

          <FolderGrid
            emptyStateButton={
              <SharedFolderEmptyState description="You don’t have any folders shared by you yet. Once you share a folder, it will appear here." />
            }
            foldersData={sharedFolders}
          />
          <FilesLayout
            emptyStateButton={
              <SharedFileEmptyState description="You don’t have any files shared by you yet. Once you shares a file, it will appear here." />
            }
            filesData={sharedFiles}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default MyScreenplaysRoute;
