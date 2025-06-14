import { FaTimes } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { usePostBasicInfo } from "@/features/file/screenplay/api/profile-basicinfo";
import { useUser } from "@/features/users/api/get-user";

type Props = {
  setCurruntModal: (value: null) => void;
};

const AddressModal = ({ setCurruntModal }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

    const {data:user} = useUser();
console.log(user);



    useEffect(() => {
      setSelectedCountry({value:Country.getAllCountries()?.find(country=>country.name===user?.user?.profile?.basicInfo?.country)?.isoCode,label:user?.user?.profile?.basicInfo.country})
      setSelectedState({value:user?.user?.profile?.basicInfo.state,label:user?.user?.profile?.basicInfo.state})
      setAddress(user?.user?.profile?.basicInfo.address)
      setCity(user?.user?.profile?.basicInfo.city)
      setZip(user?.user?.profile?.basicInfo.zip)
      setEmail(user?.user?.email)
setPhoneNumber(user?.user?.phoneNo)
    }, [user?.user?.profile?.basicInfo])
    
  const postBasicInfoMutation = usePostBasicInfo();
  // Country options for dropdown
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  // State options (based on selected country)
  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.name,
        label: state.name,  
      }))
    : [];

  const modalStyles =
    "relative bg-white xs:rounded-lg shadow-xl xs:max-w-2xl max-w-full xs:h-auto h-screen w-full flex flex-col";

  // Custom styles for react-select
  const customStyles = {
    control: (base: any) => ({
      ...base,
      textAlign: "start",
      borderColor: "#d1d5db", // light gray border
      boxShadow: "none",
      borderRadius: "16px",
      "&:hover": { borderColor: "#653EFF" }, // hover color
    }),
    menu: (base: any) => ({
      ...base,
      margin: 0,
      textAlign: "start",
    }),
    menuList: (base: any) => ({
      ...base,
      padding: 0,
    }),
  };

  // Handle Save action
  const handleSave = () => {
    const payload = {
      address,
      country: selectedCountry?.label,
      state: selectedState?.label,
      city,
      zip,
    };
    postBasicInfoMutation.mutate(payload)
    setCurruntModal(null); // Close the modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal Content */}
      <div className={modalStyles}>
        {/* Header */}
        <div className="flex justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-black">Enter Production house's contact details</h2>
          <button
            aria-label="Close modal"
            onClick={() => setCurruntModal(null)}
            className="text-black hover:text-black"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4 px-5 py-6">
          {/* Address Line 1 */}
          <div>
            <label htmlFor="address" className="text-sm font-medium text-black mb-2 block text-start ">
              Address Line 1:
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#653EFF]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-black mb-2 block text-start">Country:</label>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={(value) => {
                setSelectedCountry(value);
                setSelectedState(null); // Reset state when country changes
              }}
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder="Select Country"
              styles={customStyles}
              className="w-full"
            />
          </div>

          {/* State Dropdown */}
          <div>
            <label className="text-sm font-medium text-black mb-2 block text-start">State:</label>
            <Select
              options={stateOptions}
              value={selectedState}
              onChange={(value) => setSelectedState(value)}
              placeholder="Select State"
              components={{
                IndicatorSeparator: () => null,
              }}
              isDisabled={!selectedCountry} // Disable until a country is selected
              styles={customStyles}
              className="w-full"
            />
          </div>

          {/* City and Zip */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="city" className="text-sm font-medium text-black mb-2 block text-start">
                City:
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#653EFF]"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="zip" className="text-sm font-medium text-black mb-2 block text-start">
                Zip:
              </label>
              <input
                id="zip"
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#653EFF]"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-black mb-2 block text-start">Email Address:</label>
            <input
              type="email"
              disabled
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#653EFF]"
            />
          </div>
          {/* Phone Number */}
          <div className="address-phone">
            <label className="text-sm font-medium text-black mb-2 block text-start">Phone Number:</label>
            <PhoneInput
              country={"us"} // Default country
              value={phoneNumber}
              disabled
              // onChange={(value) => setPhoneNumber(value)}
              inputStyle={{
                width: "100%",
                height: "40px",
                border: "1px solid #d1d5db",
                borderRadius: "16px",
              }}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 px-5 py-4 border-t">
          <button
            onClick={() => setCurruntModal(null)}
            className="px-6 py-2 text-[#653EFF] rounded-2xl hover:bg-[#E6E4FF] transition w-24"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#653EFF] text-white rounded-2xl hover:bg-[#512ED7] transition w-24"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
