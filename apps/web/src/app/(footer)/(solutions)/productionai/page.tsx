import React from "react";
import HomeLayout from "../../../layout/HomeLayout";
import GetStarted from "../../../components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";

const ProductionManagement = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen garnet-regular sm:text-base text-sm text-black"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/productionai/hero.png"}
          width={1400}
          height={650}
          alt={"Production Management"}
          loading={"eager"}
          objectFit={"object-contain"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6 text-center">
          <p className="text-lg text-gray-600">
            Screenplay.ink brings the power of AI to film production management,
            providing a suite of tools designed to simplify and optimize
            workflows across all stages of filmmaking. From pre-production
            planning to on-set coordination and post-production oversight, our
            AI-driven platform enables producers, directors, and crew members to
            collaborate effectively and manage complex production details with
            ease. Here’s how Screenplay.ink’s production management features
            make every aspect of filmmaking more efficient.
          </p>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full text-center md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Advanced Script Breakdowns for Comprehensive Planning
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Automate Breakdowns to Save Time and Reduce Errors
            </p>
            <p className="mt-6 text-gray-700">
              Script breakdowns are crucial for organizing a production, and
              Screenplay.ink’s AI automates this process, identifying and
              categorizing elements like characters, props, costumes, locations,
              and more. By automating the breakdown, Screenplay.ink ensures that
              nothing is overlooked, saving hours of manual work and providing a
              solid foundation for scheduling, budgeting, and resource
              allocation.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/productionai/scriptBreakdowns.png"}
              width={650}
              height={650}
              alt={"Script Breakdowns"}
              loading={"eager"}
              objectFit={"object-contain"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/productionai/aiGenarated.png"}
              width={650}
              height={650}
              alt={"AI-Generated Storyboards"}
              loading={"eager"}
              objectFit={"object-contain"}
            />
          </div>
          <div className="md:w-full text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              AI-Generated Storyboards and Visual Planning
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Transform Scripts into Visual Concepts Instantly
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink’s AI-powered storyboard generator allows filmmakers
              to create visual representations of scenes quickly. Using AI image
              generation, the platform turns descriptions into rough storyboard
              images, helping directors and cinematographers visualize the flow
              of scenes and communicate their vision to the team. This feature
              enhances pre-visualization, aligning everyone on the creative
              approach before shooting begins.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full text-center md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]">
              Seamless Scheduling and Task Management
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Optimize Schedules and Coordinate with Ease
            </p>
            <p className="mt-6 text-gray-700">
              Coordinating schedules and managing crew tasks can be challenging,
              especially in large productions. Screenplay.ink’s AI analyzes
              production needs and generates optimized shooting schedules that
              account for location availability, actor schedules, and weather
              conditions. With integrated task management, crew members can
              track responsibilities, update progress, and ensure every detail
              aligns with the overall production plan.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/productionai/scheduling.png"}
              width={650}
              height={650}
              alt={"Scheduling"}
              loading={"eager"}
              objectFit={"object-contain"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/productionai/budgeting.png"}
              width={650}
              height={650}
              alt={"Budgeting and Resource Allocation"}
              loading={"eager"}
              objectFit={"object-contain"}
            />
          </div>
          <div className="md:w-full text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Budgeting and Resource Allocation Aligned with Production
              Requirements
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Stay on Budget Without Compromising Quality
            </p>
            <p className="mt-6 text-gray-700">
              Budgeting is simplified with AI-driven insights that link
              production requirements to estimated costs, helping producers
              allocate resources efficiently. Screenplay.ink allows you to track
              expenses across departments, from props and costumes to location
              fees and set construction. By providing real-time budget updates,
              the platform helps production teams make informed financial
              decisions and avoid budget overruns.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full text-center md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Real-Time Production Analytics for Smarter Decisions
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Gain Insights into Every Aspect of Production
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink’s production management tools include analytics
              that monitor progress, track productivity, and identify potential
              bottlenecks. From cast availability to equipment usage, these
              analytics provide actionable data that enables producers and line
              managers to make smarter, data-driven decisions on the fly. This
              oversight reduces delays and ensures a smoother, more organized
              production process.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/productionai/analysis.png"}
              width={650}
              height={650}
              alt={"Analytics"}
              loading={"eager"}
              objectFit={"object-contain"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/productionai/oversight.png"}
              width={650}
              height={650}
              alt={"Oversight"}
              loading={"eager"}
              objectFit={"object-contain"}
            />
          </div>
          <div className="md:w-full text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Comprehensive Post-Production Oversight
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Ensure a Smooth Transition from Shooting to Editing
            </p>
            <p className="mt-6 text-gray-700">
              The platform’s AI tools continue to support filmmakers in
              post-production by organizing footage, logging scenes, and
              managing editing schedules. Screenplay.ink helps teams oversee
              post-production timelines, ensuring that editors and VFX teams
              have all the necessary resources and information. This seamless
              transition from on-set production to post-production accelerates
              the process of turning raw footage into a polished final product.
            </p>
          </div>
        </div>
      </div>

      <GetStarted />
    </HomeLayout>
  );
};

export default ProductionManagement;
