import { IoChevronDown } from "react-icons/io5";

interface DropdownSelectorProps {
    label: string;
    data: { title: string; values: string[] }[];
    selected: string;
    onSelect: (value: string) => void;
    isOpen: boolean;
    onOpen: () => void;
    onCreateNew?: () => void;
    icon?: boolean
}

const DropdownSelector = ({
    label,
    data,
    selected,
    onSelect,
    isOpen,
    onOpen,
    onCreateNew,
}: DropdownSelectorProps) => {
    return (
        <section className="flex flex-col gap-2 relative">
            <p className="text-gray-600 font-medium">{label}</p>

            <button
                onClick={onOpen}
                className={`${isOpen ? "bg-black text-white" : ""} ` + "flex flex-row items-center relative border border-gray-400 p-3 rounded-xl"}
            >
                <span className="text-lg absolute right-4">
                    {/* @ts-ignore */}
                    <IoChevronDown />
                </span>
                <label className="text-sm">{!selected ? `Select ${label}` : selected}</label>
            </button>

            <div className="relative w-full">
                {isOpen && (
                    <div className="new-shoot-options-dropdown shadow-md py-2 max-h-72 overflow-y-auto absolute top-0 w-full rounded-xl border border-gray-300 appearance-none text-sm cursor-pointer z-10 bg-white">
                        {data.map(({ title, values }, i) => (
                            <div key={i}>
                                <p className="new-shoot-options-button py-2 px-4 border-b border-gray-300 text-gray-500">{title}</p>
                                {values.map((val, j) => (
                                    <button
                                        key={j}
                                        onClick={() => {
                                            onSelect(val);
                                        }}
                                        className="new-shoot-options-button py-2 px-4 w-full text-start border-b border-gray-300 hover:bg-gray-200 transition-colors"
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        ))}

                        {onCreateNew && (
                            <div className="px-4 w-full mt-4">
                                <button
                                    className="bg-black w-full text-white rounded-full p-2 px-4 text-sm"
                                    onClick={onCreateNew}
                                >
                                    Create new +
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default DropdownSelector;
