import GetStarted from "@/app/components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";
import HomeLayout from "@/app/layout/HomeLayout";
import React from "react";

const ShippingPolicy = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 text-black garnet-regular sm:text-base text-sm min-h-screen"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/shipping/hero.png"}
          width={1200}
          height={650}
          alt={"Shipping Policy"}
          loading={"eager"}
          objectFit={"object-contain"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6">
          <p className="font-semibold">
            Thank you for choosing Screenplay.Ink, a digital screenwriting and
            film production management application. As our product is entirely
            digital, there is no physical shipping involved. This policy
            outlines the delivery process and access to our digital services.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">
            Digital Product Delivery
          </p>
          <p>
            Upon successful purchase or subscription to Screenplay.Ink, access
            to our platform and services will be delivered electronically. You
            will receive:
          </p>
          <ul>
            <li>
              <strong>Account Access:</strong> Instant access to the digital
              services associated with your subscription plan, provided your
              payment has been successfully processed.
            </li>
            <li>
              <strong>Confirmation Email:</strong> A confirmation email with
              details of your purchase, including your subscription plan and
              invoice.
            </li>
          </ul>
          <p className="font-semibold text-xl mt-4 mb-2">Access Instructions</p>
          <ul>
            <li>
              {" "}
              After completing your payment, log in to your account on
              Screenplay.Ink using your registered email and password.
            </li>
            <li>
              If you encounter any issues accessing your account or the
              purchased services, please contact our support team.
            </li>
          </ul>
          <p className="font-semibold text-xl mt-4 mb-2">
            No Physical Shipping
          </p>
          As Screenplay.Ink is a digital product, there are no physical goods to
          ship. All features, tools, and benefits are available through our
          online platform.
          <p className="font-semibold text-xl mt-4 mb-2">Delivery Timeline</p>
          <ul>
            <li>
              {" "}
              Access to the platform is typically granted immediately after
              payment confirmation.
            </li>
            <li>
              {" "}
              In rare cases of technical delays, please allow up to 24 hours for
              access. If you do not receive access within this time, contact our
              support team.
            </li>
          </ul>
          <p className="font-semibold text-xl mt-4 mb-2">
            Technical Requirements
          </p>
          <ul>
            To use our services, you will need:
            <li>A compatible device (computer, tablet, or smartphone).</li>
            <li> An active internet connection.</li>
            <li>
              {" "}
              Updated web browser or the Screenplay.Ink app (if applicable).
            </li>
          </ul>
          <p className="font-semibold text-xl mt-4 mb-2">
            Support and Assistance
          </p>
          <p>
            For any questions or issues related to accessing your digital
            subscription, please reach out to us at: Contact Information
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

export default ShippingPolicy;
