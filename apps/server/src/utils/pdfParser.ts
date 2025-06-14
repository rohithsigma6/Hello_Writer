// // pdfParser.js
// const pdf = require('pdf-parse');

// class PDFParser {
//     constructor(fileBuffer) {
//         this.fileBuffer = fileBuffer;
//         this.metadata = {};
//         this.content = [];
//     }

//     parseFile(callback) {
//         pdf(this.fileBuffer).then(data => {
//             try {
//                 this.processText(data.text);
//                 callback(null, { metadata: this.metadata, content: this.content });
//             } catch (err) {
//                 callback(err);
//             }
//         }).catch(err => {
//             callback(err);
//         });
//     }
//     /**
//      * Processes the extracted text to extract metadata and content.
//      * @param {string} text - The text extracted from the PDF.
//      */
//     processText(text) {
//         // Split text into lines
//         const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

//         // Extract Metadata (Title and Author)
//         this.extractMetadata(lines);

//         // Extract Content
//         this.extractContent(lines);
//     }

//     /**
//      * Extracts metadata (Title and Author) from the text lines.
//      * @param {Array} lines - Array of text lines.
//      */
//     extractMetadata(lines) {
//         // Define known elements to exclude from title and author detection
//         const knownElements = [
//             'CUT TO:',
//             'FADE IN:',
//             'FADE OUT:',
//             'CREDITS START.',
//             'CREDITS END.',
//             'DISSOLVE TO:',
//             'SMASH CUT TO:',
//             'INT.',
//             'EXT.',
//             'INT/EXT.',
//             'DAY',
//             'NIGHT',
//             'MORNING',
//             'EVENING',
//             'LATER',
//         ];
//         const sceneHeadingRegex = /^(INT\.|EXT\.|INT\/EXT\.)/i;
//         const transitionRegex = /^(CUT TO:|FADE IN:|FADE OUT:|DISSOLVE TO:|SMASH CUT TO:)/i;

//         // Attempt to extract Title from the first few lines
//         let titleCandidate = null;
//         for (let i = 0; i < Math.min(lines.length, 10); i++) {
//             const line = lines[i];
//             if (
//                 line.length > 0 &&
//                 line === line.toUpperCase() &&
//                 !knownElements.includes(line) &&
//                 !sceneHeadingRegex.test(line) &&
//                 !transitionRegex.test(line) &&
//                 !/^\d+/.test(line)
//             ) {
//                 titleCandidate = line;
//                 break;
//             }
//         }
//         if (titleCandidate) {
//             this.metadata['Title'] = titleCandidate;
//         }

//         // Attempt to extract Author
//         for (let i = 0; i < lines.length; i++) {
//             const line = lines[i];
//             if (line.toLowerCase() === 'written by' || line.toLowerCase() === 'by') {
//                 // The next non-empty, valid line is considered the author
//                 for (let j = i + 1; j < lines.length; j++) {
//                     const nextLine = lines[j];
//                     if (
//                         nextLine.length > 0 &&
//                         !knownElements.includes(nextLine) &&
//                         !sceneHeadingRegex.test(nextLine) &&
//                         !transitionRegex.test(nextLine) &&
//                         !/^\d+/.test(nextLine)
//                     ) {
//                         this.metadata['Author'] = nextLine;
//                         return;
//                     }
//                 }
//             }
//         }

//         // Assign default values if metadata not found
//         if (!this.metadata['Title']) {
//             this.metadata['Title'] = 'Unknown Title';
//         }
//         if (!this.metadata['Author']) {
//             this.metadata['Author'] = 'Unknown Author';
//         }
//     }

//     /**
//      * Extracts content from the text lines.
//      * @param {Array} lines - Array of text lines.
//      */
//     extractContent(lines) {
//         let i = 0;
//         while (i < lines.length) {
//             const line = lines[i];

//             // Skip over the metadata lines at the top
//             if (i < 5 && (line.toLowerCase() === 'written by' || line.toLowerCase() === 'by' || line === this.metadata['Title'])) {
//                 i++;
//                 continue;
//             }

//             // Detect Scene Headings
//             if (this.isSceneHeading(line)) {
//                 this.content.push({ type: 'Scene Heading', text: line });
//                 i++;
//             }
//             // Detect Dual Dialogue
//             else if (this.isDualDialogue(lines, i)) {
//                 const dualDialogue = this.parseDualDialogue(lines, i);
//                 this.content.push({
//                     type: 'Dual Dialogue',
//                     characters: dualDialogue.characters,
//                     dialogues: dualDialogue.dialogues
//                 });
//                 i = dualDialogue.nextIndex;
//             }
//             // Detect Character Names
//             else if (this.isCharacterName(line)) {
//                 const character = line;
//                 i++;

//                 // Check for possible parenthetical
//                 let parenthetical = '';
//                 if (i < lines.length && this.isParenthetical(lines[i])) {
//                     parenthetical = lines[i];
//                     i++;
//                 }

//                 // Collect Dialogue lines
//                 let dialogue = '';
//                 while (i < lines.length && this.isDialogue(lines[i])) {
//                     dialogue += lines[i] + ' ';
//                     i++;
//                 }

//                 if (parenthetical) {
//                     this.content.push({ type: 'Parenthetical', text: parenthetical });
//                 }

//                 this.content.push({ type: 'Character', text: character });
//                 this.content.push({ type: 'Dialogue', text: dialogue.trim() });
//             }
//             // Action lines
//             else {
//                 let action = line;
//                 i++;
//                 while (i < lines.length && !this.isSceneHeading(lines[i]) && !this.isCharacterName(lines[i])) {
//                     action += ' ' + lines[i];
//                     i++;
//                 }
//                 this.content.push({ type: 'Action', text: action.trim() });
//             }
//         }
//     }

//     isSceneHeading(line) {
//         return /^(INT\.|EXT\.|INT\/EXT\.)/i.test(line);
//     }

//     isCharacterName(line) {
//         return /^[A-Z\s\-()']+$/.test(line) && line === line.toUpperCase() && line.length <= 30;
//     }

//     isParenthetical(line) {
//         return /^\(.*\)$/.test(line);
//     }

//     isDialogue(line) {
//         return line.length > 0 && !this.isSceneHeading(line) && !this.isCharacterName(line) && !this.isParenthetical(line);
//     }

//     isDualDialogue(lines, index) {
//         if (index + 2 < lines.length) {
//             return this.isCharacterName(lines[index]) && this.isCharacterName(lines[index + 1]);
//         }
//         return false;
//     }

//     parseDualDialogue(lines, index) {
//         const characters = [];
//         const dialogues = [];
//         let i = index;

//         // Extract first character and dialogue
//         const character1 = lines[i];
//         i++;

//         let dialogue1 = '';
//         while (i < lines.length && this.isDialogue(lines[i])) {
//             dialogue1 += lines[i] + ' ';
//             i++;
//         }

//         // Extract second character and dialogue
//         if (i < lines.length && this.isCharacterName(lines[i])) {
//             const character2 = lines[i];
//             i++;

//             let dialogue2 = '';
//             while (i < lines.length && this.isDialogue(lines[i])) {
//                 dialogue2 += lines[i] + ' ';
//                 i++;
//             }

//             characters.push(character1, character2);
//             dialogues.push(dialogue1.trim(), dialogue2.trim());
//         } else {
//             // Not a dual dialogue; fallback to normal dialogue
//             characters.push(character1);
//             dialogues.push(dialogue1.trim());
//         }

//         return {
//             characters: characters,
//             dialogues: dialogues,
//             nextIndex: i
//         };
//     }
// }

// module.exports = PDFParser;
// pdfParser.ts
import pdf from "pdf-parse";
import { SceneEntrances, SceneTimes, SceneTransitions } from "./enum";

interface Metadata {
  Title: string;
  Author: string;
}

interface Content {
  type: string;
  text: string;
  characters?: string[];
  dialogues?: string[];
}

class PDFParser {
  private fileBuffer: Buffer;
  private metadata: Metadata = {
    Title: "Unknown Title",
    Author: "Unknown Author",
  };
  private content: any = [];

  constructor(fileBuffer: Buffer) {
    this.fileBuffer = fileBuffer;
  }

  parseFile(
    callback: (
      err: Error | null,
      result?: { metadata: Metadata; content: Content[] }
    ) => void
  ): void {
    pdf(this.fileBuffer)
      .then((data: { text: string }) => {
        try {
          this.processText(data.text);
          callback(null, { metadata: this.metadata, content: this.content });
        } catch (err) {
          callback(err instanceof Error ? err : new Error("Unknown error"));
        }
      })
      .catch((err: Error) => {
        callback(err);
      });
  }

  /**
   * Processes the extracted text to extract metadata and content.
   * @param {string} text - The text extracted from the PDF.
   */
  private processText(text: string): void {
    const lines: string[] = text
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0);

    this.extractMetadata(lines);
    this.extractContent(lines);
  }

  /**
   * Extracts metadata (Title and Author) from the text lines.
   * @param {string[]} lines - Array of text lines.
   */
  private extractMetadata(lines: string[]): void {
    const knownElements = [
      ...SceneEntrances,
      ...SceneTimes,
      ...SceneTransitions,
    ];

    const sceneHeadingRegex = /^(INT\.|EXT\.|INT\/EXT\.)/i;
    const transitionRegex =
      /^(CUT TO:|FADE IN:|FADE OUT:|DISSOLVE TO:|SMASH CUT TO:)/i;

    let titleCandidate: string | null = null;
    for (let i = 0; i < Math.min(lines.length, 10); i++) {
      const line = lines[i];
      if (
        line.length > 0 &&
        line === line.toUpperCase() &&
        !knownElements.includes(line) &&
        !sceneHeadingRegex.test(line) &&
        !transitionRegex.test(line) &&
        !/^\d+/.test(line)
      ) {
        titleCandidate = line;
        break;
      }
    }

    if (titleCandidate) {
      this.metadata.Title = titleCandidate;
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.toLowerCase() === "written by" || line.toLowerCase() === "by") {
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j];
          if (
            nextLine.length > 0 &&
            !knownElements.includes(nextLine) &&
            !sceneHeadingRegex.test(nextLine) &&
            !transitionRegex.test(nextLine) &&
            !/^\d+/.test(nextLine)
          ) {
            this.metadata.Author = nextLine;
            return;
          }
        }
      }
    }
  }

  /**
   * Extracts content from the text lines.
   * @param {string[]} lines - Array of text lines.
   */
  private extractContent(lines: string[]): void {
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      // NOTE: Commenting it to fix dual dialogue
      //   if (
      //     i < 5 &&
      //     (line.toLowerCase() === "written by" ||
      //       line.toLowerCase() === "by" ||
      //       line === this.metadata.Title)
      //   ) {
      //     i++;
      //     continue;
      //   }

      if (this.isSceneHeading(line)) {
        this.content.push({ type: "Scene Heading", text: line });
        i++;
      } else if (this.isDualDialogue(lines, i)) {
        const dualDialogue = this.parseDualDialogue(lines, i);
        this.content.push({
          type: "DualDialogue",
          characters: dualDialogue.characters,
          dialogues: dualDialogue.dialogues,
        });
        i = dualDialogue.nextIndex;
      } else if (this.isCharacterName(line)) {
        const character = line;
        i++;

        let parenthetical = "";
        if (i < lines.length && this.isParenthetical(lines[i])) {
          parenthetical = lines[i];
          i++;
        }

        let dialogue = "";
        while (i < lines.length && this.isDialogue(lines[i])) {
          dialogue += lines[i] + " ";
          i++;
        }

        if (parenthetical) {
          this.content.push({ type: "Parenthetical", text: parenthetical });
        }

        this.content.push({ type: "Character", text: character });
        this.content.push({ type: "Dialogue", text: dialogue.trim() });
      } else {
        let action = line;
        i++;
        while (
          i < lines.length &&
          !this.isSceneHeading(lines[i]) &&
          !this.isCharacterName(lines[i])
        ) {
          action += " " + lines[i];
          i++;
        }
        this.content.push({ type: "Action", text: action.trim() });
      }
    }
  }

  private isSceneHeading(line: string): boolean {
    return /^(INT\.|EXT\.|INT\/EXT\.)/i.test(line);
  }

  private isCharacterName(line: string): boolean {
    return (
      /^[A-Z\s\-()']+$/.test(line) &&
      line === line.toUpperCase() &&
      line.length <= 30
    );
  }

  private isParenthetical(line: string): boolean {
    return /^\(.*\)$/.test(line);
  }

  private isDialogue(line: string): boolean {
    if (!line) return null;
    return (
      line.length > 0 &&
      !this.isSceneHeading(line) &&
      !this.isCharacterName(line) &&
      !this.isParenthetical(line)
    );
  }

  private isDualDialogue(lines: string[], index: number): boolean {
    return (
      index + 3 < lines.length &&
      this.isCharacterName(lines[index]) &&
      this.isDialogue(lines[index + 1]) &&
      this.isCharacterName(lines[index + 2]) &&
      this.isDialogue(lines[index + 3])
    );
  }

  private parseDualDialogue(lines: string[], index: number) {
    const characters: string[] = [];
    const dialogues: string[] = [];
    let i = index;

    const character1 = lines[i];
    i++;

    let dialogue1 = "";
    while (i < lines.length && this.isDialogue(lines[i])) {
      dialogue1 += lines[i] + " ";
      i++;
    }

    if (i < lines.length && this.isCharacterName(lines[i])) {
      const character2 = lines[i];
      i++;

      let dialogue2 = "";
      while (i < lines.length && this.isDialogue(lines[i])) {
        dialogue2 += lines[i] + " ";
        i++;
      }

      characters.push(character1, character2);
      dialogues.push(dialogue1.trim(), dialogue2.trim());
    } else {
      characters.push(character1);
      dialogues.push(dialogue1.trim());
    }

    return {
      characters,
      dialogues,
      nextIndex: i,
    };
  }
}

export default PDFParser;
