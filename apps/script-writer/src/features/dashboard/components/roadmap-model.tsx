import React, { useState } from "react";
import comingsoontag from "@/assets/dashboard/roadmap/comingsoon.svg";
import verysoontag from "@/assets/dashboard/roadmap/verysoon.svg";
import comingsoonbuttonbg from "@/assets/dashboard/roadmap/comingsoonbtn.svg";
import verysoonbuttonbg from "@/assets/dashboard/roadmap/verysoonbtn.svg";
import loader from "@/assets/dashboard/roadmap/loader.svg";

const RoadMapModel = ({ closeRoadMap }: { closeRoadMap: () => void; }) => {
    return (
        <div className="bg-white rounded-2xl max-w-4xl h-fit w-full font-poppins flex flex-col gap-4">
            <section className="flex flex-col gap-1 items-center">
                <h1 className="font-bold text-lg text-center">Your Screenwriting Journey Evolving with You</h1>
                <p className="font-semibold text-base text-[#4D4D5A] text-center">
                    A Clear Roadmap to Innovation and Creativity
                </p>
                <p className="text-sm text-[#939393] text-center px-10">
                    Stay ahead with the tools that power your storytelling. Here’s what’s LIVE, what’s coming VERY SOON, and
                    what’s on the HORIZON. We’re always building and innovating based on your needs.
                </p>
            </section>

            <section>
                <h1 className="text-lg font-bold mb-2">Features</h1>
                <Features />
            </section>

            <section>
                <h1 className="text-lg font-bold mb-2">Feature Roadmap Tickets</h1>
                <FeatureRoadMapTickets />
            </section>

            <section className="flex flex-col gap-3 mt-4">
                <div>
                    <h1 className="text-lg font-bold mb-0.5">Request a New Feature</h1>
                    <p className="text-sm text-light-grey">
                        If you have an idea or need a specific tool, submit a feature request:
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-light-grey">Feature name</h3>
                        <input type="text" name="feature-name" className="p-2 w-full border border-gray-200 rounded-xl" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-light-grey">Your e-mail (optional)</h3>
                        <input type="email" name="email" className="p-2 w-full border border-gray-200 rounded-xl" />
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-light-grey">
                        What's so important about this feature? Why do you need it?
                    </h3>
                    <textarea
                        name="reason"
                        rows={4}
                        className="border border-gray-300 p-3 rounded-xl w-full resize-none"
                    ></textarea>
                </div>
            </section>

            <section className="flex flex-row justify-start gap-2 items-center">
                <button
                    onClick={closeRoadMap}
                    className="px-10 py-2 rounded-xl border-2 text-gray-600 border-gray-400 hover:bg-gray-400 hover:text-white transition-colors"
                >
                    Close
                </button>
                <button className="bg-primary-blue hover:bg-[#522fdf] transition-colors text-white rounded-xl px-10 py-2">
                    Submit
                </button>
            </section>
        </div>
    );
};

const features = [
    {
        name: "Live",
        number: 7,
    },
    {
        name: "Coming Very Soon",
        number: 20,
    },
    {
        name: "Coming Soon",
        number: 15,
    },
];

function Features() {
    return (
        <div className="grid grid-cols-3 gap-[1px] w-full">
            {features.map((fea) => {
                const bgColor =
                    fea.name.toLowerCase() === "live"
                        ? "#8565FF"
                        : fea.name.toLowerCase() === "coming soon"
                            ? "#F17FA0"
                            : "#433D9B";

                return (
                    <div
                        key={fea.name}
                        className="w-full p-4 flex flex-col gap-4 text-white"
                        style={{ backgroundColor: bgColor }}
                    >
                        <p className="text-left text-base font-medium">{fea.name.toLocaleUpperCase()}</p>
                        <p className="text-right font-bold text-4xl">{fea.number}</p>
                    </div>
                );
            })}
        </div>
    );
}

function FeatureRoadMapTickets() {
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
    const [wantedFeatures, setWantedFeatures] = useState<string[]>([]);

    const handleWantThisClick = (fea: any) => {
        setLoading((prev) => ({ ...prev, [fea.title]: true }));

        setTimeout(() => {
            fea.wantCount += 1;
            setLoading((prev) => ({ ...prev, [fea.title]: false }));

            // Add the feature to the wantedFeatures array if not already added
            if (!wantedFeatures.includes(fea.title)) {
                setWantedFeatures((prev) => [...prev, fea.title]);
            }
        }, 2000);
    };

    return (
        <div className="grid grid-cols-3 w-full gap-x-[1px] gap-y-[1px]">
            {featuresList.map((fea) => {
                const bgColor =
                    fea.status.toLowerCase() === "live"
                        ? "#8565FF"
                        : fea.status.toLowerCase() === "coming soon"
                            ? "#F17FA0"
                            : "#433D9B";

                return (
                    <div
                        key={fea.title}
                        className="w-full flex flex-col gap-5 justify-between text-white"
                        style={{ backgroundColor: bgColor }}
                    >
                        <div className="px-4 pt-4 flex flex-col gap-2">
                            <p className="text-left text-base font-medium">{fea.title}</p>

                            {["coming soon", "coming very soon"].includes(fea.status.toLowerCase()) && (
                                <div className="flex flex-row gap-2">
                                    {fea.peopleList &&
                                        fea.peopleList.map((people, index) => (
                                            <div
                                                key={index}
                                                className={`relative w-6 h-6 ${index !== 0 ? "-ml-6" : ""}`} // Overlap effect with margin
                                            >
                                                <img
                                                    src={people.image}
                                                    alt={`Profile ${index + 1}`}
                                                    className="w-full h-full rounded-full border-2 border-white object-cover"
                                                />
                                            </div>
                                        ))}
                                    <p className="text-left text-sm">{fea.wantCount} members want this. Do you?</p>
                                </div>
                            )}
                        </div>

                        {["coming soon", "coming very soon"].includes(fea.status.toLowerCase()) && (
                            <div className="w-full flex flex-row items-center justify-between pr-4 pb-4">
                                {fea.status.toLowerCase() === "coming soon" ? (
                                    <div className="relative flex flex-row items-center justify-start w-fit">
                                        <img src={comingsoontag} alt="" className="w-fit h-6 object-contain" />
                                        <p className="text-xs w-fit absolute left-0 ml-2">{fea.status.toUpperCase()}</p>
                                    </div>
                                ) : fea.status.toLowerCase() === "coming very soon" ? (
                                    <div className="relative flex flex-row items-center justify-start w-fit">
                                        <img src={verysoontag} alt="" className="w-fit h-6 object-contain" />
                                        <p className="text-xs w-fit absolute left-0 ml-2">{fea.status.toUpperCase()}</p>
                                    </div>
                                ) : null}

                                {["coming soon", "coming very soon"].includes(fea.status.toLowerCase()) && (
                                    <button
                                        className="relative flex flex-row items-center justify-center w-fit"
                                        onClick={() => handleWantThisClick(fea)}
                                        disabled={wantedFeatures.includes(fea.title)}
                                    >
                                        <img
                                            src={fea.status.toLowerCase() === "coming soon" ? comingsoonbuttonbg : verysoonbuttonbg}
                                            alt=""
                                            className="w-fit h-fit object-contain"
                                        />

                                        <p className="text-xs text-center px-2 py-2 font-medium w-full absolute left-0">
                                            {loading[fea.title] ? (
                                                <img src={loader} alt="loading" className="w-6 h-6 mx-auto animate-spin object-contain" />
                                            ) : wantedFeatures.includes(fea.title) ? (
                                                "You're In!"
                                            ) : (
                                                "I WANT THIS"
                                            )}
                                        </p>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

const featuresList = [
    {
        title: "Prewriting Tools",
        status: "Live",
    },
    {
        title: "Industry Standard Formatting",
        status: "Live",
    },
    {
        title: "Peer-to-Peer AI Validation",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Intuitive Screenplay Editor",
        status: "Live",
    },
    {
        title: "E-Learning Courses",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Multi-language Support",
        status: "Live",
    },
    {
        title: "Storyboards",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Chat on The File",
        status: "Live",
    },
    {
        title: "Screenplay Library",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Unlimited Projects",
        status: "Live",
    },
    {
        title: "Translate Screenplays",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Track Writing Sprints & Goals",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "AI Co-Writing Assistant",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Spell & Grammar Check",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Script Coverage",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Crowd Collaborative Writing",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Real-Time Collaboration",
        status: "Live",
    },
    {
        title: "Screenplay Statistics & Reports",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Blockchain-Based Script Registry",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Digital Smart Pen Integration",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Earn on the Platform",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Manage Writers' Rooms",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Pitch Deck Builder",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Industry Connect & Marketplace",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Writer’s Representation",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Director’s Toolkit",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Contests & Screenwriter Engagement",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Table Read",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Budget and Schedule Tool",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Pre-Production Management",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "All Contracts Management",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Screenplay Audiobook",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Script Doctoring",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Plot Diagnostics",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Intuitive Dictation Assistant",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Call Sheets & Daily Production Reports",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Production to Post Management",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Vendor Management",
        status: "Coming Soon",
        wantCount: 25,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "OCR + Industry Standard Formatting",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Track Pitches",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Advanced Director’s Toolkit",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
    {
        title: "Advanced Formatting",
        status: "Coming Very Soon",
        wantCount: 10,
        peopleList: [
            { name: "Name", image: "https://cdn.pixabay.com/photo/2023/06/19/16/02/beautiful-woman-8074997_1280.jpg" },
            {
                name: "Name",
                image:
                    "https://easy-peasy.ai/cdn-cgi/image/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7cce59f7-bf96-46a8-affa-b007320a534c/3caaeb41-21ff-4af1-bf06-cefe01580b39.png",
            },
            {
                name: "Name",
                image:
                    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
            },
        ],
    },
];

export default RoadMapModel;