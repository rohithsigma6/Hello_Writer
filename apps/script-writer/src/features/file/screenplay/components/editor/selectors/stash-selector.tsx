import { DOMSerializer } from 'prosemirror-model';
import { RiClipboardFill } from 'react-icons/ri';
import styles from '@/styles/bubble-menu-items.module.css';
import { useSocketStore } from '@/store/socket';
import { useParams, useSearchParams } from 'react-router';
import { useUser } from '@/features/users/api/get-user';
import { SidebarOptions } from '@/store/editor/slices/editor';
import { editorSelectors, useEditorStore } from '@/store/editor';
import { toggleSearchParam } from '@/utils/searchparams-toggle';
const StashSelector = () => {
  const { fileId } = useParams();
  const editor = useEditorStore(editorSelectors.editor);
  const { socket } = useSocketStore();
  const { data: userData } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const handleClipboardClick = (editor: any) => {
    const { view, state } = editor;
    const { from, to } = view.state.selection;

    if (from === to) {
      return null;
    }

    const slice = state.doc.slice(from, to);

    const fragment = document.createDocumentFragment();
    const serializer = DOMSerializer.fromSchema(editor.schema);

    slice.content.forEach((node: any) => {
      fragment.appendChild(serializer.serializeNode(node));
    });

    const div = document.createElement('span');
    div.appendChild(fragment);
    const outputContainer = document.createElement('div');
    let flag = false;
    div.querySelectorAll('.page .body').forEach((bodyEl) => {
      Array.from(bodyEl.childNodes).forEach((node) => {
        flag = true;
        outputContainer.appendChild(node.cloneNode(true));
      });
    });

    if (!flag) {
      outputContainer.appendChild(div.cloneNode(true));
    }
    const content = outputContainer.innerHTML;

    if (content.trim().length > 0) {
      if (socket) {
        socket.emit('addStash', {
          fileId,
          content: content.trim(),
          userId: userData?.user?._id,
        });

        if (tab != SidebarOptions.stash) {
          setSearchParams(
            toggleSearchParam(searchParams, 'tab', SidebarOptions.stash),
          );
        }
      }
    }

    editor.commands.deleteSelection();
  };

  return (
    <button
      className={`${styles.style_btn} min-w-8 min-h-8`}
      onClick={() => handleClipboardClick(editor)}
    >
      <RiClipboardFill />
    </button>
  );
};

export default StashSelector;
