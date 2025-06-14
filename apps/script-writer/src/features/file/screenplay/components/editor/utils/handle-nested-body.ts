import { Editor } from '@tiptap/react';

export const handleNestedBody = (editor: Editor) => {
  // 💡 Cleanup nested data-page-body divs (even with wrapper in between)
  const editorRoot = editor.view.dom;
  const bodyNodes = editorRoot.querySelectorAll('[data-page-body="true"]');

  bodyNodes.forEach((outerBody) => {
    const nestedBodies = outerBody.querySelectorAll('[data-page-body="true"]');

    nestedBodies.forEach((nestedBody) => {
      // Make sure this is not the same as the current outerBody
      if (nestedBody !== outerBody && outerBody.contains(nestedBody)) {
        // Move nestedBody's children to its parent
        const parent = nestedBody.parentElement;
        if (parent) {
          while (nestedBody.firstChild) {
            parent.insertBefore(nestedBody.firstChild, nestedBody);
          }
          nestedBody.remove();
          console.warn('Removed nested body inside another body');
        }
      }
    });
  });
};
