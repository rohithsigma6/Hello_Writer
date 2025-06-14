import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export type GetFeedbackQueryParams = {
  type?: string;
  status?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
  [key: string]: any; // For any other dynamic params
};

export const getFeedbacks = async (
  params: GetFeedbackQueryParams
): Promise<any> => {
  const queryString = new URLSearchParams(params).toString();

  return api.get(`/api/admin/v0/api/user/feedbacks?${queryString}`);
};

export const useAdminFeedbacks = (params: GetFeedbackQueryParams) => {
  return useQuery({
    queryKey: ["admin-feedbacks", params], // cache per query
    queryFn: () => getFeedbacks(params),
    enabled: !!params, // safeguard for undefined params
  });
};
