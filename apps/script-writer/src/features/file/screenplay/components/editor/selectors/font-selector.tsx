import { editorSelectors, useEditorStore } from '@/store/editor';
import React, { useState, useEffect } from 'react';

export const fonts = [
  { family: 'courier-regular', name: 'Courier Regular' },
  { family: 'courier-bold', name: 'Courier Bold' },
  { family: 'courier-bold-italic', name: 'Courier Bold Italic' },
  { family: 'courier-regular-italic', name: 'Courier Regular Italic' },
  // { family: 'draft-regular' },
];

export const FontSelector = () => {
  const editor = useEditorStore(editorSelectors.editor);
  const [selectedFont, setSelectedFont] = useState(fonts[0].family);

  // Sync selected font with the editor on selection updates
  useEffect(() => {
    if (editor) {
      const updateFontFromSelection = () => {
        // Adjust the attribute key as needed depending on your editor’s API.
        const currentFont = editor.getAttributes('textStyle')?.fontFamily;
        if (currentFont && fonts.some((font) => font.family === currentFont)) {
          setSelectedFont(currentFont);
        } else {
          // Fall back to the default font from the fonts array if no valid font is found
          setSelectedFont(fonts[0].family);
        }
      };

      // Subscribe to selection changes in the editor
      editor.on('selectionUpdate', updateFontFromSelection);
      // Initial update
      updateFontFromSelection();

      return () => {
        editor.off('selectionUpdate', updateFontFromSelection);
      };
    }
  }, [editor]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fontFamily = e.target.value;
    if (editor) {
      if (fontFamily === '') {
        editor.chain().focus().unsetFontFamily().run();
        setSelectedFont(fonts[0].family);
      } else {
        editor.chain().focus().setFontFamily(fontFamily).run();
        setSelectedFont(fontFamily);
      }
    }
  };

  return (
    <select
      value={selectedFont}
      onChange={handleChange}
      className="text-xs border border-gray-300 rounded m-1 shadow-sm 
                 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                 transition duration-150 ease-in-out min-w-[45px] max-w-[80px] truncate"
      style={{ fontFamily: selectedFont }}
    >
      {fonts.map((font) => (
        <option
          key={font.family}
          value={font.family}
          style={{ fontFamily: font.family }}
          className='text-start'
        >
          {font.name}
        </option>
      ))}
    </select>
  );
};

export default FontSelector;
