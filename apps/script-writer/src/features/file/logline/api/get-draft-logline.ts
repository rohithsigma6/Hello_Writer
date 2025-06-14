import { useQuery, queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { DraftLoglineData } from '@/types/api';

// Fetch a single draft logline by ID
export const getDraftLogline = async (id: string): Promise<DraftLoglineData> => {
  return api.get(`api/co-writer/logline/${id}`);
};

// Query options for fetching a draft logline
export const getDraftLoglineQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['draft-logline', id], // Cache key ensures data is correctly stored
    queryFn: () => getDraftLogline(id),
    enabled: !!id, // Prevents execution if ID is undefined/null
  });
};

type UseDraftLoglineOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getDraftLoglineQueryOptions>;
};

// React Query Hook
export const useDraftLogline = ({ id, queryConfig = {} }: UseDraftLoglineOptions) => {
  return useQuery<DraftLoglineData>({
    ...getDraftLoglineQueryOptions(id)
  });
};
