import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from "@/lib/api-client";
import {  QueryConfig } from "@/lib/react-query";
import { ScreenPlayTimer } from '@/types/api';



export const getTimerData = (
    {
        fileId,
        versionId
    }: {
        fileId: string,
        versionId: string
    }): Promise<ScreenPlayTimer> => {
    return api.get(`/api/daily-goal/latest?fileId=${fileId}&version=${versionId}`)
}



export const getTimerQueryOptions = ({
    fileId,
    versionId,
}: {
    fileId: string;
    versionId: string;
}) => {
    return queryOptions({
        queryKey: ['timerData', fileId, versionId],
        queryFn: () => getTimerData({ fileId, versionId }),
    });
};

type UseDailyGoalOptions = {
    queryConfig?: QueryConfig<typeof getTimerQueryOptions>;
    fileId: string;
    versionId: string;
};

export const useTimer = ({
    queryConfig = {},
    fileId,
    versionId,
}: UseDailyGoalOptions) => {
    return useQuery({
        ...getTimerQueryOptions({ fileId, versionId }),
        ...queryConfig,
    });
};


