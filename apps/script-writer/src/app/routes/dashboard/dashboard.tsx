import { DashboardLayout } from '@/components/layouts';
import Loader from '@/components/ui/loader/loader';
import { useFiles } from '@/features/dashboard/api/get-files';
import { useFolders } from '@/features/dashboard/api/get-folders';
import FilesLayout from '@/features/dashboard/components/files/files-layout';
import CreateFolderModal from '@/features/dashboard/components/folders/create-folder-modal';
import FolderGrid from '@/features/dashboard/components/folders/folder-grid';
import { WelcomeBanner } from '@/features/dashboard/components/welcome-banner';
import AddFolderIcon from '@/assets/landingsite/AddFolder.svg';
import CreateFileModal from '@/features/dashboard/components/files/create-file-modal';
import AddFileIcon from '@/assets/landingsite/AddFile.svg';
import EmptyFolderIcon from '@/assets/dashboard/emptyFolder.svg';
import EmptyFileIcon from '@/assets/dashboard/emptyFile.svg';

const DashboardRoute = () => {
  const filesQuery = useFiles();
  const foldersQuery = useFolders();
  const isLoading = filesQuery.isLoading || foldersQuery.isLoading;
  const ownedFolders = foldersQuery?.data?.folders?.OWNED ?? [];
  const sharedFolders = foldersQuery?.data?.folders?.SHARED ?? [];
  const ownedFiles = filesQuery?.data?.Files?.OWNED ?? [];
  const sharedFiles = filesQuery?.data?.Files?.SHARED ?? [];
  const folders = [...ownedFolders, ...sharedFolders];
  const files = [...ownedFiles, ...sharedFiles];

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
          <FolderGrid
            foldersData={folders}
            emptyStateButton={<OwnedFolderEmptyState />}
          />
          <FilesLayout
            emptyStateButton={<OwnedFileEmptyState />}
            filesData={files}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default DashboardRoute;

export const OwnedFolderEmptyState = () => {
  return (
    <div className="text-center col-span-full flex flex-col items-center space-y-4 mb-10">
      <img src={AddFolderIcon} alt="No folders" className="w-24 h-24" />
      <h2 className="text-xl font-semibold">Create New Project Folder</h2>
      <p className="text-gray-600">
        Create a new project folder to start adding screenplay files.
      </p>
      <CreateFolderModal>
        <button className=" px-4 py-3 mb-2 flex items-center justify-center gap-2 text-center text-sm font-semibold text-white bg-primary-blue hover:bg-blue-700 transition-colors duration-300 rounded-lg">
          Create Folder
        </button>
      </CreateFolderModal>
    </div>
  );
};

export const OwnedFileEmptyState = () => {
  return (
    <div className="text-center col-span-full flex flex-col items-center space-y-4 mb-10 mb-10">
      <img src={AddFileIcon} alt="No files" className="w-24 h-24" />
      <h2 className="text-xl font-semibold">Add New Screenplay File</h2>
      <p className="text-gray-600">
        Add a new screenplay file to start writing your script.
      </p>

      <CreateFileModal>
        <button className="px-4 py-3 mb-2 flex items-center justify-center gap-2 text-center text-sm font-semibold text-white bg-primary-blue hover:bg-blue-700 transition-colors duration-300 rounded-lg">
          Add File
        </button>
      </CreateFileModal>
    </div>
  );
};

export const SharedFileEmptyState = ({
  description,
}: {
  description: string;
}) => {
  return (
    <div className="text-center col-span-full flex flex-col items-center space-y-4 mb-10">
      <img src={EmptyFileIcon} alt="No files" className="w-24 h-24" />
      <h2 className="text-xl font-semibold">No Shared Files Available</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export const SharedFolderEmptyState = ({
  description,
}: {
  description: string;
}) => {
  return (
    <div className="text-center col-span-full flex flex-col items-center space-y-4 mb-10">
      <img src={EmptyFolderIcon} alt="No folders" className="w-24 h-24" />
      <h2 className="text-xl font-semibold">No Shared Folders Available</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
