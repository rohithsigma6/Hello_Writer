import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Story, {
  storyBeatsData,
} from '@/features/file/treatment/components/Story';
import { useStory } from '@/features/file/treatment/components/StoryContext';
import CharacterSelect from './sidebar-component/character-select';
import CharacterRelationshipSelect from './sidebar-component/character-relationship';
import sideBarPlot from '@/features/file/plot/components/sideBarPlot';
import { getAllSceneCards } from '@/features/file/scenecards/api/scene-cards-api';
const Aside = memo(function Aside({ }) {
  const [buttons, setButtons] = useState<any[]>([]);
  const { fileId, type } = useParams<{ fileId?: string; type: any }>();
  const className = 'Desktop__aside';
  const [extractedType, setExtractedType] = useState<string | null>(null);
  const { selectedStory, setSelectedStory } = useStory();
  const [sceneCardsUrl, setSceneCardsUrl] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    const path = window.location.pathname; // Get full URL path

    const parts = path.split('/'); // Split into segments
    console.log(parts);
    const type = parts.includes('storybeats')
      ? 'storybeats'
      : parts.includes('plot')
        ? 'plot'
        : parts.includes('script-breakdown')
          ? 'script-breakdown'
          : parts.includes('characters')
            ? parts.includes('relationship')
              ? 'relationship'
              : 'characters'
            : null;

    setExtractedType(type);
  }, [window.location.pathname]);
  useEffect(() => {
    const fetchAllSceneCards = async () => {
      try {
        const response = await getAllSceneCards({ fileId });
        console.log('Responses is', response);

        if (response.length > 0) {
          setSceneCardsUrl(`/file/${fileId}/scenecards/template/scene-essentials`);
        } else {
          setSceneCardsUrl(`/file/${fileId}/scenecards`);
        }
      } catch (error) {
        console.error('Error fetching scenes:', error);
      }
    };

    fetchAllSceneCards();
  }, [fileId]); // include fileId in case it changes


  // ✅ This now depends on sceneCardsUrl being set
  useEffect(() => {
    if (!sceneCardsUrl) return; // wait until URL is ready

    setButtons([
      {
        name: 'Logline',
        link: `/file/${fileId}/logline`,
      },
      {
        name: 'Theme',
        link: `/file/${fileId}/theme`,
      },
      {
        name: 'Story World',
        link: `/file/${fileId}/storyworld`,
      },
      {
        name: 'Characters',
        link: `/file/${fileId}/characters`,
      },
      {
        name: 'Plot',
        link: `/file/${fileId}/plot`,
      },
      {
        name: 'Treatment',
        link: `/file/${fileId}/treatment`,
      },
      {
        name: 'Story Arc',
        link: `/file/${fileId}/storyarc`,
      },
      {
        name: 'Characters Arc',
        link: `/file/${fileId}/character-arc`,
      },
      {
        name: 'Scene Cards',
        link: sceneCardsUrl,
      },
      {
        name: 'Screenplay',
        link: `/file/${fileId}/screenplay`,
      },
    ]);
  }, [sceneCardsUrl, fileId]); // 👈 re-run when sceneCardsUrl is set


  const handleButtonClick = (link: string) => {
    if (link) navigate(link);
  };
  return (

    <aside
      className={`${className} -z-10 m-auto flex flex-col items-start overflow-y-auto px-[16px] max-h-[90dvh]`}
    >
      {extractedType !== "script-breakdown" &&
        <section
          className={`${className}__buttons flex h-[22.09%] flex-row flex-wrap gap-[12px] border-b-2 border-[#E9E9EA] px-[10px] py-[20px] `}
        >
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(button.link)}
              className={`${button.link.includes(type) || location.pathname.includes(button.link) ? 'bg-black text-white' : 'bg-[#E9E9EA] text-[#646464]'} min-w-[48%] rounded-[16px] h-[40px] py-2 text-sm font-semibold transition-colors`}
            >
              {button.name}
            </button>
          ))}
        </section>
      }
      {extractedType === 'treatment' && (
        <Story
          selectedStory={selectedStory}
          setSelectedStory={setSelectedStory}
        />
      )}
      {extractedType === 'characters' && <CharacterSelect />}
      {extractedType !== 'characters' && (
        <section className="flex flex-col items-start gap-4 py-4 w-full mt-[3%] max-h-[35vh] overflow-y-auto">
          <div className="searchBar relative w-full">
            <input
              type="text"
              name="scenes"
              className="w-full py-2 px-4 border-slate-400 border rounded-2xl"
              placeholder="Search Scenes"
            />
            <span className="absolute top-0 right-0 h-full mx-3 text-slate-500">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                stroke-linejoin="round"
                className="absolute top-0 right-0 h-full mx-3 text-slate-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
          <div className="scenes w-full max-h-[35vh] flex flex-col gap-2 overflow-y-auto">
            <div className="space-y-2">
              <div className="w-full flex uppercase p-3 flex-row items-center justify-between rounded-2xl text-white opacity-100 cursor-grab bg-[#653EFF]">
                <div className="flex gap-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-lg cursor-move"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                  </svg>
                  <p className="text-sm w-[200px] uppercase whitespace-nowrap text-ellipsis overflow-clip">
                    1. Scene: 0
                  </p>
                </div>
                <p className="text-right ml-2">(1/8)</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </aside>

  );
});
export default Aside;
