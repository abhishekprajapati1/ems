import { useQuery } from "@tanstack/react-query";
import { getPunch } from "@api/me";





const usePunchInfo = () => {
    const punch = useQuery({
        queryKey: ["punch"],
        queryFn: async () => {
            const res = await getPunch();
            return res.data;
        }
    });

    return punch;
}

export default usePunchInfo;