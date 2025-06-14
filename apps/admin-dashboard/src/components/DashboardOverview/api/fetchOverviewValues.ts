import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// GET: Verified Users Count
export const getVerifiedUsersCount = async (): Promise<any> => {
  return api.get(`/api/admin/v0/api/user/getVerifiedUsersCount`);
};

// GET: Revenue Stats
export const getRevenueStats = async (): Promise<any> => {
  return api.get(`/api/admin/v0/api/user/getRevenueStats`);
};

// Hook: Get Verified Users Count
export const useVerifiedUsersCount = () => {
  return useQuery({
    queryKey: ["verified-users-count"],
    queryFn: getVerifiedUsersCount,
  });
};

// Hook: Get Revenue Stats
export const useRevenueStats = () => {
  return useQuery({
    queryKey: ["revenue-stats"],
    queryFn: getRevenueStats,
  });
};
