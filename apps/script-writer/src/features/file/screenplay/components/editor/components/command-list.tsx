import { EditorCommandItem, EditorCommandList } from "@screenplay-ink/editor";
import React from "react";
import { suggestionItems } from "../slash-command";

const MemoizedCommandList = React.memo(
    ({ items }: { items: typeof suggestionItems }) => (
      <EditorCommandList>
        {items.map((item) => (
          <EditorCommandItem
            key={item.title}
            value={item.title}
            onCommand={(val) => item.command(val)}
            className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
              {item.icon}
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </EditorCommandItem>
        ))}
      </EditorCommandList>
    ),
  );
  
  export default MemoizedCommandList;