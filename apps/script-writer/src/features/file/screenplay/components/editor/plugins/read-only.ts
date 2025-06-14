export const readonlyPlugin = {
  // ProseMirror‐level hooks
  
    handleDOMEvents: {
      // beforeInput catches *all* typing (including IME, auto-fill, etc)
      beforeinput: (view: any, event: InputEvent) => {
        event.preventDefault();
        return true;
      },
      // paste, drop, etc, in case beforeinput doesn’t catch it
      paste: (view: any, event: ClipboardEvent) => {
        event.preventDefault();
        return true;
      },
    },
    handleKeyDown: (view: any, event: KeyboardEvent) => {
      // block delete/backspace
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        return true;
      }
      return false;
    },

};
