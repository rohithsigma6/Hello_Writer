import { cn } from '../../../lib/utils';
import type { SelectorItem } from './node-selector';
import {
  RiBold,
  RiItalic,
  RiPenNibFill,
  RiStrikethrough,
  RiUnderline,
} from 'react-icons/ri';
import styles from '@/styles/bubble-menu-items.module.css';
import { editorSelectors, useEditorStore } from '@/store/editor';

export const TextButtons = () => {
  const editor = useEditorStore(editorSelectors.editor);
  if (!editor) return null;
  const items: SelectorItem[] = [
    {
      name: 'bold',
      isActive: (editor) => editor.isActive('bold'),
      command: (editor) => editor.chain().focus().toggleBold().run(),
      icon: RiBold,
    },
    {
      name: 'italic',
      isActive: (editor) => editor.isActive('italic'),
      command: (editor) => editor.chain().focus().toggleItalic().run(),
      icon: RiItalic,
    },
    {
      name: 'underline',
      isActive: (editor) => editor.isActive('underline'),
      command: (editor) => editor.chain().focus().toggleUnderline().run(),
      icon: RiUnderline,
    },
    {
      name: 'strike',
      isActive: (editor) => editor.isActive('strike'),
      command: (editor) => editor.chain().focus().toggleStrike().run(),
      icon: RiStrikethrough,
    },
    {
      name: 'highlight',
      isActive: (editor) => editor.isActive('highlight'),
      command: (editor) => editor.chain().focus().toggleHighlight().run(),
      icon: RiPenNibFill,
    },
  ];
  return (
    <div className="flex">
      {items.map((item) => (
        <div
          key={item.name}
          className={`${styles.style_btn} min-w-8 min-h-8`}
          onClick={() => {
            item.command(editor);
          }}
        >
          <item.icon
            className={cn('text-black', {
              'text-blue-500': item.isActive(editor),
            })}
          />
        </div>
      ))}
    </div>
  );
};
