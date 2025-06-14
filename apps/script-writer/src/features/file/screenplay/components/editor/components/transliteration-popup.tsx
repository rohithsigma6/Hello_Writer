import { editorSelectors, useEditorStore } from '@/store/editor';
import { Editor } from '@tiptap/react';
import React, { useEffect, useRef, useState } from 'react';
import { ActionKeys, ReactTransliteration } from 'react-transliteration';
import { useTransliteration } from '../../../api/get-transliteration';
import * as Dialog from '@radix-ui/react-dialog';
import { useSnackbar } from 'notistack';

const getSelectedText = (editor: Editor) => {
  if (editor?.state) {
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, ' ');

    return selectedText.trim();
  } else {
    return '';
  }
};

const TransliterationPopup = () => {
  const editor = useEditorStore(editorSelectors.editor);
  const isPopupOpen = useEditorStore(
    editorSelectors.isTransliterationPopupOpen,
  );
  const toLang = useEditorStore(editorSelectors.transliterationLanguage);
  const popupToggle = useEditorStore.getState().toggleTransliterationPopup;
  const [selection, setSelection] = useState('');
  const [transLang, setTransLang] = useState(['en', toLang.value]);
  const { data, isLoading, isError, refetch } = useTransliteration({
    text: selection!,
    toLang: transLang[1],
    fromLang: transLang[0],
  });

  const [value, setValue] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleChanges = () => {
    if (!editor) {
      return;
    }
    editor
      .chain()
      .focus()
      .deleteSelection()
      .insertContent({ type: 'text', text: textRef?.current?.value })
      .run();
    popupToggle();
  };

  useEffect(() => {
    if (data) {
      setValue(data);
    }
  }, [data]);

  useEffect(() => {
    if (editor?.state) {
      setSelection(getSelectedText(editor)!);
    }
  }, [editor?.state]);

  useEffect(() => {
    if (selection) {
      refetch();
    }
  }, [toLang.value, selection, value, isPopupOpen, textRef, transLang]);

  useEffect(() => {
    if (toLang.value) {
      setTransLang(['en', toLang.value]);
    }
  }, [toLang.value]);

  useEffect(() => {
    if (textRef?.current) {
      textRef.current?.focus();
    }
  }, [textRef?.current, isPopupOpen]);

  useEffect(() => {
    if (!isPopupOpen) {
      setValue('');
      setSelection('');
    }
  }, [isPopupOpen]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  }, [isError]);
  return (
    <Dialog.Root open={isPopupOpen} onOpenChange={popupToggle}>
      <Dialog.Trigger hidden asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Open Dialog
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full p-6 rounded-lg transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-[101]">
          <Dialog.Title hidden></Dialog.Title>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-[800px]">
              <h2 className="text-xl font-bold mb-4">Transliteration</h2>
              <hr className="mb-6" />

              <div className="mb-6">
                <label
                  className="block text-sm font-bold mb-2 tracking-wider"
                  htmlFor="title"
                >
                  Edit your text here
                </label>

                {/* @TODO implement transliteration library */}
                <button
                  onClick={() => {
                    setSelection(value);
                    if (transLang[0] == 'en') {
                      setTransLang([toLang.value, 'en']);
                      return;
                    }
                    setTransLang(['en', toLang.value]);
                  }}
                >
                  {`Switch to ${[transLang[0]]}`}
                </button>
                {!isLoading && (
                  <ReactTransliteration
                    autoFocus
                    text={value}
                    onChangeText={(t: string) => setValue(t)}
                    textRef={textRef}
                    keys={[ActionKeys.KEY_ENTER, ActionKeys.KEY_SPACE]}
                    enabled={true}
                    language={
                      transLang[1] === 'en' ? 'en' : toLang.value || 'en'
                    }
                    suggestionDivStyle={{
                      textAlign: 'center',
                    }}
                    activeItemStyle={{
                      minWidth: '70px',
                      minHeight: '40px',
                      display: 'grid',
                      cursor: 'pointer',
                      placeItems: 'center',
                      backgroundColor: '#653fff',
                    }}
                    placeholder="Your translitered text will show here..."
                    textAreaStyle={{ padding: '8px', height: '200px' }}
                    attr={{
                      name: 'text',
                      className:
                        'bg-whiteBackground dark:bg-blackBackground border rounded-md dark:border-borderColor',
                    }}
                  />
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={popupToggle}
                  type="button"
                  className="px-6 py-3 w-48 text-[#9999A0] bg-transparent border border-[#9999A0] rounded-lg text-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChanges}
                  className="px-6 py-3 w-48 text-white bg-[#653EFF] rounded-lg text-lg"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default React.memo(TransliterationPopup);
