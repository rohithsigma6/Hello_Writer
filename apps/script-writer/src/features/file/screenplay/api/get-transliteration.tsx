import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import axios from 'axios';

// Utility function remains the same
function sanitizeText(input: string) {
  return input.replace(/,/g, '');
}

// Transliteration API call with chunking
export const getTransliteration = async (
  text: string,
  fromLang = 'hi',
  toLang: string,
): Promise<string> => {
  const sanitizedText = sanitizeText(text);
  const chunkSize = 100;
  const chunks =
    sanitizedText.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  const transliteratedChunks: string[] = [];

  for (const chunk of chunks) {
    const response = await axios.get(
      `https://www.google.com/inputtools/request?ime=transliteration_${fromLang}_${toLang}&num=1&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${sanitizeText(chunk)}`,
    );
    transliteratedChunks.push(response.data[1][0][1][0]);
  }

  return transliteratedChunks.join(' ');
};

export const getTransliterationQueryOptions = (
  text: string,
  fromLang = 'en',
  toLang: string,
) => {
  return queryOptions({
    queryKey: ['transliteration', text, toLang],
    queryFn: () => getTransliteration(text, fromLang, toLang),
    staleTime: 0,
    gcTime: 0,
    enabled: !!text,
  });
};

type UseTransliterationOptions = {
  text: string;
  fromLang?: string;
  toLang: string;
  queryConfig?: QueryConfig<typeof getTransliterationQueryOptions>;
};

// Hook with loading state management
export const useTransliteration = ({
  text,
  fromLang = 'en',
  toLang,
  queryConfig = {},
}: UseTransliterationOptions) => {
  return useQuery({
    ...getTransliterationQueryOptions(text, fromLang, toLang),
    ...queryConfig,
    placeholderData: (previousData) => previousData,
  });
};
