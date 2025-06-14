import { LoginForm } from '@/features/auth/components/login-form';
import logo from '@/assets/signup/CompanyLogo.svg';
import logo2 from '@/assets/signup/LoginLogo.svg';

const LoginRoute = () => {
  return (
    <>
      <div className="login-wrapper">
        <div className="login-inner">
          <div className="sm:flex justify-end mr-11 my-4 hidden fixed top-0 right-0">
            <img alt="logo" src={logo2} className="m-1" />
          </div>

          <div className="flex justify-center mt-12 sm:mb-12 mb-0 sm:px-0 px-7">
            <div className="max-w-lg w-full bg-white font-poppins ">
              <div className="flex justify-center mb-4 sm:mt-0 mt-5">
                <img
                  alt="Screenplay.INK"
                  src={logo}
                  className="min-w-[188px] min-h-[54px]"
                />
              </div>

              <h1 className="text-center text-[#282210] sm:font-bold font-semibold sm:text-4xl text-xl sm:mb-2 mb-1">
                Log in to your account
              </h1>

              <p className="text-center text-[#8F8F8F] font-normal sm:text-lg text-sm mb-8 leading-[21px]">
                Welcome back! Please enter your details.
              </p>
              <LoginForm />
            </div>
          </div>

          <div className="flex sm:hidden my-10 w-full justify-center fixed bottom-0">
            <img alt="logo" src={logo2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRoute;
