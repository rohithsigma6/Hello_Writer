import React from 'react'
import ImageWrapper from '../ImageWrapper';

const Analysis = () => {
    return (
      <div className="lg:my-24 my-16">
        <div className="sm:px-12 lg:px-20 xl:px-40 px-5">
          <h1 className="text-center sm:text-xl text-base font-bold text-landing-btn-text font-garnetMed">
            POWERED BY ANALYTICS
          </h1>
          <h1 className="text-center font-bold text-landing-text text-2xl xs:text-3xl lg:text-5xl mt-5 font-garnetSemi">
            End-to-End Production Management
          </h1>
          <h1 className="garnet-regular text-center sm:text-base text-sm mt-5 text-light-grey">
            Screenplay.ink empowers producers and studios to streamline the entire
            production workflow, ensuring a seamless and foolproof execution that
            translates into saving hundreds of hours and significant cost
            reductions.
          </h1>
        </div>
  
        <div className="mx-5 xs:mx-14 md:mx-20 lg:mx-28 2xl:mx-40 sm:mt-20 mt-10 flex flex-col sm:flex-row xl:gap-10 gap-5 xl:items-center">
          <div className="flex-1 pointer-events-none select-none">
            <ImageWrapper
              src={"/assets/landingsite/AnalysisFrame1.png"}
              alt="Hero Image"
              width={600}
              height={400}
              loading={"eager"}
              className="sm:block hidden pointer-events-none select-none w-full"
            />
            <ImageWrapper
              src={"/assets/landingsite/AnalysisResponsiveFrame1.png"}
              alt="Hero Image"
              width={200}
              height={400}
              loading={"eager"}
              className="sm:hidden block pointer-events-none select-none w-full"
            />
          </div>
          <div className="flex-1 pointer-events-none select-none">
            <ImageWrapper
              src={"/assets/landingsite/AnalysisFrame2.png"}
              alt="Hero Image"
              width={600}
              height={400}
              loading={"eager"}
              className="sm:block hidden pointer-events-none select-none w-full"
            />
            <ImageWrapper
              src={"/assets/landingsite/AnalysisResponsiveFrame2.png"}
              alt="Hero Image"
              width={200}
              height={400}
              loading={"eager"}
              className="sm:hidden block pointer-events-none select-none w-full"
            />
          </div>
        </div>
      </div>
    );
  };

export default Analysis