import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FiMail, FiUploadCloud } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import defaultImage from "@/assets/profilesetting/defaultPhoto.svg";
import { Country, State } from "country-state-city";
// import { useChangePassword, useEditBasicInfo, useUser } from "hooks/useFetch";
import Select from "react-select";
// import { useProfile } from "@/context/profilecontext";
import check from "@/assets/signup/check.svg"
import eyeOff from "@/assets/signup/eyeOff.svg";
import eyeOn from "@/assets/signup/eyeOn.svg";
import noncheck from "@/assets/signup/nonCheck.svg";
import { enqueueSnackbar } from "notistack";
import { useUser } from "@/features/users/api/get-user";
import { usePostBasicInfo } from "../api/basic-info";
import { useNavigate } from "react-router";
import { usePostChangePassword } from "../api/update-password";

interface Payload {
  firstName?: any;
  lastName?: any;
  address?: any;
  city?: any;
  zip?: any;
  dob?: any;
  age?: any;
  gender?: any;
  email?: any;
  profile_image?: any;
  country?: any;
  state?: any;
  [key: string]: any; // This allows dynamic keys
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    textAlign: "start",
    // borderColor: "#d1d5db", // light gray border
    boxShadow: "none",
    borderRadius: "16px",
    "&:hover": { borderColor: "#000" }, // hover color
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
const BasicInfo = ({
  setProfileSetting,
  setSetupNow,
}: {
  setProfileSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setSetupNow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const { profileData, setProfileData } = useProfile();
  const [data, setData] = useState( {});
  const genders = [{value:"Female" ,label:"Female"},{ value:"Male" ,label:"Male"},{ value:"Other", label: "Other"}];
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
// 

  const postBasicInfoMutation = usePostBasicInfo();
  // const updateBasicInfo = useEditBasicInfo();
  const { data:user, refetch: refetchUser } = useUser();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    // console.log(data);
    setData({
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      address: user?.user?.profile?.basicInfo?.address,
      city: user?.user?.profile?.basicInfo?.city,
      zip: user?.user?.profile?.basicInfo?.zip,
      dob: user?.user?.profile?.basicInfo?.dob,
      age: user?.user?.profile?.basicInfo?.age,
      gender: user?.user?.profile?.basicInfo?.gender,
      email: user?.user?.email,
      profile_image: user?.user?.profile_image,
    });
if(user?.user?.profile?.basicInfo?.country){
  setSelectedCountry({
    value: Country?.getAllCountries()?.find((c) => c?.name === user?.user?.profile?.basicInfo?.country)?.isoCode||null,
    label: user?.user?.profile?.basicInfo?.country||null,
  });
}
if(user?.user?.profile?.basicInfo?.state){
  setSelectedState({ value: user?.user?.profile?.basicInfo?.state||null, label: user?.user?.profile?.basicInfo?.state || null });
}
  }, [user]);



  const handleSubmit = () => {
    const payload:Payload = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      address: data?.address,
      city: data?.city,
      zip: data?.zip,
      dob: data?.dob,
      age: data?.age,
      gender: data?.gender,
      email: data?.email,
      profile_image: data?.profile_image,
      country: selectedCountry?.label,
      state: selectedState?.label,
    };
    
    const formData = new FormData();

// Append each key-value pair from the JSON object to FormData
for (const key in payload) {
    formData.append(key, payload[key]);
}
postBasicInfoMutation.mutate(formData)
  };

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <section className="flex flex-row w-full items-center justify-between py-4 border-b border-slate-300">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">Personal information</h1>
          <p className="text-xs text-slate-500 font-medium">Update your photo and personal details here.</p>
        </div>

        <div className="flex flex-row gap-x-2 items-center">
          <button
            onClick={() => setProfileSetting(false)}
            className="border border-gray-500 px-10 py-3 font-medium rounded-2xl bg-white text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // setProfileData((prev) => ({ ...prev, screennwriting_style: data }));
              // setTimeout(() => {
              //   setProfileSetting(false);
              // }, 500);
              handleSubmit();
            }}
            className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
          >
            Save
          </button>
        </div>
      </section>

      {/**Photo */}
      <PhotoUpload data={data} setData={setData} />
      {/**Name */}
      <Name handleChange={handleChange} data={data} />

      <Birthdate data={data} handleChange={handleChange} setData={setData} />
      {/**Age */}
      <Age handleChange={handleChange} data={data} />

      {/**Gender */}
      <Gender data={data} handleChange={handleChange} genders={genders} setData={setData} />

      {/**Location */}
      <Location
        data={data}
        handleChange={handleChange}
        locationProps={{ selectedCountry, setSelectedCountry, selectedState, setSelectedState }}
      />

      {/**Email */}
      <Email handleChange={handleChange} data={data} />

      {/**Password */}
      <PassWord  />

      {/**Templates */}
      {/* <CustomTemplates /> */}

      {/**Cloud Backups*/}
      <CloudBackup setData={setData} data={data} />

      {/**Two factor verification */}
      <TwoFactorVerification setProfileSetting={setProfileSetting} setSetupNow={setSetupNow}  user={user}/>

      {/**Session */}
      <Session />

      {/**Account */}
      <Account />

      {/**About */}
      <About />
    </div>
  );
};

export default BasicInfo;

function Name({ handleChange, data }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; data: any }) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="firstname lastname" className="font-bold w-1/4 text-sm">
        Name
      </label>

      <div className="flex gap-x-4 w-2/4">
        <input
          type="text"
          name="firstName"
          value={data?.firstName || ""}
          placeholder="First Name"
          onChange={handleChange}
          className="w-1/2 px-4 py-2 text-sm border border-gray-300 rounded-2xl"
        />
        <input
          type="text"
          name="lastName"
          value={data?.lastName || ""}
          placeholder="Last Name"
          onChange={handleChange}
          className="w-1/2 px-4 py-2 text-sm border border-gray-300 rounded-2xl"
        />
      </div>
    </section>
  );
}

function Age({ handleChange, data }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; data: any }) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="age" className="font-bold w-1/4 text-sm">
        Age
      </label>

      <div className="flex w-2/4">
        <input
          type="text"
          name="age"
          value={data?.age}
          placeholder="Age"
          onChange={handleChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
        />
      </div>
    </section>
  );
}

function Gender({
  data,
  handleChange,
  genders,
  setData
}: {
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  genders: any;
  setData:any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="gender" className="font-bold w-1/4 text-sm">
        Gender
      </label>

      <div className="w-2/4 flex flex-row items-center relative">
        <Select
            options={genders}
            value={{label:data?.gender,value: data?.gender}}
            onChange={(value:any) => setData((prevValues:any) => ({
              ...prevValues,
              gender: value.value,
            }))}

            placeholder="Select Gender"
            components={{
              IndicatorSeparator: () => null,
            }} // Disable until a country is selected
            styles={customStyles}
            className="w-full"
          />
        {/* <FaAngleDown className="absolute right-4 text-slate-500" /> */}
      </div>
    </section>
  );
}

function Location({
  data,
  handleChange,
  locationProps,
}: {
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => any;
  locationProps: any | undefined | null;
}) {
  const { selectedCountry, setSelectedCountry, selectedState, setSelectedState } = locationProps;
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

 
  
  
  return (
    <section className="flex flex-row  w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="location" className="font-bold w-1/4 text-sm">
        Address
      </label>
      <div className="flex w-3/4 flex-wrap">
        <div className="flex px-1 py-1 w-full">
          <input
            type="text"
            name="address"
            value={data?.address}
            placeholder="Address line "
            onChange={() => handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
          />
        </div>
        <div className="flex px-1 py-1 w-1/2">
          <input
            type="text"
            name="city"
            value={data?.city}
            placeholder="City"
            onChange={() => handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
          />
        </div>
        <div className="flex px-1 py-1 w-1/2">
          <Select
            options={stateOptions}
            value={selectedState||null}
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
        <div className="flex px-1 py-1 w-1/2">
          <input
            type="text"
            name="zip"
            value={data?.zip}
            placeholder="Zip code"
            onChange={() => handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
          />
        </div>
        <div className="flex px-1 py-1 w-1/2">
          <Select
            options={countryOptions}
            value={selectedCountry||null}
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
      </div>
      {/* <div className="w-2/4 flex flex-row items-center relative">
        <select
          className="w-full form-select appearance-none cursor-pointer select-arrow font-medium text-center flex flex-row gap-4 items-center border border-gray-300 rounded-2xl px-4 py-2 text-sm relative"
          aria-label="Default select example"
          name="location"
          value={data?.location}
          onChange={handleChange}
        >
          {Locations.map((location, index) => (
            <option key={index} className="text-start" value={location}>
              {location}
            </option>
          ))}
        </select>
        <FaAngleDown className="absolute right-4 text-slate-500" />
      </div> */}
    </section>
  );
}
interface BirthdateProps {
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setData: any;
}

const Birthdate: React.FC<BirthdateProps> = ({ data, handleChange, setData }) => {
  const [birthdate, setBirthdate] = useState<string>('DD-MM-YYYY');

  // Handle change for day, month, and year
  const handleChangeBirthday = (field: 'day' | 'month' | 'year', value: string) => {
    const [day, month, year] = birthdate.split('-');
    const updatedDate = {
      day: field === 'day' ? value : day,
      month: field === 'month' ? value : month,
      year: field === 'year' ? value : year,
    };

    setData((prevValues: any) => ({
      ...prevValues,
      dob: `${updatedDate.day || 'DD'}-${updatedDate.month || 'MM'}-${updatedDate.year || 'YYYY'}`,
    }));
    setBirthdate(`${updatedDate.day || 'DD'}-${updatedDate.month || 'MM'}-${updatedDate.year || 'YYYY'}`);
    handleChange;
  };

  useEffect(() => {
    setBirthdate(data?.dob || 'DD-MM-YYYY');
  }, [data]);

  // Calculate age based on birthdate
  const calculateAge = (): number | null => {
    const [day, month, year] = birthdate.split('-');
    if (day === 'DD' || month === 'MM' || year === 'YYYY') return null;

    const today = new Date();
    const birthDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current month/day is before the birth month/day
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Generate options for day, month, and year
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  const yearOptions = Array.from({ length: 120 }, (_, i) => ({
    value: (new Date().getFullYear() - i).toString(),
    label: (new Date().getFullYear() - i).toString(),
  }));

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <label htmlFor="location" className="font-bold w-1/4 text-sm">
        Birthdate
      </label>
      <div className="flex w-2/4 gap-4 mb-6">
        {/* Day Selector */}
        <div className="w-1/3 flex flex-row items-center relative">
          <Select
            className="w-full"
            options={[ ...dayOptions]}
            value={{ value: birthdate?.split('-')[0], label: birthdate?.split('-')[0] }}
            onChange={(selectedOption: any) => handleChangeBirthday('day', selectedOption.value)}
            placeholder="DD"
            isSearchable={false}
            components={{ IndicatorSeparator: () => null }}
          />
          {/* <FaAngleDown className="absolute right-4 text-slate-500" /> */}
        </div>

        {/* Month Selector */}
        <div className="w-1/3 flex flex-row items-center relative">
          <Select
            className="w-full"
            options={[ ...monthOptions]}
            value={{ value: birthdate?.split('-')[1], label: birthdate?.split('-')[1] }}
            onChange={(selectedOption: any) => handleChangeBirthday('month', selectedOption.value)}
            placeholder="MM"
            isSearchable={false}
            components={{ IndicatorSeparator: () => null }}
          />
          {/* <FaAngleDown className="absolute right-4 text-slate-500" /> */}
        </div>

        {/* Year Selector */}
        <div className="w-1/3 flex flex-row items-center relative">
          <Select
            className="w-full"
            options={[ ...yearOptions]}
            value={{ value: birthdate?.split('-')[2], label: birthdate?.split('-')[2] }}
            onChange={(selectedOption: any) => handleChangeBirthday('year', selectedOption.value)}
            placeholder="YYYY"
            isSearchable={false}
            components={{ IndicatorSeparator: () => null }}
          />
          {/* <FaAngleDown className="absolute right-4 text-slate-500" /> */}
        </div>
      </div>
    </section>
  );
};



function PhotoUpload({ data, setData }: { data: any; setData: React.Dispatch<React.SetStateAction<any>> }) {
  const [file, setFile] = useState(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Replace with your default image URL

  const handleIconClick = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] || null;
    if (file) {


      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader?.result)
        setData((prevData: any) => ({ ...prevData, profile_image: file, file: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <div className="flex flex-col items-start w-1/4">
        <label htmlFor="photo" className="font-bold text-sm">
          Your Photo
        </label>
        <p className="text-gray-500 font-medium text-xs">This will be displayed on your profile</p>
      </div>

      <div className="w-2/4 flex flex-row items-start gap-x-4">
        <img
          src={ file ? file :data?.profile_image == "" || !data?.profile_image ? defaultImage : data?.profile_image}
          alt="Profile photo"
          className="min-w-14 max-w-14 h-14 rounded-full object-cover"
        />

        <div className="w-full border border-dashed rounded-2xl border-gray-300 p-4 flex flex-col items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            name="photo"
            className="hidden"
            value={data?.photo}
            onChange={handleFileChange}
            accept=".svg, .png, .jpg, .jpeg, .gif"
          />

          <div onClick={handleIconClick} className="p-2 bg-gray-300 rounded-full cursor-pointer">
            <FiUploadCloud className="text-2xl" />
          </div>

          <p className="text-sm">
            <span onClick={handleIconClick} className="text-green-500 hover:underline font-semibold cursor-pointer">
              Click to upload
            </span>{" "}
            or drag and drop
            <br />
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
      </div>
    </section>
  );
}

function Email({ handleChange, data }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; data: any }) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="email" className="font-bold w-1/4 text-sm">
        Email address
      </label>

      <div className="w-2/4 flex flex-row items-center relative">
        <input
          type="email"
          name="email"
          disabled
          placeholder="email"
          value={data?.email}
          onChange={handleChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl pl-10"
        />
        <FiMail className="absolute left-0 ml-3 text-slate-600" />
      </div>
    </section>
  );
}

function PassWord() {
  
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  
  // const  changePasswordMutation= useChangePassword();

  const { mutate, isLoading, error } = usePostChangePassword();
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
    currentPassword: ''
  });
  const conditions = {
    minLength: data?.password?.length >= 8,
    hasUppercase: /[A-Z]/.test(data?.password),   
    hasLowercase: /[a-z]/.test(data?.password),
    hasNumber: /\d/.test(data?.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(data?.password),
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Validate confirm password matches new password
    if (data.password !== data.confirmPassword) {
          enqueueSnackbar("New password and Confirm Password will be same", { variant: "warning" });
      return;
    }
    
    if (!Object.values(conditions).every(condition => condition)) {
          enqueueSnackbar("New password must be strong !", { variant: "warning" });
      return;
    }

    mutate({ password: data?.currentPassword,newPassword: data?.password },      {
      onSuccess: (response) => {
        enqueueSnackbar('Password changed successfully !',{ variant: "success" });
      },
      onError: (err) => {
        enqueueSnackbar('Password change failed !', { variant: "warning" });
      },
    });
    // Log old and new password
    console.log("Old Password:", data.currentPassword);
    console.log("New Password:", data.password);
  };
  return (
    <form autoComplete="false" className="w-full">
      <section className="flex flex-row w-full items-start pt-4  ">
        <label htmlFor="password" className="font-bold w-1/4 text-sm">
          Current Password
        </label>

        <div className="w-2/4 flex flex-row items-center">
          {/* <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
          /> */}
                    <div className="relative w-full">
            <input
              type={isCurrentPasswordVisible ? "text" : "password"}
              name="currentPassword"
              placeholder="Enter current password"
              value={data.currentPassword}
              onChange={(e) => setData({ ...data, currentPassword: e.target.value })}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
              autoComplete="off"
            />

            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}
            >
              <img
                src={isCurrentPasswordVisible ? eyeOff : eyeOn}
                alt="Hide Password"
                className="w-5 h-5"
              />
            </div>
          </div>

        </div>
      </section>
      <section className="flex flex-row w-full items-start pt-4  ">
        <label htmlFor="password" className="font-bold w-1/4 text-sm">
          New Password 
        </label>

        <div className="w-2/4 flex flex-row items-center">
          <div className="w-full">

          <div className="relative w-full">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter password"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
                  onFocus={() => setIsPopoverOpen(true)}
                  onBlur={() => setIsPopoverOpen(false)}
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <img
                    src={isPasswordVisible ? eyeOff : eyeOn} // Replace with the "eye-on" icon path
                    alt="Hide Password"
                    className="w-5 h-5"
                  />
                </div>
                {isPopoverOpen && (
                  <div className="absolute z-10 bg-white shadow-lg rounded-lg p-4 mt-2 w-max bottom-14 -right-1/3">
                    {/* Triangle (Caret) */}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[14px] border-l-transparent border-r-transparent border-t-white "></div>

                    <ul className="space-y-2 text-sm ">
                      <li className="flex gap-1">
                        <img src={conditions.minLength ? check : noncheck} alt="check" />
                        The password has to be at least 8 characters long.
                      </li>
                      <li className="flex gap-1">
                        <img src={conditions.hasUppercase ? check : noncheck} alt="check" />
                        The password has to contain one uppercase character.
                      </li>
                      <li className="flex gap-1">
                        <img src={conditions.hasLowercase ? check : noncheck} alt="check" />
                        The password has to contain one lowercase character.
                      </li>
                      <li className="flex gap-1">
                        <img src={conditions.hasNumber ? check : noncheck} alt="check" />
                        The password has to contain one number.
                      </li>
                      <li className="flex gap-1">
                        <img src={conditions.hasSpecialChar ? check : noncheck} alt="check" />
                        The password has to contain one special character.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
                <div className="w-full flex justify-end gap-1 mt-2">
                  <span className={`rounded-full px-2 text-sm ${conditions.minLength?"bg-primary-green text-white":"text-slate-400"}`}>***8</span>
                  <span className={`rounded-full px-2 text-sm ${conditions.hasUppercase?"bg-primary-green text-white":"text-slate-400"}`}>A-Z</span>
                  <span className={`rounded-full px-2 text-sm ${conditions.hasLowercase?"bg-primary-green text-white":"text-slate-400"}`}>a-z</span>
                  <span className={`rounded-full px-2 text-sm ${conditions.hasNumber?"bg-primary-green text-white":"text-slate-400"}`}>0-9</span>
                  <span className={`rounded-full px-2 text-sm ${conditions.hasSpecialChar?"bg-primary-green text-white":"text-slate-400"}`}>!.?</span>
                </div>
                </div>
        </div>
        
      </section>
           <section className="flex flex-row w-full items-start py-4 ">
        <label htmlFor="password" className="font-bold w-1/4 text-sm">
          Confirm Password
        </label>

        <div className="w-2/4 flex flex-row items-center">
           <div className="relative w-full">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={data.confirmPassword}
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            >
              <img
                src={isConfirmPasswordVisible ? eyeOff : eyeOn}
                alt="Hide Password"
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-row w-full items-start pb-4  border-b border-slate-300">
        <label htmlFor="password" className="font-bold w-1/4 text-sm">
        </label>

        <div className="w-2/4 flex flex-row items-center">
        <div className="flex flex-row gap-x-2 items-center">
          <button
            // onClick={() => setProfileSetting(false)}
            className="border border-gray-500 px-5 py-2 font-medium rounded-2xl bg-white text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
          >
            Update password
          </button>
        </div>
        </div>
      </section>
      {/* <div className="flex flex-row gap-x-2 items-center">
          <button
            // onClick={() => setProfileSetting(false)}
            className="border border-gray-500 px-5 py-2 font-medium rounded-2xl bg-white text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
          >
            Update password
          </button>
        </div> */}
    </form>
  );
}

function CloudBackup({ setData, data }: { setData: React.Dispatch<React.SetStateAction<any>>; data: any }) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <p className="font-bold w-1/4 text-sm">Cloud Backups</p>

      <div className="w-2/4 flex flex-col items-center gap-2">
        <button className="w-full p-2 border border-gray-300 rounded-2xl text-sm hover:bg-black hover:text-white transition-colors">
          Reconnect
        </button>
        <p className="text-xs">Your Backups are placed in your google drive folder</p>
        <p className="font-courier w-full p-2 border border-gray-300 rounded-2xl text-sm font-semibold">
          /Screenplay.INK/Backups
        </p>
        <p className="text-xs">Backups formats:</p>

        {data?.exportFDX ? (
          <div className="w-full bg-violet-100 flex flex-row items-center p-1 border border-gray-300 rounded-2xl">
            <p className="w-1/2 text-center">On</p>
            <button
              onClick={() => {
                setData((prev: any) => ({ ...prev, exportFDX: false }));
              }}
              className="w-1/2 p-1 rounded-md bg-white text-center text-primary-blue font-semibold"
            >
              FDX
            </button>
          </div>
        ) : (
          <div className="w-full bg-violet-100 flex flex-row items-center p-1 border border-gray-300 rounded-2xl">
            <button
              onClick={() => {
                setData((prev: any) => ({ ...prev, exportFDX: true }));
              }}
              className="w-1/2 p-1 rounded-md bg-white text-center text-primary-blue font-semibold"
            >
              FDX
            </button>
            <p className="w-1/2 text-center">Off</p>
          </div>
        )}

        {data?.exportText ? (
          <div className="w-full bg-violet-100 flex flex-row items-center p-1 border border-gray-300 rounded-2xl">
            <p className="w-1/2 text-center">On</p>
            <button
              onClick={() => {
                setData((prev: any) => ({ ...prev, exportText: false }));
              }}
              className="w-1/2 bg-white rounded-md p-1 text-center text-primary-blue font-semibold"
            >
              Fountain/Text
            </button>
          </div>
        ) : (
          <div className="w-full bg-violet-100 flex flex-row items-center p-1 border border-gray-300 rounded-2xl">
            <button
              onClick={() => {
                setData((prev: any) => ({ ...prev, exportText: true }));
              }}
              className="w-1/2 bg-white rounded-md p-1 text-center text-primary-blue font-semibold"
            >
              Fountain/Text
            </button>
            <p className="w-1/2 text-center">Off</p>
          </div>
        )}
      </div>
    </section>
  );
}

function CustomTemplates() {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <p className="font-bold w-1/4 text-sm">Custom Templates</p>

      <div className="w-1/4 flex flex-col items-start gap-y-2">
        <div className="w-full flex flex-row items-center justify-between">
          <p>
            Accidental Karma{" "}
            <span className="text-xs font-medium py-1 px-2 bg-green-400 text-white rounded-md">Outline</span>
          </p>
          <div className="flex flex-row gap-x-2 items-center">
            <button>
              <RiDeleteBin6Line className="hover:text-red-500" />
            </button>
            <button className="bg-primary-blue text-xs px-2 py-1 text-white font-medium rounded-md">Share</button>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-between">
          <p>
            Suttebazz <span className="text-xs font-medium py-1 px-2 bg-green-400 text-white rounded-md">Outline</span>
          </p>
          <div className="flex flex-row gap-x-2 items-center">
            <button>
              <RiDeleteBin6Line className="hover:text-red-500" />
            </button>
            <button className="bg-primary-blue text-xs px-2 py-1 text-white font-medium rounded-md">Share</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TwoFactorVerification({
  setProfileSetting,
  setSetupNow,
  user
}: {
  setProfileSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setSetupNow: React.Dispatch<React.SetStateAction<boolean>>;
  user:any;
}) {
  console.log("TwoFactorVerification",user?.user);
  const navigate = useNavigate();
  const getUser = JSON.parse(localStorage.getItem('user') as string);
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <p className="font-bold w-1/4 text-sm">Two-factor authentication</p>

      <div className="w-1/4 flex flex-row items-center gap-4">
        <button
          onClick={() => {
          if(user?.user?.isMfaActive){
            setSetupNow(true);
          }else{
            navigate(    
              '/auth/mfa',
              {
                replace: true,
              },
            );
          }
            // setProfileSetting(false);
          }}
          className="w-full p-2 border border-gray-300 rounded-2xl text-sm hover:bg-black hover:text-white transition-colors"
        >
          {getUser?.isMfaActive?"Disable Now" :"Setup now"}
        </button>
      </div>
    </section>
  );
}

function Session() {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <p className="font-bold w-1/4 text-sm">Session</p>

      <div className="w-2/4 flex flex-row items-center gap-4">
        <button className="w-1/2 p-2 border border-gray-300 rounded-2xl text-sm hover:bg-black hover:text-white transition-colors">
          Sign-out from devices
        </button>
        <button className="w-1/2 p-2 border border-gray-300 rounded-2xl text-sm hover:bg-black hover:text-white transition-colors">
          Manage devices
        </button>
      </div>
    </section>
  );
}

function Account() {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <p className="font-bold w-1/4 text-sm">Session</p>

      <div className="w-1/4 flex flex-row items-center gap-4">
        <button className="w-full p-2 border border-gray-300 rounded-2xl text-sm hover:bg-black hover:text-white transition-colors">
          Close account
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="flex flex-row w-full items-start py-4">
      <p className="font-bold w-1/4 text-sm">About</p>

      <div className="w-2/4 flex flex-col items-start gap-1 text-sm">
        <p>Screenplay.Ink a product of AJASTOS FILM TECHNOLOGY LABS PVT LTD</p>
        <p>Privacy Policy |Terms of Service</p>
      </div>
    </section>
  );
}
