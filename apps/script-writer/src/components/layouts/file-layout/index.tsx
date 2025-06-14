import Navbar from './nav-bar';
import Aside from './sidebar-component/aside';
import '@/features/file/screenplay/components/editor/styles/font-family.css';
import React, { useState } from 'react';
import AsideShrink from './AsideShrink';
import LeftArrow from '@/assets/editorsidebaroption/LeftArrow.svg';
import RightArrow from '@/assets/editorsidebaroption/RightArrow.svg';
import { useEditorStore } from '@/store/editor';

export function FileLayout({ children }: any) {
  const [editorView, setEditorView] = useState();
  const { editorLeftSidebar, updateEditorLeftSidebar } = useEditorStore(
    (state) => state,
  );
  const toggleSidebar = () => {
    updateEditorLeftSidebar(!editorLeftSidebar);
  };

  return (
    
    <div className="w-full h-[100vh] bg-slate-100 overflow-hidden">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="w-full h-[90vh] flex flex-nowrap">
        <>
          <div
            className={`${
              !editorLeftSidebar ? 'w-[5%]' : 'max-w-[368px] min-w-[368px]'
            } h-[90vh] bg-white transition-all duration-300 relative`}
          >
            {!editorLeftSidebar ? (
              <AsideShrink editorView={editorView} />
            ) : (
              <Aside editorView={editorView} />
            )}
            <button
              className="c-collapse-btn"
              onClick={() => {
                toggleSidebar();
                updateEditorLeftSidebar(!editorLeftSidebar);
              }}
            >
              {!editorLeftSidebar ? (
                <img src={RightArrow} alt="Expand Sidebar" />
              ) : (
                <img src={LeftArrow} alt="Collapse Sidebar" />
              )}
            </button>
          </div>
          {React.cloneElement(children, { editorView, setEditorView })}
        </>
      </div>
    </div>
  );
}
