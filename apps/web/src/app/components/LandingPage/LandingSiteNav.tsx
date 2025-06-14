"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import ImageWrapper from "../ImageWrapper";

const LandingSiteNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const pricingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePricingMouseEnter = () => {
    if (pricingTimeoutRef.current) {
      clearTimeout(pricingTimeoutRef.current);
    }
    setIsPricingOpen(true);
  };

  const handlePricingMouseLeave = () => {
    pricingTimeoutRef.current = setTimeout(() => {
      setIsPricingOpen(false);
    }, 500);
  };

  return (
    <div className="px-5 sm:px-8 lg:px-16 bg-landing-bg text-black">
      <div className="flex flex-wrap items-center justify-between py-3">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full lg:w-auto">
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

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <span className="w-6 h-6">
                  {/* @ts-ignore */}
                  <RiCloseLine />
                </span>
              ) : (
                <span className="w-6 h-6">
                  {/* @ts-ignore */}
                  <RiMenu3Line />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div
          className={`${isMenuOpen ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row w-full lg:w-auto mt-2 lg:mt-0 justify-between lg:justify-start`}
        >
          <div className="flex flex-col lg:flex-row p-2">
            <a href="#product" className="flex mt-1 lg:mt-0 lg:ml-2 flex-row items-center gap-2">
              Product
              <span className="inline text-lg">
                {/* @ts-ignore */}
                <GoChevronDown />
              </span>
            </a>
          </div>
          <div className="flex flex-col lg:flex-row p-2">
            <a href="#solution" className="flex mt-1 lg:mt-0 lg:ml-2 flex-row items-center gap-2">
              Solution
              <span className="inline text-lg">
                {/* @ts-ignore */}
                <GoChevronDown />
              </span>
            </a>
          </div>
          <div className="flex flex-col lg:flex-row p-2">
            <a href="#community" className="flex mt-1 lg:mt-0 lg:ml-2 flex-row items-center gap-2">
              Community
              <span className="inline text-lg">
                {/* @ts-ignore */}
                <GoChevronDown />
              </span>
            </a>
          </div>
          <div className="flex flex-col lg:flex-row p-2">
            <a href="#company" className="flex mt-1 lg:mt-0 lg:ml-2 flex-row items-center gap-2">
              Company
              <span className="inline text-lg">
                {/* @ts-ignore */}
                <GoChevronDown />
              </span>
            </a>
          </div>
          <div className="flex flex-col lg:flex-row p-2">
            <div
              className="group inline-block relative"
              onMouseEnter={handlePricingMouseEnter}
              onMouseLeave={handlePricingMouseLeave}
            >
              <button className="mt-1 lg:mt-0 lg:ml-2 focus:outline-none">
                Pricing
              </button>
              {isPricingOpen && (
                <div className="absolute bg-white shadow-md mt-2 rounded w-48">
                  <Link
                    href="/pricing-betaplan"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Beta Pricing
                  </Link>
                  <Link
                    href="/pricing-regularplan"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Regular Pricing
                  </Link>
                  <Link
                    href="/pricing-lifeplan"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Lifetime Pricing
                  </Link>
                  <Link
                    href="/ink"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Ink Credits
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Login and Signup Buttons */}
        <div className="hidden lg:flex w-full lg:w-auto mt-2 lg:mt-0 justify-end">
          <Link href="https://dashboard.screenplay.ink/auth/login">
            <button className="pr-3 pl-3 pb-2 pt-2 border border-landing-btn-border rounded-xl mr-3 text-landing-btn-text font-bold cursor-pointer">
              Login
            </button>
          </Link>
          <Link href="https://dashboard.screenplay.ink/auth/register">
            <button className="pr-3 pl-3 pb-2 pt-2 text-white font-bold bg-landing-btn rounded-xl cursor-pointer">
              SignUp
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Buttons */}
      <div
        className={`${isMenuOpen ? "flex" : "hidden"
          } lg:hidden flex-col pb-4 w-full`}
      >
        <Link href="https://dashboard.screenplay.ink/auth/login">
          <button className="px-3 py-2 w-full border border-landing-btn-border rounded-xl text-landing-btn-text font-bold my-1">
            Login
          </button>
        </Link>
        <Link href="https://dashboard.screenplay.ink/auth/register">
          <button className="px-3 py-2 w-full text-white font-bold bg-landing-btn rounded-xl my-1">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingSiteNav;
