import React from "react";
import HomeLayout from "../../../layout/HomeLayout";
import GetStarted from "../../../components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";

const ScriptBloc = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen font-garnet garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/scriptbloc/hero.png"}
          width={1400}
          height={500}
          alt={"Real Time Collaboration"}
          loading={"eager"}
          objectFit={"object-contain w-full"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6 text-center">
          <p className="text-gray-500 text-lg">
            In today’s digital world, safeguarding intellectual property is more
            important than ever. Screenplay.ink leverages blockchain technology
            to provide a secure, immutable record of your screenplay, ensuring
            that your creative work is protected from unauthorized use or theft.
            By registering your script on the blockchain, you gain an
            indisputable timestamp and proof of ownership, empowering you with
            full control over your intellectual property.
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Permanent and Immutable Record
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Your Script, Locked Forever on the Blockchain
            </p>
            <p className="mt-6 text-gray-700">
              Once your screenplay is registered on the blockchain, it’s there
              permanently. Blockchain technology creates an unalterable record
              of your work, ensuring that no one can tamper with or erase your
              ownership claim. This permanent record acts as proof that you are
              the original creator, giving you peace of mind and a foundation
              for legal protection if your IP rights are ever challenged.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptbloc/record.png"}
              width={1400}
              height={500}
              alt={"Records"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptbloc/global.png"}
              width={1400}
              height={500}
              alt={"Global Verification and Trust"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Global Verification and Trust
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Establish Ownership Recognized Worldwide
            </p>
            <p className="mt-6 text-gray-700">
              Blockchain registration provides universal proof of your script’s
              authenticity and ownership, recognized across borders. With a
              unique verification link, anyone—whether producers, studios, or
              collaborators—can independently confirm the ownership and
              timestamp of your screenplay. This transparency fosters trust and
              credibility, making your script more attractive to potential
              buyers and partners.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]">
              Full Control Over Monetization and Licensing
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Safeguard Your Rights to Monetize and Share on Your Terms
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink’s blockchain protection allows you to maintain
              control over your screenplay’s distribution and usage. By proving
              ownership, you retain the exclusive right to license, distribute,
              or sell your script, knowing that your IP rights are secure.
              Whether you’re pitching to studios, selling to distributors, or
              publishing your script, blockchain protection empowers you to
              monetize your work on your terms.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptbloc/monitization.png"}
              width={1400}
              height={500}
              alt={"Control Over Monitization and Licensing"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptbloc/ownership.png"}
              width={1400}
              height={500}
              alt={"Ownership Details"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Easy and Transparent Access to Ownership Details
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Instantly Accessible Proof of Authenticity
            </p>
            <p className="mt-6 text-gray-700">
              Every registered screenplay comes with a digital certificate that
              includes a unique blockchain transaction ID and verification link.
              This certificate provides instant access to all relevant ownership
              details, making it easy for you or anyone else to verify your
              script’s authenticity at any time. By simplifying IP verification,
              Screenplay.ink streamlines the process of establishing your work’s
              legitimacy.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Offline and Online Accessibility
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Write Freely, We’ll Handle the Formatting
            </p>
            <p className="mt-6 text-gray-700">
              Write with confidence, whether you’re offline or online.
              Screenplay.ink’s offline capabilities ensure that you can capture
              ideas anytime, even in places without internet. Once you’re back
              online, everything syncs automatically, keeping your script
              updated and accessible from anywhere in the world.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptbloc/offline.png"}
              width={1400}
              height={500}
              alt={"Offline and Online"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
        </div>
      </div>

      <GetStarted />
    </HomeLayout>
  );
};

export default ScriptBloc;
