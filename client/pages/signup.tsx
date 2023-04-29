import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';


type FormValues = {
    full_name: string,
    date_of_birth: string,
    email: string,
    password: string,
}

const SignUp = () => {

    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("see payload", data);
    }


    return (
        <section className="h-[100vh] grid place-content-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[20rem] rounded-2xl shadow-2xl bg-white p-6">
                <h1 className="text-center font-bold text-gray-600 mb-6">Sign Up</h1>
                <input
                    type="text"
                    className="w-full border border-blue-300 mb-3 py-2 px-6 outline-none rounded-[10rem] focus:ring-1 focus:ring-blue-500 focus:bg-blue-100"
                    placeholder="John Doe"
                    {...register("full_name")}
                />
                <input
                    type="date"
                    className="w-full border border-blue-300 mb-3 py-2 px-6 outline-none rounded-[10rem] focus:ring-1 focus:ring-blue-500 focus:bg-blue-100"
                    {...register("date_of_birth")}
                />
                <input
                    type="email"
                    className="w-full mb-3 py-2 px-6 border border-blue-300 outline-none rounded-[10rem] focus:ring-1 focus:ring-blue-500 focus:bg-blue-100"
                    placeholder="johndoe@example.com"
                    {...register("email")}
                />
                <input
                    type="password"
                    className="w-full border border-blue-300 mb-3 py-2 px-6 outline-none rounded-[10rem] focus:ring-1 focus:ring-blue-500 focus:bg-blue-100"
                    placeholder='Password'
                    {...register("password")}
                />

                <div className="text-center mt-2">
                    <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2  rounded-[10rem]"
                    >Submit</button>

                    <div className="mt-2">
                        Already have an account <Link href="/login" className='text-pink-500'>login</Link>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default SignUp;