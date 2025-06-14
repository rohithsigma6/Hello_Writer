import GetStarted from "@/app/components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";
import HomeLayout from "@/app/layout/HomeLayout";
import React from "react";

const RefundPolicy = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen text-black garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/refund/hero.png"}
          width={1200}
          height={650}
          alt={"Refund Policy"}
          loading={"eager"}
          objectFit={"object-contain"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6">
          <p className="font-semibold">
            Screenplay.Ink is currently offering a Beta Access Plan at a special
            discounted price of ₹2,999 per year (Regular Price: ₹9,999). This
            plan provides early access to our features, including real-time
            collaborative screenplay editing, prewriting tools, and multilingual
            support. As this is a Beta version, it may contain bugs or
            experience downtime, and the features may not function as expected.
            This policy outlines the terms for refunds and cancellations.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">
            Beta Version Disclaimer
          </p>
          <p>
            The Beta Access Plan is offered as a test and trial version, and
            users should be aware that it may contain errors or bugs. By
            subscribing to this plan, you acknowledge that: The platform may not
            be fully stable, and features may not work as intended. The company
            is not liable for any malfunctions, data loss, or issues arising
            from the use of the Beta version.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">No Refund Policy</p>
          Due to the special discounted pricing for the Beta Access Plan, all
          sales are final, and we do not offer refunds except under the
          following circumstances: Technical Issues:If you encounter a major,
          persistent technical issue that prevents you from accessing the core
          features of the platform, and we are unable to resolve it within a
          reasonable time frame. <br />
          Duplicate Payment:If you were accidentally charged multiple times for
          the same subscription period. In both cases, you must contact us
          within 7 days of the transaction for a refund request. <br />
          <br />
          If the refund is approved in any circumstances then we will process it
          within 7 working days.
          <p className="font-semibold text-xl mt-4 mb-2">Cancellation Policy</p>
          You may cancel your Beta Access subscription at any time through your
          account settings. Cancellation will not result in a refund, but your
          access will continue until the end of the current billing cycle. If
          you wish to avoid renewal charges, you must cancel your subscription
          at least 7 days before the next billing cycle.
          <p className="font-semibold text-xl mt-4 mb-2">
            Upgrade and Downgrade Policy
          </p>
          <p>
            As this is a Beta plan, no upgrades or downgrades are available
            during the Beta period. Any changes to your subscription will only
            be possible once the Beta phase ends and the standard plans are
            introduced.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">Exceptional Cases</p>
          <p>
            We reserve the right to make exceptions to this policy at our sole
            discretion. This includes but is not limited to cases of
            unauthorized transactions or other special circumstances deemed
            appropriate by our support team.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">Contact Information</p>
          <p>
            For any questions or concerns regarding these Terms, please contact
            us at:
          </p>
          <p>AJASTOS FILM TECHNOLOGY LABS PVT LTD </p>
          <p>A-001, Movie Towers, Kokapet, Hyderabad-500075</p>
          <p>Email: hello@screenplay.ink Phone: [8006212222]</p>
        </div>
      </div>

      <GetStarted />
    </HomeLayout>
  );
};

export default RefundPolicy;
