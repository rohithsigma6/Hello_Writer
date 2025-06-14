import { Button } from '@/components/ui/button';
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { cn } from '../../../lib/utils';
import { Check, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/bubble-menu-items.module.css';
import { RiLink } from 'react-icons/ri';
import { editorSelectors, useEditorStore } from '@/store/editor';
export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (_e) {
    return false;
  }
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString();
    }
  } catch (_e) {
    return null;
  }
}

export const LinkSelector = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const  editor = useEditorStore(editorSelectors.editor);
  const [open, setIsOpen] = useState(false);

  // Autofocus the input when the popover opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!editor) return null;

  const handleAddLink = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Access the input by its name attribute.
    const editorLinkElement = (event.target as HTMLFormElement)
      .input_editor_link;
    const href = editorLinkElement.value;

    // Validate that the link begins with http:// or https://.
    if (/^https?:\/\//.test(href)) {
      // Toggle the link mark (adds if not present, removes if already active).
      editor.commands.toggleLink({ href });
      setIsOpen(false);
    } else {
      // Optionally, try to parse the URL if it doesn't start with http/https.
      const url = getUrlFromString(href);
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
        setIsOpen(false);
      }
    }
  };

  return (
    <Popover modal={true} open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div     className={`${styles.style_btn} min-w-8 min-h-8`}>
          <RiLink
            className={cn(' ', {
              'text-blue-500': editor.isActive('link'),
            })}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-60 p-0 fixed z-[9999]"
        sideOffset={10}
      >
        <form onSubmit={handleAddLink} className="flex p-1 border rounded-sm">
          <input
            ref={inputRef}
            name="input_editor_link"
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-background p-1 text-sm outline-none"
            defaultValue={editor.getAttributes('link').href || ''}
          />
          {editor.getAttributes('link').href ? (
            <Button
              size="icon"
              variant="outline"
              type="button"
              className="flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:border-red-700"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                if (inputRef.current) inputRef.current.value = '';
                setIsOpen(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="icon" type="submit" className="h-8">
              <Check className="h-4 w-4" />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};
