import React from "react";
import ImageWrapper from "../ImageWrapper";

const Certified = () => {
  return (
    <div className="lg:my-24 my-16">
      <div className="sm:px-12 lg:px-20 xl:px-40 px-5 flex flex-col w-100 lg:gap-y-20 gap-y-5">
        <div>
          <h1 className="text-center font-bold text-landing-text text-2xl xs:text-3xl lg:text-5xl font-garnetSemi">
            Global Infrastructure, Local Compliance{" "}
          </h1>
          <h1 className="garnet-regular text-center sm:text-base text-sm mt-5 text-light-grey">
            Screenplay.INK adheres to the strictest global security standards,
            ensuring your script’s data security and privacy complies with
            international and local laws, including GDPR and India’s IT
            regulations.
          </h1>
        </div>

        <div className="flex md:flex-row flex-col md:gap-10 gap-5">
          <div className="p-4 xl:w-[40%] w-full bg-[#E0DDED] rounded-2xl flex flex-col gap-5 justify-between">
            <div className="lg:px-10 pointer-events-none select-none">
              <ImageWrapper
                src={"/assets/landingsite/certifiedFrame1.png"}
                alt="Hero Image"
                width={200}
                height={100}
                loading={"lazy"}
                className="w-full h-48 rounded-xl object-contain pointer-events-none select-none"
              />
            </div>

            <div>
              <h1 className="text-lg font-garnetSemi text-landing-text font-semibold">
                International Standards
              </h1>
              <p className="text-sm text-light-grey">
                Compliance Across Borders
              </p>
            </div>

            <p className="text-light-black garnet-regular sm:text-base text-sm">
              Our platform is ISO 27001 certified, guaranteeing that your data
              is handled securely, no matter where you're based.
            </p>
          </div>

          <div className="p-4 xl:w-[60%] w-full bg-[#E0DDED] rounded-2xl flex flex-col gap-5 justify-between">
            <div>
              <h1 className="text-lg font-garnetSemi text-landing-text font-semibold">
                Indian Data Centers
              </h1>
              <p className="text-sm text-light-grey">
                Localized for Indian Writers
              </p>
            </div>

            <p className="text-light-black garnet-regular sm:text-base text-sm">
              Dedicated servers in India ensure that all data complies with
              local IT regulations while providing seamless, fast access to your
              content.
            </p>

            <ImageWrapper
              src={"/assets/landingsite/certifiedFrame2.png"}
              alt="Hero Image"
              width={400}
              height={100}
              loading={"lazy"}
              className="w-full h-48 rounded-xl object-cover pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certified;
