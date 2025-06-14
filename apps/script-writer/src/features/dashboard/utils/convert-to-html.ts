import axios from 'axios';
import { api } from '@/lib/api-client';
import jsonToHtml from './json-to-html';

type SupportedFileExtensions = 'pdf' | 'fdx';

const lambdaUrls: Record<SupportedFileExtensions, string> = {
  pdf: 'https://nvxbv7bljggmms6gqymj5p3oei0ufpbf.lambda-url.ap-south-1.on.aws',
  fdx: 'https://g0q2z0yd83.execute-api.ap-south-1.amazonaws.com/default/XamlConverter',
};

const getFileExtension = (
  fileName: string,
): SupportedFileExtensions | undefined => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === 'pdf' || ext === 'fdx') {
    return ext;
  }
  return undefined;
};

// Function to get the base name without extension
const getBaseName = (fileName: string): string => {
  return fileName.split('.').slice(0, -1).join('.');
};

export const convertToHtml = async ({ file }: any) => {
  const fileExtension = getFileExtension(file.name);
  if (!fileExtension || !lambdaUrls[fileExtension]) {
    throw new Error(`Unsupported file type: ${fileExtension}`);
  }

  const resp = await api.get(`/aws/getUrl/${file.name}`);
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: file,
  };
  await fetch(resp.data.url, requestOptions);

  let response;

  if (fileExtension === 'fdx') {
    // Special handling for .fdx files
    const baseName = getBaseName(file.name); // Get the base name without extension
    console.log('Sending file base name as Message:', baseName); // Debug log

    response = await axios.post(
      lambdaUrls[fileExtension],
      {
        Message: baseName, // Sends the base name as the Message
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'BaCFVM8lmh98k84kZggBj2M2eFsv4RrO5Eiynx96',
        },
      },
    );
  } else {
    // Default handling for .pdf files
    response = await api.post(lambdaUrls[fileExtension], {
      body: { s3key: file.name },
    });
  }

  const html = jsonToHtml(response.data);
  return html;
};
