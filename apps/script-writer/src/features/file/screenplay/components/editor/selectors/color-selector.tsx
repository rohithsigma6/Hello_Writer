import { editorSelectors, useEditorStore } from '@/store/editor';
import { cn } from '@/utils/cn';

export const ColorSelector = () => {
  const editor = useEditorStore(editorSelectors.editor);
  if (!editor) return null;

  const textStyleAttributesColor =
    editor.getAttributes('textStyle')?.color || {};
  let currentColor = 'black'; // default color

  if (typeof textStyleAttributesColor == 'string') {
    currentColor = textStyleAttributesColor;
  }

  const isActive = !!textStyleAttributesColor;

  return (
    <div className="flex flex-col justify-center items-center px-2 cursor-pointer bg-[#f5f5f5] relative">
      <p className={cn('text-sm')} style={{ color: currentColor }}>
        A
      </p>

      <div
        style={{ backgroundColor: currentColor }}
        className="h-[2px] w-[20px] rounded-[2px] mt-1"
      />

      <input
        id="color-picker"
        className="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
        type="color"
        onChange={(event) => {
          const target = event.target as HTMLInputElement;
          const newColor = target.value;
          editor && editor.chain().focus().setColor(newColor).run();
        }}
        value={currentColor}
        data-testid="setColor"
      />
    </div>
  );
};
