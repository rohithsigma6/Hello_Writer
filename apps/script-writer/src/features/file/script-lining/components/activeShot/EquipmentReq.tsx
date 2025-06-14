import React, { useState } from 'react'
import { GoChevronDown, GoPlus } from 'react-icons/go';
import AddNew from '../../modal/AddNew';
import { IoCloseCircle } from 'react-icons/io5';

const equipmentOptionsMap: Record<string, string[]> = {
  "Main Camera": ["GoPro", "RED", "Canon", "Sony", "Blackmagic"],
  "Lenses": ["Wide Angle", "Telephoto", "Prime", "Zoom"],
  "Support": ["Tripod", "Gimbal", "Slider"],
  "Filters": ["ND Filter", "Polarizer", "UV"],

  "Microphones": ["Lavalier", "Shotgun", "Condenser"],
  "Recorder": ["Zoom H6", "Tascam DR-40X"],
  "Boom": ["Boom Pole", "Shock Mount"],
  "Accessories": ["Windshield", "XLR Cables"],

  "Key Light": ["Aputure 120D", "Godox SL60W"],
  "Fill Light": ["Softbox", "Bounce Card"],
  "Backlight": ["RGB Tube", "LED Panel"],
  "Practicals": ["Bulbs", "Lamps"],
  "Modifiers": ["Barn Doors", "Softbox", "Grid"],

  "Dolly": ["Track Dolly", "Floor Dolly"],
  "Jib": ["Mini Jib", "Heavy Jib"],
  "Stands": ["C-Stand", "Light Stand"],
  "Rigging": ["Clamps", "Arms", "Brackets"],

  "Monitors": ["SmallHD", "Atomos Ninja"],
  "Power": ["V-Mount Battery", "Power Bank"],
  "Storage": ["SSD", "CF Cards", "SD Cards"],
  "Cables & Adapters": ["HDMI", "SDI", "Audio Splitters"],
  "Maintenance": ["Lens Cloth", "Brush", "Air Blower"]
};

const EquipmentReq = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="mt-6 border border-gray-400 rounded-xl p-4 text-sm">
      <header onClick={() => setOpen(!open)} className='flex flex-row cursor-pointer items-center justify-between'>
        <label className="text-sm font-semibold block cursor-pointer">Equipments Required</label>

        <button className={`${open ? "rotate-180" : "rotate-0"}`}>
          {/* @ts-ignore */}
          <GoChevronDown className='text-xl' />
        </button>
      </header>

      {open &&
        <section className="mt-4 space-y-4">
          <EquipmentSection
            title="Camera Equipment"
            items={['Main Camera', 'Lenses', 'Support', 'Filters']}
          />
          <EquipmentSection
            title="Sound Equipment"
            items={['Microphones', 'Recorder', 'Boom', 'Accessories']}
          />
          <EquipmentSection
            title="Lighting Equipment"
            items={['Key Light', 'Fill Light', 'Backlight', 'Practicals', "Modifiers"]}
          />
          <EquipmentSection
            title="Grip Equipment"
            items={['Dolly', 'Jib', 'Stands', 'Rigging']}
          />
          <EquipmentSection
            title="Additional Equipment"
            items={['Monitors', 'Power', 'Storage', 'Cables & Adapters', 'Maintenance']}
          />
        </section>
      }
    </div>
  )
}

export const EquipmentSection = ({ title, items }: { title: string; items: string[] }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="border border-gray-400 rounded-2xl p-4 bg-white">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button className={`${open ? "rotate-180" : "rotate-0"}`}>
          {/* @ts-ignore */}
          <GoChevronDown className='text-xl' />
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-3">
          {items.map((item, i) => (
            <EquipmentItemRow key={i} label={item} />
          ))}
        </div>
      )}
    </div>
  );
};

type EquipmentItemRowProps = {
  label: string;
};

export const EquipmentItemRow = ({ label }: EquipmentItemRowProps) => {
  const itemsList = equipmentOptionsMap[label] || [];
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState<string[]>(itemsList);

  function handleItemRemove(itemString: string) {
    const newItemsList = options.filter((item) => item !== itemString);
    setOptions(newItemsList);
  }

  return (
    <div className="flex flex-col space-y-2 py-3 px-4 border border-gray-400 rounded-xl">
      <div className="flex flex-row justify-between items-center">
        <span className="font-semibold text-gray-800">{label}</span>
        <AddNewButton onClick={() => setShowModal(true)} />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {options.map((item) => (
          <div
            key={item}
            className="flex flex-row gap-2 px-3 py-2 border border-gray-400 rounded-xl"
          >
            {item}
            <button
              onClick={() => handleItemRemove(item)}
              className="text-gray-700 hover:text-black transition-colors"
            >
              {/* @ts-ignore */}
              <IoCloseCircle className="text-lg" />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <AddNew
          title={label}
          showAddNewModal={showModal}
          setShowAddNewModal={setShowModal}
          itemsList={options} // pass current state, not original
        />
      )}
    </div>
  );
};

export const AddNewButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center w-fit gap-2 px-4 py-2 border border-gray-500 rounded-full text-sm hover:bg-gray-200 transition-colors"
  >
    {/* @ts-ignore */}
    Add New <GoPlus className="text-lg" />
  </button>
);

export default EquipmentReq