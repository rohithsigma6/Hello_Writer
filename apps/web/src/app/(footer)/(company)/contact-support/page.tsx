import ImageWrapper from "@/app/components/ImageWrapper";
import HomeLayout from "@/app/layout/HomeLayout";
import React from "react";

const ContactSupport = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen text-black garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/contact-support/hero.png"}
          width={1400}
          height={500}
          alt={"Contact Support"}
          loading={"eager"}
          objectFit={"object-fill"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6">
          <h1 className="text-2xl font-medium">Get in Touch</h1>
          <p className="text-base text-gray-600 mb-4">
            We are here to help you :)
          </p>

          <form action="">
            {/* Name */}
            <div className="flex flex-row w-full gap-4 mb-6">
              <div className="flex flex-col gap-1 w-1/2">
                <p className="font-medium">First Name*</p>
                <input
                  type="text"
                  name="firstname"
                  id=""
                  required
                  placeholder="Enter your First Name"
                  className="rounded-lg p-2 bg-transparent border border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <p className="font-medium">Last Name*</p>
                <input
                  type="text"
                  name="lastname"
                  id=""
                  required
                  placeholder="Enter your Last Name"
                  className="rounded-lg p-2 bg-transparent border border-gray-400"
                />
              </div>
            </div>
            {/* Contact */}
            <div className="flex flex-row w-full gap-4 mb-6">
              <div className="flex flex-col gap-1 w-1/2">
                <p className="font-medium">Phone Number*</p>
                <input
                  type="text"
                  name="phonenumber"
                  id=""
                  required
                  placeholder="Enter your Phone Numbre"
                  className="rounded-lg p-2 bg-transparent border border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <p className="font-medium">Email*</p>
                <input
                  type="text"
                  name="email"
                  id=""
                  required
                  placeholder="Enter your Email"
                  className="rounded-lg p-2 bg-transparent border border-gray-400"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-4">
              <p className="font-medium">Enter Message*</p>

              <textarea
                name="message"
                required
                className="p-2 bg-transparent border border-gray-400 rounded-lg appearance-none resize-none min-h-44"
                placeholder="Enter your message"
              ></textarea>
            </div>
          </form>

          <p className="font-medium text-2xl mt-20 mb-6">
            Contact Information
          </p>
          {/* <p>
            For any questions or concerns regarding these Terms, please contact
            us at:
          </p> */}
          <p>AJASTOS FILM TECHNOLOGY LABS PVT LTD </p>
          {/* <p>A-001, Movie Towers, Kokapet, Hyderabad-500075</p> */}
          <p>Email: hello@screenplay.ink </p>
          <p>Phone: 8006212222</p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ContactSupport;
