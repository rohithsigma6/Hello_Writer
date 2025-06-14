import React from "react";
import ImageWrapper from "../ImageWrapper";

const Security = () => {
  return (
    <div className="lg:my-24 xs:my-16 my-0">
      <div className="sm:px-12 lg:px-20 xl:px-40 px-5 flex flex-col w-100 xl:gap-y-20 gap-y-12">
        <div>
          <h1 className="text-center font-bold text-landing-text text-2xl xs:text-3xl lg:text-5xl font-garnetSemi">
            Enterprise-Grade Security for Your Scripts
          </h1>
          <h1 className="garnet-regular text-center sm:text-base text-sm mt-5 text-light-grey">
            Your ideas are your intellectual property, and protecting them is
            our top priority. We employ industry-leading security protocols to
            ensure your screenplay stays safe, secure, and accessible only to
            those you choose.
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 sm:gap-6 gap-3 xl:mx-10">
          {SecurityList.map((item) => (
            <SecurityCard
              key={item.name}
              name={item.name}
              sub={item.sub}
              desc={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function SecurityCard({
  name,
  sub,
  desc,
  image,
}: {
  name: string;
  sub: string;
  desc: string;
  image: any;
}) {
  return (
    <div className="bg-[#2D2C54] p-4 rounded-2xl flex flex-col gap-2">
      <ImageWrapper
        src={image}
        alt="Image"
        width={50}
        height={50}
        loading={"lazy"}
        className="pointer-events-none select-none lg:w-14 lg:h-14 sm:w-12 sm:h-12 w-10 h-10"
      />

      <div>
        <h1 className="text-[#FFBC4B] font-garnetSemi lg:text-lg sm:text-xl text-lg font-bold">
          {name}
        </h1>
        <p className="text-[#B3B3B3] font-poppins font-light lg:text-base text-sm">
          {sub}
        </p>
      </div>

      <p className="text-white garnet-regular leading-tight text-sm sm:mt-0 mt-2">
        {desc}
      </p>
    </div>
  );
}

const SecurityList = [
  {
    name: "Multi-factor Authentication",
    sub: "Strengthen Your Script's Security",
    description:
      "With advanced MFA protocols powered by OKTA, you can rest easy knowing your account is protected with biometric and SMS verification.",
    image: "/assets/landingsite/securityAuth.png",
  },
  {
    name: "Geo-distributed Cloud Storage",
    sub: "Global Security Standards",
    description:
      "Your scripts are secured with AES-256 encryption across geo-distributed data centers compliant with ISO 27001, GDPR, and India's PDPB regulations.",
    image: "/assets/landingsite/securityCloud.png",
  },
  {
    name: "Zero-Knowledge Encryption",
    sub: "Privacy at Its Best",
    description:
      "Not even our team can access your scripts without explicit permission. All AI features are designed to operate under complete privacy.",
    image: "/assets/landingsite/securityEncrypt.png",
  },
  {
    name: "Script Locking",
    sub: "Production-Grade Security",
    description:
      "Secure your script during production with advanced version control and script locking, preventing unauthorized changes and ensuring version accuracy.",
    image: "/assets/landingsite/securityLock.png",
  },
];

export default Security;
