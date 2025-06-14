import React, { useState } from "react";
import tick from "@/assets/dashboard/tick.svg";
import ink from "@/assets/dashboard/ink.svg";
import designedBg from "@/assets/dashboard/creditsBg.svg";

export const Subscriptions = () => {
  const [pricingPlans, setPricingPlans] = useState(true);
  const [annual, setAnnual] = useState(false);

  const handleSwitch = () => {
    setAnnual(!annual);
  };

  return (
    <div className="p-4 flex flex-col items-start 1 font-poppins">
      <section className="flex flex-row justify-between w-full py-4 border-b border-slate-300">
        <div className="flex flex-col w-fit">
          <h1 className="text-lg font-bold">{pricingPlans ? "Pricing Plans" : "Credit Ink Packs"}</h1>
          <p className="text-xs text-light-grey font-medium">
            {pricingPlans
              ? "Choose the perfect plan for your screenwriting Journey"
              : "Choose the perfect pack to fuel your creativity"}
          </p>
        </div>

        <div className="flex flex-row items-center border bg-[#E9E9EA] p-1 rounded-full">
          <button
            onClick={() => setPricingPlans(true)}
            className={
              pricingPlans
                ? "bg-primary-blue text-white px-3 py-2 text-sm rounded-full font-medium"
                : "text-light-grey font-normal px-3 py-2 text-sm"
            }
          >
            Pricing Plans
          </button>
          <button
            onClick={() => setPricingPlans(false)}
            className={
              !pricingPlans
                ? "bg-primary-blue text-white px-3 py-2 text-sm rounded-full font-medium"
                : "text-light-grey font-normal px-3 py-2 text-sm"
            }
          >
            Ink Credit Packs
          </button>
        </div>
      </section>

      {pricingPlans ? (
        <>
          <section className="flex flex-row w-full justify-start items-start mt-4">
            <div className="w-[30%]">
              <p className="text-xs text-light-grey font-medium">Your Current Time:</p>
              <h1 className="text-sm font-semibold">Aspiring Writer</h1>
            </div>
            <div className="w-[30%]">
              <p className="text-xs text-light-grey font-medium">Remaining Time:</p>
              <h1 className="text-sm font-semibold">4 months 9 Days</h1>
            </div>
            <div className="w-[30%]">
              <p className="text-xs text-light-grey font-medium">Billing Cycle:</p>
              <h1 className="text-sm font-semibold">6 months</h1>
            </div>
          </section>

          <section className="flex flex-row w-full justify-between items-end">
            <h1 className="text-sm font-semibold">Upgrade now to access more features</h1>

            <div>
              <p className="text-sm text-light-grey font-medium">Plans</p>

              <div className="flex flex-row gap-2 text-base font-semibold items-center">
                Six months
                <button
                  type="button"
                  className={`toggle-button w-12 h-6 rounded-full flex items-center ${
                    annual
                      ? "justify-end bg-green-200 shadow-neumorphism-green border border-green-600"
                      : "justify-start bg-purple-200 shadow-neumorphism-purple border border-primary-blue"
                  } p-1 transition-transform duration-500 ease-in-out`}
                  onClick={handleSwitch}
                >
                  <div
                    className={`toggle-inner w-4 h-4 rounded-full shadow-neumorphism-inner ${
                      annual ? "bg-green-500" : "bg-primary-blue"
                    }`}
                  ></div>
                </button>
                Annual
              </div>
            </div>
          </section>

          <section className="w-full flex flex-row items-stretch gap-0 mt-6 font-poppins h-full">
            {!annual
              ? PlansList.slice(1, PlansList.length).map((plan, index) => (
                  <PlanCardForSixMonths plan={plan} key={index} index={index} />
                ))
              : PlansList.map((plan, index) => <PlanCardForAnnual plan={plan} key={index} index={index} />)}
          </section>
        </>
      ) : (
        <>
          <section className="flex flex-row w-full justify-start items-start mt-4">
            <div className="w-[30%]">
              <p className="text-xs text-light-grey font-medium">Ink Credits Purchased:</p>
              <h1 className="text-sm font-semibold">1000000 INK Credits</h1>
            </div>
            <div className="w-[30%]">
              <p className="text-xs text-light-grey font-medium">Remaining Ink Credits:</p>
              <h1 className="text-sm font-semibold">1000</h1>
            </div>
            <div className="w-[30%]">
              <p className="text-xs text-light-grey font-medium">Expiry:</p>
              <h1 className="text-sm font-semibold">Credits can be rolled over</h1>
            </div>
          </section>

          <section className="flex flex-row w-full mt-6">
            <h1 className="text-sm font-semibold">Top-Up Your Ink Credits- Empower Your Screenwriting journey</h1>
          </section>

          <section className="flex flex-row w-full items-stretch mt-6">
            {CreditsPacks.map((pack) => (
              <CreditPackCard pack={pack} />
            ))}
          </section>
        </>
      )}

      <section className="w-full flex justify-center mt-6">
        <div className="flex flex-row gap-4 items-end">
          <button className="text-primary-green text-base font-semibold hover:underline">Redeem a Gift</button>
          <p className="text-sm font-semibold">Refer a friend</p>
        </div>
      </section>
    </div>
  );
};

function CreditPackCard({ pack }: { pack: any }) {
  return (
    <div className="flex flex-1 flex-col justify-between py-4 border border-gray-300">
      <div>
        <section className="px-0 flex flex-row items-center justify-start relative">
          <img src={designedBg} alt="" className="h-full pointer-events-none select-none" />

          <div className="absolute left-0 px-2 flex flex-row items-center justify-start gap-1">
            <img src={ink} alt="ink" className="w-3.5 h-3.5" />
            <h3 className="text-black text-sm font-semibold">{pack.credits} ink credits</h3>
          </div>
        </section>

        <h1 className="px-4 mt-4 text-lg font-semibold text-black">{pack.name}</h1>

        <p className="px-4 my-2 text-light-grey text-xs font-medium">{pack.describe}</p>
      </div>

      <div className="flex flex-col">
        <section className="px-4">
          <h6 className="text-sm font-semibold my-4">
            <span className="font-bold line-through">{pack.original_price}</span>
            <span className="text-light-grey text-xs">
              {"  "}
              {pack.original_price ? "Original Price" : ""}
              {"  "}
            </span>
            <span className="text-primary-blue text-xs">{pack.offer_percent ? `${pack.offer_percent}% Off` : ""}</span>
          </h6>
        </section>

        <h1 className="px-4">
          <span className="text-2xl font-bold">₹{pack.price_per_pack}</span>
          <span className="text-light-grey text-xs font-semibold">{"  "}per pack</span>
        </h1>

        <button className="w-[90%] self-center p-2 my-4 text-sm font-medium text-white bg-primary-blue rounded-xl">
          {pack.button_text}
        </button>

        <div className="px-4 flex flex-row gap-1 font-semibold items-center justify-start">
          <img src={ink} alt="ink" className="w-4 h-4" />
          <p className="text-light-grey text-xs">{pack.bonus_credits} ink credits Bonus</p>
        </div>
      </div>
    </div>
  );
}

function PlanCardForSixMonths({ plan, index }: { plan: any; index: number }) {
  return (
    <div className="flex-1 flex flex-col justify-between border border-gray-300 p-4 pr-2 min-h-full" key={index}>
      <section>
        <h1 className="font-semibold text-lg">{plan.name}</h1>

        <p className="text-light-grey font-medium text-xs mt-2">{plan.for}</p>

        <div className="flex flex-col gap-2 mt-4">
          {index > 0 && <p className="text-black text-xs font-medium">{plan.features[0]}</p>}

          {plan.features.slice(index < 0 ? 0 : 1, plan.features.length).map((fea: any) => (
            <div className="flex flex-row gap-2 items-center justify-start">
              <img src={tick} alt="tick" className="w-4 h-4 rounded-full pointer-events-none select-none" />
              <p className="text-xs font-medium text-light-grey">{fea}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h6 className="text-sm font-semibold my-4">
          <span className={"font-bold " + `${plan.original_per_sixmonths ? "line-through" : ""}`}>
            {plan.original_per_sixmonths ? `₹${plan.original_per_sixmonths}` : "Exclusive Invite Only"}
          </span>
          <span className="text-light-grey text-xs">
            {"  "}
            {plan.original_per_sixmonths ? "Original Price" : ""}
            {"  "}
          </span>
          <span className="text-primary-blue text-xs">
            {plan.off_price_sixmonth ? `${plan.off_price_sixmonth}% Off` : ""}
          </span>
        </h6>

        <h1>
          {plan.price_per_annum ? (
            <>
              <span className="text-2xl font-bold">₹{plan.price_per_annum}</span>
              <span className="text-light-grey text-xs font-semibold">{"  "}per annum</span>
            </>
          ) : (
            <span className="text-xl font-bold">Custom</span>
          )}
        </h1>
        <button className="w-full p-2 my-4 text-sm font-medium text-white bg-primary-blue rounded-xl">
          {plan.button_name}
        </button>
        <div className="flex flex-row gap-1 font-semibold items-center justify-start">
          <img src={ink} alt="ink" className="w-4 h-4" />
          <p className="text-light-grey text-xs">
            {" "}
            {plan.ink_credits_annum ? plan.ink_credits_annum : "Unlimited"} ink credits/
          </p>
          <p className="text-[#9999A0] text-xs"> month</p>
        </div>
      </section>
    </div>
  );
}
function PlanCardForAnnual({ plan, index }: { plan: any; index: number }) {
  return (
    <div key={index} className="flex-1 flex flex-col justify-between border border-gray-300 p-4 pr-2 min-h-full">
      <section>
        <h1 className="font-semibold text-lg">{plan.name}</h1>

        <p className="text-light-grey font-medium text-xs mt-2">{plan.for}</p>

        <div className="flex flex-col gap-2 mt-4">
          {index > 1 && <p className="text-black text-xs font-medium">{plan.features[0]}</p>}

          {plan.features.slice(index < 1 ? 0 : 1, plan.features.length).map((fea: any) => (
            <div className="flex flex-row gap-2 items-center justify-start">
              <img src={tick} alt="tick" className="w-4 h-4 rounded-full pointer-events-none select-none" />
              <p className="text-xs font-medium text-light-grey">{fea}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h6 className="text-sm font-semibold my-4">
          <span className={"font-bold " + `${plan.original_per_annum ? "line-through" : ""}`}>
            {index === 0 ? "" : plan.original_per_annum ? `₹${plan.original_per_annum}` : "Exclusive Invite Only"}
          </span>
          <span className="text-light-grey text-xs">
            {"  "}
            {plan.original_per_annum ? "Original Price" : ""}
            {"  "}
          </span>
          <span className="text-primary-blue text-xs">
            {plan.off_price_annum ? `${plan.off_price_annum}% Off` : ""}
          </span>
        </h6>

        <h1>
          {plan.price_per_annum ? (
            <>
              <span className="text-2xl font-bold">₹{plan.price_per_annum}</span>
              <span className="text-light-grey text-xs font-semibold">{"  "}per annum</span>
            </>
          ) : (
            <span className="text-xl font-bold">Custom</span>
          )}
        </h1>

        <button className="w-full p-2 my-4 text-sm font-medium text-white bg-primary-blue rounded-xl">
          {plan.button_name}
        </button>

        <div className="flex flex-row gap-1 font-semibold items-center justify-start">
          <img src={ink} alt="ink" className="w-4 h-4" />
          <p className="text-light-grey text-xs">
            {plan.ink_credits_annum ? plan.ink_credits_annum : "Unlimited"} ink credits/
          </p>
          <p className="text-[#9999A0] text-xs"> month</p>
        </div>
      </section>
    </div>
  );
}

const PlansList = [
  {
    name: "Beta Plan",
    for: "Only 1000 invites",
    ink_credits_annum: 5000,
    ink_credits_sixmonths: 0,
    price_per_annum: 100000,
    features: [
      "Unlimited Projects",
      "Multilingual Support",
      "Prewriting Tools",
      "Industry-standard Formatting",
      "Live Collaborative Editor",
      "Chat on File",
      "Priority Support",
      "Early Adopter Benefits",
      "A Year Access to all features",
      "Early Access to New Features",
    ],
    button_name: "Coming Soon",
  },
  {
    name: "Aspiring Writer",
    for: "For Beginners",
    price_per_annum: 4999,
    original_per_annum: 9999,
    price_per_sixmonths: 3299,
    original_per_sixmonths: 6599,
    ink_credits_annum: 7000,
    ink_credits_sixmonths: 5000,
    off_price_annum: 50,
    off_price_sixmonth: 50,
    features: [
      "Everything in Beta Plan, +",
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
      "Blockchain based Script Registry",
      "Contests & Screenwriter Engagement",
    ],
    button_name: "Coming Soon",
  },
  {
    name: "Indie Writer",
    for: "For Intermediate Writers",
    price_per_annum: 6999,
    original_per_annum: 14999,
    price_per_sixmonths: 4499,
    original_per_sixmonths: 8999,
    ink_credits_annum: 10000,
    ink_credits_sixmonths: 7000,
    off_price_annum: 53,
    off_price_sixmonth: 50,
    features: [
      "Everything in Aspiring Writer, +",
      "Intuitive Dictation Assistant",
      "Industry Standard Formatting",
      "OCR +Advanced Formatting",
      "Real Time Collaboration",
      "Crowd Collaborative Writing",
      "Peer to Peer & AI Validation",
      "Script Coverage",
      "Pitch Deck Builder",
      "Industry Connect & Market Place",
      "Writer’s Representation",
      "Director’s Toolkit",
      "Physical Plotting & Writing Books",
    ],
    button_name: "Coming Soon",
  },
  {
    name: "Professional Writer",
    for: "For Advanced Writers",
    price_per_annum: 9999,
    original_per_annum: 24999,
    price_per_sixmonths: 5999,
    original_per_sixmonths: 11999,
    ink_credits_annum: 15000,
    ink_credits_sixmonths: 10000,
    off_price_annum: 60,
    off_price_sixmonth: 50,
    features: [
      "Everything in Indie Writer, +",
      "Audio & Video conferencing",
      "Digital Smart Pen Integration",
      "Table Read",
      "Screenplay Audio Book",
      "Script Doctoring",
      "Screenplay Statistics & Reports",
      "Story Boards",
      "Translate Screenplays",
      "Transliterate Screenplays",
      "Advanced Director’s Toolkit",
      "Track Pitches",
      "Earn on the Platform",
    ],
    button_name: "Coming Soon",
  },
  {
    name: "Enterprise Writer",
    for: "For Writer’s Rooms/Studios",
    price_per_annum: null,
    original_per_annum: null,
    price_per_sixmonths: null,
    original_per_sixmonths: null,
    ink_credits_annum: null,
    ink_credits_sixmonths: null,
    off_price_annum: null,
    off_price_sixmonth: null,
    features: [
      "Everything in Professional Writer, +",
      "Manage Writer’s Rooms",
      "Discover Screenplays ",
      "Greenlight",
      "Pre Production Management ",
      "Budget and Schedule Tool",
      "Onboard Cast & Crew",
      "All Contracts  Management ",
      "Call Sheets & Daily Tracking",
      "Production to Post Management",
      "Vendor Management",
      "Payroll Management",
      "Smart Billing Management",
    ],
    button_name: "Contact Us",
  },
];

const CreditsPacks = [
  {
    name: "Starter Pack",
    credits: "5,000",
    describe: "Perfect for occasional writers who need a quick boost!",
    original_price: 999,
    offer_percent: 50,
    price_per_pack: 499,
    button_text: "Top Up Now",
    bonus_credits: 0,
  },
  {
    name: "Value Pack",
    credits: "10,000",
    describe: "Best for active writers who rely on AI tools and coverage.",
    original_price: 1999,
    offer_percent: 53,
    price_per_pack: 899,
    button_text: "Top Up Now",
    bonus_credits: 500,
  },
  {
    name: "Pro Pack",
    credits: "20,000",
    describe: "Ideal for advanced writers juggling multiple projects.",
    original_price: 4999,
    offer_percent: 60,
    price_per_pack: 1499,
    button_text: "Top Up Now",
    bonus_credits: 1000,
  },
  {
    name: "Studio Pack",
    credits: "50,000",
    describe: "Made for proffesionals managing intensive scripts.",
    original_price: 7999,
    offer_percent: 60,
    price_per_pack: 3499,
    button_text: "Top Up Now",
    bonus_credits: 5000,
  },
  {
    name: "Enterprise Pack",
    credits: "1,00,000",
    describe: "Designed for studios and writing rooms that need unlimited potential.",
    original_price: 12999,
    offer_percent: 60,
    price_per_pack: 6499,
    button_text: "Top Up Now",
    bonus_credits: 15000,
  },
];
