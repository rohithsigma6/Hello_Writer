import React, { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { RiArrowDownWideFill, RiArrowUpWideFill } from 'react-icons/ri'

type OptionKey = keyof typeof OPTIONS

const OPTIONS = {
  Characters: ["VEDA", "Govardhan", "Sulochana", "Forest Minister", "Subba Raja", "Bhanu", "Lead Goon", "Prime Minister", "Officer Yash"],
  Extensions: ["(V.O)", "(O.S)", "(O.C)", "(CONT'D)", "(SUBTITLE)"],
  "Scene intros": ["INT", "EXT", "I/E"],
  Locations: ["Road", "Police Station", "Minister's House - Dining Room", "Graveyard", "Quarry", "Minister's House", "Pub"],
  Times: ["Day", "Night", "Afternoon", "Morning", "Evening", "Later", "Moments Later"],
  Transitions: ["CUT TO:", "FADE IN:", "FADE OUT:", "FADE TO:", "DISSOLVE TO:", "BACK TO:", "MATCH CUT TO:"],
} as const

const buttonOptions: OptionKey[] = Object.keys(OPTIONS) as OptionKey[]

function SmartType({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"Lists" | "Options">("Lists")
  const [buttonIndex, setButtonIndex] = useState(0)
  const [currentName, setCurrentName] = useState<string>(OPTIONS[buttonOptions[0]][0])

  const currentKey = buttonOptions[buttonIndex]
  const currentList = OPTIONS[currentKey]

  useEffect(() => {
    setCurrentName(currentList[0])
  }, [buttonIndex])

  if (!isOpen) return null

  return (
    <Modal setIsOpen={onClose} className="bg-white rounded-[24px] shadow-md w-[602px] p-[24px]" isOpen={isOpen}>
      <div className="flex justify-center mb-10 font-poppins">
        <div className="bg-[#E9E9EA] p-[6px] mx-auto rounded-lg inline-flex">
          {["Lists", "Options"].map((tab) => (
            <button
              key={tab}
              disabled={activeTab !== "Options"} // remove later
              onClick={() => setActiveTab(tab as "Lists" | "Options")}
              className={`${activeTab === tab ? "bg-white text-[#212131] font-medium" : "bg-transparent text-[#6A6A75]"} rounded-lg block py-2.5 px-12`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Lists" ?
        <>
          <section className="flex flex-row justify-between items-center gap-4 w-2/5 py-2 px-3 border border-gray-300 rounded-[16px] mb-6">
            <span className="font-medium">{currentKey}</span>
            <div className="flex flex-col">
              <button
                onClick={() => setButtonIndex((prev) => (prev > 0 ? prev - 1 : prev))}
                className="px-1 hover:bg-black hover:text-white transition-colors rounded-md"
              >
                {/* @ts-ignore */}
                <RiArrowUpWideFill />
              </button>
              <button
                onClick={() => setButtonIndex((prev) => (prev < buttonOptions.length - 1 ? prev + 1 : prev))}
                className="px-1 hover:bg-black hover:text-white transition-colors rounded-md"
              >
                {/* @ts-ignore */}
                <RiArrowDownWideFill />
              </button>
            </div>
          </section>

          <section className="w-full p-3 border border-gray-300 rounded-[16px] mb-3">
            <span className="font-medium">{currentName}</span>
          </section>

          <section className="flex flex-col rounded-xl border border-gray-300 min-h-48 max-h-48 overflow-y-auto">
            {currentList.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentName(item)}
                className={`px-4 py-2 text-start ${item === currentName ? "bg-gray-200 font-medium" : "bg-transparent"}`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </section>

          <section className="flex justify-start items-center gap-3 mb-10 mt-6">
            {["New", "Rebuild", "Alphabetize", "Delete"].map((action) => (
              <button
                key={action}
                className="text-primary-cta hover:bg-primary-cta hover:text-white transition-colors flex-1 py-1 font-medium border border-primary-cta rounded-lg"
              >
                {action}
              </button>
            ))}
          </section>

          <section className="flex justify-end">
            <button
              onClick={onClose}
              className="font-poppins rounded-xl w-1/3 text-[#6A6A75] hover:bg-gray-500 hover:text-white transition-colors font-medium py-4 text-[16px] border border-[#9999A0] max-w-[160px] mr-2"
            >
              Cancel
            </button>
            <button className="py-4 font-poppins text-[16px] rounded-xl w-1/3 max-w-[160px] bg-[#653EFF] hover:bg-[#5835e3] transition-colors text-white">
              Ok
            </button>
          </section>
        </>
        :
        <>
          <section>
            <p className='font-medium'>SmartType color:</p>

            <div className='w-10 h-10 mt-2 cursor-pointer bg-blue-500 rounded-md border-[3px] border-gray-300'>

            </div>
          </section>


          <section className="flex justify-end">
            <button
              onClick={onClose}
              className="font-poppins rounded-xl w-1/3 text-[#6A6A75] hover:bg-gray-500 hover:text-white transition-colors font-medium py-4 text-[16px] border border-[#9999A0] max-w-[160px] mr-2"
            >
              Cancel
            </button>
            <button className="py-4 font-poppins text-[16px] rounded-xl w-1/3 max-w-[160px] bg-[#653EFF] hover:bg-[#5835e3] transition-colors text-white">
              Ok
            </button>
          </section>
        </>
      }
    </Modal>
  )
}

export default SmartType
