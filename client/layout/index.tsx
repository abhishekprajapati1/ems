import { ReactNode } from "react";
import { useRouter } from 'next/router';
import Navbar from "../components/navbars";

type LayoutProps = {
    children?: ReactNode,
}


const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const { pathname } = router;
    const withoutNav = ["/login", "/signup"];

    return (
        <div>
            {
                !withoutNav.includes(pathname) &&
                <Navbar />
            }
            {
                children
            }
        </div>
    )
}

export default Layout;