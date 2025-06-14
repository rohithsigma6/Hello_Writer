import {
    ConflictOption,
    genres,
    historicalPeriodsData,
    narrativeOptions,
    natureOptions,
    settings,
    timePeriods,
    tones,
    yearData,
  } from "../CoreData";
  import { useEffect, useMemo, useState } from "react";

 import Select, { components } from 'react-select';
  
  import ArrowIcon from '@/assets/downarrow.svg';

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
      <img src={ArrowIcon} alt="arrow" />
    </components.DropdownIndicator>
    );
  };

  const CoreSelection = ({ active, setActive, dropdownData, setDropdownData, handleSaveData }: any) => {
    const [indiaTimePeriod, setIndiaTimePeriod] = useState<any>(dropdownData?.indiaTimePeriod || null);
    const [historicalPeriods, setHistoricalPeriods] = useState<any>(dropdownData?.timePeriod || null);
    const [year, setYear] = useState<any>(dropdownData?.year || null);
    const [selectedGenres, setSelectedGenres] = useState<any>([]);
    const [selectedSubGenres, setSelectedSubGenres] = useState<any>([]);
    const [setting, setSetting] = useState<any>([]);
  
    const groupedOptions = Object.entries(settings).map(([heading, options]) => ({
      label: heading,
      options: options.map((option) => ({
        label: option,
        value: option,
      })),
    }));
  
    const handleGenreChange = (selected: any) => {  
      const selectedValues = selected ? selected : [];
      const genreValues = selectedValues.map((item: any) => item?.value);
      const validSubGenres = selectedGenres
      .flatMap((genre: any) => genres[genre.value] || []) // Flatten subgenres
      .map((subGenre: any) => (subGenre));
  
    // Update selected subgenres, remove any that are no longer valid
    const updatedSubGenres = dropdownData?.subGenre?.filter((sub: any) =>
      validSubGenres?.includes(sub)
    );   
      // Update selected genres
      setDropdownData((prev: any) => ({
        ...prev,
        genre: genreValues, 
        subGenre:updatedSubGenres 
      }));
      setSelectedGenres(selectedValues);
    
      // Reset subgenres when genres change
      // Only keep subgenres that match the selected genres

      setSelectedSubGenres(updatedSubGenres);
    };
    
    const handleToneChange = (selected: any) => {
      const selectedValues = selected ? selected : [];
      const genreValues = selectedValues.map((item: any) => item?.value);
  
      setDropdownData((prev: any) => ({
        ...prev,
        tone: genreValues,
      }));
      setSelectedGenres(selectedValues);
  
      // Reset subgenres when genres change
      setSelectedSubGenres([]);
    };
    console.log("-->>",dropdownData);
    
    const handleGlobalChange = (selected: any) => {
      const selectedValues = selected ? selected : [];
      const genreValues = selectedValues.map((item: any) => item?.value);
  
      setDropdownData((prev: any) => ({
        ...prev,
        globalHistoricalPeriod: genreValues,
        
      }));
      setSelectedGenres(selectedValues);
  
      // Reset subgenres when genres change
      setSelectedSubGenres([]);
    };
    const handleIndiaChange = (selected: any) => {
      const selectedValues = selected ? selected : [];
      const genreValues = selectedValues.map((item: any) => item?.value);
  
      setDropdownData((prev: any) => ({
        ...prev,
        indiaSpecificHistoricalPeriod: genreValues,
      }));
      setSelectedGenres(selectedValues);
  
      // Reset subgenres when genres change
      setSelectedSubGenres([]);
    };
    const handleSetingChange = (selected: any) => {
      const selectedValues = selected ? selected : [];
      const genreValues = selectedValues.map((item: any) => item?.value);
  
      setDropdownData((prev: any) => ({
        ...prev,
        setting: genreValues,
      }));
      setSetting(selectedValues);
    };
  
    const handleSubGenreChange = (selected: any) => {
      const selectedValues = selected ? selected : [];
      const subGenreValues = selectedValues.map((item: any) => item?.value);
  
      setDropdownData((prev: any) => ({
        ...prev,
        subGenre: subGenreValues,
      }));
      setSelectedSubGenres(selectedValues);
    };
  
  
    const handleManualYearChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
      setDropdownData({ ...dropdownData, [name]: e.target.value });
      // setManualYear(e.target.value)
      // debouncedSaveData(values);
    };
    useEffect(() => {
      if (dropdownData?.genre) {
        const result = dropdownData?.genre?.map((value: any) => ({
          label: value,
          value: value,
        }));
        setSelectedGenres(result);
      }
      if (dropdownData?.subGenre) {
        const result = dropdownData?.subGenre?.map((value: any) => ({
          label: value,
          value: value,
        }));
        setSelectedSubGenres(result);
      }
      if (dropdownData?.setting) {
        const result = dropdownData?.setting?.map((value: any) => ({
          label: value,
          value: value,
        }));
        setSetting(result);
      }
    }, [dropdownData]);
  
    const genreOptions = useMemo(() => {
      return Object.keys(genres).map((genre) => ({
        label: genre,
        value: genre,
      }));
    }, [genres]); // Recreate genreOptions only when genres change
  
    const subGenreOptions = useMemo(() => {
      return selectedGenres
        .flatMap((genre: any) => genres[genre.value] || []) // Flatten subgenres
        .map((subGenre: any) => ({
          label: subGenre,
          value: subGenre,
        }));
    }, [selectedGenres, genres]); // Recreate subGenreOptions only when selectedGenres or genres change
  
    const getSelectedOption = (value: any) => {
  
      if (Array.isArray(value)) {
        const result = value?.map((value: any) => ({
          label: value,
          value: value,
        }));
        // setSelectedGenres(result)
        return result;
      } else {
        if (value) {
          return {
            label: value,
            value: value,
          };
        }
      }
    };
  
    const handleYearChange = (selectedOption: any) => {
      if (selectedOption) {
        // setDropdownData({ ...dropdownData, year: selectedOption?.value }); // Update the parent component with the full object
        const values = { ...dropdownData, year: selectedOption?.value };
      }
  
      // Update local state (only if you need to track it in the component)
      setYear(selectedOption);
    };
  
    useEffect(() => {
      if (dropdownData?.indiaPeriod && dropdownData?.indiaPeriod !== indiaTimePeriod?.value) {
        setIndiaTimePeriod(dropdownData?.indiaPeriod);
      }
      // if (dropdownData?.globalHistoricalPeriod && dropdownData?.globalHistoricalPeriod !== historicalPeriods?.value) {
      //   setHistoricalPeriods(dropdownData?.globalHistoricalPeriod);
      // }
      if (dropdownData?.year && dropdownData?.year !== year?.value) {
        setYear(dropdownData?.year);
      }
    }, [dropdownData]);
  
    const globalTimePeriod = Object.entries(historicalPeriodsData).map(([category, items]) => ({
      label: category,
      options: items.map((item) => ({
        label: `${item?.label} (${item?.description})`,
        value: item?.value,
      })),
    }));
  
    const chooseYear = Object.entries(yearData).map(([category, items]) => ({
      label: category,
      options: items.map((item) => ({
        label: `${item?.label} (${item?.description})`,
        value: item?.value,
      })),
    }));
  
    const allTones = Object.entries(tones).map(([category, items]) => ({
      label: category,
      options: items.map((item) => ({
        label: `${item?.label} (${item?.description})`,
        value: item?.value,
      })),
    }));
    const indianTimePeriod = Object.entries(timePeriods).map(([category, items]) => ({
      label: category,
      options: items.map((item) => ({
        label: `${item?.label} (${item?.description})`,
        value: item.value,
      })),
    }));
    const handleChange = (selectedOption: any, name: string) => {
      if (selectedOption) {
        const updatedDropdownData = { ...dropdownData, [name]: selectedOption?.value };
  
        setDropdownData(updatedDropdownData);
      }
  
      setIndiaTimePeriod(selectedOption);
    };
    return (
      <>
        <p className="mt-[16px] font-normal text-[20px] text-[#9999A0] mb-[32px] font-poppins">
          Choose your genre to shape the tone and style of your story.
        </p>
  
        <div className="flex flex-col gap-y-4 bg-white px-[24px] pt-[32px] pb-[22px] rounded-[24px]">
          <section className="flex flex-col gap-y-6">
            <div className="w-full flex flex-row items-center gap-6">
              <div className="w-2/3 items-center relative">
                <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">Genre</label>
                <Select
                  isMulti
                  options={genreOptions}
                  value={getSelectedOption(dropdownData?.genre)}
                  onChange={handleGenreChange}
                  placeholder="Select genres..."
                  className="custom-arrow-down"
                  components={{ DropdownIndicator }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "16px",
                      padding: "14px 18px",
                      borderColor: "#0000005c",
                      color: "#D9D9D9",
                      fontSize: "16px",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                     
                  }}
                />
              </div>
  
              <div className="w-2/3 items-center relative">
                <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">Sub genre</label>
                <Select
                  isMulti
                  options={subGenreOptions}
                  value={getSelectedOption(dropdownData?.subGenre)}
                  onChange={handleSubGenreChange}
                  placeholder="Select subgenres..."
                  components={{ DropdownIndicator }}
                  isDisabled={selectedGenres.length === 0}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "16px",
                      padding: "14px 18px",
                      borderColor: "#0000005c",
                      color: "#D9D9D9",
                      fontSize: "16px",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                     
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-center gap-6 ">
              <div className="w-2/3 items-center relative">
                <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">Conflict</label>
                <Select
                  options={ConflictOption}
                  value={getSelectedOption(dropdownData?.conflict)}
                  onChange={(e) => handleChange(e, "conflict")}
                  placeholder="Select genres..."
                  components={{ DropdownIndicator }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "16px",
                      padding: "14px 18px",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />
              </div>
  
              <div className="w-2/3 items-center relative">
                <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">Nature of Story</label>
                <Select
                  options={natureOptions}
                  value={getSelectedOption(dropdownData?.natureOfStory)}
                  onChange={(e) => handleChange(e, "natureOfStory")}
                  placeholder="Nature of Story"
                  components={{ DropdownIndicator }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "16px",
                      padding: "14px 18px",
                    }),
  
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-center gap-6 ">
              <div className="w-2/3 items-center relative">
                <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">Structure</label>
                <Select
                  options={narrativeOptions}
                  value={getSelectedOption(dropdownData?.structure)}
                  onChange={(e) => handleChange(e, "structure")}
                  placeholder="Choose a narrative structure"
                  components={{ DropdownIndicator }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "10px",
                      padding: "14px 18px",
                    }),
  
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />
              </div>
  
              <div className="w-2/3 items-center relative">
                <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">Setting</label>
                <Select
                  isMulti
                  id="setting"
                  value={setting}
                  onChange={handleSetingChange}
                  placeholder="Choose a setting"
                  components={{ DropdownIndicator }}
                  options={groupedOptions}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "16px",
                      padding: "14px 18px",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-center gap-6 ">
              <div className="w-[49.3%] items-center relative">
                <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">Tone</label>
                <Select
                  options={allTones}
                  isMulti
                  onChange={handleToneChange}
                  value={getSelectedOption(dropdownData?.tone)}
                  placeholder="Choose a tone"
                  components={{ DropdownIndicator }}
                  getOptionLabel={(e: any) => e.label}
                  getOptionValue={(e: any) => e.value}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "10px",
                      padding: "14px 18px",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />
              </div>
            </div>
            <div>
              <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">Time Period</label>
              <div className="w-full flex flex-row items-center gap-6 ">
                <div className="w-2/3 items-center relative">
                  <label className="text-[#9999A0] font-normal font-poppins text-[14px] inline-block">
                    Global Historical Periods
                  </label>
                  <Select
                    options={globalTimePeriod}
                    isMulti
                    onChange={handleGlobalChange}
                    value={getSelectedOption(dropdownData?.globalHistoricalPeriod)}
                    placeholder="Historical Periods"
                    components={{ DropdownIndicator }}
                    getOptionLabel={(e: any) => e.label}
                    getOptionValue={(e: any) => e.value}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "16px",
                        padding: "14px 18px",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                    }}
                  />
                </div>
  
                <div className="w-2/3 items-center relative">
                  <label className="text-[#9999A0] font-normal font-poppins text-[14px] inline-block">
                    India Specific Historical Periods
                  </label>
                  <Select
                    options={indianTimePeriod}
                    isMulti
                    onChange={handleIndiaChange}
                    value={getSelectedOption(dropdownData?.indiaSpecificHistoricalPeriod)}
                    placeholder="Choose India Specific Historical Periods "
                    components={{ DropdownIndicator }}
                    getOptionLabel={(e: any) => e.label}
                    getOptionValue={(e: any) => e.value}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "16px",
                        padding: "14px 18px",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">Year</label>
              <div className="w-full flex flex-row items-center gap-6   mt-3">
                <div className="w-2/3 items-center relative">
                  
                  <Select
                    options={chooseYear}
                    onChange={(e) => handleChange(e, "year")}
                    value={getSelectedOption(dropdownData?.year)}
                    placeholder="Choose a Year/s"
                    components={{ DropdownIndicator }}
                    getOptionLabel={(e: any) => e.label}
                    getOptionValue={(e: any) => e.value}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "16px",
                        padding: "14px 18px",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                    }}
                  />
                </div>
  
                <div className="w-2/3 items-center relative">
                  <input
                    type="number"
                    name="manualYear"
                    className="w-full border border-gray-300 px-4 py-5 focus:ring-2 rounded-2xl  outline-none"
                    placeholder="Type a Year/s"
                    value={dropdownData?.manualYear}
                    onChange={(e) => handleManualYearChange(e, "manualYear")}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row items-center gap-6 mt-3">
              <div className="w-full items-center relative">
                <label className="text-[#9999A0] font-medium mb-[6px] font-poppins text-[16px] inline-block">
                  Write anything you wish to associate the world with
                </label>
                <input
                  className="w-full border border-gray-300 px-4 py-5 focus:ring-2 rounded-2xl  outline-none"
                  value={dropdownData?.worldAssociation}
                  onChange={(e) => handleManualYearChange(e, "worldAssociation")}
                  placeholder="Write about the world"
                />
              </div>
            </div>
          </section>
          <div className="w-full flex justify-end">
            <button
              className="py-[19px] px-[85px] text-white bg-primary-blue rounded-[16px] font-poppins"
              onClick={() => handleSaveData(dropdownData)}
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default CoreSelection;
  