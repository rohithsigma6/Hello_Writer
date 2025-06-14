  import { queryOptions, useQuery } from '@tanstack/react-query';
  import { api } from '@/lib/api-client';
  import { QueryConfig } from '@/lib/react-query';
  import { LoglineTemplateData } from '@/types/api'; // Ensure this type is defined

  // Function to fetch logline templates
  export const getLoglineTemplate = (): Promise<LoglineTemplateData> => {
    return api.get('api/co-writer/logline/logline-template');
  };

  // Query options for logline templates
  export const getLoglineTemplateQueryOptions = () => {
    return queryOptions({
      queryKey: ['logline-template'],
      queryFn: () => getLoglineTemplate(),
    });
  };

  type UseLoglineTemplateOptions = {
    queryConfig?: QueryConfig<typeof getLoglineTemplateQueryOptions>;
  };

  // Hook to use the logline template query
  export const useLoglineTemplate = ({ queryConfig = {} }: UseLoglineTemplateOptions = {}) => {
    return useQuery<LoglineTemplateData>({
      ...getLoglineTemplateQueryOptions()
  });
  };
