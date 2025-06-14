import React, { useEffect, useMemo } from 'react';
import CommentItem from './comment-item';
import { editorSelectors, useEditorStore } from '@/store/editor';
import { useParams } from 'react-router';
import { useFile } from '@/features/file/screenplay/api/get-file-by-id';
import { useUser } from '@/features/users/api/get-user';
import { Collaborator } from '@/types/api';

export const highlightComment = (id: string) => {
  // Reset background for all comments except the one with the current id
  const commentElements = document.querySelectorAll('[data-comment-id]');
  commentElements.forEach((element) => {
    if (
      element instanceof HTMLElement &&
      element.getAttribute('data-comment-id') !== id
    ) {
      element.style.backgroundColor = '';
    }
  });

  // Create a MutationObserver to watch for the element being added
  const observer = new MutationObserver((mutations, observerInstance) => {
    const commentElement = document.querySelector(`[data-comment-id="${id}"]`);
    if (commentElement && commentElement instanceof HTMLElement) {
      commentElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      commentElement.style.transition = 'background-color 0.3s';
      commentElement.style.backgroundColor = '#fdbc03';
      observerInstance.disconnect(); // stop observing once found
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

const CommentList: React.FC = () => {
  const { fileId } = useParams();
  const { data: fileData } = useFile({
    fileId: fileId!,
    queryConfig: {
      enabled: !!fileId,
    },
  });
  const file = fileData?.file;
  const { data: userData } = useUser();
  const comments = useEditorStore(editorSelectors.comments);
  const activeCommentId = useEditorStore(editorSelectors.activeCommentId);
  const updateComment = useEditorStore.getState().updateComment;
  const deleteComment = useEditorStore.getState().deleteComment;
  const addReply = useEditorStore.getState().addReply;
  const setActiveCommentId = useEditorStore.getState().setActiveCommentId;
  const editor = useEditorStore(editorSelectors.editor);
  const currentUser = userData?.user;
  const collaborators: Collaborator[] = file?.collaborators || [];

  const collaboratorMap = useMemo(
    () =>
      collaborators.reduce(
        (map: Record<string, Collaborator>, collab: Collaborator) => {
          map[collab._id!] = collab;
          return map;
        },
        {} as Record<string, Collaborator>,
      ),
    [collaborators],
  );

  useEffect(() => {
    if (activeCommentId) {
      highlightComment(activeCommentId);
    }
  }, [activeCommentId]);

  return (
    <div className="flex flex-col space-y-6">
      {comments?.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          collaboratorMap={collaboratorMap}
          collaborators={collaborators}
          activeCommentId={activeCommentId}
          setActiveCommentId={setActiveCommentId}
          updateComment={updateComment}
          deleteComment={deleteComment}
          addReply={addReply}
          editor={editor}
          currentUser={currentUser!}
        />
      ))}
    </div>
  );
};

export default CommentList;
