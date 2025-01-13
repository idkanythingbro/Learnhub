import { useForm } from "react-hook-form";
import { MdOutlineLockReset } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { requestToResetPassword, resetPassword } from "../../service/user.service";

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = handleSubmit((data) => {
        // alert(data.email);
        requestToResetPassword(data.email);

    });

    return (
        <div>
            <div className="w-full flex flex-col gap-5  mt-4">
                <div className="flex flex-col items-center gap-3">
                    <MdOutlineLockReset className="text-white rounded-full text-4xl border" />
                    <h2 className="h3-bold md:h2-bold   text-white">
                        Reset Password
                    </h2>
                </div>
                <form action="" onSubmit={onSubmit} className="flex flex-col gap-5 w-full mt-4">
                    <div>
                        <label htmlFor="email" className="text-white">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "This is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            placeholder=""
                            className="p-2 bg-gray-700 text-white rounded-md w-full min-w-[15rem]"
                        />
                        <p className="text-red mt-2">{errors.email?.message}</p>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-violet-500 p-2 rounded-full"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="flex justify-center">
                    <Link to="/sign-in" className="text-violet-500 underline">
                        Sign In
                    </Link>
                </div>
            </div>


        </div>
    )

}

//TODO - Update password form
export const UpdatePassWord = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmit = handleSubmit(async (data) => {
        resetPassword(token, data).then((res) => {
            if (res) {
                navigate("/sign-in");
            }
        });
    });
    const password = watch("password");
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Update Password
                        </h2>
                        <form onSubmit={onSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input
                                    {
                                    ...register("password", {
                                        required: "This is required",
                                        minLength: {
                                            value: 4,
                                            message: "Minimum length should be 4",
                                        },
                                    })
                                    }
                                    type="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                                <p className="text-red mt-2">{errors.password?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input
                                    {
                                    ...register("confirmPassword", {
                                        required: "This is required",
                                        minLength: {
                                            value: 4,
                                            message: "Minimum length should be 4",
                                        },
                                        validate: (value) =>
                                            value === password || "Confirm Passwords do not match",
                                    })
                                    }
                                    type="password"
                                    name="confirmPassword"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                                <p className="text-red mt-2">{errors.confirmPassword?.message}</p>

                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Update password
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>

    )
}


export default ForgotPassword;