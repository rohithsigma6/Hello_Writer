import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc =
  '//cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

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
  private pdfFile: File;
  private metadata: Metadata = {
    Title: 'Unknown Title',
    Author: 'Unknown Author',
  };
  private content: Content[] = [];

  constructor(pdfFile: File) {
    this.pdfFile = pdfFile;
  }

  async parseFile(
    callback: (
      err: Error | null,
      result?: { metadata: Metadata; content: Content[] },
    ) => void,
  ): Promise<void> {
    try {
      const arrayBuffer = await this.pdfFile.arrayBuffer();
      const pdf = await getDocument({ data: new Uint8Array(arrayBuffer) })
        .promise;
      const text = await this.extractTextFromPDF(pdf);

      this.processText(text);
      callback(null, { metadata: this.metadata, content: this.content });
    } catch (err) {
      callback(err instanceof Error ? err : new Error('PDF parsing failed'));
    }
  }

  private async extractTextFromPDF(pdf: PDFDocumentProxy): Promise<string> {
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText += content.items
        .map((item) => ('str' in item ? item.str : ''))
        .join('\n');
    }
    return fullText;
  }

  // Keep the rest of the methods unchanged from original implementation
  private processText(text: string): void {
    const lines: string[] = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    this.extractMetadata(lines);
    this.extractContent(lines);
  }

  private extractMetadata(lines: string[]): void {
    /* Same as original */
  }
  private extractContent(lines: string[]): void {
    /* Same as original */
  }
  private isSceneHeading(line: string): boolean {
    /* Same as original */
  }
  private isCharacterName(line: string): boolean {
    /* Same as original */
  }
  private isParenthetical(line: string): boolean {
    /* Same as original */
  }
  private isDialogue(line: string): boolean {
    /* Same as original */
  }
  private isDualDialogue(lines: string[], index: number): boolean {
    /* Same as original */
  }
  private parseDualDialogue(lines: string[], index: number) {
    /* Same as original */
  }
}

export default PDFParser;
