import { ScreenplayElement } from '@screenplay-ink/editor';
import { handleMainPopupMenuClick } from '@screenplay-ink/editor/src/utils/main-popup';
import { Editor } from '@tiptap/react';

export const handleTab = (editor: Editor, event: KeyboardEvent) => {
  if (event.key.toLowerCase() === 'tab') {
    event.preventDefault();

    // Handle Time Popup
    const pos = editor.state.selection.anchor;
    const node = editor.view.domAtPos(pos).node;
    const lastBlock = node.textContent ?? '';
    const checkwords = lastBlock.slice(0, 3);

    if (
      checkwords === 'INT' ||
      checkwords === 'EXT' ||
      checkwords === 'I/E' ||
      checkwords === 'E/I'
    ) {
      // Skip if ends with hyphen
      if (lastBlock.trim().endsWith('-')) {
        return;
      }

      // Check if hyphen is available
      const textAfterHyphen = lastBlock.split('- ')[1];
      if (textAfterHyphen && textAfterHyphen.trim().length > 0) {
        return;
      }

      // Check if current node is scene
      const currentNode = node?.parentNode as HTMLElement;
      if (currentNode && currentNode.className.trim() !== ScreenplayElement.Scene) {
        return;
      }

      if (!editor.commands.isTimePopupVisible()) {
        setTimeout(() => {
          if (
            !editor.commands.isLocationAutocompleteVisible() &&
            !editor.commands.isSubLocationAutocompleteVisible()
          ) {
            editor.chain().focus().insertContent(' - ').run();
            editor.commands.showTimePopup()
          }
        }, 0);
      }
      return;
    }

    if (node && !node.textContent) {
      if (node.parentNode.className == 'action') {
        handleMainPopupMenuClick(editor, ScreenplayElement.Character);
      } else if (
        node.parentNode.className == 'character' &&
        !editor.commands.isCharacterAutocompleteVisible()
      ) {
        handleMainPopupMenuClick(editor, ScreenplayElement.Transition);
      } else if (node.parentNode.className == 'dialogue') {
        handleMainPopupMenuClick(editor, ScreenplayElement.Parenthetical);
      }
    }
  }
};
