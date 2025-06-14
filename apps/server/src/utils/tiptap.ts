// import * as Y from "yjs";
// import { Editor } from "@tiptap/core";
// import Collaboration from "@tiptap/extension-collaboration";
// import BubbleMenu from "@tiptap/extension-bubble-menu";
// import CommentExtension from "@sereneinserenade/tiptap-comment-extension";
// import { FontFamily } from "@tiptap/extension-font-family";
// import { cx } from "class-variance-authority";
// import {
//   Color,
//   HighlightExtension,
//   StarterKit,
//   TextStyle,
//   TiptapLink,
//   TiptapUnderline,
//   Screenplay,
//   ScenePopupExtension,
//   MainPopupExtension,
//   Pagination,
//   PageNode,
// } from "@screenplay-ink/editor";
// const tiptapLink = TiptapLink.configure({
//   HTMLAttributes: {
//     class: "text-blue-600 cursor-pointer",
//   },
// });

// const starterKit = StarterKit.configure({
//   bulletList: {
//     HTMLAttributes: {
//       class: cx("list-disc list-outside leading-3 -mt-2"),
//     },
//   },
//   orderedList: {
//     HTMLAttributes: {
//       class: cx("list-decimal list-outside leading-3 -mt-2"),
//     },
//   },
//   listItem: {
//     HTMLAttributes: {
//       class: cx("leading-normal -mb-2"),
//     },
//   },
//   blockquote: {
//     HTMLAttributes: {
//       class: cx("border-l-4 border-primary"),
//     },
//   },
//   codeBlock: {
//     HTMLAttributes: {
//       class: cx(
//         "rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium"
//       ),
//     },
//   },
//   code: {
//     HTMLAttributes: {
//       class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
//       spellcheck: "false",
//     },
//   },
//   horizontalRule: false,
//   dropcursor: {
//     color: "#DBEAFE",
//     width: 4,
//   },
//   gapcursor: false,
// });

// const screenplay = Screenplay.configure({
//   HTMLAttributes: {
//     class: "screenplay-works",
//   },
// });

// const comment = CommentExtension.configure({
//   HTMLAttributes: {
//     class: "my-comment",
//   },
// });

// const extensions = [
//   screenplay,
//   starterKit,
//   ScenePopupExtension,
//   MainPopupExtension,

//   tiptapLink,

//   TiptapUnderline,

//   HighlightExtension,
//   TextStyle,
//   Color,
//   BubbleMenu,
//   Pagination,
//   PageNode,
//   FontFamily,
//   comment,
// ];

// function modifyFirstTextNode(document, newText) {
//   if (document.type !== "doc" || !Array.isArray(document.content)) {
//     console.error("Invalid document structure");
//     return document;
//   }

//   // Loop through the top-level nodes
//   for (const node of document.content) {
//     // Look for a paragraph node
//     if (node.type === "paragraph" && Array.isArray(node.content)) {
//       // Loop through the paragraph's children
//       for (const child of node.content) {
//         // Find the first text node
//         if (child.type === "text") {
//           child.text = newText;
//           return document; // Modify only the first encountered text node
//         }
//       }
//     }
//   }
//   return document;
// }

// export function roundTripBuffer(buffer: Uint8Array) {
//   const ydoc = new Y.Doc();

//   Y.applyUpdate(ydoc, new Uint8Array(buffer));

//   ydoc.getXmlFragment("prosemirror");

//   const editor = new Editor({
//     extensions: [
//       ...extensions,
//       Collaboration.configure({
//         document: ydoc,
//       }),
//     ],
//     content: "",
//   });

//   let json = editor.getJSON();
//   console.dir(json, { depth: null });
//   //@ts-ignore
//   json = modifyFirstTextNode(json, "Modified Text");
//   editor.destroy();
//   return convertProsemirrorJSONToYjsBuffer(json);
// }

// function convertProsemirrorJSONToYjsBuffer(json: any): Uint8Array {
//   const ydoc = new Y.Doc();

//   ydoc.getXmlFragment("prosemirror");

//   const editor = new Editor({
//     extensions: [
//       ...extensions,
//       Collaboration.configure({
//         document: ydoc,
//       }),
//     ],
//     content: "",
//   });

//   editor.commands.setContent(json);

//   const updatedBuffer = Y.encodeStateAsUpdate(ydoc);

//   editor.destroy();

//   return updatedBuffer;
// }
