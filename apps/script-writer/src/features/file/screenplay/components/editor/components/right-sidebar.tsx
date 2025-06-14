import { useSearchParams } from 'react-router';
import { TabContents } from './tab-contents';
import { SidebarOptions } from '@/store/editor/slices/editor';
import { toggleSearchParam } from '@/utils/searchparams-toggle';

const allowedTabs = ['comments', 'version', 'stash'] as const;
type TabOption = (typeof allowedTabs)[number];

const RightSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as TabOption | null;

  const activeTab: TabOption = tabParam!;

  // Update the query params when a tab is clicked
  const handleTabChange = (tab: TabOption) => {
    setSearchParams(toggleSearchParam(searchParams, 'tab', tab));
  };

  return (
    <>
      {' '}
      {(activeTab === SidebarOptions.stash ||
        activeTab === SidebarOptions.version ||
        activeTab === SidebarOptions.comments) && (
        <div
          className="w-[29%] max-w-[341px]"
          style={{ height: 'calc(-50px + 80vh)' }}
        >
          <div className="TabsContainer w-full mt-5 relative flex flex-col gap-y-6">
            <div className="h-12 w-full text-xs font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
              <div className="h-[45px] w-full flex flex-row gap-x-1 items-center mb-6">
                <button
                  onClick={() => handleTabChange('comments')}
                  className={`h-[45px] w-1/3 rounded-lg text-[10px] py-[8px] px-[15px]  ${
                    activeTab === SidebarOptions.comments
                      ? 'bg-[#663eff] text-white'
                      : 'bg-gray-400 text-white'
                  }`}
                >
                  Comments
                </button>
                <button
                  onClick={() => handleTabChange('version')}
                  className={`h-[45px] w-1/3 rounded-lg text-[10px] py-[8px] px-[15px]  ${
                    activeTab === SidebarOptions.version
                      ? 'bg-[#663eff] text-white'
                      : 'bg-gray-400 text-white'
                  }`}
                >
                  Version <br /> History
                </button>
                <button
                  onClick={() => handleTabChange('stash')}
                  className={`h-[45px] w-1/3 rounded-lg text-[10px] py-[8px] px-[15px]  ${
                    activeTab === SidebarOptions.stash
                      ? 'bg-[#663eff] text-white'
                      : 'bg-gray-400 text-white'
                  }`}
                >
                  Stash
                </button>
              </div>
            </div>
            <TabContents />
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
