import TransliterationPopup from './transliteration-popup';
import CreateCommentPopup from './comments/create-comment-popup';
import React from 'react';

const DialogContainer = () => {
  return (
    <>
      <TransliterationPopup />
      <CreateCommentPopup />
    </>
  );
};

export default  React.memo(DialogContainer);
