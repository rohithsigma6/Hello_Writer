import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { RegisterForm } from '@/features/auth/components/register-form';
import logo from '@/assets/signup/CompanyLogo.svg';
import logo2 from '@/assets/signup/LoginLogo.svg';
import {
  DashedDivider,
  TabStep,
} from '@/features/auth/components/register-step-tab';
import { RegisterInput, useRegister } from '@/lib/auth';
import Role from '@/features/auth/components/register-role';
import EmailVerification from '@/features/auth/components/email-verify';
import { useUser } from '@/features/users/api/get-user';
import { useSnackbar } from 'notistack';
const RegisterRoute = () => {
  const { enqueueSnackbar } = useSnackbar();
  const registering = useRegister({
    onSuccess: () => {
      setActiveTab(3);
    },
    onError: (err) => {
      // @ts-ignore
      if (typeof err?.response?.data == 'string') {
        //@ts-ignore
        enqueueSnackbar(err?.response?.data, { variant: 'error' });
      }
      setActiveTab(1);
    },
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState<RegisterInput | {}>({});
  const { data, refetch } = useUser({
    queryConfig: {
      enabled: activeTab === 3,
      refetchInterval: activeTab === 3 ? 10000 : false,
    },
  });

  const { email } = JSON.parse(localStorage.getItem('user') as string) ?? {};
  const handleRole = (role: string) => {
    console.log(role, formData);
    const { email, firstName, lastName, password, phoneNo } =
      formData as RegisterInput;
    registering.mutate({
      email,
      firstName,
      lastName,
      password,
      phoneNo, 
      role,
    });
  };

  useEffect(() => {
    if (data?.user?.isVerified) {
      localStorage.setItem('user', JSON.stringify(data?.user));
      navigate(redirectTo ?? '/dashboard');
    }
    if (data?.user?.token && !data?.user?.isVerified) {
      setActiveTab(3);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="relative">
      <div className="sm:flex justify-end mr-11 hidden fixed top-0 right-0 mt-8 bg-white">
        <img alt="logo" src={logo2} className="m-1 w-[141px] h-[40px]" />
      </div>

      <div className="flex justify-center sm:items-center items-start w-full mx-auto mt-8">
        <TabStep
          step="1"
          title="Create an account"
          isActive={activeTab === 1}
        />
        <DashedDivider />
        <TabStep step="2" title="Select Your Role" isActive={activeTab === 2} />
        <DashedDivider />
        <TabStep
          step="3"
          title="Verify Your Account"
          isActive={activeTab === 3}
        />
      </div>

      <div className="login-wrapper [@media_(max-width:600px)]:px-6 [@media_(max-width:600px)]:w-full mt-10 my-hight-100">
        <div className="login-inner font-poppins [@media_(min-width:600px)]:w-[552px]">
          <div className="flex justify-center sm:px-0 px-7 my-10">
            <div className="max-w-[552px] w-full bg-white font-poppins">
              <div className="flex justify-center mb-6 sm:mt-0 mt-5">
                <img
                  alt="Screenplay.INK"
                  src={logo}
                  className="min-w-[188px] min-h-[63px]"
                />
              </div>

              <h1 className="text-center text-[#1B1C37] font-poppins text-[40px] font-extrabold [@media_(max-width:600px)]:text-[19px] [@media_(max-width:600px)]:font-semibold">
                {activeTab == 1 && 'Create an Account'}
                {activeTab == 2 && 'Select Your Role'}
                {activeTab == 3 && 'Verify Your Account'}
              </h1>

              <p className="text-center text-[#8F8F8F] font-normal leading-[21px] mt-2 text-[18px] mb-10 font-poppins [@media_(max-width:600px)]:text-[14px]">
                {activeTab == 1 &&
                  'Please enter your business details and create an account'}
                {activeTab == 3 && 'Please verify your account using mail'}
              </p>

              {activeTab == 1 && (
                <RegisterForm
                  setFormData={setFormData}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab == 2 && <Role handleRoleClick={handleRole} />}

              {activeTab == 3 && <EmailVerification email={email} />}
            </div>
          </div>

          <div className="flex sm:hidden my-10 w-full justify-center bottom-0">
            <img alt="logo" src={logo2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRoute;
