// const path = require('path');
// const FinalDraft = require('./finalDraft');
// const PDFParser = require('./pdfParser');

// class Extractor {
//     constructor(file) {
//         this.file = file;
//         this.metadata = {};
//         this.content = [];
//     }

//     parseFile(callback) {
//         const ext = path.extname(this.file.originalname).toLowerCase();
//         if (ext === '.fdx') {
//             const parser = new FinalDraft(this.file.buffer);
//             parser.parseFile((err, parsedData) => {
//                 if (err) {
//                     return callback(err);
//                 }
//                 this.metadata = parsedData.metadata;
//                 this.content = parsedData.content;
//                 callback(null, { metadata: this.metadata, content: this.content });
//             });
//         } else if (ext === '.pdf') {
//             const parser = new PDFParser(this.file.buffer);
//             parser.parseFile((err, parsedData) => {
//                 if (err) {
//                     return callback(err);
//                 }
//                 this.metadata = parsedData.metadata;
//                 this.content = parsedData.content;
//                 callback(null, { metadata: this.metadata, content: this.content });
//             });
//         } else {
//             callback(new Error('Unsupported file type.'));
//         }
//     }
// }

// module.exports = Extractor;
import path from 'path';
import PDFParser from './pdfParser';
import FinalDraft from './FinalDraft';

// Define a type for the file parameter to ensure it's type-safe
interface File {
    originalname: string;
    buffer: Buffer;
}

interface ParsedData {
    metadata: any;
    content: any[];
}

class Extractor {
    private file: File;
    private metadata: any;
    private content: any[];

    constructor(file: File) {
        this.file = file;
        this.metadata = {};
        this.content = [];
    }

    parseFile(callback: (err: Error | null, result?: { metadata: any, content: any[] }) => void): void {
        try {
            const ext = path.extname(this.file.originalname).toLowerCase();

            // Handle FinalDraft files (.fdx)
            if (ext === '.fdx') {
                const parser: any = new FinalDraft(this.file.buffer);
                parser.parseFile((err: Error, parsedData: ParsedData) => {
                    if (err) {
                        return callback(err);
                    }
                    this.metadata = parsedData.metadata;
                    this.content = parsedData.content;
                    return callback(null, { metadata: this.metadata, content: this.content });
                });

                // Handle PDF files (.pdf)
            } else if (ext === '.pdf') {
                const parser: any = new PDFParser(this.file.buffer);
                parser.parseFile((err: Error, parsedData: ParsedData) => {
                    if (err) {
                        return callback(err);
                    }
                    this.metadata = parsedData.metadata;
                    this.content = parsedData.content;
                    return callback(null, { metadata: this.metadata, content: this.content });
                });

                // Handle unsupported file types
            } else {
                return callback(new Error('Unsupported file type.'));
            }
        } catch (error) {
            return callback(error instanceof Error ? error : new Error('An unexpected error occurred.'));
        }
    }
}

export default Extractor;
