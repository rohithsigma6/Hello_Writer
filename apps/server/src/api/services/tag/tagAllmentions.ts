import { handleTag } from "../../controllers/tag.controller";

interface CustomMarkAttrs {
  color: string;
  categoryId: string;
  notes: string;
  name: string;
  _id?: string;
  [key: string]: any;
}

interface Mark {
  type: string;
  attrs?: CustomMarkAttrs;
}

interface TextNode {
  type: "text";
  text: string;
  marks?: Mark[];
}

interface ContentNode {
  type: string;
  content?: (ContentNode | TextNode)[];
  [key: string]: any;
}

export interface DocumentNode {
  type: "doc";
  content: ContentNode[];
}

interface MatchOptions {
  caseSensitive?: boolean;
  wholeWord?: boolean;
}

interface MatchPosition {
  start: number;
  end: number;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function addCustomMark(
  doc: DocumentNode,
  word: string,
  customMarkAttrs: CustomMarkAttrs,
  options: MatchOptions = {},
  dbInfo: {
    fileId: string;
    sceneId: string;
    userId: string;
  }
): Promise<DocumentNode | ContentNode> {
  const { caseSensitive = false, wholeWord = false } = options;

  // Prepare word matching function
  const matchWord = (text: string) => {
    const searchText = caseSensitive ? text : text.toLowerCase();
    const searchWord = caseSensitive ? word : word.toLowerCase();

    let returnValue;
    if (wholeWord) {
      const regex = new RegExp(`\\b${escapeRegExp(searchWord)}\\b`, "g");
      returnValue = regex.test(searchText);
      return returnValue;
    }
    returnValue = searchText.includes(searchWord);
    return returnValue;
  };

  // Async function to process each node and handle marks
  const processNode = async (
    node: ContentNode | TextNode
  ): Promise<ContentNode | TextNode> => {
    // Deep clone to avoid mutation
    const processedNode = JSON.parse(JSON.stringify(node));
    // console.log("🚀 ~ processedNode76 :", processedNode);

    // Process text nodes
    if (processedNode.type === "text" && matchWord(processedNode.text)) {
      const searchText = caseSensitive
        ? processedNode.text
        : processedNode.text.toLowerCase();
      const searchWord = caseSensitive ? word : word.toLowerCase();
      const regex = new RegExp(`\\b${escapeRegExp(searchWord)}\\b`, "g");
      let resultText: any = [];
      const matches = [...searchText.matchAll(regex)];
      let lastIndex = 0;
      for (const match of matches) {
        const index = match.index;

        // Add text before the match
        if (index > lastIndex) {
          resultText.push({
            type: "text",
            text: processedNode.text.slice(lastIndex, index),
          });
        }

        const tag = await handleTag({
          searchParams: {
            fileId: dbInfo.fileId,
            categoryId: customMarkAttrs.categoryId,
            name: customMarkAttrs.name,
          },
          sceneId: dbInfo.sceneId,
          updateOptions: {
            userId: dbInfo.userId,
          },
        });
        customMarkAttrs["_id"] = tag?._id?.toString();
        // Add matched text with custom mark
        resultText.push({
          type: "text",
          text: processedNode.text.slice(index, index + searchWord.length),
          marks: [
            {
              type: "CustomTag",
              attrs: customMarkAttrs,
            },
          ],
        });

        lastIndex = index + searchWord.length;
      }

      // Add remaining text after last match
      if (lastIndex < processedNode.text.length) {
        resultText.push({
          type: "text",
          text: processedNode.text.slice(lastIndex),
        });
      }

      return resultText.length > 1 ? resultText : resultText[0];
    }

    // Recursively process nested content (if any)
    // Recursively process nested content (if any)
    if ("content" in processedNode) {
      if (Array.isArray(processedNode.content)) {
        const flattenedContent: any = [];
        for (const childNode of processedNode.content) {
          const processedChild = await processNode(childNode);
          if (Array.isArray(processedChild)) {
            flattenedContent.push(...processedChild); // Flatten the result
          } else {
            flattenedContent.push(processedChild); // Directly add if not an array
          }
        }
        processedNode.content = flattenedContent; // Flatten the nested content
      }
    }

    return processedNode;
  };

  // Process the entire document asynchronously
  const processedDoc = await processNode(doc);
  // console.log("🚀 ~ processedDoc:", processedDoc)
  return processedDoc as DocumentNode;
}

//   // Example usage
//   const tiptapJson: DocumentNode = {
//     type: "doc",
//     content: [
//       {
//         type: "paragraph",
//         content: [
//           {
//             type: "text",
//             text: "JSON is an amazing data format for storing JSON-like data."
//           }
//         ]
//       }
//     ]
//   };

//   const customMarkAttrs: CustomMarkAttrs = {
//     color: "#FF0000",
//     categoryId: "category123",
//     notes: "Important tag",
//     name: "JSON",
//     _id: "unique123"
//   };

//   const updatedJson = addCustomMark(
//     tiptapJson,
//     "JSON",
//     customMarkAttrs,
//     {
//       caseSensitive: false,
//       wholeWord: true
//     }
//   );
