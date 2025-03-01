import React from "react";

const Footer = () => {
  return (
    <section className="py-10 bg-black sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <img className="w-auto h-9" src="/images/a.png" alt="Logo" />
            <p className="text-base leading-relaxed text-gray-300 mt-7">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
              explicabo dolor tempore dicta, dolores a officiis rerum molestias
              quibusdam modi?
            </p>
            <ul className="flex items-center space-x-3 mt-9">
              {[
                "M19.633 7.997c.013.175.013.349.013.523 ...",
                "M13.397 20.997v-8.196h2.765l.411-3.209h ...",
                "M11.999 7.377a4.623 4.623 0 1 0 0 9.248 ...",
                "M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 ...",
              ].map((path, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-600 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {["Company", "Help"].map((title, index) => (
            <div key={index}>
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                {title}
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  title === "Company"
                    ? ["Home", "About", "Listing", "Contact"]
                    : [
                        "Customer Support",
                        "Delivery Details",
                        "Terms & Conditions",
                        "Privacy Policy",
                      ],
                ][0].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="flex text-base text-gray-300 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
             Contact
            </p>
            <form className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-4 text-white placeholder-gray-500 transition-all duration-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-600" />
        <p className="text-sm text-center text-gray-400">
          © Copyright 2025, All Rights Reserved by PropX
        </p>
      </div>
    </section>
  );
};

export default Footer;
