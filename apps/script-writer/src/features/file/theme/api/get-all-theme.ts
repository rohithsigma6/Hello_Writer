import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ThemeTemplateData } from '@/types/api'; // Ensure this type is defined

// Function to fetch theme templates
export const getThemeTemplate = (): Promise<ThemeTemplateData> => {
  return api.get('api/co-writer/theme/theme-template');
};

// Query options for theme templates
export const getThemeTemplateQueryOptions = () => {
  return queryOptions({
    queryKey: ['theme-template'],
    queryFn: () => getThemeTemplate(),
  });
};

type UseThemeTemplateOptions = {
  queryConfig?: QueryConfig<typeof getThemeTemplateQueryOptions>;
};

// Hook to use the theme template query
export const useThemeTemplate = ({ queryConfig = {} }: UseThemeTemplateOptions = {}) => {
  return useQuery<ThemeTemplateData>({
    ...getThemeTemplateQueryOptions(),
  });
};