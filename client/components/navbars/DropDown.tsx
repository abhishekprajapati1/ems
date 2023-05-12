import React from 'react';
import Link from 'next/link';
import { logout } from "@api/auth";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { employeeDropMenus, managerDropMenus, adminDropMenus } from '../../utils';
import useMe from '@queries/useMe';



const dropMenus = {
    "employee": employeeDropMenus,
    "manager": managerDropMenus,
}

const DropDown = () => {
    const router = useRouter();
    const { data: me, isLoading } = useMe();

    console.log("see the data", me.role);
    const menus = dropMenus[me.role];

    const handleLogout = async () => {
        const res = await logout();
        if (res.success) {
            router.reload();
        } else {
            toast.error(res.message);
        }
    }
    return (
        <div className="absolute top-100 right-0 bg-white p-2 min-w-[10rem] shadow-lg rounded-lg">
            <ul>
                {
                    menus.map((item: { path: string, label: string }, index: number) => (
                        <li key={index} className="pb-2"><Link href={item.path} className="block hover:bg-blue-50 hover:text-blue-600 px-2 py-1 rounded ease-linear">{item.label}</Link></li>
                    ))
                }
                <li><button onClick={() => handleLogout()} className="bg-blue-600 text-white w-full p-1 rounded">Logout</button></li>
            </ul>
        </div>
    )
}

export default DropDown