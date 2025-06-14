import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import { DOMParser, Slice } from 'prosemirror-model';
import { useSocketStore } from '@/store/socket';

function wrapHtmlInTemplate(value: string): HTMLSpanElement {
  const element = document.createElement('span');
  element.innerHTML = value.trim();
  return element;
}

export interface SnippetExtensionOptions {
  onSnippetDrop?: (content: string, cardId: string | null) => void;
}

interface CardData {
  text: string;
  id: string;
  fileId: string;
}

export const SnippetExtension = Extension.create<SnippetExtensionOptions>({
  name: 'snippet',

  addOptions() {
    return {
      onSnippetDrop: undefined,
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDrop: (view, event: DragEvent | any): boolean => {
            if (!event) return false;

            const socket = useSocketStore.getState().socket;
            event.preventDefault();

            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });
            if (!coordinates) return false;

            const snippetContent =
              event.dataTransfer.getData('application/json');
            let cardData: CardData;
            try {
              cardData = JSON.parse(snippetContent);
            } catch (error) {
              console.error('Error parsing snippet content:', error);
              return false;
            }
            const { text, id, fileId } = cardData;

            // Parse HTML into a ProseMirror slice.
            const parsedContent: Slice = DOMParser.fromSchema(
              view.state.schema,
            ).parseSlice(wrapHtmlInTemplate(text));

            const tr = view.state.tr;
            const $pos = view.state.doc.resolve(coordinates.pos);
            // Check if the parent node (current line) is empty (ignoring whitespace)
            const isEmptyLine = $pos.parent.textContent.trim() === '';

            if (isEmptyLine) {
              // If there's a single node, use replaceWith (which expects a Node)
              if (parsedContent.content.childCount === 1) {
                const node = parsedContent.content.firstChild!;
                tr.replaceWith($pos.start(), $pos.end(), node);
              } else {
                // Otherwise, use replaceRange which expects a Slice.
                tr.replaceRange($pos.start(), $pos.end(), parsedContent);
              }
            } else {
              // Insert the content normally if the line is not empty.
              tr.insert(coordinates.pos, parsedContent.content);
            }

            tr.setMeta('isSnippetDropTransaction', true);
            view.dispatch(tr);

            if (socket) {
              socket.emit('removeStash', fileId, id);
            }

            // Call the onSnippetDrop function if provided.
            this.options.onSnippetDrop?.(snippetContent, id);

            return true;
          },
        },
      }),
    ];
  },
});
