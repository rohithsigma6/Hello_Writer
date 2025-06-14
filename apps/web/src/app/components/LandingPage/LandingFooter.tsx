import React from "react";
import Link from "next/link"; // Next.js routing
import ImageWrapper from "../ImageWrapper";
import { BsInstagram } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const footerList = [
  {
    header: "Solution",
    data: [
      { name: "Capture Creativity", link: "/capturecreativity" },
      { name: "AI Screenplay Editor", link: "/aiscreenplayeditor" },
      { name: "Real Time Collaboration", link: "/realtimecollaboration" },
      { name: "ScriptBloc", link: "/scriptbloc" },
      { name: "Script Analysis", link: "/scriptanalysis" },
      { name: "Pitch Maker", link: "/pitchmaker" },
      { name: "Screenplay Marketplace", link: "/marketplace" },
      { name: "Production Management", link: "/productionai" },
    ],
  },
  {
    header: "Company",
    data: [
      { name: "About us", link: "/about-us" },
      { name: "Feedback", link: "/feedback" },
      { name: "Contact Support", link: "/contact-support" },
      { name: "Formatting Guide", link: "/formatting-guide" },
      { name: "Blog", link: "/blogs" },
    ],
  },
  {
    header: "Pricing",
    data: [
      { name: "Beta Pricing", link: "/pricing-betaplan" },
      { name: "Pricing", link: "/pricing-regularplan" },
    ],
  },
  {
    header: "Legal",
    data: [
      { name: "Terms of Service", link: "/terms-and-conditions" },
      { name: "Privacy Policy", link: "/privacy" },
      { name: "Refund Policy", link: "/refund" },
      { name: "Shipping Policy", link: "/shipping-policy" },
    ],
  },
];

const LandingFooter = () => {
  return (
    <div className="font-light flex flex-col bg-landing-bg w-full">
      <div className="flex flex-col lg:flex-row gap-8 justify-center my-16 lg:px-0 px-5">
        <div className="lg:w-1/6 space-y-2 items-center lg:items-start">
          <Link href="/">
            <ImageWrapper
              src="/assets/landingsite/MainLogo.svg"
              alt="logo"
              width={150}
              loading={"eager"}
              height={40}
              className="sm:w-fit w-28"
            />
          </Link>

          <p className="text-light-grey md:mt-0 mt-10">
            Email: hello@screenplay.ink
          </p>
        </div>

        {footerList.map(({ header, data }, index) => (
          <FooterSection key={index} header={header} data={data} />
        ))}
      </div>

      <hr className="bg-light-grey h-0.5" />

      <div className="flex flex-col sm:flex-row lg:justify-around justify-between sm:items-center my-8 lg:px-0 px-5">
        <div className="sm:hidden flex gap-4 am:mb-0 mb-4">
          <Links />
        </div>

        <p className="text-light-grey">
          ©{new Date().getFullYear()} Screenplay.ink All rights reserved.
        </p>
        {/* <div>
          <p className="text-light-grey flex font-garnet font-semibold italic ml-7">
            Made With For The Craft in India
          </p>
        </div> */}
        <div className="sm:flex hidden gap-4 mt-4 lg:mt-0">
          <Links />
        </div>
      </div>
    </div>
  );
};

const Links = () => {
  return (
    <>
      <a
        href="https://x.com/Screenplay_ink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="w-5 h-5 text-black">
          {/* @ts-ignore */}
          <IoLogoLinkedin />
        </span>
      </a>
      <a
        href="https://www.instagram.com/screenplay.ink/?igshid=YmMyMTA2M2Y%3D"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="w-5 h-5 text-black">
          {/* @ts-ignore */}
          <BsInstagram />
        </span>
      </a>
      <a
        href="https://www.facebook.com/screenplay.ink/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="w-5 h-5 text-black">
          {/* @ts-ignore */}
          <FaFacebook />
        </span>
      </a>
      <a
        href="https://www.linkedin.com/company/ajastos-film-technology-labs-pvt-ltd/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="w-5 h-5 text-black">
          {/* @ts-ignore */}
          <RiTwitterXFill />
        </span>
      </a>
    </>
  );
};

const FooterSection = ({
  header,
  data,
}: {
  header: string;
  data: { name: string; link: string }[];
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-[#43479b85] font-garnetMed font-semibold text-lg">
        {header}
      </h3>
      {data.map((item, index) => (
        <Link href={item.link} key={index}>
          <p className="hover:underline text-light-grey py-1">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default LandingFooter;
