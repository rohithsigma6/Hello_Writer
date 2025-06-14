import { Editor } from '@tiptap/react';
import { SceneEntrances } from '@screenplay-ink/editor';

export const handleScenePopup = (editor: Editor) => {
  setTimeout(() => {
    const pos = editor.state.selection.anchor;
    const node = editor.view.domAtPos(pos).node;

    const lastBlock = node.textContent ?? '';
    if (
      lastBlock.length === 0 &&
      node.parentNode.className == 'scene' &&
      !editor.commands.isScenePopupVisible()
    ) {
      editor.commands.showScenePopup();
    } else if (!SceneEntrances.join('').includes(lastBlock.toUpperCase())) {
      editor.commands.hideScenePopup();
    }
  }, 0);
};
