import { useEffect, useState } from 'react';
import AddLocationModal from './AddLocationModal';
import LocationCard from './LocationCard';
import { useParams } from 'react-router';
import { useLocations } from '../api/location-data';

const Locationscontent = () => {
  const [locationModal, setLocationModal] = useState(false);
  const { fileId } = useParams<{ fileId: string }>();
  const { data, isLoading, error } = useLocations({ fileId });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    // onChange(selectedOption);
    if (data?.data) {
      setFilterData(data?.data);
    }
  }, [data]);
  const handleSort = (option) => {
    setSelectedOption(option);

    let sortedData;
    switch (option) {
      case 'By Name   A-Z':
        sortedData = [...filterData].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        break;
      case 'By Name   Z-A':
        sortedData = [...filterData].sort((a, b) =>
          b.name.localeCompare(a.name),
        );
        break;
      case 'First Created':
        sortedData = [...filterData].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
        break;
      case 'Last Updated':
        sortedData = [...filterData].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        );
        break;
      default:
        sortedData = filterData;
    }

    setFilterData(sortedData);
    setIsOpen(false); // Close the filter dropdown
  };
  return (
    <>
      <p className="mt-[16px] font-normal text-[20px] text-[#9999A0] mb-[32px] font-poppins">
        Choose your genre to shape the tone and style of your story.
      </p>

      <div className="flex flex-col gap-y-4 bg-white py-[32px] rounded-[24px] px-[27px]">
        {filterData?.length > 0 ? (
          <section
            className="flex gap-2 h-full"
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {/* <p className="text-2xl font-bold mx-auto">Add Scene Location</p>
         <p className="mt-1 font-light mx-auto"></p> */}

            {/* <button className="px-8 py-3 text-[#6A6A75] rounded-xl border " onClick={()=>setLocationModal(true)}>Sort By</button> */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-8 py-3 text-[#6A6A75] rounded-xl border h-full"
              >
                <p className="text-">Sort By</p>
              </button>

              {isOpen && (
                <div className="absolute w-52 mt-1 bg-white border rounded-lg shadow-lg z-10">
                  {[
                    'By Name   A-Z',
                    'By Name   Z-A',
                    'First Created',
                    'Last Updated',
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        // setSelectedOption(option);
                        handleSort(option);
                        setIsOpen(false);
                      }}
                      className={`w-full p-2 text-left hover:bg-gray-100 ${'text-black'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="px-8 py-3 text-white rounded-xl bg-primary-blue"
              onClick={() => setLocationModal(true)}
            >
              Add new location
            </button>
          </section>
        ) : (
          <section className="flex flex-col border-2 border-dashed border-[#E9E9EA] rounded-[16px] py-[40px] px-[16px]">
            <p className="text-2xl font-bold mx-auto text-[#212131] font-poppins">
              Add Scene Location
            </p>
            <p className="font-normal mx-auto text-[#6A6A75] text-[16px] font-poppins">
              Add a location to set the stage for your scene
            </p>

            <button
              className="px-[50px] py-[19px] text-white rounded-[16px] bg-primary-blue mx-auto mt-[12px] text-[16px] font-medium font-poppins"
              onClick={() => setLocationModal(true)}
            >
              Add location
            </button>
          </section>
        )}
        {!isLoading && data && filterData?.length > 0 && (
          <p className="text-2xl font-bold ">Locations</p>
        )}

        <div className="flex flex-wrap gap-6">
          {!isLoading &&
            data &&
            filterData?.length > 0 &&
            filterData.map((item: any, index: any) => (
              <LocationCard key={index} item={item} />
            ))}
        </div>

        {/* <LocationCard /> */}
      </div>

      {locationModal && (
        <AddLocationModal setOpenDeleteTagPopp={setLocationModal} />
      )}
    </>
  );
};

export default Locationscontent;
