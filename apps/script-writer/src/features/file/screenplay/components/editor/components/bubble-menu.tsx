import React, { useMemo } from 'react';
import { BubbleMenu, useCurrentEditor } from '@tiptap/react';
import { TextButtons } from '../selectors/text-buttons';
import { ColorSelector } from '../selectors/color-selector';
import { LinkSelector } from '../selectors/link-selector';
import StashSelector from '../selectors/stash-selector';
import { FontSelector } from '../selectors/font-selector';
import TransliterationButton from '../selectors/transliteration-button';
import CommentButton from '../selectors/comment-button';
import { editorSelectors, useEditorStore } from '@/store/editor';
import { FilePermission } from '@/store/editor/slices/editor';

const ScreenplayBubbleMenu = () => {
  const editor = useEditorStore(editorSelectors.editor);
  const filePermission = useEditorStore(editorSelectors.filePermission);
  if (!editor) return null;

  // Compute if a suggestion is active in the current selection.
  const suggestionActive = useMemo(() => {
    const { $from, $to } = editor.state.selection;
    let active = false;
    editor.state.doc.nodesBetween($from.pos, $to.pos, (node) => {
      if (
        node.marks.some(
          (mark) =>
            mark.type.name === 'insertion' || mark.type.name === 'deletion',
        )
      ) {
        active = true;
      }
    });
    return active;
  }, [editor.state.selection, editor.state.doc]);

  return (
    <BubbleMenu editor={editor}>
      {suggestionActive ? (
        // Render an empty hidden element if a suggestion is active.
        <div style={{ display: 'none' }} />
      ) : (
        <div className="border-[1px] flex border-black rounded-md p-2 bg-white shadow min-w-max">
          {filePermission !== FilePermission.COMMENT && (
            <>
              <FontSelector />
              <TextButtons />
              <ColorSelector />
              <LinkSelector />
              <StashSelector />
              <TransliterationButton />
            </>
          )}

          <CommentButton />
        </div>
      )}
    </BubbleMenu>
  );
};

export default React.memo(ScreenplayBubbleMenu);
