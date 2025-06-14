import React from 'react';

type TabType = 'all' | 'folders' | 'files';
interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'folders', label: 'Folders' },
    { id: 'files', label: 'Files' },
  ];

  return (
    <div className="flex space-x-6 text-sm text-gray-900">
      {tabs.map((tab) => (
        <h2
          key={tab.id}
          className={`cursor-pointer ${activeTab === tab.id ? 'text-black-500 border-b-4 border-blue-500 pb-2' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </h2>
      ))}
    </div>
  );
};

export default TabNavigation;
