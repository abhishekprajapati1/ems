import { useState } from 'react';
import { logout } from "@api/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useMe from '@queries/useMe';
import DropDown from './DropDown';


type NavbarProps = {

}

const Navbar = () => {
    const [drop, setDrop] = useState(false);

    const router = useRouter();
    const { data: me, isLoading } = useMe();
    const handleLogout = async () => {
        const res = await logout();
        if (res.success) {
            router.reload();
        } else {
            toast.error(res.message);
        }
    }

    return (
        <div className="fixed box-border h-[60px] left-0 top-0 right-0 px-20 flex items-center justify-between w-full bg-white shadow-lg z-[100]">
            <div className="font-bold tracking-wide text-gray-700">EMS</div>
            <div className="relative">
                <button onClick={() => setDrop(!drop)} className="w-[1.8rem] h-[1.8rem] rounded-full bg-blue-400">
                    A
                </button>
                { drop &&
                    <DropDown />
                    }
            </div>
        </div>
    )
}

export default Navbar;