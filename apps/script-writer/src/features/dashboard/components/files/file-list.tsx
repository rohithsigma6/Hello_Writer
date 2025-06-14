import { File } from '@/types/api';
import { FileItem } from './file-item';



const FileList = ({ ownedFiles,emptyStateButton }: { ownedFiles: File[],emptyStateButton:React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 my-files-wrapper">
      {ownedFiles && ownedFiles.length > 0 ? (
        ownedFiles?.map((files: any, index: number) => (
          <FileItem file={files} />
        ))
      ) : (
        emptyStateButton
      )}
    </div>
  );
};

export default FileList;
