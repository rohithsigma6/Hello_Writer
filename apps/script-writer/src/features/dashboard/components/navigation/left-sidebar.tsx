import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomCTA from '../bottom-cta';
import { SidebarFolderItem } from '../folders/folder-item';
import SidebarOptions from '../sidebar-options';
import { useFolders } from '@/features/dashboard/api/get-folders';
import { Folder } from '@/types/api';

export interface FileItem {
  _id: string;
  title: string;
}

export interface OwnedFolder {
  title: string;
  Files: FileItem[];
}

export const ownedFolders: OwnedFolder[] = [
  {
    title: 'Project Alpha',
    Files: [
      { _id: 'file1', title: 'Screenplay Draft' },
      { _id: 'file2', title: 'Revised Screenplay' },
    ],
  },
  {
    title: 'Project Beta',
    Files: [
      { _id: 'file3', title: 'Initial Draft' },
      { _id: 'file4', title: 'Second Draft' },
      { _id: 'file5', title: 'Final Version' },
    ],
  },
  {
    title: 'Miscellaneous',
    Files: [
      { _id: 'file6', title: 'Brainstorm Notes' },
      { _id: 'file7', title: 'Random Ideas' },
    ],
  },
];

interface FolderListProps {
  folders: Folder[];
}

export const FolderList = ({ folders }: FolderListProps) => {
  const [open, setOpen] = useState<number>(-1);
  return (
    <section className="LeftSidebar__folders flex flex-col items-start folder-wrapper">
      {folders?.map((folder, index) => (
        <SidebarFolderItem
          key={folder._id}
          folder={folder}
          isOpen={open === index}
          onToggle={() => setOpen(open === index ? -1 : index)}
        />
      ))}
    </section>
  );
};

const LeftSidebar: React.FC = () => {
  const { data } = useFolders();
  const ownedFolders = data?.folders?.OWNED ?? [];
  const navigate = useNavigate();
  return (
    <aside className="min-w-[280px] h-[90dvh] overflow-y-auto bg-white  top-[84px] left-0 py-2 pb-8  flex flex-col items-start font-poppins justify-between">      <div className="w-full flex flex-col">
      <SidebarOptions navigate={navigate} />
      <div className="divider-c"></div>
      <FolderList folders={ownedFolders} />
    </div>
      <div className="w-full flex flex-col side-bar-bottom">
        <BottomCTA />
      </div>
    </aside>
  );
};

export default LeftSidebar;
