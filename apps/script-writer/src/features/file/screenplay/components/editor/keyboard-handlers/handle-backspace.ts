import { EditorView } from '@tiptap/pm/view';

export const handleBackspace = (_view: EditorView, event: KeyboardEvent) => {
  if (event.code === 'Backspace' || event.code === 'Delete') {
    const selection = _view.state.selection;
    const node = selection.$anchor.parent;
    const posInNode = selection.$anchor.parentOffset;
    if (posInNode === 0 && node.content.size > 0) {
      event.preventDefault();
      return true;
    }
  }
};
