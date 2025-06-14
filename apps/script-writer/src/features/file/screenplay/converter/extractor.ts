import FinalDraft from './final-draft';
import PDFParser from './pdf-parser';

interface BrowserFile extends File {
  name: string;
}

interface ParsedData {
  metadata: any;
  content: any[];
}

class Extractor {
  private file: BrowserFile;
  private metadata: any;
  private content: any[];

  constructor(file: BrowserFile) {
    this.file = file;
    this.metadata = {};
    this.content = [];
  }

  parseFile(
    callback: (
      err: Error | null,
      result?: { metadata: any; content: any[] },
    ) => void,
  ): void {
    try {
      const ext = this.file.name.split('.').pop()?.toLowerCase();

      // Handle FinalDraft files (.fdx)
      if (ext === 'fdx') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const parser = new FinalDraft(e.target?.result as string);
            parser.parseFile((err, parsedData) => {
              if (err) return callback(err);
              this.metadata = parsedData.metadata;
              this.content = parsedData.content;
              callback(null, {
                metadata: this.metadata,
                content: this.content,
              });
            });
          } catch (error) {
            callback(
              error instanceof Error ? error : new Error('FDX parsing error'),
            );
          }
        };
        reader.onerror = () => callback(new Error('File reading failed'));
        reader.readAsText(this.file);

        // Handle PDF files (.pdf)
      } else if (ext === 'pdf') {
        const parser = new PDFParser(this.file);
        parser.parseFile((err, parsedData) => {
          if (err) return callback(err);
          this.metadata = parsedData.metadata;
          this.content = parsedData.content;
          callback(null, { metadata: this.metadata, content: this.content });
        });

        // Handle unsupported file types
      } else {
        callback(new Error('Unsupported file type'));
      }
    } catch (error) {
      callback(error instanceof Error ? error : new Error('Unexpected error'));
    }
  }
}

export default Extractor;
