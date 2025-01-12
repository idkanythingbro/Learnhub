import { useForm } from "react-hook-form";
import { MdOutlineLockReset } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { requestToResetPassword } from "../../service/user.service";

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = handleSubmit((data) => {
        // alert(data.email);
        requestToResetPassword(data.email);
    });

    return (
        <div>
            <div className="w-full flex flex-col gap-5   mt-4">
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
    const [searchParams]=useSearchParams();
    const token = searchParams.get("token");
    return(
        <div>
           //Password update form
           <p className="text-white">{token}</p>

        </div>
    )
}


export default ForgotPassword;