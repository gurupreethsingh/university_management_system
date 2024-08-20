import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

export default function PrivacyPolicy() {
  return (
    <div className="relative bg-white px-6 py-12 sm:py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Privacy Policy
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your privacy is important to us. This privacy policy explains what
            personal data we collect from you, how we use it, and how we protect
            it.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:gap-y-10">
          <div className="lg:max-w-lg lg:px-8">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Information We Collect
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-700">
              We collect information you provide directly to us. This may
              include personal data, such as your name, email address, phone
              number, and other contact details, when you fill out forms, sign
              up for our services, or otherwise interact with us.
            </p>
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CloudArrowUpIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Data Collection.
                  </strong>{" "}
                  We collect data to operate effectively and provide you the
                  best experiences with our services.
                </span>
              </li>
              <li className="flex gap-x-3">
                <LockClosedIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Secure Data.
                  </strong>{" "}
                  We prioritize your data security and use encryption and other
                  measures to protect your information.
                </span>
              </li>
              <li className="flex gap-x-3">
                <ServerIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Data Storage.
                  </strong>{" "}
                  Your data is stored securely in our servers with regular
                  backups to ensure its availability.
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:max-w-lg lg:px-8">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              How We Use Your Information
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-700">
              We use the information we collect in various ways, including to:
            </p>
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CloudArrowUpIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Provide Services.
                  </strong>{" "}
                  To provide, operate, and maintain our website and services.
                </span>
              </li>
              <li className="flex gap-x-3">
                <LockClosedIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Improve Experience.
                  </strong>{" "}
                  To improve, personalize, and expand our website and services.
                </span>
              </li>
              <li className="flex gap-x-3">
                <ServerIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Communicate.
                  </strong>{" "}
                  To communicate with you, either directly or through one of our
                  partners, including for customer service, to provide you with
                  updates and other information relating to the website, and for
                  marketing and promotional purposes.
                </span>
              </li>
              <li className="flex gap-x-3">
                <ServerIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Process Transactions.
                  </strong>{" "}
                  To process your transactions and manage your orders and
                  subscriptions.
                </span>
              </li>
            </ul>

            <h3 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              How We Share Your Information
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-700">
              We may share your information in the following situations:
            </p>
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CloudArrowUpIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    With Service Providers.
                  </strong>{" "}
                  We may share your information with our service providers who
                  assist us in providing our services, such as payment
                  processors, hosting providers, and analytics services.
                </span>
              </li>
              <li className="flex gap-x-3">
                <LockClosedIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    For Legal Requirements.
                  </strong>{" "}
                  We may disclose your information if required to do so by law
                  or in response to valid requests by public authorities.
                </span>
              </li>
              <li className="flex gap-x-3">
                <ServerIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    In Business Transfers.
                  </strong>{" "}
                  If we are involved in a merger, acquisition, or asset sale,
                  your information may be transferred as a business asset.
                </span>
              </li>
            </ul>

            <h3 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Your Data Protection Rights
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-700">
              Depending on your location, you may have the following rights
              regarding your personal data:
            </p>
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CloudArrowUpIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Right to Access.
                  </strong>{" "}
                  You have the right to request copies of your personal data.
                </span>
              </li>
              <li className="flex gap-x-3">
                <LockClosedIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Right to Rectification.
                  </strong>{" "}
                  You have the right to request that we correct any information
                  you believe is inaccurate or incomplete.
                </span>
              </li>
              <li className="flex gap-x-3">
                <ServerIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Right to Erasure.
                  </strong>{" "}
                  You have the right to request that we erase your personal
                  data, under certain conditions.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CloudArrowUpIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Right to Object to Processing.
                  </strong>{" "}
                  You have the right to object to our processing of your
                  personal data, under certain conditions.
                </span>
              </li>
            </ul>
            <p className="mt-8 text-base leading-7 text-gray-700">
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us at
              our email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
