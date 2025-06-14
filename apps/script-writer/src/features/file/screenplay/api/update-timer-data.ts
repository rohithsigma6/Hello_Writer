import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { ScreenPlayTimerPayload } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const updateTimer = (timer: ScreenPlayTimerPayload): Promise<any> => {
    return api.post('/api/daily-goal', timer);
};

type UpdateTimerOptions = {
    mutationConfig?: MutationConfig<typeof updateTimer>;
};

export const useUpdateTimer = ({ mutationConfig }: UpdateTimerOptions = {}) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...restConfig } = mutationConfig || {};
    return useMutation({
        mutationFn: updateTimer,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ['update-timer'] });
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};
