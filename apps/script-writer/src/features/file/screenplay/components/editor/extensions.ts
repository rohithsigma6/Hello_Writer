import {
  Color,
  HighlightExtension,
  StarterKit,
  TextStyle,
  TiptapLink,
  TiptapUnderline,
  Screenplay,
  ScenePopupExtension,
  MainPopupExtension,
  PaginationExtension,
  PageNode,
  HeaderFooterNode,
  BodyNode,
  TimePopupExtension,
  TransitionPopupExtension,
  DualDialogue,
  DualDialogueItem,
  ScreenplayCharacter,
  ScreenplayDialogue,
  CharacterCuePopupExtension,
  SpeechRecognition,
  CharacterDeletePrevent,
  CharacterAutocompleteExtension,
  LocationAutocompleteExtension,
} from '@screenplay-ink/editor';
import Focus from '@tiptap/extension-focus';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import CommentExtension from '@sereneinserenade/tiptap-comment-extension';
import { SearchAndReplace } from '@screenplay-ink/editor';
import { FontFamily } from '@tiptap/extension-font-family';
import { cx } from 'class-variance-authority';
import { SnippetExtension } from './stash-feature';
import { useEditorStore } from '@/store/editor';
import { Extension } from '@tiptap/react';
import { Plugin, PluginKey } from '@tiptap/pm/state';

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: 'text-blue-600 cursor-pointer',
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx('list-disc list-outside leading-3 -mt-2'),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx('list-decimal list-outside leading-3 -mt-2'),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx('leading-normal -mb-2'),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx('border-l-4 border-primary'),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx(
        'rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium',
      ),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx('rounded-md bg-muted  px-1.5 py-1 font-mono font-medium'),
      spellcheck: 'false',
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4,
  },
  gapcursor: false,
  history: false,
  hardBreak: false,
});

const screenplay = Screenplay.configure({
  HTMLAttributes: {
    class: 'screenplay-works',
  },
});

const snippet = SnippetExtension.configure({
  onSnippetDrop: (content: string, cardId: string | null) => {
    const deleteStash = useEditorStore.getState().deleteStash;
    if (deleteStash && cardId) {
      deleteStash(cardId); // Call deleteCard only if it's defined
    } // Add your custom logic h ere
  },
});

const comment = CommentExtension.configure({
  HTMLAttributes: {
    class: 'my-comment',
  },
  onCommentActivated: (commentId) => {
    const setActiveCommentId = useEditorStore.getState().setActiveCommentId;

    setActiveCommentId(commentId);
  },
});
const StructuredClipboardExtension = Extension.create({
  name: 'structuredClipboard',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('structuredClipboard'),
        props: {
          // Custom Copy Handler
          handleDOMEvents: {
            copy: (view, event) => {
              const { state } = view;
              const { from, to } = state.selection;

              if (from === to) return false; // No selection, do nothing

              const slice = state.doc.slice(from, to);

              // Serialize the selected content as JSON
              const jsonContent = JSON.stringify(slice.toJSON());

              // Store the JSON in the clipboard
              event.clipboardData?.setData(
                'application/tiptap-json',
                jsonContent,
              );

              // Also store plain text as a fallback
              const textContent = slice.content.textBetween(
                0,
                slice.content.size,
                '\n',
              );
              event.clipboardData?.setData('text/plain', textContent);

              event.preventDefault(); // Prevent default copy behavior
              return true;
            },
          },

          // Custom Paste Handler
          handlePaste: (view, event) => {
            const clipboardData = event.clipboardData;

            if (!clipboardData) return false;

            // Check for our custom MIME type
            const jsonContent = clipboardData.getData(
              'application/tiptap-json',
            );
            if (jsonContent) {
              try {
                const slice = Slice.fromJSON(
                  view.state.schema,
                  JSON.parse(jsonContent),
                );

                // Replace the current selection with the pasted content
                view.dispatch(view.state.tr.replaceSelection(slice));
                return true;
              } catch (error) {
                console.error('Error parsing pasted content:', error);
              }
            }

            // Fallback to default paste behavior if no custom data is found
            return false;
          },
        },
      }),
    ];
  },
});
export const defaultExtensions = [
  screenplay,
  starterKit,
  ScenePopupExtension,
  MainPopupExtension,
  // placeholder,
  tiptapLink,
  // tiptapImage,
  // updatedImage,
  // taskList,
  // taskItem,
  // horizontalRule,
  // aiHighlight,
  // codeBlockLowlight,
  // youtube,
  // twitter,
  // mathematics,
  // characterCount,
  TiptapUnderline,
  // markdownExtension,
  HighlightExtension,
  TextStyle,
  Color,
  // CustomKeymap,
  // GlobalDragHandle,
  BubbleMenu,
  snippet,
  PaginationExtension.configure({
    defaultMarginConfig: { top: 0, right: 0, bottom: 0, left: 0 },
    pageAmendmentOptions: {
      enableHeader: false,
      enableFooter: false,
    },
  }),
  PageNode,
  HeaderFooterNode,
  BodyNode,
  FontFamily,
  comment,
  TimePopupExtension,
  TransitionPopupExtension,
  DualDialogue,
  DualDialogueItem,
  ScreenplayCharacter,
  ScreenplayDialogue,
  Focus.configure({
    className: 'has-focus',
    mode: 'deepest',
  }),
  CharacterCuePopupExtension,
  // AutocompleteExtension,
  SpeechRecognition,
  SearchAndReplace.configure({
    searchResultClass: 'search-result', // class to give to found items. default 'search-result'
  }),
  CharacterDeletePrevent,
  StructuredClipboardExtension,
  CharacterAutocompleteExtension,
  LocationAutocompleteExtension,
];
