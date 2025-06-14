import { defaultEditorContent } from '../../lib/content';
import * as Y from 'yjs';
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorInstance,
  EditorRoot,
  ImageResizer,
  type JSONContent,
  PermissionsExtension,
  handleCharacterAutocompletePopup,
  handleCommandNavigation,
  handleImageDrop,
  handleLocationAutocompletePopup,
} from '@screenplay-ink/editor';
import { EditorContent, Editor } from '@tiptap/react';
import TrackChangeExtension from 'track-change-extension';
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { defaultExtensions } from './extensions';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { uploadFn } from './image-upload';
import { slashCommand, suggestionItems } from './slash-command';
import Collaboration from '@tiptap/extension-collaboration';
import { useEditorStore, useFileStore } from '@/store/editor';
import { useUser } from '@/features/users/api/get-user';
import { FilePermission } from '@/store/editor/slices/editor';
import { useParams, useSearchParams } from 'react-router';
import { hocuspocusProvider } from '../../lib/hocuspocus-provider';
import SuggestionMenu from './selectors/suggestion-menu';
import ScreenplayBubbleMenu from './components/bubble-menu';
import DialogContainer from './components/dialog-container';
import './index.css';
import { HocuspocusProvider } from '@hocuspocus/provider';
import MemoizedCommandList from './components/command-list';
import { useSceneList } from '@/hooks/scenes/use-scene-list';
import { useFiles } from '@/features/dashboard/api/get-files';
import { useFile } from '../../api/get-file-by-id';
import { useUpdateFileCurrentPage } from '@/features/dashboard/api/update-file-current-page';
import { useSocketStore } from '@/store/socket';
import { FileImportLoadingModal } from './modals/file-import-loading-modal';
import { TimerUpdater } from './components/timer/timer-updater';
import { CelebrationModal } from './components/timer/celebration-modal';
import { handleBackspace } from './keyboard-handlers/handle-backspace';
import { EditorView } from '@tiptap/pm/view';
import { handleEnter } from './keyboard-handlers/handle-enter';
import { handleTab } from './keyboard-handlers/handle-tab';
import { DOMSerializer } from 'prosemirror-model';
import { handleNestedBody } from './utils/handle-nested-body';
import { handleScenePopup } from './utils/handle-scene-popup';
import { useSnackbar } from 'notistack';
import { useHandlePageUpdate } from './hooks/use-handle-page-update';
import { readonlyPlugin } from './plugins/read-only';

const TiptapEditor = () => {
  const [searchParams] = useSearchParams();
  const versionName = searchParams?.get('versionName') || 'V1';
  const versionColor = searchParams?.get('versionColor') || 'White';
  const editStatus = searchParams?.get('editStatus') || 'PERSONAL DRAFT';
  const versionIndex = searchParams?.get('versionIndex') || null;
  const { fileId } = useParams();
  const { data: userData } = useUser();
  const token = userData?.user?.token;
  const [loading, setLoading] = useState(false);
  const notFirstRef = useRef(false);
  const [ydoc, setYdoc] = useState(() => new Y.Doc());
  const [saveStatus, setSaveStatus] = useState('Saved');
  const {
    editor: headlessEditor,
    filePermission,
    zoom,
    setEditor,
    setEditorJson,
  } = useEditorStore((state) => state);
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const filesQuery = useFiles();
  const fileQuery = useFile({ fileId: fileId || '' });
  const { scenes } = useSceneList();
  const [isTyping, setIsTyping] = useState(false);
  const { importData, updateImportData } = useFileStore((state) => state);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { socket } = useSocketStore();
  const { enqueueSnackbar } = useSnackbar();
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null,
  );

  const timerRef = useRef<any>(null);
  const { mutate: handleFileCurrentPage } = useUpdateFileCurrentPage({
    mutationConfig: {
      onSuccess: () => {
        filesQuery.refetch();
        fileQuery.refetch();
      },
      onError: () => {
        enqueueSnackbar('Error updating total pages.', { variant: 'error' });
      },
    },
  });
  const { handlePageUpdate } = useHandlePageUpdate({
    fileQuery,
    scenes,
    handleFileCurrentPage,
    fileId: fileId || '',
  });

  useEffect(() => {
    if (!fileId || !token) return;
    if (timerRef.current) return;
    // setLoading(true);
    // if (provider) {
    //   setInitialContent(null);
    //   provider?.destroy();
    //   setProvider(null);
    // }

    setLoading(true);
    if (provider) {
      setInitialContent(null);
      provider?.destroy();
      setProvider(null);
    }

    const newYdoc = new Y.Doc();
    setYdoc(newYdoc);

    timerRef.current = setTimeout(() => {
      const prov = hocuspocusProvider({
        fileId: fileId!,
        token: token!,
        versionName,
        versionColor,
        editStatus,
        document: newYdoc,
        versionIndex: parseInt(versionIndex!) ?? null,
      });

      prov?.on('sync', () => {
        setLoading(false);
        setInitialContent(defaultEditorContent);
        timerRef.current = null;
      });

      setProvider(prov);
    }, 300);

    return () => {
      // provider?.destroy();
      // setProvider(null);
      // headlessEditor?.destroy();
    };
  }, [fileId, token, versionName, versionColor, editStatus, versionIndex]);

  const collaboration = useMemo(() => {
    if (!provider) return null;
    return Collaboration.configure({
      document: provider?.document,
    });
  }, [provider]);

  const collaborationCursor = useMemo(() => {
    if (!provider || !userData?.user) return null;
    return CollaborationCursor.configure({
      provider: provider,
      user: {
        name: userData.user.firstName || 'Anonymous',
        color: userData.user.colorCode || '#ffcc00',
      },
    });
  }, [provider, userData?.user?.firstName]);

  const suggestionExtension = useMemo(() => {
    if (!provider || !userData?.user?._id || !filePermission) return null;
    return TrackChangeExtension.configure({
      enabled: filePermission === FilePermission.SUGGEST,
      dataOpUserId: userData.user._id,
      dataOpUserNickname: userData?.user?.firstName,
      onStatusChange: (status: boolean) => {
        console.log('Track Change Status:', status);
      },
    });
  }, [provider, filePermission, userData?.user?._id]);

  // Combine all extensions and filter out null values.
  const extensions = useMemo(
    () =>
      [collaboration, collaborationCursor, suggestionExtension, slashCommand]
        .filter(Boolean)
        .concat(defaultExtensions),
    [collaboration, collaborationCursor, suggestionExtension],
  );

  const debouncedUpdates = useDebouncedCallback((editor: EditorInstance) => {
    if (headlessEditor) {
      const json = headlessEditor?.getJSON();
      setEditorJson(json);
      setSaveStatus('Saved');
    }
  }, 500);

  // This method is used to override the default behaviors
  // since addKeyboardShortcut does not have access to event object
  const handleEditorKeydown = (_view: EditorView, event: KeyboardEvent) => {
    console.log('Event inside handleEditorKeydown', event.ctrlKey, event.key);
    const editor = (_view.dom as any).editor as Editor;
    handleCharacterAutocompletePopup(editor, event);
    handleLocationAutocompletePopup(editor, event);
    // Handle Enter
    handleEnter(editor, event);

    // Handle Tab
    handleTab(editor, event);

    // Prevent Backspace and Delete if content size is available
    handleBackspace(_view, event);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    // Set isTyping to true if not already.
    if (!isTyping) setIsTyping(true);
    // Set a timeout to mark typing stopped after 3 seconds of inactivity.
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);

    return false;
  };

  // Debounce awareness updates to throttle rapid cursor changes.
  const debouncedAwarenessUpdate = useDebouncedCallback((event) => {
    if (provider && userData) {
      provider.setAwarenessField('user', {
        name: userData.user.firstName || 'Anonymous',
        color: userData.user.colorCode || '#ffcc00',
        mouseX: event.clientX,
        mouseY: event.clientY,
      });
    }
  }, 300);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      debouncedAwarenessUpdate(e);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [debouncedAwarenessUpdate]);

  useEffect(() => {
    notFirstRef.current = true;
    return () => {
      // provider?.destroy();
    };
  }, [fileId, token, versionName, versionColor, editStatus]);

  const handleKeyDown = useCallback(
    (_view: any, event: KeyboardEvent) => handleCommandNavigation(event),
    [],
  );

  const editor = useMemo(() => {
    if (!initialContent || !filePermission) return null;

    if (headlessEditor) {
      headlessEditor.destroy();
      setEditor(null);
    }

    let editorInstance = new Editor({
      editable:
        versionIndex == null &&
        (filePermission === FilePermission.EDIT ||
          filePermission === FilePermission.ADMIN ||
          filePermission === FilePermission.SUGGEST ||
          filePermission === FilePermission.COMMENT),
      extensions: [
        ...extensions,
        PermissionsExtension.configure({
          canOnlyComment: filePermission == FilePermission.COMMENT,
        }),
      ],
      onCreate: ({ editor }) => {
        setEditorJson(editor.getJSON());
        if (importData) {
          editor.commands.setContent(importData);
          updateImportData(null);
          editor.commands.focus('start');
        } else {
          if (editor.isEmpty) {
            // editor.commands.setContent(defaultEditorContent);
          }
          editor.commands.focus('end');
        }
      },
      editorProps: {
        // transformPastedHTML: (html: string) => {
        //   const parser = new DOMParser();
        //   const doc = parser.parseFromString(html, 'text/html');
        //   // Return only plain text (optionally you can wrap it in <p> tags)
        //   return doc.body.textContent || '';
        // },
        handleDOMEvents: {
          keydown: (_view, event) => {
            return handleEditorKeydown(_view, event);
          },
          focus: (_view, event) => {
            const editor = (_view.dom as any).editor as Editor;
            handleScenePopup(editor);
          },

          copy: (view, event) => {
            const { from, to } = view.state.selection;
            const slice = view.state.doc.slice(from, to);

            const serializer = DOMSerializer.fromSchema(view.dom.editor.schema);
            const fragment = serializer.serializeFragment(slice.content);

            const temp = document.createElement('div');
            temp.appendChild(fragment);

            const outputContainer = document.createElement('div');
            let flag = false;

            temp.querySelectorAll('.page .body').forEach((bodyEl) => {
              Array.from(bodyEl.childNodes).forEach((node) => {
                flag = true;
                outputContainer.appendChild(node.cloneNode(true));
              });
            });
            if (!flag) {
              outputContainer.appendChild(temp.cloneNode(true));
            }
            const content = outputContainer.innerHTML;
            console.log('content', content);
            event.clipboardData.setData('text/html', content);
            event.clipboardData.setData('text/plain', content);
            event.preventDefault();
            return true;
          },
        },

        handlePaste: (view, event) => {
          function getFirstElementClass(htmlString: string) {
            const wrapperMatch = htmlString.match(
              /^\s*<([a-zA-Z0-9]+)(?:\s+[^>]*)?>([\s\S]*)<\/\1>\s*$/,
            );
            const content = wrapperMatch ? wrapperMatch[2] : htmlString;

            // 2. Now find the very first tag-with-class in that content
            const re = /<\s*([a-zA-Z0-9]+)(?:\s+[^>]*)?class=(["'])(.*?)\2/;
            const m = content.match(re);
            return m ? m[3] : null;
          }
          const html = event.clipboardData?.getData('text/html');
          // const text = event.clipboardData?.getData('text/plain');
          const firstElementClass = getFirstElementClass(html!);

          if (firstElementClass) {
            editor?.commands.updateAttributes('Screenplay', {
              class: firstElementClass,
            });
          }

          return false;
        },

        ...(filePermission == FilePermission.COMMENT && readonlyPlugin),

        // handlePaste: (view, event) => {
        //   return handleImagePaste(view, event, uploadFn);
        // },
        handleDrop: (view, event, _slice, moved) =>
          handleImageDrop(view, event, moved, uploadFn),
        attributes: {
          class: `prose prose-lg dark:prose-invert prose-headings:font-title focus:outline-none max-w-full text-black`,
        },
      },

      onUpdate: ({ editor }) => {
        setSaveStatus('Unsaved');
        setEditor(editor);
        handlePageUpdate(editor);
        setEditorJson(editor.getJSON());
        handleScenePopup(editor);
        handleNestedBody(editor);
      },
      slotAfter: () => {
        return <ImageResizer />;
      },
    });
    setEditor(editorInstance);
    return editorInstance;
  }, [initialContent, filePermission]);

  useEffect(() => {
    if (socket) {
      if (isTyping && !refreshIntervalRef.current) {
        refreshIntervalRef.current = setInterval(() => {
          socket?.emit('updatedVersionHistory');
        }, 5000);
      }
      // If not typing, clear the interval if it exists.
      if (!isTyping && refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    }
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [isTyping, socket]);

  useEffect(() => {
    if (editor && window) {
      //@ts-ignore
      window.screenplay = {
        editor: editor,
      };
    }
  }, [editor]);

  useEffect(() => {
    return () => {
      if (headlessEditor) {
        headlessEditor.destroy();
        setEditor(null);
      }
    };
  }, [headlessEditor]);

  return (
    <EditorRoot
      // key={versionIndex}
      className="relative flex justify-center items-center bg-white h-full rounded-[16px] overflow-hidden px-4"
      id="editor"
    >
      {loading && !initialContent && (
        <div className="min-h-[100dvh] min-w-[100dvh] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse pointer-events-none" />
      )}

      {!loading && initialContent && headlessEditor && (
        <div>
          <EditorContent
            className="relative w-full h-full max-h-[95dvh]"
            // content={initialContent}
            editor={headlessEditor}
            style={{ zoom: `${zoom}%` }}
          />
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <MemoizedCommandList items={suggestionItems} />
          </EditorCommand>
          <ScreenplayBubbleMenu />
          <SuggestionMenu />
          <DialogContainer />
          <TimerUpdater />
          <CelebrationModal />
        </div>
      )}
      <FileImportLoadingModal isOpen={importData} />
    </EditorRoot>
  );
};

export default TiptapEditor;
