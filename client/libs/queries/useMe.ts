import { useQuery } from "@tanstack/react-query";
import { getMe } from "@api/me";


type Me = {
    role: string,
    date_of_birth: string,
    email: string,
    name: string,
    _id: string,
}


const useMe = () => {
    const me = useQuery<Me>({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await getMe();
            return res.data;
        }
    });

    return me;
}

export default useMe