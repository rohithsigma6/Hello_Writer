// CommentItem.tsx
import { Comment } from '@/store/editor/slices/editor';
import { Collaborator, User } from '@/types/api';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface CommentItemProps {
  comment: Comment;
  collaboratorMap: Record<string, Collaborator>;
  collaborators: Collaborator[];
  activeCommentId: string | null;
  setActiveCommentId: (id: string | null) => void;
  updateComment: (id: string, updatedMessage: string) => void;
  deleteComment: (id: string) => void;
  addReply: (id: string, reply: any) => void;
  editor: any;
  currentUser: User;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  collaboratorMap,
  collaborators,
  activeCommentId,
  setActiveCommentId,
  updateComment,
  deleteComment,
  addReply,
  editor,
  currentUser,
}) => {
  // Local states for menu and editing
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCollaborators, setFilteredCollaborators] =
    useState<Collaborator[]>(collaborators);

  // Local states for reply input
  const [replyText, setReplyText] = useState('');
  const [replyDropdown, setReplyDropdown] = useState(false);
  const [filteredCollaboratorsReply, setFilteredCollaboratorsReply] =
    useState<Collaborator[]>(collaborators);

  // When editing starts, convert comment markup to names
  useEffect(() => {
    if (isEditing) {
      const _message = comment.message.replace(/{{(.*?)}}/g, (_, id) => {
        return collaboratorMap[id]?.name?.split(' ')[0] || `{{${id}}}`;
      });
      setEditedComment(_message);
    }
  }, [isEditing, comment.message, collaboratorMap]);

  // Handlers for editing input
  const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const input = e.target.value;
    if (input.includes('@')) {
      setShowDropdown(true);
      const search = input.split('@').pop()?.toLowerCase() || '';
      setFilteredCollaborators(
        collaborators.filter(
          (collab) =>
            collab?.name?.toLowerCase().includes(search) ||
            collab?.email?.toLowerCase().includes(search),
        ),
      );
    } else {
      setShowDropdown(false);
    }
    setEditedComment(input);
  };

  const handleSelectCollaborator = (collab: Collaborator) => {
    const atIndex = editedComment.lastIndexOf('@');
    const updatedRawText = `${editedComment.slice(0, atIndex)}${collab?.name?.split(' ')[0]} `;
    setEditedComment(updatedRawText);
    setShowDropdown(false);
  };

  const handleMenuOptionClick = (action: string) => {
    switch (action) {
      case 'edit':
        setIsEditing(true);
        break;
      case 'delete':
        editor?.commands.unsetComment(comment.id);
        deleteComment(comment.id);
        break;
      case 'markAsResolved':
        editor?.commands.unsetComment(comment.id);
        deleteComment(comment.id);
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
    setOpenMenu(null);
  };

  const handleSaveEdit = () => {
    const updatedMessage = editedComment
      .split(' ')
      .map((word) => {
        for (const id in collaboratorMap) {
          if (
            collaboratorMap[id]?.name?.split(' ')[0].toLowerCase() ===
            word.toLowerCase()
          ) {
            return `{{${id}}}`;
          }
        }
        return word;
      })
      .join(' ');
    updateComment(comment.id, updatedMessage);
    setIsEditing(false);
    setEditedComment('');
  };

  // Handlers for reply input
  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const input = e.target.value;
    if (input.includes('@')) {
      setReplyDropdown(true);
      const search = input.split('@').pop()?.toLowerCase() || '';
      setFilteredCollaboratorsReply(
        collaborators.filter(
          (collab) =>
            collab?.name?.toLowerCase().includes(search) ||
            collab?.email?.toLowerCase().includes(search),
        ),
      );
    } else {
      setReplyDropdown(false);
    }
    setReplyText(input);
  };

  const handleReplySelectCollaborator = (collab: Collaborator) => {
    const atIndex = replyText.lastIndexOf('@');
    const updatedRawText = `${replyText.slice(0, atIndex)}${collab?.name?.split(' ')[0]} `;
    setReplyText(updatedRawText);
    setReplyDropdown(false);
  };

  const handleReplySubmit = () => {
    const replyMessage = replyText
      .split(' ')
      .map((word) => {
        for (const id in collaboratorMap) {
          if (
            collaboratorMap[id]?.name?.split(' ')[0].toLowerCase() ===
            word.toLowerCase()
          ) {
            return `{{${id}}}`;
          }
        }
        return word;
      })
      .join(' ');

    const id = uuidv4();
    const reply = {
      id,
      message: replyMessage,
      user: currentUser,
      lastUpdatedAt: new Date(),
      usedId: currentUser?._id,
    };
    setReplyText('');
    addReply(comment.id, reply);

    setActiveCommentId(id);
  };

  const resolveTextForDisplay = (text: string) =>
    text.replace(
      /{{(.*?)}}/g,
      (_, id) =>
        `<span class="text-blue-500">${collaboratorMap[id]?.name?.split(' ')[0]} </span>`,
    );

  return (
    <div
      onClick={() => {
        setOpenMenu(null);
        setActiveCommentId(comment.id);
      }}
      className="p-[10px] bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-[16px]">
        <div className="flex items-center space-x-4">
          <div className="w-[32px] h-[32px] flex items-center justify-center bg-[#653EFF] text-white rounded-full text-lg font-bold">
            {comment?.user?.firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-[14px] text-[#212131]">{comment.user.firstName}</p>
            <p className="text-[12px] text-[#9999A0] font-normal">
              {new Date(comment?.lastUpdatedAt!).toDateString()}
            </p>
          </div>
        </div>
        {currentUser._id === comment.user._id && (
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(comment.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v.01M12 12v.01M12 18v.01"
              />
            </svg>
          </button>
        )}
        {openMenu === comment.id && (
          <div className="fixed right-2 mt-2 bg-white border rounded shadow-lg p-2 z-10">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleMenuOptionClick('markAsResolved')}
                  className="px-1 py-2 text-sm text-left w-full text-gray-700 hover:bg-gray-200"
                >
                  Mark as Resolved
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuOptionClick('edit')}
                  className="px-1 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-200"
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuOptionClick('delete')}
                  className="px-1 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-200"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-4 relative">
          <input
            type="text"
            value={editedComment}
            onChange={handleEditingChange}
            placeholder="Edit your comment..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#653EFF]"
          />
          {showDropdown && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto mt-2">
              {filteredCollaborators.map((collab) => (
                <li
                  key={collab._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectCollaborator(collab);
                  }}
                  className="flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100"
                >
                  <div className="min-h-6 min-w-6  flex items-center justify-center bg-gray-300 text-gray-700 rounded-full text-xs font-bold">
                    {collab?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium">{collab.name}</p>
                    <p className="text-xs text-gray-500">{collab.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleSaveEdit}
            className="mt-2 px-4 py-2 bg-[#653EFF] text-white rounded-lg hover:bg-[#4b2ed1]"
          >
            Save
          </button>
        </div>
      ) : (
        <p
          className="text-gray-800 text-[12px]"
          dangerouslySetInnerHTML={{
            __html: resolveTextForDisplay(comment.message),
          }}
        />
      )}

      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex items-center space-x-4">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full text-sm font-bold">
                {reply.user.firstName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold">{reply.user.firstName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(reply.lastUpdatedAt!).toDateString()}
                </p>
                <p
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: resolveTextForDisplay(reply.message),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeCommentId === comment.id && (
        <div className="mt-4 relative">
          <input
            value={replyText}
            onChange={handleReplyChange}
            type="text"
            placeholder="Write your reply..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#653EFF]"
          />
          {replyDropdown && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto no-scrollbar mt-2">
              {filteredCollaboratorsReply.map((collab) => (
                <li
                  key={collab._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReplySelectCollaborator(collab);
                  }}
                  className="flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100"
                >
                  <div className="min-h-6 min-w-6  flex items-center justify-center bg-gray-300 text-gray-700 rounded-full text-xs font-bold">
                    {collab?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{collab.name}</p>
                    <p className="text-xs text-gray-500">{collab.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleReplySubmit}
            className="mt-2 px-4 py-2 bg-[#653EFF] text-white rounded-lg hover:bg-[#4b2ed1]"
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(CommentItem);
