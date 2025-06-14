import Extractor from './extractor';
import { formatScreenplay } from './format-screenplay';

export const parseFile = async (file: any) => {
  try {
    const extractor = new Extractor(file);

    // Return a new Promise to handle asynchronous parsing
    return new Promise((resolve, reject) => {
      extractor.parseFile((err, parsedData) => {
        if (err) {
          console.error('Error parsing file:', err);
          return reject({ message: 'Error processing the file.' });
        }
        resolve({
          message: 'File received and parsed successfully!',
          parsedData: {
            metadata: parsedData?.metadata,
            ...formatScreenplay(parsedData?.content!),
          },
        });
      });
    });
  } catch (error) {
    throw new Error('Error processing the file: ' + error);
  }
};
