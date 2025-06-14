import { FaArrowRight } from "react-icons/fa";
import { useLogin } from "../api/login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Login mutation hook
    const { mutate: login } = useLogin({
        mutationConfig: {
            onSuccess: (data: any) => {
                const user = data?.body?.user;

                // if (user?.role === 'admin') {
                    localStorage.setItem('user', JSON.stringify(user));
                    navigate('/');
                // } else {
                //     toast.error('Access denied: Only admin users are allowed.');
                //     console.error('Access denied: Only admin users are allowed.');
                // }
            },
            onError: (error) => {
                toast.error(`Login failed. Error: ${error.message}`);
                console.error(`Login failed. Error: ${error.message}`);
            },
        },
    });

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className="w-screen min-h-screen flex items-center justify-center font-poppins">
            <div className="w-lg flex flex-col gap-6 p-8 -mt-20">
                <div className="flex flex-col gap-2 mb-6">
                    <h1 className="text-center text-2xl font-bold">Log in to your account</h1>
                    <h3 className="text-center text-light-grey">Welcome back! Please enter your details.</h3>
                </div>

                <div>
                    <p className="font-semibold mb-1">Email Address</p>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="px-3 py-2 w-full rounded-xl border border-[#afb8c7]"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <p className="font-semibold mb-1">Password</p>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="px-3 py-2 w-full rounded-xl border  border-[#afb8c7]"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="bg-[#653eff] hover:bg-[#543EFF] cursor-pointer mt-6 w-full rounded-xl text-white p-2 text-lg font-medium flex flex-row items-center gap-2 justify-center"
                    onClick={handleLoginSubmit}
                >
                    Login <FaArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default Login;
