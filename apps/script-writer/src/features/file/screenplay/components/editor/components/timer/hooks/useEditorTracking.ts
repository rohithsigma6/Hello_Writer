import { useEffect, useRef } from 'react';

export const useEditorTracking = (
    editor: any,
    isActive: boolean,
    updateWords: (text: string) => void,
    updatePages: (count: number) => void
) => {
    const isWritingRef = useRef(false);
    const lastActivityTimeRef = useRef(Date.now());

    useEffect(() => {
        if (!editor || !isActive) return;

        const handleUpdate = () => {
            isWritingRef.current = true;
            lastActivityTimeRef.current = Date.now();

            const plainText = editor?.getText() || '';
            const content = editor?.getJSON()?.content || [];
            updateWords(plainText);
            updatePages(content.length);
        };

        editor.on('update', handleUpdate);
        return () => {
            editor.off('update', handleUpdate);
        };
    }, [editor, isActive]);

    return { isWritingRef, lastActivityTimeRef };
};
