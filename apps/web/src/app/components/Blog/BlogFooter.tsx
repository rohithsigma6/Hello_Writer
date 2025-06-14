import React from "react";
import ImageWrapper from "../ImageWrapper";
import Link from "next/link";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const BlogFooter = () => {
  return (
    <div className="relative bg-[#111111]">
      <div className="flex flex-row items-start justify-between gap-4 px-52 py-8">
        <div className="px-6">
          <ImageWrapper
            src="/assets/blogs/logo.svg"
            alt="logo"
            width={120}
            loading={"eager"}
            height={40}
          />
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-gray-500 font-medium">Product</p>

          {footerLinks.product.map((foo, index) => (
            <Link href={foo.link} key={index}>
              <button className="text-gray-400 text-left hover:underline">
                {foo.name}
              </button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-gray-500 font-medium">Solutions</p>

          {footerLinks.solutions.map((foo, index) => (
            <Link href={foo.link} key={index}>
              <button className="text-gray-400 text-left hover:underline">
                {foo.name}
              </button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-gray-500 font-medium">Community</p>

          {footerLinks.community.map((foo, index) => (
            <Link href={foo.link} key={index}>
              <button className="text-gray-400 text-left hover:underline">
                {foo.name}
              </button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-gray-500 font-medium">Company</p>

          {footerLinks.company.map((foo, index) => (
            <Link href={foo.link} key={index}>
              <button className="text-gray-400 text-left hover:underline">
                {foo.name}
              </button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-gray-500 font-medium">Legal</p>

          {footerLinks.legal.map((foo, index) => (
            <Link href={foo.link} key={index}>
              <button className="text-gray-400 text-left hover:underline">
                {foo.name}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-row px-52 py-4 border-t border-t-gray-600 items-center justify-between">
        <p className="text-gray-500 text-sm">
          ©2024 Screenplay.INK All rights reserved.
        </p>

        <div className="flex flex-row gap-4 text-lg text-gray-400">
          <button>
            {/* @ts-ignore */}
            <RiTwitterXLine />
          </button>
          <button>
            {/* @ts-ignore */}
            <FaFacebook />
          </button>
          <button>
            {/* @ts-ignore */}
            <FaInstagram />
          </button>
          <button>
            {/* @ts-ignore */}
            <FaLinkedin />
          </button>
        </div>
      </div>
    </div>
  );
};

const footerLinks = {
  product: [
    {
      name: "Screen Writer",
      link: "",
    },
    {
      name: "Screen Reader",
      link: "",
    },
    {
      name: "Director",
      link: "",
    },
    {
      name: "Cinematography",
      link: "",
    },
    {
      name: "Producer",
      link: "",
    },
    {
      name: "OTT",
      link: "",
    },
    {
      name: "Pricing",
      link: "",
    },
    {
      name: "Security and privacy",
      link: "",
    },
    {
      name: "What's New",
      link: "",
    },
  ],
  solutions: [
    {
      name: "Capture Creativity",
      link: "",
    },
    {
      name: "AI Screenplay Editor",
      link: "",
    },
    {
      name: "Real Time Collaboration",
      link: "",
    },
    {
      name: "ScriptBloc",
      link: "",
    },
    {
      name: "Script Analysis",
      link: "",
    },
    {
      name: "Pitch Maker",
      link: "",
    },
    {
      name: "Screenplay Audio Book",
      link: "",
    },
    {
      name: "Screenplay Marketplace",
      link: "",
    },
    {
      name: "Production Management",
      link: "",
    },
  ],
  community: [
    {
      name: "Screen Writers",
      link: "",
    },
    {
      name: "Screen Readers",
      link: "",
    },
    {
      name: "Directors",
      link: "",
    },
    {
      name: "Cinematographers",
      link: "",
    },
    {
      name: "Producers",
      link: "",
    },
  ],
  company: [
    {
      name: "About us",
      link: "",
    },
    {
      name: "Blog",
      link: "",
    },
    {
      name: "Contact Support",
      link: "",
    },
    {
      name: "Feedback",
      link: "",
    },
  ],
  legal: [
    {
      name: "Terms of service",
      link: "",
    },
    {
      name: "Privacy Policy",
      link: "",
    },
    {
      name: "Refund Policy",
      link: "",
    },
  ],
};
export default BlogFooter;
