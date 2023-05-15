import { useMutation, useQueryClient } from "@tanstack/react-query";
import { punchIn } from "@api/me";





const usePunchInCreate = () => {

    const queryClient = useQueryClient();

    const punch = useMutation({
        mutationFn: async () => {
            const res = await punchIn();
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["punch"])
        }
    });

    return punch;
}

export default usePunchInCreate;