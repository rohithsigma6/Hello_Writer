import { useEditorStore } from '@/store/editor';
import {
  Clapperboard,
  Layers,
  Timer,
  UserCog,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export const Footer = () => {
  const {
    zoom,
    editorJson,
    editorLeftSidebar,
    editorRightSidebar,
    updateZoom,
    updateEditorLeftSidebar,
    updateEditorRightSidebar,
  } = useEditorStore((state) => state);
  const [searchParams, setSearchParam] = useSearchParams();

  // Handle ZoomIn
  const handleZoomIn = () => {
    if (zoom < 150) {
      updateZoom(zoom + 5);
    }
  };

  // Handle ZoomOut
  const handleZoomOut = () => {
    if (zoom > 75) {
      updateZoom(zoom - 5);
    }
  };

  // Reset sidebar on normal scale
  useEffect(() => {
    // Reset rightsidebar on zoom update
    // if (searchParams.size) setSearchParam();
    if (editorRightSidebar) updateEditorRightSidebar(false);

    // Update leftsidebar on zoom update
    if (zoom === 100) {
      updateEditorLeftSidebar(true);
    } else {
      if (editorLeftSidebar) {
        updateEditorLeftSidebar(false);
      }
    }
  }, [zoom]);

  return (
    <div className="fixed bottom-0 bg-white border-t w-[calc(100%-368px)] flex items-center justify-between z-10 right-0">
      <div className="flex flex-row items-center gap-6">
        <div className="flex flex-row items-center border-r border-slate-400 pr-4 pl-3">
          <Layers size={16} />
          <span className="text-xs text-gray-600 px-2">
            1 of {editorJson?.content?.length ?? 0}
          </span>
        </div>
        <div className="flex flex-row items-center border-r border-slate-400 pr-4">
          <Timer size={16} />

          <span className="text-xs text-gray-600 px-2">0:00 of 2:20</span>
        </div>
        <div className="flex flex-row items-center">
          <Clapperboard size={16} />
          <span className="text-xs text-gray-600 px-2">0</span>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-xs text-gray-600 px-2 truncate">
              31 words
            </span>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center">
            <UserCog size={16} />
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          {/* Zoom In/Out */}
          <div className="w-full h-4 flex justify-center items-center gap-2 pr-4">
            <ZoomOut
              size={16}
              className="cursor-pointer"
              onClick={handleZoomOut}
            />
            <div className="text-xs font-light select-none">{zoom}%</div>
            <ZoomIn
              size={16}
              className="cursor-pointer"
              onClick={handleZoomIn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
