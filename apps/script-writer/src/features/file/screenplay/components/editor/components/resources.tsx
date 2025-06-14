import ButtonsGroupBase from '@/assets/button-group-base.svg';
import Comments from '@/assets/Comments.svg';
import Option from '@/assets/resources.png';
import ResourcesClock from '@/assets/ResourcesClock.svg';
import Stash from '@/assets/Stash.svg';
import { useEditorStore } from '@/store/editor';
import { SidebarOptions } from '@/store/editor/slices/editor';
import { useSearchParams } from 'react-router';
import { toggleSearchParam } from '@/utils/searchparams-toggle';
import { useTimerStore } from '@/store/editor';
import { TimerResource } from './timer/timer-resource';
const Resources = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  const { isActive, updateIsActive } = useTimerStore((state) => state);
  const { editorRightSidebar, updateEditorRightSidebar } = useEditorStore();

  const handleToggle = () => {
    updateEditorRightSidebar(!editorRightSidebar);
  };

  const handleToggleStashComment = () => {
    const currentTab = searchParams.get('tab')!;
    const newParams = toggleSearchParam(
      searchParams,
      'tab',
      currentTab || SidebarOptions.comments,
    );
    setSearchParam(newParams);
  };

  const handleToggleChat = () => {
    const newParams = toggleSearchParam(
      searchParams,
      'tab',
      SidebarOptions.chat,
    );
    setSearchParam(newParams);
  };

  const handleToggleTimer = () => {
    if (!isActive) {
      updateIsActive(true);
    }
    const newParams = toggleSearchParam(
      searchParams,
      'tab',
      SidebarOptions.timer,
    );
    setSearchParam(newParams);
  };

  return (
    <div>
      <button
        className={`fixed bottom-10 right-6  text-white flex items-center justify-center gap-2 rounded-[12px] z-10 h-[40px] w-[40px] bg-[#212131]`}
        onClick={handleToggle}
      >
        <img src={Option} alt="Buttons Group base" />
      </button>

      {editorRightSidebar && (
        <div
          className={`fixed bottom-[6rem] right-6 flex flex-col items-center gap-2 z-20`}
        >
          <button className="bg-slate-800 text-white  rounded-[12px] h-[40px] w-[40px]">
            <img src={Stash} alt="Stash" />
          </button>

          <button
            className="text-white rounded-[12px] h-[40px] w-[40px]"
            onClick={handleToggleStashComment}
          >
            <img src={ButtonsGroupBase} alt="Save" />
          </button>
          <button
            className="text-white rounded-[12px] h-[40px] w-[40px]"
            onClick={handleToggleChat}
          >
            <img src={Comments} alt="Comments" />
          </button>
          {/* Dynamic Resource Clock */}
          {!isActive ? (
            <button
              className="text-white rounded-[12px] h-[40px] w-[40px]"
              onClick={handleToggleTimer}
            >
              <img src={ResourcesClock} alt="Resources Clock" />
            </button>
          ) : (
            <TimerResource handleToggleTimer={handleToggleTimer} />
          )}
        </div>
      )}
    </div>
  );
};

export default Resources;
