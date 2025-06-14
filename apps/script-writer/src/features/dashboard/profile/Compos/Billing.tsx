import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaDownload } from "react-icons/fa6";
import { TbCreditCard, TbExclamationCircle } from "react-icons/tb";

const Billing = () => {
  const [data, setData] = useState( {});

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <section className="flex flex-row w-full items-center justify-between py-4 border-b border-slate-300">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">Billing</h1>
        </div>
      </section>

      <CurrentPlan />
      <Tabs />
      {/* <Paymentpage /> */}
    </div>
  );
};

export default Billing;

function CurrentPlan() {
  return (
    <section className="flex flex-col w-full">
      <div className="w-full flex flex-col gap-2 border p-4 my-4 rounded-2xl items-start">
        <p className="font-bold text-lg">Current plan: Indie Writer</p>

        <div>
          <p className="text-slate-500 text-sm">Status:</p>
          <p className="text-black font-medium">Active</p>
        </div>

        <div className="flex flex-row justify-between w-full items-start">
          <div>
            <p className="text-slate-500 text-sm">Next billing date:</p>
            <p className="text-black font-medium">November 15, 2024</p>
          </div>

          <button className="py-2 px-10 bg-primary-blue text-white rounded-2xl">Upgrade</button>
        </div>
      </div>
    </section>
  );
}

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [date, setDate] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <section className="w-full">
        <div className="bg-[#E9E9EA] w-fit p-2 flex flex-row gap-2 rounded-xl">
          <button
            onClick={() => setActiveTab(0)}
            className={
              `${activeTab === 0 ? "bg-white text-primary-blue" : "text-black bg-transparent"} ` +
              "px-4 py-2 text-sm font-medium rounded-lg"
            }
          >
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={
              `${activeTab === 1 ? "bg-white text-primary-blue" : "text-black bg-transparent"} ` +
              "px-4 py-2 text-sm font-medium rounded-lg"
            }
          >
            Subscription
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={
              `${activeTab === 2 ? "bg-white text-primary-blue" : "text-black bg-transparent"} ` +
              "px-4 py-2 text-sm font-medium rounded-lg"
            }
          >
            Payment Methods
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={
              `${activeTab === 3 ? "bg-white text-primary-blue" : "text-black bg-transparent"} ` +
              "px-4 py-2 text-sm font-medium rounded-lg"
            }
          >
            Email Preferences
          </button>
        </div>
      </section>

      {activeTab === 0 && (
        <section className="flex flex-col gap-4">
          <div>
            <h1 className="font-bold text-base mb-1">Transaction Hostory</h1>

            <div className="flex flex-row max-w-xl min-w-xl gap-2">
              <div className="w-full flex flex-row border rounded-2xl items-center relative">
                <input
                  type="text"
                  name="search"
                  className="pl-4 pr-10 py-2 w-full rounded-2xl text-sm bg-white"
                  placeholder="Search Transactions"
                />
                <FiSearch className="absolute right-0 mr-3" />
              </div>

              <div className="w-1/3 flex flex-row items-center relative">
                <input
                  className="w-full form-select appearance-none cursor-pointer select-arrow font-medium text-center flex flex-row gap-4 items-center border rounded-2xl p-2 text-sm relative"
                  aria-label="Default select example"
                  name="date"
                  type="date"
                  value={date}
                  onChange={handleChange}
                />
                {/* <FaAngleDown className="absolute right-4 text-slate-500" /> */}
              </div>
            </div>
          </div>

          <div>
            <table className="w-full border">
              <thead className="bg-[#E9E9EA]">
                <th className="py-3 px-4 text-start text-sm">Date</th>
                <th className="py-3 px-4 text-start text-sm">Description</th>
                <th className="py-3 px-4 text-start text-sm">Amount</th>
                <th className="py-3 px-4 text-start text-sm">Payment Method</th>
                <th className="py-3 px-4 text-start text-sm">Invoice</th>
                <th className="py-3 px-4 text-start text-sm">Status</th>
                <th className="py-2 px-10"></th>
                <th className="py-2 px-10"></th>
                <th className="py-2 px-10"></th>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 text-start text-sm">2024-10-15</td>
                  <td className="py-3 px-4 text-start text-sm">Indie Writer Monthly Subscription</td>
                  <td className="py-3 px-4 text-start text-sm">$69</td>
                  <td className="py-3 px-4 text-start text-sm">Credit Card</td>
                  <td className="py-3 px-4 text-start text-sm">
                    <button className="flex flex-row items-center gap-1">
                      <FaDownload />
                      Download
                    </button>
                  </td>
                  <td className="py-3 px-4 text-start text-sm">Successful</td>
                  <td className="py-2 px-10"></td>
                  <td className="py-2 px-10"></td>
                  <td className="py-2 px-10"></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-start text-sm">2024-09-15</td>
                  <td className="py-3 px-4 text-start text-sm">Indie Writer Monthly Subscription</td>
                  <td className="py-3 px-4 text-start text-sm">$69</td>
                  <td className="py-3 px-4 text-start text-sm">Credit Card</td>
                  <td className="py-3 px-4 text-start text-sm">
                    <button className="flex flex-row items-center gap-1">
                      <FaDownload />
                      Download
                    </button>
                  </td>
                  <td className="py-3 px-4 text-start text-sm">Successful</td>
                  <td className="py-2 px-10"></td>
                  <td className="py-2 px-10"></td>
                  <td className="py-2 px-10"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 1 && (
        <div className="flex flex-col gap-2 border rounded-2xl p-4">
          <p className="text-sm font-medium">Subscription Management</p>
          <p className="font-bold text-base">Current plan: Indie Writer - Montly</p>

          <div>
            <p className="text-slate-500 text-sm">Next billing date:</p>
            <p className="text-black font-medium">November 15, 2024</p>
          </div>

          <div>
            <p className="text-slate-500 text-sm">Amount:</p>
            <p className="text-black font-medium">$69 / Month</p>
          </div>

          <div className="flex flex-row gap-4 mt-4">
            <button className="py-2 px-6 text-sm bg-white hover:bg-[#585858] hover:text-white transition-colors border rounded-xl">
              Change Billing Cylce
            </button>
            <button className="py-2 px-6 text-sm bg-rose-500 hover:bg-rose-600 transition-colors text-white rounded-xl">
              Cancel Subscription
            </button>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="flex flex-col gap-4 border rounded-2xl p-4">
          <p className="text-sm font-medium">Payment Methods</p>

          <div className="flex flex-row">
            <div className="flex flex-col p-2 border border-gray-300 rounded-xl">
              <h1 className="font-bold text-lg">
                <TbCreditCard className="inline h-5 w-fit" /> Visa
              </h1>

              <p className="text-lg font-semibold mx-5">
                <span className="text-sm">XXXX XXXX XXX</span> 1234
              </p>

              <button className="self-end mt-4 py-1 px-4 border border-gray-400 transition-colors rounded-full hover:bg-[#585858] hover:text-white text-xs font-medium">
                Remove
              </button>
            </div>
          </div>

          <button className="w-fit py-2 px-6 text-sm bg-primary-blue transition-colors text-white rounded-xl">
            Add New Payment Method
          </button>
        </div>
      )}

      {activeTab === 3 && (
        <div className="flex flex-col gap-4 border rounded-2xl p-4">
          <p className="text-base font-bold">Email Notifications</p>

          <div className="flex flex-row gap-2 items-center">
            <input type="checkbox" name="renewal" className="custom-checkbox" />
            <label htmlFor="renewal" className="text-sm">Subscription renewal reminder</label>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <input type="checkbox" name="success-payments" className="custom-checkbox" />
            <label htmlFor="success-payments" className="text-sm">Successful payments notifications</label>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <input type="checkbox" name="failed-payments" className="custom-checkbox" />
            <label htmlFor="failed-payments" className="text-sm">Failed payments notifications</label>
          </div>
        </div>
      )}

      <section className="w-full">
        <div className="w-fit border border-gray-300 mx-auto text-sm rounded-2xl gap-2 flex flex-row items-center px-4 py-2">
          <TbExclamationCircle />
          Need Help?
        </div>
      </section>
    </div>
  );
}
