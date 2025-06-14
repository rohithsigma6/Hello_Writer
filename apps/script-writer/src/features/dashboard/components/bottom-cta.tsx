import InkCredits from '@/assets/landingsite/InkCredits.svg';
import comingsoonbottom from '@/assets/dashboard/side-bar-icon/comming-soon-bottom.svg';
import { RangeBar } from '@/components/ui/rangebar';

const BottomCTA: React.FC = () => {
  return (
    <section className="w-full flex flex-col bg-[#F2F1F4] bottom-cta">
      <div className="flex flex-row justify-between items-start">
        <img src={InkCredits} alt="Ink Credits" />
        <img
          className="justify-self-top pt-1 my-right-coming"
          src={comingsoonbottom}
          alt="Coming Soon"
        />
      </div>
      <p className="font-bold text-lg mt-[10px] mb-[6px] text-text-500">
        Ink Credits
      </p>
      <RangeBar totalPoints={1000} rangePoints={188} />
      <p className="text-sm mt-[6px] mb-[12px] text-text-500">
        0 Ink credits remaining
      </p>
      <button className="bg-primary-blue hover:bg-[#4e28e7] text-white rounded-[16px] py-[16px] text-base">
        Top Up Now
      </button>
    </section>
  );
};

export default BottomCTA;
