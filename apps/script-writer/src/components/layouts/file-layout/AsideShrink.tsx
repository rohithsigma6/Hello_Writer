import { useNavigate, useParams } from "react-router-dom";

// import { SceneList } from "../../SceneList";
import Hand from '@/assets/editorsidebaroption/Hand.svg'
import fileimage from '@/assets/editorsidebaroption/file.svg'
import userimage from '@/assets/editorsidebaroption/userimage.svg'
import clipimage from '@/assets/editorsidebaroption/clip.svg'


import { Editor } from "@tiptap/react";
// import NumberBar from "../NumberBar";
import { FiCrop, FiSearch } from "react-icons/fi";
import { GiHistogram } from "react-icons/gi";
import { LuClipboard, LuClock, LuFileSpreadsheet } from "react-icons/lu";
import { MdPeopleOutline } from "react-icons/md";
// import { useFetchCharacters,  } from "hooks/ai-cowriter-hooks/useAiCowriter";
import { useEffect, useState } from "react";
// import CharacterCard from "../../../pages/common/CharacterCard";
interface AsideProps {
    editorView: Editor | undefined;
}

const AsideShrink = ({ editorView }: AsideProps) => {
    const className = "Desktop__aside";
    const navigate = useNavigate();
    const { fileId: fileIdParam, fileId: fileidParam } = useParams<{ fileId?: string }>();
    const fileId = (fileIdParam || fileidParam)?.toLowerCase();
    const [search, setSearch] = useState("");
    console.log("moduless<>>>>>", fileId);
    // const { data, isLoading } = useFetchModules({ fileId: fileId });
    // const {
    //     data: characterData,
    //     isLoading: characterLoading,
    //     isFetching: characterFetching,
    //     isError: characterError,
    //     refetch: characterRefetch,
    // } = useFetchCharacters({ fileId: fileId });
    const [buttons, setButtons] = useState<any[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };
    useEffect(() => {
        // if (data) {
            const modules = 'data.data.data';
            console.log("modulesmodulesmodules", modules);
            // setButtons([
            //     {
            //         name: "Logline",
            //         link:
            //             modules?.logline?.status == "finalize"
            //                 ? `/file/${fileId}/logline/template/${modules.logline.template}/finalized?id=${modules.logline.id}`
            //                 : modules?.logline?.status == "draft"
            //                     ? `/file/${fileId}/logline/template`
            //                     : `/file/${fileId}/logline`,
            //     },

            //     {
            //         name: "Theme",

            //         link:
            //             modules?.theme?.status == "finalize"
            //                 ? `/file/${fileId}/theme/template/${modules.theme.template}/finalized?id=${modules.theme.id}`
            //                 : modules?.theme?.status == "draft"
            //                     ? `/file/${fileId}/theme/template`
            //                     : `/file/${fileId}/theme`,
            //     },
            //     {
            //         name: "Story World",
            //         link: modules?.storyWorld?.finalize ? `/file/${fileId}/story-world/template` : `/file/${fileId}/story-world`,
            //     },
            //     {
            //         name: "Characters",
            //         link:
            //             modules?.character?.status == "finalize"
            //                 ? `/file/${fileId}/characters/template/${modules.character.template}/finalized?id=${modules.character.id}`
            //                 : modules?.character?.status == "draft"
            //                     ? `/file/${fileId}/characters/template`
            //                     : `/file/${fileId}/characters`,
            //     },
            //     {
            //         name: "Plot",
            //         link: modules?.plot?.finalize
            //             ? `/file/${fileId}/plot/template/${modules.plot.id}/finalized`
            //             : `/file/${fileId}/plot`,
            //     },
            //     {
            //         name: "Scene Cards",
            //         link: modules?.sceneCard?.finalize
            //             ? `/file/${fileId}/scene-cards/template/${modules.sceneCard.id}/scenes`
            //             : `/file/${fileId}/scene-cards`,
            //     },
            //     {
            //         name: "Charcater Arc",
            //         link: modules?.characterArc?.finalize
            //             ? `/file/${fileId}/character-arc/template/${modules.characterArc.id}/finalized`
            //             : `/file/${fileId}/character-arc`,
            //     },
            //     {
            //         name: "Screen Play",
            //         link: modules?.screenplay?.finalize
            //             ? `/file/${fileId}/screenplay/template/${modules.screenplay.id}/finalized`
            //             : `/file/${fileId}/screenplay`,
            //     },
            //     // {
            //     //   name: "Emotion Map",
            //     //   link: modules?.emotionMap?.finalize
            //     //     ? `/file/${fileId}/emotion-map/template/${modules.emotionMap.id}/finalized`
            //     //     : `/file/${fileId}/emotion-map`,
            //     // },
            //     // {
            //     //   name: "Story Map",
            //     //   link: modules?.storyMap?.finalize
            //     //     ? `/file/${fileId}/story-map/template/${modules.storyMap.id}/finalized`
            //     //     : `/file/${fileId}/story-map`,
            //     // },
            // ]);
        // }
        setButtons([
            {
              name: "Logline",
              link:
                // modules?.logline?.status == "finalize"
                //   ? `/file/${fileId}/logline/template/${modules.logline.template}/finalized?id=${modules.logline.id}`
                //   : modules?.logline?.status == "draft"
                //     ? `/file/${fileId}/logline/template/${modules.logline.template}?id=${modules.logline.id}&writeFreely=${modules.logline.writeFreely}`
                //     : `/file/${fileId}/logline`,
                     `/file/${fileId}/logline`,
            },
    
            {
              name: "Theme",
    
              link:
                // modules?.theme?.status == "finalize"
                //   ? `/file/${fileId}/theme/template/${modules.theme.template}/finalized?id=${modules.theme.id}`
                //   : modules?.theme?.status == "draft"
                //     ? `/file/${fileId}/theme/template/${modules.logline.template}?id=${modules.logline.id}&writeFreely=${modules.logline.writeFreely}`
                    // `/file/${fileId}/theme`,
                    `/file/${fileId}/theme`,
            },
            {
              name: "Story World",
              link: 
              // modules?.storyWorld?.finalize ? `/file/${fileId}/story-world/template` 
              // : `/file/${fileId}/story-world`,
              `/file/${fileId}/story-world`,
            },
            {
              name: "Characters",
              link:
                // modules?.character?.status == "finalize"
                //   ? `/file/${fileId}/characters/template/${modules.character.template}/finalized?id=${modules.character.id}`
                //   : modules?.character?.status == "draft"
                //     ? `/file/${fileId}/characters/template/${modules.character.template}?id=${modules.character.id}&writeFreely=${modules.character.writeFreely}`
                //     : `/file/${fileId}/characters`,
                `/file/${fileId}/characters`,
            },
            {
              name: "Plot",
              link:
              //  modules?.plot?.finalize
              //   ? `/file/${fileId}/plot/template/${modules.plot.id}/finalized`
              //   : `/file/${fileId}/plot`,
               `/file/${fileId}/plot`,
            },
            {
              name: "Scene Cards",
              link:
                // modules?.sceneCard?.status == `finalize`
                //   ? `/file/${fileId}/scene-cards/template/${modules.sceneCard.id}/scenes`
                //   : modules?.sceneCard?.status == `draft`
                //     ? `/file/${fileId}/scene-cards/template/${modules.sceneCard.template}?id=${modules.sceneCard.id}&writeFreely=${modules.sceneCard.writeFreely}`
                //     : `/file/${fileId}/scene-cards`,
                `/file/${fileId}/scenecards`,
            },
            // {
            //   name: "Charcater Arc",
            //   link: modules?.characterArc?.finalize
            //     ? `/file/${fileId}/character-arc/template/${modules.characterArc.id}/finalized`
            //     : `/file/${fileId}/character-arc`,
            // },
            {
              name: "Story Arc",
              link: `/file/${fileId}/story-arc`
            },
            {
              name: "Screen Play",
              link: 
              // modules?.screenplay?.finalize
              //   ? `/file/${fileId}/screenplay/template/${modules.screenplay.id}/finalized`
                // : `/file/${fileId}/screenplay`,
                `/file/${fileId}/screenplay`,
            },
            // {
            //   name: "Emotion Map",
            //   link: modules?.emotionMap?.finalize
            //     ? `/file/${fileId}/emotion-map/template/${modules.emotionMap.id}/finalized`
            //     : `/file/${fileId}/emotion-map`,
            // },
            // {
            //   name: "Story Map",
            //   link: modules?.storyMap?.finalize
            //     ? `/file/${fileId}/story-map/template/${modules.storyMap.id}/finalized`
            //     : `/file/${fileId}/story-map`,
            // },
          ]);
    }, []);

    const handleButtonClick = (link: string) => {
        if (link) navigate(link);
    };

    return (
        <aside className={`${className} w-[91.3%] -z-10 p-3 flex flex-col items-start overflow-y-auto m-auto mt-[2.3%]`}>
            <section
                className={`${className}__options w-full flex flex-col items-center pb-4 gap-4 border-b-2 border-slate-300 sticky`}
            >
                <button className="flex flex-row gap-2 items-center">

                <img
                    src={fileimage}
                    className="cursor-pointer min-w-5 z-20"
                    alt="File"
                />

                   
                </button>

                <button className="flex flex-row gap-2 items-center">
                <img
                    src={userimage}
                    className="cursor-pointer min-w-5 z-20"
                    alt="User"
                />
                
                   
                </button>

                <button className="flex flex-row gap-2 items-center">
                <img
                    src={clipimage}
                    className="cursor-pointer min-w-5 z-20"
                    alt="Clip"
                />
                   
                </button>
            </section>

            <section
                className={`${className}__buttons flex gap-x-[4%] gap-4 flex-row flex-wrap py-3 border-b-2 border-slate-300 mt-[3%] h-[22.09%] relative`}
            >
                <img
                    src={Hand}
                    onClick={togglePopup}
                    className="cursor-pointer z-20"
                    alt="Toggle Popup"
                />

                {isPopupVisible && (
                    <div
                        className="fixed top-[22%] left-[90px] bg-white border border-green-300 shadow-xl rounded-xl p-3 w-[320px] z-[9999] grid gap-3"
                    >
                        
                        {/* <div className="absolute top-[30%] left-[-20px] transform -translate-y-[50%] w-8 h-8 bg-white border border-slate-300 rotate-45 z-[-9999]"></div> */}

                        <div className="grid grid-cols-2 gap-4">
                            {buttons.map((button, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleButtonClick(button.link)}
                                    className={`${location.pathname.includes(button.link)
                                            ? "bg-black text-white"
                                            : "bg-slate-200 text-slate-700"
                                        } font-semibold py-2 rounded-lg transition-colors text-sm w-full`}
                      CharacterCard          >
                                    {button.name}
                                </button>
                            ))}
                        </div>
                    </div>

                )}

            </section>

            {location.pathname === `/file/${fileId}/screenplay` && (
                <section className="flex flex-col items-start gap-4 py-4 w-full mt-[3%]">


                    <div className="scenes w-full max-h-[35vh] flex flex-col gap-2 overflow-y-auto">
                        {/* < NumberBar editor={editorView} /> */}
                    </div>
                </section>
            )}
       
        </aside>
    );
};
export default AsideShrink;
