import { Disclosure } from '@headlessui/react';
import React from 'react';
import { CharacterData } from '../data';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const WelcomeCharacters = ({ setCharacterStatus }: { setCharacterStatus: (value: string) => void }) => {
  return (
    <div className="types-wrapper w-[100%] h-full bg-slate-100 p-10">
      <div className="bg-white rounded-[24px] px-[32px] pt-[40px] font-poppins ">
        <div className="flex xl:flex-row flex-col gap-6 items-start">
          <div className="w-max-[452px] hidden shrink-0 xl:grid">
            <img
              src={CharacterData?.icon}
              loading="lazy"
              className="object-contain"
            />
          </div>
          <div className="xl:hidden">
            <img
              src={CharacterData?.smIcon}
              loading="lazy"
              className="mx-auto object-contain"
            />
          </div>
          <div className="flex flex-col" key={CharacterData.tipsHeading}>
            <section>
              <p className="text-2xl font-semibold text-text-500">
                {CharacterData.heading}
              </p>
              <p className="mt-[16px] text-text-200 text-base">
                {CharacterData.paragrapgh}
              </p>
            </section>
            <section className="mt-[24px]">
              <p className="text-1xl font-semibold text-text-500">
                {CharacterData.Ul}
              </p>
              <ul className="ml-2 mt-2">
                {CharacterData.list.map((listItem) => (
                  <li className="text-[#8F8F8F] flex flex-row items-center gap-1" key={listItem.li}>
                    <span className="mr-2">•</span> {listItem.li}
                  </li>
                ))}
              </ul>
            </section>
            <section className="gap-y-3">
              <button
                className="px-[68px] py-[18px] text-white rounded-[16px] bg-primary-blue mt-[32px] inline-block"
                onClick={() => setCharacterStatus('initialize')}
              >
                {CharacterData.btnText}
              </button>
            </section>
          </div>
        </div>
        <section className="flex flex-col mt-8 ">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="rounded-[16px] border mb-10">
                  <div className="flex justify-between items-center w-full px-[20px] py-[18px] text-sm font-medium text-left text-[#212131]">
                    <p className="text-base font-semibold text-[#212131] font-poppins">
                      {CharacterData?.tipsHeading}
                    </p>
                    {/* @ts-ignore */}
                    <span className='text-xl'>{open ? <FiChevronUp /> : <FiChevronDown />}</span>
                  </div>

                  {CharacterData && open &&
                    <section className="flex flex-col gap-y-3 p-4 h-fit overflow-auto font-poppins">
                      {CharacterData?.tips.map((item, index) => (
                        <Disclosure.Panel
                          key={index}
                          className="text-[#9999A0] text-[19px] font-normal text-start gap-1"
                        >
                          <span className="mr-2 text-[#212131] font-medium text-base">
                            {item.number}.
                          </span>
                          <span className="text-[#212131] font-medium mr-1  text-base">
                            {item.title}
                          </span>
                          <span className='text-base text-[#9999A0]'>
                            {item.text}
                          </span>
                        </Disclosure.Panel>
                      ))}
                    </section>
                  }
                </Disclosure.Button>
              </>
            )}
          </Disclosure>
        </section>
      </div>
    </div>
  );
};

export default WelcomeCharacters;
