import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createUser } from '@api/auth';
import { toast } from 'react-toastify';


type FormValues = {
    name: string,
    date_of_birth: string,
    email: string,
    password: string,
    role: string,
}

const SignUp = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const res = await createUser(data);
        if (res.success) {
            router.replace("/login");
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }


    return (
        <section className="h-[100vh] grid place-content-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[20rem] rounded-2xl shadow-2xl bg-white p-6">
                <h1 className="text-center font-bold text-gray-600 mb-6">Sign Up</h1>
                <input
                    type="text"
                    className="w-full border border-blue-300 mb-3 py-2 px-6 outline-none rounded-[10rem] focus:ring-1 focus:ring-blue-500 focus:bg-blue-100"
                    placeholder="John Doe"
                    {...register("name")}
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

                <div>
                    <select className="w-full border border-blue-300 mb-3 py-2 px-6 outline-none rounded-[10rem] focus:ring-1 focus:ring-blue-500 focus:bg-blue-100" id="role" {...register("role")}>
                        <option value="" disabled>Select Role</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>

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