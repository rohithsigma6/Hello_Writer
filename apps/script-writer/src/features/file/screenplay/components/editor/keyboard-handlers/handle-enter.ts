import { ScreenplayElement } from '@screenplay-ink/editor';
import { getDualDialog } from '@screenplay-ink/editor/src/utils/get-dual-dialogue-position';
import { screenplays } from '@screenplay-ink/editor/src/utils/main-popup';
import { Editor } from '@tiptap/react';

export const handleEnter = (editor: Editor, event: KeyboardEvent) => {
  if (event.key.toLowerCase() === 'enter') {
    event.preventDefault();
    // event.stopPropagation();

    const pos = editor.state.selection.anchor;
    const node = editor.view.domAtPos(pos).node;
    const currentNode = node?.parentNode as HTMLElement;

    // Check dual-dialogue types
    const parentNodeName = editor.state.selection.$anchor.parent.type.name;
    if (
      parentNodeName === 'ScreenplayCharacter' ||
      parentNodeName === 'ScreenplayDialogue' ||
      parentNodeName === 'dualdialogue' ||
      parentNodeName === 'dualdialogueitem'
    ) {
      const dualDialog = getDualDialog(editor.view.state.selection);
      if (dualDialog !== null) {
        const {
          childNodes,
          node: _parentNode,
          pos: _parentNodePos,
        } = dualDialog;
        const currentFocusAt = editor.view.state.selection.$from.pos;
        const _childNode = childNodes.find((v) => v.pos > currentFocusAt);

        if (_childNode) {
          editor.commands.focus(_childNode.pos);
          editor?.chain().focus().selectTextblockEnd().run();
        } else if (childNodes[childNodes.length - 1].pos <= currentFocusAt) {
          const currentNodeSize = _parentNode.nodeSize || 0;
          const insertPos = _parentNodePos + currentNodeSize;
          const focusPos = insertPos + 1;

          editor
            .chain()
            .command(({ tr, state }) => {
              tr.insert(
                insertPos,
                state.schema.nodes.Screenplay.create(
                  { class: ScreenplayElement.Action },
                  [],
                ),
              );
              return true;
            })
            .focus(focusPos)
            .run();
        }

        return;
      }
    }

    // Dialogue + parenthetical checks
    const allBlocks = Array.from(
      editor.view.dom.ownerDocument.querySelectorAll(screenplays.join(', ')),
    );
    const index = allBlocks.findIndex((el) => el === currentNode);
    const prevNode = allBlocks[index - 1];
    const isPrevNodeParenthetical =
      prevNode?.className === ScreenplayElement.Parenthetical;
    const isDialogueNode =
      node.parentNode?.className === ScreenplayElement.Dialogue;
    const isEmpty = (node.textContent ?? '').trim().length === 0;

    if (isPrevNodeParenthetical && isDialogueNode && isEmpty) {
      return;
    }

    const lastBlock = node.textContent ?? '';
    // Logic for what element should be shown on "Enter"
    setTimeout(() => {
      if (window['screenplay']?.editor?.triggeredMainPopup) {
        window['screenplay'].editor.triggeredMainPopup = false;
        return;
      }

      if (node.parentNode.className === 'transition') {
        editor.commands.enter();
        editor.commands.addClassToFocusedElement(ScreenplayElement.Scene);
      } else if (node.parentNode.className === 'character') {
        editor.commands.enter();
        editor.commands.addClassToFocusedElement(ScreenplayElement.Dialogue);
        return;
      } else if (
        node.parentNode.className === 'parenthetical' ||
        node.parentNode.parentNode?.className === 'parenthetical'
      ) {
        // editor.commands.focus('end');

        editor?.chain().focus().selectTextblockEnd().run();

        editor.commands.enter();
        editor.commands.addClassToFocusedElement(ScreenplayElement.Dialogue);
        return true;
      } else if (lastBlock.length !== 0) {
        editor.commands.enter();
        editor.commands.addClassToFocusedElement(ScreenplayElement.Action);
      }

      // If the current node is empty, show the main popup
      editor.commands.hideFloatingMenu();

      if (lastBlock.length === 0 && !editor.commands.isScenePopupVisible()) {
        editor.commands.showFloatingMenu();
      }
    }, 200);
  }
};
