import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Story from '@/features/file/treatment/components/Story';
import { useStory } from '@/features/file/treatment/components/StoryContext';
import CharacterSelect from './character-select';
import { SceneList } from '@/features/scene-list';
import { useEditorStore } from '@/store/editor';
import { useStore } from 'zustand';
import CharacterRelationshipSelect from './character-relationship';
import SideBarPlot from '@/features/file/plot/components/sideBarPlot';
import { getAllSceneCards } from '@/features/file/scenecards/api/scene-cards-api';
import { getPlotsByFile } from '@/features/file/plot/api/get-all-templates';
const Aside = () => {
  const { editor } = useStore(useEditorStore);
  const [buttons, setButtons] = useState<any[]>([]);
  const { fileId, type } = useParams<{ fileId?: string; type: any }>();
  const className = 'Desktop__aside';
  const [extractedType, setExtractedType] = useState<string | null>(null);
  const { selectedStory, setSelectedStory } = useStory();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sceneCardsUrl, setSceneCardsUrl] = useState(`/file/${fileId}/scenecards`)
  const [plotUrl, setPlotUrl] = useState(`/file/${fileId}/plot`)
  const [treatmentUrl, setTreatmentUrl] = useState(`/file/${fileId}/treatment`)

  useEffect(() => {
    const path = window.location.pathname; // Get full URL path
    const parts = path.split('/'); // Split into segments // Split into segments
    const plotIndex = parts.indexOf('plot');
    const sceneCardsIndex = parts.indexOf('scenecards');
    const type = parts.includes('storybeats')
      ? 'storybeats'
      : sceneCardsIndex !== -1 &&
        parts[sceneCardsIndex + 1] === 'template' &&
        parts.length > sceneCardsIndex + 2
        ? 'scenecards'
        : parts.includes('script-breakdown')
          ? 'script-breakdown'
          : parts.includes('scenecards/template')
            ? 'scenecards/template'
            : plotIndex !== -1 &&
              parts[plotIndex + 1] === 'template' &&
              parts.length > plotIndex + 2
              ? 'plot'
              : parts.includes('plot/template')
                ? 'plot/template'
                : parts.includes('characters')
                  ? parts.includes('relationship')
                    ? 'relationship'
                    : 'characters'
                  : parts.includes('screenplay')
                    ? 'screenplay'
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
  }, [fileId]);

  useEffect(() => {
    const fetchPlots = async () => {
      const response = await getPlotsByFile(fileId)
      console.log("RES ISS ", response)
      if (response.length > 0) {
        setPlotUrl(`/file/${fileId}/plot/template/${response[0].templateType}`)
        setTreatmentUrl(`/file/${fileId}/treatment/storybeats`)
      } else {
        setPlotUrl(`/file/${fileId}/plot`)
        setTreatmentUrl(`/file/${fileId}/treatment`)
      }
    }
    fetchPlots()
  }, [fileId])

  useEffect(() => {
    if (!sceneCardsUrl) return;
    if (!plotUrl) return;

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
        link: plotUrl,
      },
      {
        name: 'Treatment',
        link: treatmentUrl,
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
  }, [sceneCardsUrl, plotUrl, fileId]);



  const handleButtonClick = (link: string) => {
    if (link) navigate(link);
  };

  return (
    
    <aside
      className={`${className}  -z-10 m-auto flex flex-col items-start overflow-y-auto px-[16px]`}
    >
      {extractedType !== "script-breakdown" &&
        <section
          className={`${className}__buttons flex h-[22.09%] flex-row flex-wrap gap-[12px] border-b-2 border-[#E9E9EA] px-[10px] py-[20px] `}
        >
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(button.link)}
              className={`${button.link.includes(type) || location.pathname.includes(button.link) ? 'bg-black text-white' : 'bg-[#E9E9EA] text-[#646464]'} min-w-[48%] rounded-[16px] py-2 h-[40px] text-sm font-semibold transition-colors`}
            >
              {button.name}
            </button>
          ))}
        </section>
      }
      {extractedType === 'plot' && <SideBarPlot />}
      {extractedType === 'scenecards' && <SideBarPlot />}
      {extractedType === 'storybeats' && (
        <Story
          selectedStory={selectedStory}
          setSelectedStory={setSelectedStory}
        />
      )}
      {extractedType === 'characters' && <CharacterSelect />}
      {extractedType === 'relationship' && <CharacterRelationshipSelect />}
      {extractedType == 'screenplay' && (
        <section className="flex flex-col items-start gap-4 py-4 w-full mt-[3%]">
          <div className="searchBar relative w-full">
            <input
              type="text"
              name="scenes"
              className="w-full py-2 px-4 border-slate-400 border rounded-2xl"
              placeholder="Search Scenes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute top-0 right-0 h-full mx-3 text-slate-500">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
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
            <SceneList editor={editor} searchValue={search} />
          </div>
        </section>
      )}
    </aside>
  );
};
export default Aside;
