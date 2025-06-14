import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export type GetUsersQueryParams = {
  search?: string;
  planType?: string;
  subscriptionStatus?: string;
  page?: number;
  limit?: number;
  [key: string]: any; // For any other dynamic params
};

export const getUsers = async (params: GetUsersQueryParams): Promise<any> => {
  const queryString = new URLSearchParams(params).toString();
  return api.get(`/api/admin/v0/api/user?${queryString}`);
};

export const useAdminUsers = (params: GetUsersQueryParams) => {
  return useQuery({
    queryKey: ["admin-users", params], // cache per query
    queryFn: () => getUsers(params),
    // keepPreviousData: true,
    enabled: !!params, // safe guard for undefined params
  });
};
