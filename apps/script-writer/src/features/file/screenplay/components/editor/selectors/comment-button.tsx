import { useEditorStore } from '@/store/editor';
import styles from '@/styles/bubble-menu-items.module.css';
import { FaRegCommentAlt } from 'react-icons/fa';

const CommentButton = () => {
  const toggleCommentPopup = useEditorStore.getState().toggleCommentPopup;
  return (
    <div
    className={`${styles.style_btn} min-w-8 min-h-8`}
      onClick={() => {
        toggleCommentPopup();
      }}
    >
      <FaRegCommentAlt />
    </div>
  );
};

export default CommentButton;
