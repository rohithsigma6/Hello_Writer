import { useQuery, queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { DraftThemeData } from '@/types/api';

// Fetch a single draft theme by ID
export const getDraftTheme = async (id: string): Promise<DraftThemeData> => {
  return api.get(`api/co-writer/theme/${id}`);
};

// Query options for fetching a draft theme
export const getDraftThemeQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['draft-theme', id], // Cache key ensures data is correctly stored
    queryFn: () => getDraftTheme(id),
    enabled: !!id, // Prevents execution if ID is undefined/null
  });
};

type UseDraftThemeOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getDraftThemeQueryOptions>;
};

// React Query Hook
export const useDraftTheme = ({ id, queryConfig = {} }: UseDraftThemeOptions) => {
  return useQuery<DraftThemeData>({
    ...getDraftThemeQueryOptions(id),
  });
};
