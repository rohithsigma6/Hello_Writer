import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import youtube from "@/assets/dashboard/howtousescreenplay/yt.svg";
import { Modal } from "@/components/ui/modal";

const HowToUseScreenplay = ({
    showHowToUseScreenplay,
    setShowHowToUseScreenplay,
}: {
    showHowToUseScreenplay: boolean;
    setShowHowToUseScreenplay: (showHowToUseScreenplay: boolean) => void;
}) => {
    const className = "Dashboard__HowToUseScreenplay";

    function closeTheModal() {
        setShowHowToUseScreenplay(false);
    }

    return (
        <Modal
            className={className + " max-w-2xl bg-white w-full m-auto flex flex-col gap-2 rounded-2xl p-6"}
            isOpen={showHowToUseScreenplay}
            setIsOpen={closeTheModal}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full m-auto max-w-2xl flex flex-col gap-4"
            >
                <header className="flex flex-row w-full justify-start items-center gap-2 relative">
                    <img src={youtube} alt="Icon" className="w-16 h-16 rounded-full" />
                    <div>
                        <p className="font-bold text-lg">Discover How To Use Screenplay.INK</p>
                        <p className="text-sm">Your guide to writing, collaborating and managing screenplays with ease.</p>
                    </div>

                    <button className="absolute top-0 right-0" onClick={closeTheModal}>
                        <IoCloseSharp className="text-2xl" />
                    </button>
                </header>

                <p className="text-sm text-black font-medium">
                    This step-by-step guide will show you how to maximize your writing potential using Screenplay.ink.
                </p>

                <section className="w-full h-fit">
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube-nocookie.com/embed/hAamzs6S0xA?si=WF_zKGn6JCuU6vnp&rel=0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                </section>

                <section className="w-full">
                    <p className="text-base my-4 font-semibold">Key Features</p>

                    <div className="grid grid-cols-2 w-full gap-3">
                        {keyFeatures.map((fea) => (
                            <div key={fea.title} className="flex flex-col justify-between items-start gap-6 border border-gray-300 rounded-xl p-4">
                                <div>
                                    <p className="font-semibold text-base">{fea.title}</p>
                                    <p className="text-sm text-light-grey">{fea.subtitle}</p>
                                </div>

                                <button className="w-fit px-6 py-2 rounded-xl text-sm border font-medium border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white transition-colors">
                                    {fea.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="flex justify-center my-2">
                    <button className="bg-primary-blue text-white w-fit px-6 py-3 rounded-xl">
                        Start Your Screenplay Today!
                    </button>
                </section>

                <section className="flex flex-col items-center justify-center">
                    <p className="text-sm text-light-grey">Was this Tutorial Helpful?</p>

                    <div className="flex flex-row gap-2 justify-center items-center mt-2">
                        <button className="text-sm border border-gray-400 text-gray-500 hover:bg-primary-blue hover:text-white transition-colors rounded-md px-2 py-1">
                            Yes
                        </button>
                        <button className="text-sm border border-gray-400 text-gray-500 hover:bg-primary-blue hover:text-white transition-colors rounded-md px-2 py-1">
                            No
                        </button>
                    </div>
                </section>
            </div>
        </Modal>
    );
};

const keyFeatures = [
    {
        title: "Real-Time Collaboration",
        subtitle: "Write and edit scripts simultaneously with your team, no matter where they are.",
        link: "",
        cta: "Learn More",
    },
    {
        title: "AI-Enabled Story Generation",
        subtitle: "Get creative prompts and story suggestions powered by advanced AI technology.",
        link: "",
        cta: "Learn More",
    },
    {
        title: "Multi-Language Support",
        subtitle: "Write and translate your scripts in multiple languages seamlessly.",
        link: "",
        cta: "Learn More",
    },
    {
        title: "Blockchain-Based Script Security",
        subtitle: "Rotect your intellectual property with cutting-edge blockchain technology.",
        link: "",
        cta: "Learn More",
    },
];

export default HowToUseScreenplay;