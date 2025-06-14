import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router'
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { Editor } from "@tiptap/react";

import { Disclosure } from "@headlessui/react";
import { sceneCardData } from "../data";

const WelcomeTreatment = () => {
    const navigate = useNavigate();
    const { fileId, type } = useParams<{ fileId: string; type: string }>();

    return (
        <div className="types-wrapper w-[100%] h-fit bg-slate-100 p-10">
            {sceneCardData.map((data, index) => (
                <div className="bg-white rounded-[24px] px-[32px] pt-[40px] font-poppins ">
                    <div className="flex xl:flex-row flex-col gap-6 items-start">
                        <div className="w-max-[452px] hidden shrink-0 xl:grid">
                            <img src={data.icon} loading="lazy" className="object-contain" />
                        </div>
                        <div className="xl:hidden">
                            <img src={data.smIcon} loading="lazy" className="object-contain mx-auto" />
                        </div>

                        <div className="flex flex-col" key={data.tipsHeading}>
                            <section>
                                <p className="text-2xl font-semibold text-text-500"> {data.heading}</p>
                                <p className="mt-[16px] text-text-200 text-base">{data.paragrapgh}</p>
                            </section>
                            <section className="mt-[24px]">
                                <p className="text-1xl font-semibold text-text-500">{data.Ul}</p>

                                <ul className="ml-2 mt-2">
                                    {data.list.map((listItem) => {
                                        return (
                                            <>
                                                <li className=" text-[#8F8F8F]  flex flex-row items-center gap-1">
                                                    <span className="mr-2">•</span> {listItem.li}
                                                </li>
                                            </>
                                        );
                                    })}
                                </ul>
                            </section>
                            <section className="gap-y-3 ">
                                <button
                                    onClick={() => navigate(`/file/${fileId}/treatment/storybeats`)}
                                    className="px-16 py-[18px] text-white rounded-[16px] bg-[#653EFF] mt-[32px]"
                                >
                                    Develop Your Treatment
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
                                                {data?.tipsHeading}
                                            </p>
                                            {/* @ts-ignore */}
                                            <span>{open ? <FaAnglesUp /> : <FaAnglesDown />}</span>
                                        </div>
                                        {data && open &&
                                            <section className="flex flex-col gap-y-3 p-4 h-fit overflow-auto ">
                                                {data.tips.map((item, index) => {
                                                    return (
                                                        <Disclosure.Panel
                                                            key={index}
                                                            className="text-[#9999A0] text-[19px] font-normal flex flex-row items-center gap-1 font-poppins"
                                                        >
                                                            <span className="mr-2 text-[#212131] font-bold text-base">{item.number}.</span>
                                                            <span className="mr-2 text-[#212131] font-bold text-base">{item.title}</span>
                                                            <span className='text-base text-[#9999A0]'>
                                                                {item.text}
                                                            </span>
                                                        </Disclosure.Panel>
                                                    );
                                                })}
                                            </section>
                                        }
                                    </Disclosure.Button>
                                </>
                            )}
                        </Disclosure>
                    </section>
                </div>
            ))}
        </div>
    );
};

export default WelcomeTreatment;
