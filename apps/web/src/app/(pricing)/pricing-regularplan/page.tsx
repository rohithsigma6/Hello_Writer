"use client";
import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import checkLogo from "../../../../public/assets/pricing/check.svg";
import HomeLayout from "@/app/layout/HomeLayout";

const features = [
  "E Learning Courses",
  "Screenplay Library",
  "Prewriting Tools",
  "Intuitive Screenplay Editor",
  "Unlimited Projects",
  "Multilingual Support",
  "Industry Standard Formatting",
  "Track Writing Sprints & Goals",
  "AI Co Writing Assistant",
  "Spell & Grammar Check",
  "Plot Diagnostics",
  "Blockchain-based Script Registry",
  "Contests & Screenwriter Engagement",
  "Intuitive Dictation Assistant",
  "OCR + Industry Standard Formatting",
  "Advanced Formatting",
  "Real Time Collaboration",
  "Peer to Peer & Al Validation",
  "Script Coverage",
  "Pitch Deck Builder",
  "Industry Connect & Market Place",
  "Writer's Representation",
  "Director's Toolkit",
  "Physical Plotting and Writing Books",
  "Audio & Video conferencing",
  "Digital Smart Pen Integration",
  "Table Read",
  "Screenplay Audio Book",
  "Script Doctoring",
  "Screenplay Statistics & Reports",
  "Story Boards",
  "Translate Screenplays",
  "Transliterate Screenplays",
  "Advanced Director's Toolkit",
  "Track Pitches",
  "Earn on the Platform",
  "Manage Writer's Rooms",
  "Discover Screenplays",
  "Greenlight",
  "Pre Production Management",
  "Budget and Schedule Tool",
  "Onboard Cast & Crew",
  "All Contracts Management",
  "Call Sheets & Daily Production Reports",
  "Production to Post Management",
  "Vendor Management",
  "Payroll Management",
  "Smart Bills and Invoices Management",
];

const plans = [
  {
    title: "Aspiring Writer",
    semiprice: "₹3299",
    annualprice: "₹4999",
    period: "6 months",
    giving: "",
    smalldescription:
      "For beginners - Everything you want to use is something we want of!",
    features: features.map((_, index) => index <= 13), // True till "Intuitive Dictation Assistant",
    featuresList: features.map((_, index) => index >= 0 && index <= 13), // First 14 features
  },
  {
    title: "Indie Writer",
    semiprice: "₹4499",
    annualprice: "₹6999",
    period: "6 months",
    giving: "Everything in Aspiring Writer, plus",
    smalldescription:
      "For intermediate Writers, Entrepreneurs can write with industry-standard features.",
    features: features.map((_, index) => index <= 23), // True till "Physical Plotting and Writing Books",
    featuresList: features.map((_, index) => index >= 14 && index <= 23), // Next set of features
  },
  {
    title: "Professional Writer",
    semiprice: "₹5999",
    annualprice: "₹9999",
    period: "6 months",
    giving: "Everything in Indie Writer, plus",
    smalldescription:
      "For Advanced Writers - Unlock the full potential of your creativity",
    features: features.map((_, index) => index <= 35), // True till "Earn on the Platform",
    featuresList: features.map((_, index) => index >= 24 && index <= 35), // Next set of features
  },
  {
    title: "Enterprise Writer",
    semiprice: "Custom",
    annualprice: "Custom",
    period: "",
    giving: "Everything in Professional Writer, plus",
    smalldescription:
      "For Studios and Writers' Rooms - Unlimited tools for collaborative studios.",
    features: features.map(() => true), // All features are true,
    featuresList: features.map((_, index) => index >= 36),
  },
];

const Main: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <HomeLayout>
      <div className="bg-landing-bg font-garnet">
        <div className="sm:mt-10 mt-5 sm:px-12 lg:px-20 xl:px-40 px-5">
          <h1 className="text-4xl text-pricing-blue garnet-regular font-semibold text-center">
            Transform Your Writing Journey
          </h1>
          <p className="xs:text-lg text-base text-gray-600 my-4 mx-auto font-garnet text-center">
            Whether you're just starting out or are an experienced writer
            looking for advanced tools, SCREENPLAY.INK has a plan tailored to
            help you reach new creative heights. Explore our subscription
            options and pick the perfect plan for your screenwriting journey.
          </p>
        </div>

        <div className="flex items-center w-full justify-center my-10">
          <div className="inline-flex bg-white rounded-full overflow-hidden p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`py-2 px-10 font-poppins text-base font-semibold ${
                !isAnnual
                  ? "bg-landing-btn-text text-white rounded-full"
                  : "text-gray-500"
              }`}
            >
              6 Months
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`py-2 px-10 font-poppins text-base font-semibold  ${
                isAnnual
                  ? "bg-landing-btn-text text-white rounded-full"
                  : "text-gray-500"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="900px:flex hidden flex-col gap-6 px-10">
          {/* Plan Cards */}
          <div className="flex justify-center gap-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-between cursor-default p-4 bg-transparent rounded-lg bg-white shadow-md w-72 ${
                  selectedPlan === index
                    ? "border-2 border-pricing-blue text-pricing-blue bg-blue-50"
                    : "border border-gray-200"
                }`}
                onClick={() => setSelectedPlan(index)}
              >
                <h3 className="text-xl font-bold text-rose-500 mb-2 font-garnetMed text-center">
                  {plan.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  {plan.smalldescription}
                </p>
                <p className="text-2xl font-bold mb-4 text-black">
                  {isAnnual ? (
                    <>
                      {plan.annualprice}{" "}
                      <span className="text-sm text-gray-500">
                        {plan.period && "/ Annum"}
                      </span>
                    </>
                  ) : (
                    <>
                      {plan.semiprice}{" "}
                      <span className="text-sm text-gray-500">
                        {plan.period && "/ 6 months"}
                      </span>
                    </>
                  )}
                </p>
                {plan.title !== "Features" && (
                  <button
                    className={`bg-pricing-blue text-white text-sm py-2 px-4 rounded-full font-medium `}
                  >
                    {plan.title === "Enterprise Writer"
                      ? "Contact Us"
                      : "Subscribe"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="bg-slate-100 rounded-lg shadow-md text-black">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b">Features</th>
                  {plans.map((plan, index) => (
                    <th key={index} className="text-center p-4 border-b">
                      {plan.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features?.map((feature, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : ""}>
                    <td className="p-4 border-b text-left">{feature}</td>
                    {plans?.map((plan, j) => (
                      <td key={j} className="p-4 border-b text-center">
                        <div className="flex justify-center w-full">
                          <div
                            className={`w-6 h-6 flex items-center justify-center rounded-full ${
                              plan.features[i]
                                ? "bg-pricing-blue text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {/* @ts-ignore */}
                            {plan.features[i] ? <FaCheck /> : <FaTimes />}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex 900px:hidden sm:px-20 xs:px-5 px-0 flex-col xs:gap-8 gap-5">
          {plans.map((item, index) => (
            <PhoneCard
              key={index}
              header={item.title}
              preheading={item.smalldescription}
              price={isAnnual ? item.annualprice : item.semiprice}
              period={item.period}
              giving={item.giving}
              details={item.featuresList}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

const PhoneCard = ({
  header,
  preheading,
  price,
  period,
  giving,
  details,
}: {
  header: string;
  preheading: string;
  price: string;
  period: string;
  giving: string;
  details: boolean[];
}) => {
  return (
    <div className="xs:p-6 p-4 text-black flex flex-col gap-4 xs:gap-6 items-center border-2 border-[#43479b4d] rounded-xl">
      <h3 className="font-garnetSemi text-landing-btn-text xs:text-2xl text-lg">
        {header}
      </h3>

      <p className="font-garnetMed text-center xs:text-base text-sm text-gray-600 font-semibold">
        {preheading}
      </p>

      <h1 className="font-garnetSemi text-center">
        <span className="text-2xl text-black">{price}</span>
        <span className="text-sm text-gray-500">
          {period === "" ? "" : `/ ${period}`}
        </span>
      </h1>

      {header !== "Features" && (
        <button
          className={`w-full rounded-md p-2 xs:p-3 font-garnetMed bg-pricing-blue text-white xs:text-lg text-base`}
        >
          {header === "Enterprise Writer" ? "Contact Us" : "Subscribe"}
        </button>
      )}

      <p className="font-garnetMed self-start xs:text-lg text-base">{giving}</p>

      <ul className="self-start">
        {details.map(
          (available, index) =>
            available && (
              <li
                key={index}
                className="text-gray-700 xs:text-base text-sm flex flex-row items-center gap-3 mb-1 sm:mb-0"
              >
                <div
                  className={`text-xs w-5 h-5 flex items-center justify-center rounded-full bg-pricing-blue text-white`}
                >
                  {/* @ts-ignore */}
                  <FaCheck />
                </div>
                {features[index]} {/* Display feature name */}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Main;
