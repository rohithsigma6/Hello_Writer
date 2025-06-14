
import { Command, createSuggestionItems, renderItems } from "@screenplay-ink/editor";

export const suggestionItems = createSuggestionItems([
  {
    title: "I/E.",
    description: "",
    searchTerms: ["p", "paragraph"],
    icon: <></>,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("I/E.")
        .run();
    },
  }, {
    title: "Int.",
    description: "",
    searchTerms: ["p", "paragraph"],
    icon: <></>,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("Int.")
        .run();
    },
  }, {
    title: "Ext.",
    description: "",
    searchTerms: ["p", "paragraph"],
    icon: <></>,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("Ext.")
        .run();
    },
  }, {
    title: "E/I.",
    description: "",
    searchTerms: ["p", "paragraph"],
    icon: <></>,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("E/I.")
        .run();
    },
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
