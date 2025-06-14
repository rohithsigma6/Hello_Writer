import { useState, useMemo, useContext, ChangeEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { v4 as uuidv4 } from 'uuid';
import { editorSelectors, useEditorStore } from '@/store/editor';
import { useUser } from '@/features/users/api/get-user';
import { useParams, useSearchParams } from 'react-router';
import { useFile } from '../../../../api/get-file-by-id';

const CreateCommentPopup = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  const editor = useEditorStore(editorSelectors.editor);
  const { fileId } = useParams();
  const { data: fileData } = useFile({
    fileId: fileId!,
    queryConfig: {
      enabled: !!fileId,
    },
  });
  const isOpen = useEditorStore(editorSelectors.isCommentPopupOpen);
  const toggleCommentPopup = useEditorStore.getState().toggleCommentPopup;
  const addComment = useEditorStore.getState().addComment;
  const setActiveCommentId = useEditorStore.getState().setActiveCommentId;
  const activeCommentId = useEditorStore(editorSelectors.activeCommentId);
  const { data: userData } = useUser();
  const collaborators = fileData?.file?.collaborators || [];
  const [rawText, setRawText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCollaborators, setFilteredCollaborators] =
    useState(collaborators);
  //   const { addComment } = useContext(FileContext);
  const currentUser = userData?.user;

  const collaboratorMap = useMemo(
    () =>
      collaborators.reduce(
        (map, collab) => ({ ...map, [collab._id as string]: collab }),
        {},
      ),
    [],
  );

  const resolveTextForDisplay = (text: string) =>
    text.replace(
      /{{(.*?)}}/g,

      (_: any, id: string) =>
        //@ts-ignore
        collaboratorMap[id]?.name.split(' ')[0] || `{{${id}}}`,
    );

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    if (input.includes('@')) {
      setShowDropdown(true);
      const search = input.split('@').pop()?.toLowerCase() || '';
      setFilteredCollaborators(
        collaborators?.filter((collab) =>
          collab?.name?.toLowerCase().includes(search),
        ),
      );
    } else {
      setShowDropdown(false);
    }

    const updatedRawText = input
      .split(' ')
      .map((word) => {
        for (const id in collaboratorMap) {
          if (
            //@ts-ignore
            collaboratorMap[id]?.name?.split(' ')[0].toLowerCase() ===
            word.toLowerCase()
          ) {
            return `{{${id}}}`;
          }
        }
        return word;
      })
      .join(' ');

    setRawText(updatedRawText);
    setDisplayText(resolveTextForDisplay(updatedRawText));
  };
  const handleSelectCollaborator = (collaborator: Collaborator) => {
    const atIndex = rawText.lastIndexOf('@');
    const updatedRawText = `${rawText.slice(0, atIndex)}{{${collaborator._id}}} `;
    setRawText(updatedRawText);
    setDisplayText(resolveTextForDisplay(updatedRawText));
    setShowDropdown(false);
  };

  const createComment = () => {
    if (rawText) {
      const id = uuidv4();
      addComment({
        id,
        message: rawText,
        userId: currentUser?._id,
        replies: [],
        lastUpdatedAt: new Date(),
        user: currentUser,
      });

      toggleCommentPopup();
      setRawText('');
      setDisplayText('');
      setActiveCommentId(id);
      setSearchParam({ tab: 'comments' });
      editor?.commands.setComment(id);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleCommentPopup}>
      <Dialog.Trigger hidden asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Open Dialog
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[100]" />
        <Dialog.Content className="fixed flex justify-center items-center top-1/2 left-1/2 w-full p-6 rounded-lg transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-[101]">
          <Dialog.Title hidden></Dialog.Title>
          <div className="w-[320px] bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full">
                {currentUser?.firstName?.charAt(0).toUpperCase()}
              </div>
              <span className="ml-3 text-sm font-medium">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-full text-sm resize-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comment or add others with @"
              rows={1}
              value={displayText}
              onChange={handleInputChange}
            />
            {showDropdown && (
              <ul className="absolute bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto mt-2">
                {filteredCollaborators.map((collab) => (
                  <li
                    key={collab._id}
                    onClick={() => handleSelectCollaborator(collab)}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full text-sm font-bold">
                      {collab?.name?.charAt(0).toUpperCase()}
                    </div>{' '}
                    <div className="ml-3">
                      <p className="text-sm font-medium">{collab?.name}</p>
                      <p className="text-xs text-gray-500">{collab?.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => toggleCommentPopup()}
                className="text-sm text-blue-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={createComment}
                className="px-4 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Comment
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateCommentPopup;
