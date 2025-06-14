import { Link, useParams, useNavigate } from 'react-router';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

import { Disclosure } from '@headlessui/react';

import ScreenplayImg from '@/assets/screenplay-img.svg';
import WorkflowIllustrators from '@/features/file/scenecards/components/UI/workflow-illustrators';

const screenplayData = [
  {
    type: 'screenplay',
    icon: ScreenplayImg,
    smIcon: ScreenplayImg,
    btnText: 'Develop Your Scenes',
    tipsHeading: 'Screen-writing Tips',
    heading: 'Your Screenplay Begins Here.',
    paragrapgh: `This is where your structured ideas transform into industry-standard scripts. Whether you're writing your first draft or polishing your final one, our editor is built to support every stage of your creative journey.`,
    Ul: 'A powerful screenplay editor like this lets you:',
    list: [
      { li: 'Format automatically to industry standards' },
      { li: `Focus purely on storytelling with minimal distraction` },
      {
        li: 'Collaborate in real time with co-writers or producers',
      },
      {
        li: 'Track changes, add comments, stash or restore scenes',
      },
      {
        li: 'Easily toggle between writing, editing, and production-ready views',
      },
      { li: 'Seamlessly switch languages or use transliteration' },
    ],
    tips: [
      {
        number: 1,
        title: 'Follow Industry Format:',
        text: 'Use proper scene headings, action lines, and dialogue structure to maintain readability.',
      },
      {
        number: 2,
        title: 'Show, Don’t Tell:',
        text: 'Rely on visuals and subtext rather than explanations.',
      },
      {
        number: 3,
        title: 'Keep Dialogue Snappy:',
        text: 'Make it purposeful and character-driven.',
      },
      {
        number: 4,
        title: 'Enter Late, Leave Early:',
        text: 'Start scenes at the latest possible moment and cut out of them early to maintain pace.',
      },
      {
        number: 5,
        title: 'Limit Parentheticals:',
        text: 'Only use them to clarify tone when absolutely necessary.',
      },
      {
        number: 6,
        title: 'Avoid Camera Directions:',
        text: 'Let the visuals speak unless absolutely needed for storytelling.',
      },
      {
        number: 7,
        title: 'Scene Economy:',
        text: ' Make sure every scene serves at least one function: advance plot, reveal character, or build tension.',
      },
      {
        number: 8,
        title: 'Characters = Action:',
        text: 'What your characters do matters more than what they say.',
      },
      {
        number: 9,
        title: 'Write Visually:',
        text: 'Think in images—film is a visual medium.',
      },
      {
        number: 10,
        title: 'Revise Ruthlessly:',
        text: 'The magic is in the rewrite. Don’t hesitate to kill your darlings.',
      },
    ],
  },
];

const InitialScreen = ({
  setIsInitial,
}: {
  setIsInitial: (a: boolean) => void;
}) => {
  const { fileId, type } = useParams<{ fileId: string; type: string }>();

  return (
    <div className="types-wrapper w-[100%] overflow-y-auto pb-20">
      <div className="mt-[32px] ml-[40px] mr-[40px] overflow-x-hidden ">
        {screenplayData.map((data, index) => (
          <div
            key={data?.btnText}
            className="bg-white rounded-[24px] px-[32px] pt-[40px] font-poppins "
          >
            <div className="flex xl:flex-row flex-col gap-6 items-start">
              <div className="w-max-[452px] hidden shrink-0 xl:grid">
                <img
                  src={data.icon}
                  loading="lazy"
                  className="object-contain"
                />

                <WorkflowIllustrators />
              </div>
              <div className="xl:hidden">
                <img
                  src={data.smIcon}
                  loading="lazy"
                  className="mx-auto object-contain"
                />
              </div>

              <div className="flex flex-col" key={data.tipsHeading}>
                <section>
                  <p className="text-2xl font-semibold text-text-500">
                    {' '}
                    {data.heading}
                  </p>
                  <p className="mt-[16px] text-text-200 text-base">
                    {data.paragrapgh}
                  </p>
                </section>
                <section className="mt-[24px]">
                  <p className="text-1xl font-semibold text-text-500">
                    {data.Ul}
                  </p>

                  <ul className="ml-2 mt-2">
                    {data.list.map((listItem) => {
                      return (
                        <li
                          key={listItem.li}
                          className=" text-[#8F8F8F]  flex flex-row items-center gap-1"
                        >
                          <span className="mr-2">•</span> {listItem.li}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-2 text-[#8F8F8F]">
                    It's not just an editor—it's your creative companion.
                  </p>
                </section>
                <section className="gap-y-3">
                  <button
                    onClick={() => {
                      setIsInitial(false);
                      localStorage.setItem('screenplay-' + fileId, 'true');
                    }}
                    className="px-16 py-[18px] text-white rounded-[16px] bg-[#653EFF] mt-[32px]"
                  >
                    Start Writing
                  </button>
                </section>
              </div>
            </div>

            <section className="flex flex-col mt-8 ">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-[20px] py-[18px] text-sm font-medium text-left text-[#212131] rounded-[16px] border">
                      <p className="text-base font-semibold text-[#212131] font-poppins">
                        {data.tipsHeading}
                      </p>
                      <span>{open ? <FaAngleUp /> : <FaAngleDown />}</span>
                    </Disclosure.Button>
                    <section className="flex flex-col gap-y-3 p-4 h-fit overflow-auto ">
                      {data.tips.map((item, index) => {
                        return (
                          <Disclosure.Panel
                            key={index + item.number}
                            className="text-[#9999A0] text-[19px] font-normal flex flex-row items-center gap-1 font-poppins"
                          >
                            <span className="mr-2 text-[#212131] font-bold text-base">
                              {item.number}.
                            </span>
                            <span className="mr-2 text-[#212131] font-bold text-base">
                              {item.title}
                            </span>
                            <span className="text-base text-[#9999A0]">
                              {item.text}
                            </span>
                          </Disclosure.Panel>
                        );
                      })}
                    </section>
                  </>
                )}
              </Disclosure>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InitialScreen;
