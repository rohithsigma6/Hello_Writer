import ImageWrapper from "@/app/components/ImageWrapper";
import HomeLayout from "@/app/layout/HomeLayout";
import React from "react";

const Privacy = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 text-black min-h-screen garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/privacy/hero.png"}
          width={1400}
          height={650}
          alt={"Privacy Policy"}
          loading={"eager"}
          objectFit={"object-contain"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6">
          <p className="font-semibold">
            This Privacy Policy describes how AJASTOS FILM TECHNOLOGY LABS PVT
            LTD ("we," "us," "our") collects, uses, discloses, and protects your
            information through our website and platform, Screenplay.Ink
            ("Platform"). By accessing or using our services, you consent to the
            collection and use of your information as outlined in this Privacy
            Policy.
          </p>
          <p className="font-semibold text-xl mt-6 mb-2">Introduction</p>
          <p>
            This Privacy Policy is published in compliance with the Information
            Technology Act, 2000 and the Information Technology (Reasonable
            Security Practices and Procedures and Sensitive Personal Data or
            Information) Rules, 2011. It is designed to help you understand how
            we collect, use, store, and protect your information when you use
            Screenplay.Ink.
          </p>
          <p className="font-semibold text-xl mt-6 mb-2">
            Information We Collect
          </p>
          <p>We collect the following types of information: </p>
          <div className="px-5">
            <p>
              a. Personal Information: This includes your name, email address,
              phone number, billing address, and payment details when you
              register or purchase a subscription on our Platform.
            </p>
            <p>
              b. Sensitive Personal Data: With your explicit consent, we may
              collect sensitive data such as financial information (e.g.,
              credit/debit card details) for payment processing.
            </p>
            <p>
              c. Usage Data: We collect data related to your interactions with
              our Platform, such as IP addresses, device information, browser
              type, access times, and pages viewed.
            </p>
            <p>
              d. Cookies and Tracking Technologies: We use cookies and similar
              technologies to collect information about your browsing
              activities. This helps us improve the user experience and analyze
              usage patterns.
            </p>
          </div>
          <p className="font-semibold text-xl mt-6 mb-2">
            How We Use Your Information
          </p>
          We use your information for the following purposes:
          <ul className="px-4" style={{ listStyleType: "disc" }}>
            <li>To provide, maintain, and improve our services.</li>
            <li>To process transactions and manage subscriptions.</li>
            <li>To personalize your experience on the Platform.</li>
            <li>
              To communicate with you, including responding to your inquiries
              and sending service-related notifications.
            </li>
            <li>
              To enforce our Terms and Conditions and prevent misuse of our
              services.
            </li>
            <li>
              To comply with legal obligations and respond to lawful requests
              from authorities.
            </li>
          </ul>
          <p className="font-semibold text-xl mt-6 mb-2">
            How We Share Your Information
          </p>
          We may share your information with:
          <ul className="px-4">
            <li>
              a. Service Providers: Third-party vendors who assist us in
              providing our services, such as payment processors, hosting
              providers, and analytics services.
            </li>
            <li>
              b. Business Partners:Affiliates and business partners who help us
              deliver additional services or enhance our offerings.
            </li>
            <li>
              c. Legal Obligations:We may disclose your information to comply
              with legal requirements, respond to court orders, or protect our
              rights, users, and the public. We do not sell your personal
              information to third parties.
            </li>
          </ul>
          <p className="font-semibold text-xl mt-6 mb-2">Data Security</p>
          <p>
            We implement industry-standard security measures, including
            encryption and secure server technologies, to protect your personal
            information. However, please be aware that no method of transmission
            over the Internet or electronic storage is completely secure, and we
            cannot guarantee absolute security.
          </p>
          <p className="font-semibold text-xl mt-6 mb-2">Your Rights</p>
          <p>You have the right to:</p>
          <ul className="px-4" style={{ listStyleType: "disc" }}>
            <li>Access your personal information.</li>
            <li>Update or correct inaccurate information.</li>
            <li>Request the deletion of your account and personal data.</li>
            <li>
              Withdraw consent for data processing (this may impact your access
              to certain features of the Platform).
            </li>
          </ul>
          <p>To exercise these rights, please contact us at </p>
          <p className="font-semibold text-xl mt-6 mb-2">Data Retention</p>
          <p>
            We retain your personal information only as long as necessary to
            fulfill the purposes outlined in this Privacy Policy or as required
            by law. Upon your request to delete your data, we will remove your
            personal information from our active databases, but some information
            may be retained in our archives for legal, compliance, or analytical
            purposes.
          </p>
          <p className="font-semibold text-xl mt-6 mb-2">Cookies Policy</p>
          <p>We use cookies to:</p>
          <ul className="px-4" style={{ listStyleType: "disc" }}>
            <li>Enhance your user experience.</li>
            <li>Analyze usage patterns and improve our services.</li>
            <li>Provide personalized content and recommendations.</li>
          </ul>
          <p>
            You can control the use of cookies through your browser settings.
            However, disabling cookies may affect your experience on our
            Platform.
          </p>
          <p className="font-semibold text-xl mt-6 mb-2">Third-Party Links</p>
          <p>
            Our Platform may contain links to third-party websites or services.
            We are not responsible for the privacy practices of these
            third-party sites. We recommend reviewing their privacy policies
            before providing any personal information.
          </p>
          <p className="font-semibold text-xl mt-6 mb-2">Children's Privacy</p>
          <p>
            Our services are not directed to individuals under the age of 18. We
            do not knowingly collect personal information from children under
            18. If we become aware that we have collected such information, we
            will take steps to delete it promptly.
          </p>
          <p className="font-semibold text-xl mt-6 mb-2">
            International Data Transfers
          </p>
          <p>
            Your information may be transferred to and processed in countries
            other than your own. We ensure that such transfers comply with
            applicable data protection laws and that appropriate safeguards are
            in place.
          </p>
          <p className="font-semibold text-xl mt-6 mb-2">
            Changes to This Privacy Policy
          </p>
          <p>
            We reserve the right to update this Privacy Policy at any time.
            Changes will be posted on this page with an updated effective date.
            We encourage you to review this Privacy Policy periodically for any
            updates. Continued use of our Platform after changes are posted
            constitutes your acceptance of the revised policy.
          </p>
          <p className="font-semibold text-xl mt-6 mb-2">Grievance Officer</p>
          <p>
            In accordance with the Information Technology Act, 2000 and rules
            made thereunder, the name and contact details of the Grievance
            Officer are provided below:{" "}
          </p>
          <p>Grievance Officer: Rakesh Vanka</p>
          <p>Designation: Founder </p>
          <p>Email: hello@screenplay.ink</p>
          <p>Office Address: A-001, Movie Towers, Kokapet, Hyderabad-500075</p>
          <p>Working Hours: Monday to Friday (10:00 AM - 5:00 PM)</p>
          <p className="font-semibold text-xl mt-6 mb-2">Contact Information</p>
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

export default Privacy;
