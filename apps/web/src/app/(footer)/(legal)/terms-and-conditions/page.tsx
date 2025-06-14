import GetStarted from "@/app/components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";
import HomeLayout from "@/app/layout/HomeLayout";
import React from "react";

const TermsAndConditions = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 text-black min-h-screen garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/termsandconditions/hero.png"}
          width={1200}
          height={650}
          alt={"Terms and conditions"}
          loading={"eager"}
          objectFit={"object-contain"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6">
          <p className="font-semibold">
            Welcome to Screenplay.Ink, a product owned by AJASTOS FILM
            TECHNOLOGY LABS PVT LTD, located at A-001, Movie Towers, Kokapet,
            Hyderabad-500075, India. By accessing or using our services, you
            agree to comply with these Terms and Conditions
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">Introduction</p>
          <p>
            These Terms govern your use of Screenplay.Ink, a digital
            screenwriting and film production management application provided as
            a Software as a Service (SaaS). By using our platform, website, or
            services, you agree to these Terms and our Privacy Policy. If you do
            not agree, please do not use our services.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">Acceptance of Terms</p>
          <p>
            By accessing or using Screenplay.Ink, you confirm that you have
            read, understood, and agreed to be bound by these Terms. If you are
            using the platform on behalf of an organization, you represent that
            you have the authority to bind that organization to these Terms.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">Eligibility</p>
          <p>
            You must be at least 18 years old to use Screenplay.Ink. By using
            our services, you confirm that you meet this age requirement.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">
            User Account and Registration
          </p>
          <p>
            To access certain features of our platform, you must register for an
            account. You agree to provide accurate, current, and complete
            information during registration. You are responsible for maintaining
            the confidentiality of your account credentials and for any
            activities that occur under your account.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">Services Provided</p>
          <div>
            Screenplay.Ink offers a variety of services, including but not
            limited to:
            <ul className="px-5 py-2" style={{ listStyleType: "disc" }}>
              <li>Real-time collaborative screenplay writing</li>
              <li>Automated screenplay formatting</li>
              <li>
                Blockchain-based screenplay registration and IP protection{" "}
              </li>
              <li>Production management tools </li>
              <li> AI-enabled story generation and editing features</li>
            </ul>
            All services provided are subject to these Terms and any additional
            terms that may be specified for particular services.
          </div>
          <p className="font-semibold text-xl mt-4 mb-2">
            Intellectual Property
          </p>
          <p>
            All content on Screenplay.Ink, including text, graphics, logos, and
            software, is the property of AJASTOS FILM TECHNOLOGY LABS PVT LTD or
            its licensors and is protected by copyright, trademark, and other
            intellectual property laws. Users may not reproduce, modify,
            distribute, or exploit any content without our explicit permission.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">User Content</p>
          <p>
            By submitting or posting content on Screenplay.Ink, you grant us a
            non-exclusive, worldwide, royalty-free license to use, modify,
            distribute, and display your content as necessary to provide our
            services. You represent that you have the right to share the content
            and that it does not infringe on any third-party rights.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">
            Privacy and Data Protection
          </p>
          <p>
            Your use of the platform is subject to our Privacy Policy. We
            collect, use, and store personal data in accordance with applicable
            laws. By using Screenplay.Ink, you consent to the collection and use
            of your data as outlined in our Privacy Policy.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">
            Payment and Subscription
          </p>
          <p>
            Access to certain features of Screenplay.Ink requires a
            subscription. Payment terms and pricing are available on our
            website. By purchasing a subscription, you agree to the payment
            terms and authorize us to charge your chosen payment method.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">
            Refund and Cancellation Policy
          </p>
          <p>
            Cancellations and refunds are governed by our Refund and
            Cancellation Policy. Users may cancel their subscription at any
            time, but refunds will only be provided if requested within [X days]
            of the purchase date. Please refer to our Refund Policy for detailed
            terms.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">User Conduct</p>
          <div>
            You agree not to:
            <ul className="px-5 py-2" style={{ listStyleType: "disc" }}>
              <li>
                {" "}
                Use the platform for any illegal or unauthorized purpose.
              </li>
              <li> Transmit any harmful or malicious code.</li>
              <li>Interfere with the security or integrity of the platform.</li>
              <li>Violate any applicable laws or regulations.</li>
            </ul>
          </div>
          <p className="font-semibold text-xl mt-4 mb-2">
            Limitation of Liability
          </p>
          <p>
            Screenplay.Ink and AJASTOS FILM TECHNOLOGY LABS PVT LTD are not
            liable for any direct, indirect, incidental, or consequential
            damages arising from your use of the platform. We do not guarantee
            that our services will be error-free or uninterrupted.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">Indemnification</p>
          <p>
            You agree to indemnify and hold harmless AJASTOS FILM TECHNOLOGY
            LABS PVT LTD, its affiliates, officers, directors, and employees
            from any claims, damages, losses, or expenses arising from your use
            of the platform or violation of these Terms.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">
            Modifications to Terms
          </p>
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting on our website. Continued use
            of the platform after such changes constitutes acceptance of the new
            Terms.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">
            Governing Law and Dispute Resolution
          </p>
          <p>
            These Terms are governed by the laws of India. Any disputes arising
            from these Terms or your use of the platform will be subject to the
            exclusive jurisdiction of the courts in Hyderabad, Telangana.
          </p>
          <p className="font-semibold text-xl mt-4 mb-2">Termination</p>
          <p>
            We reserve the right to terminate or suspend your account at our
            sole discretion if you violate these Terms or engage in any conduct
            that we deem harmful to the platform or other users.
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
    </HomeLayout>
  );
};

export default TermsAndConditions;
