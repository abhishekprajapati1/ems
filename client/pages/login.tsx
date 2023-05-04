import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '@api/auth';


type FormValues = {
    email: string,
    password: string,
}

const Login = () => {

    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log("see payload", data);
        const res = await login(data);
        console.log("see the login res", res);
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

export default Login;