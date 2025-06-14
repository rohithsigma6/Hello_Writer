import { Editor } from "@tiptap/react";
import React, { useRef } from "react";
import { DraggableSceneItem } from "./draggable-scene-item";
import { useSceneList } from "@/hooks/scenes/use-scene-list";
import { convertToMixedFraction, getTotalHeightOfScenes } from "./helper";
import { ONE_EIGHTH_OF_PAGE, PAGE_BREAK_COUNT } from "@screenplay-ink/editor";

interface SceneListProps {
  editor: Editor | null | undefined;
  searchValue: string;
}

export const SceneList: React.FC<SceneListProps> = ({ editor, searchValue }) => {
  const { scenes, updateScenesInEditor } = useSceneList();
  const draggingRef = useRef(-1);
  const dragOverRef = useRef(-1);
  const [scenesHeight, setScenesHeight] = React.useState<number[]>([]);
  const docContent = editor?.$doc?.content?.toJSON();
  const [filteredScenes, setFilteredScenes] = React.useState(scenes);

  // Get the height of each scene
  React.useEffect(() => {
    if (editor?.$doc?.content) {
      setScenesHeight(getTotalHeightOfScenes(editor, "p").sceneHeightArr as number[]);
    }
  }, [editor, editor?.$doc?.content]);

  // Filter scenes based on search value
  React.useEffect(() => {
    if (searchValue.trim() !== "") {
      const lowerCaseSearch = searchValue.toLowerCase();
      setFilteredScenes(scenes.filter((scene) => scene.text?.toLowerCase().includes(lowerCaseSearch)));
    } else {
      setFilteredScenes(scenes);
    }
  }, [searchValue, scenes]);

  const sceneChunks: typeof docContent = [];

  // Get the content of each scene
  React.useEffect(() => {
    if (scenes.length > 0 && docContent) {
      scenes?.forEach((scene, idx) => {
        if (scene && scene.id !== 0) {
          sceneChunks.push(docContent.slice(scenes[idx - 1].contentIndex, scenes[idx].contentIndex));
        }
      });
    }
  }, [scenes, docContent]);

  const onStart = (i: number) => {
    draggingRef.current = i;
  };

  const onEnter = (i: number) => {
    dragOverRef.current = i;
  };

  const onEnd = () => {
    if (draggingRef.current !== dragOverRef.current) {
      const updatedItems = [...scenes];
      // console.log("filteredScenes", filteredScenes);
      // console.log("end", draggingRef.current, dragOverRef.current, filteredScenes);
      if (searchValue !== "") {
        const draggingItemId = filteredScenes[draggingRef.current].id;
        const dragOverItemId = filteredScenes[dragOverRef.current].id;
        const draggingItemIndex = updatedItems.findIndex((item) => item.id === draggingItemId);
        const dragOverItemIndex = updatedItems.findIndex((item) => item.id === dragOverItemId);
        const [movedItem] = updatedItems.splice(draggingItemIndex, 1);
        updatedItems.splice(dragOverItemIndex, 0, movedItem);
        updateScenesInEditor(updatedItems);
      } else {
        const [movedItem] = updatedItems.splice(draggingRef.current, 1);
        updatedItems.splice(dragOverRef.current, 0, movedItem);
        updateScenesInEditor(updatedItems);
      }
    }
  };

  return (
    <div className="space-y-2 p-1">
      {filteredScenes.map((sc, idx) => (
        <DraggableSceneItem
          key={sc.id}
          {...sc}
          index={idx}
          onDragStart={onStart}
          onDragEnter={onEnter}
          onDragEnd={onEnd}
          height={convertToMixedFraction(Math.ceil(scenesHeight?.[idx] / ONE_EIGHTH_OF_PAGE), PAGE_BREAK_COUNT)}
        />
      ))}
    </div>
  );
};
