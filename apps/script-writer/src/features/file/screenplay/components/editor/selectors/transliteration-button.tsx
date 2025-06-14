import { useEditorStore } from '@/store/editor';
import styles from '@/styles/bubble-menu-items.module.css';
import { LiaLanguageSolid } from 'react-icons/lia';
const TransliterationButton = () => {
  const toggleTransliterationPopup =
    useEditorStore.getState().toggleTransliterationPopup;
  return (
    <div
    className={`${styles.style_btn} min-w-8 min-h-8`}
      onClick={() => {
        toggleTransliterationPopup();
      }}
    >
      <LiaLanguageSolid />
    </div>
  );
};

export default TransliterationButton;
