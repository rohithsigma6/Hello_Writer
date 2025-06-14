import React, { lazy, Suspense } from 'react';

import { TopNavbar } from '../components/top-navbar';
import { Footer } from '../components/footer';
import { NumberBar } from '../components/number-bar';

import '../index.css';

// Memoized Components
const MemoizedTopNavbar = React.memo(TopNavbar);
const MemoizedNumberBar = React.memo(NumberBar);
const MemoizedFooter = React.memo(Footer);
const LazyRightSidebar = lazy(
  () => import('../components/right-sidebar/index'),
);
const LazyResources = lazy(() => import('../components/resources'));
import { useLocation } from 'react-router';
import InviteUser from './../components/InviteUser';
import VideoCall from '@/features/video-call/video-call';
import ScriptLining from '../components/script-lining';

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const token = params.get('token');
  const callId = params.get('call_id');
  const permissionType = params.get('permissionType');

  return (
    <div className="w-[100%] h-[90vh] bg-slate-100 overflow-y-hidden">
      {token && permissionType && <InviteUser />}
      <div className="h-full ml-[40px] overflow-hidden flex">

        {/* main left layout */}
        <div className="w-[calc(100%-140px)] mr-auto mt-[1%]">
          <div className="flex w-full">
            <div className="flex flex-col w-full">
              <MemoizedTopNavbar />
              <div className="flex justify-between">
                <div className="flex justify-center mx-auto">
                  <div className="flex justify-center w-full relative">
                    <MemoizedNumberBar />

                    <div className="flex-grow h-full overflow-y-auto w-full my-scroll-bar mt-[15px]">
                      <div className="my-custome-page w-full">{children}</div>
                    </div>
                  </div>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyRightSidebar />
                  <LazyResources />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        {/* main left layout end*/}

        {/* video call  div*/}
        <div className='relative z-[9999]'>
          {callId ? (
            <div className="min-w-[248px] max-w-[248px] shadow-lg overflow-hidden max-h-[calc(100vh-150px)] bg-[#4d4d5a]">
              <VideoCall isGuest={false} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <MemoizedFooter />
    </div>
  );
};

export default React.memo(EditorLayout);
