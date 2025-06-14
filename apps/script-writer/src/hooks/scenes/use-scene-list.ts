import { Editor, JSONContent } from '@tiptap/react';
import { useCallback, useMemo, useState } from 'react';
import { IScene, ScreenplayElement } from '@/types/scenes';
import { ELEMENT_CLASSNAMES } from '@screenplay-ink/editor';
import { useEditorStore } from '@/store/editor';

export const useSceneList = () => {
  const { editor } = useEditorStore();

  // Add content to the editor
  const { content = [] } = editor?.getJSON() || {};
  const [recalculateScenes, setRecalculateScenes] = useState(false);
  const contents = content.map((pc) => pc.content).flat();
  if (!contents) return { scenes: [], updateScenesInEditor: () => {} };
  const allContent = contents.map((c) => c?.content).flat();

  const scenes = useMemo(() => {
    if (!allContent.length) return [];
    const sceneArr: IScene[] = [];
    for (let i = 0; i < allContent.length; i++) {
      const item = allContent[i];
      if (item?.attrs?.class === ScreenplayElement.Scene) {
        sceneArr.push({
          id: sceneArr.length,
          contentIndex: i,
          text:
            item.content?.map((ic) => ic.text).join(' ') ||
            'Scene: ' + sceneArr.length,
          contentSpan: 1,
        });
      } else if (sceneArr[sceneArr.length - 1]) {
        sceneArr[sceneArr.length - 1].contentSpan += 1;
      }
    }

    return sceneArr;
  }, [allContent.length, recalculateScenes]);

  const updateScenesInEditor = useCallback(
    (newScenes: IScene[]) => {
      const json = editor?.getJSON() || {};
      const oldContent = [];
      if (json.content && json.content.length) {
        const page = json.content.find(
          (p) => p.type === ELEMENT_CLASSNAMES.PAGE,
        );
        const body = page?.content?.find(
          (p) => p.type === ELEMENT_CLASSNAMES.BODY,
        );
        oldContent.push(...(body?.content ?? []));
      }
      const newContent = [];
      console.log('JSON: ', json);
      console.log('Old Content: ', oldContent);
      console.log('New Scenes: ', newScenes);
      for (let i = 0; i < newScenes.length; i++) {
        for (
          let j = newScenes[i]?.contentIndex;
          j < newScenes[i]?.contentIndex + newScenes[i]?.contentSpan;
          j++
        ) {
          console.log('J: ', j);
          newContent.push({ ...oldContent[j] });
        }
      }
      console.log('New Content: ', newContent);
      json.content = newContent;
      editor?.commands.setContent(json, true);
      setRecalculateScenes((s) => !s);
    },
    [editor],
  );

  return {
    scenes,
    updateScenesInEditor,
  };
};
