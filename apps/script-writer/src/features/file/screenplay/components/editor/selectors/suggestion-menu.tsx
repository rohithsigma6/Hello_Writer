import React from 'react';
import { BubbleMenu } from '@tiptap/react';
import { formatDistanceToNow } from 'date-fns';
import { editorSelectors, useEditorStore } from '@/store/editor';

const SuggestionMenu = () => {
  const editor = useEditorStore(editorSelectors.editor);

  if (!editor) return <></>;

  // Get suggestion data from the current selection.
  const getSuggestionData = () => {
    const { $from, $to } = editor.state.selection;
    let suggestionData: { nickname: string; date: number } | null = null;

    editor.state.doc.nodesBetween(
      $from.pos,
      $to.pos,
      (node: { marks: any[] }) => {
        node.marks.forEach((mark) => {
          if (mark.type.name === 'insertion' || mark.type.name === 'deletion') {
            const nickname = mark.attrs['data-op-user-nickname'] || 'Unknown';
            const dateAttr = mark.attrs['data-op-date'];
            const date = dateAttr ? parseInt(dateAttr, 10) : Date.now();
            suggestionData = { nickname, date };
          }
        });
      },
    );
    return suggestionData;
  };

  // Friendly date formatting: "5 minutes ago", etc.
  const suggestion = getSuggestionData();
  const friendlyDate = suggestion
    ? formatDistanceToNow(new Date(suggestion.date), { addSuffix: true })
    : '';

  // Show bubble only if there is a suggestion mark.
  const hasSuggestionMark = !!suggestion;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        placement: 'top',
        offset: [0, 10],
        // Ensure this bubble menu is on top.
        popperOptions: {
          modifiers: [{ name: 'computeStyles', options: { adaptive: false } }],
        },
      }}
    >
      {hasSuggestionMark && suggestion ? (
        <div
          className="track-change-bubble-menu"
          style={{
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '6px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            fontSize: '13px',
            zIndex: 9999, // High z-index to appear above other menus.
          }}
        >
          <div style={{ fontWeight: 500, color: '#333' }}>
            {suggestion.nickname} – {friendlyDate}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <button
              onClick={() => editor.commands.acceptChange()}
              style={{
                color: '#28a745',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Accept
            </button>
            <button
              onClick={() => editor.commands.rejectChange()}
              style={{
                color: '#dc3545',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Reject
            </button>
          </div>
        </div>
      ) : (
        // Render an empty element to maintain hook order.
        <div style={{ display: 'none' }} />
      )}
    </BubbleMenu>
  );
};

export default React.memo(SuggestionMenu);
