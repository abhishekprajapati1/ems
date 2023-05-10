import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '@api/auth';
import { toast } from 'react-toastify';
import { getCookie } from 'cookies-next';


type FormValues = {
    email: string,
    password: string,
}

const Login = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const res = await login(data);
        if (res.success) {
            toast.success(res.message);
            router.push('/');
        } else {
            toast.error(res.message);
        }
    }


    return (
        <section className="h-[100vh] grid place-content-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[20rem] rounded-2xl shadow-2xl bg-white p-6">
                <h1 className="text-center font-bold text-gray-600 mb-6">Login</h1>
                <input
                    type="email"
                    className="w-full mb-3 py-2 px-6 border border-blue-300 outline-none rounded-[10rem] focus:ring-1 focus:ring-blue-500 focus:bg-blue-100"
                    placeholder="johndoe@example.com"
                    {...register("email")}
                />
                <input
                    type="password"
                    className="w-full mb-3 py-2 px-6 border border-blue-300 outline-none rounded-[10rem] focus:ring-1 focus:ring-blue-500 focus:bg-blue-100"
                    {...register("password")}
                />

                <div className="text-center mt-2">
                    <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2  rounded-[10rem]"
                    >Submit</button>

                    <div className="mt-2">
                        Don't have an account ? <Link href="/signup" className='text-pink-500'>Sign Up.</Link>
                    </div>
                </div>
            </form>
        </section>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const token = getCookie("authtoken", { req, res });
    if (token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    return {
        props: {

        }
    }
}


export default Login;