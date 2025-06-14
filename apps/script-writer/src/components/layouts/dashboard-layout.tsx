import DashboardNavbar from '@/features/dashboard/components/navigation/navbar';
import LeftSidebar from '@/features/dashboard/components/navigation/left-sidebar';
import MainOnboarding from '@/features/dashboard/components/onboarding/onboarding-modal';
import { useUser } from '@/features/users/api/get-user';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data } = useUser({});
  return (
    <div className='max-h-[100dvh] overflow-y-hidden'>
      <DashboardNavbar />

      <div className="flex flex-row items-start bg-[#F2F1F5] relative">
        <LeftSidebar />

        <div className={'w-full h-[90dvh] font-poppins overflow-auto pb-[10px]'}>
          {children}
        </div>
      </div>
      <MainOnboarding
        eligible={data?.user?.isEligible!}
        onboardingInfo={data?.user?.profile?.personalPreferences}
      />
    </div>
  );
}
