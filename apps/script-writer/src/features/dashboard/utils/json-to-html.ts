// import data from "../text_copy.json";

export enum ScreenplayElement {
  Scene = 'scene',
  Action = 'action',
  Character = 'character',
  Dialogue = 'dialogue',
  Shot = 'shot',
  Super = 'super',
  Parenthetical = 'parenthetical',
  Transition = 'transition',
  Section = 'section',
  Note = 'note',
  None = 'none',
}

const classes = {
  Scene: 'scene',
  Action: 'action',
  Character: 'character',
  Dialogue: 'dialogue',
  Shot: 'shot',
  Super: 'super',
  Parenthetical: 'parenthetical',
  Transition: 'transition',
  Section: 'section',
  Note: 'note',
  None: 'none',
};

export default function jsonToHtml(jsonData: any) {
  let finalData = '';
  const screenplay = jsonData.pdfData;
  screenplay.shift();

  for (const item of screenplay) {
    const itemContentArray = item.content;
    let prevSceneInfo = item.content[0].scene_info;
    const locationContent = `${prevSceneInfo.region} - ${prevSceneInfo.location} - ${prevSceneInfo.time}`;
    finalData += generateGeneralComponent(
      'p',
      'location bold',
      locationContent,
    );
    for (const singleContentObject of itemContentArray) {
      const sceneArray = singleContentObject.scene || [];
      const sceneInfo = singleContentObject.scene_info || [];
      for (const singleScene of sceneArray) {
        if (prevSceneInfo !== sceneInfo) {
          const locationContent = `${sceneInfo.region} - ${sceneInfo.location} - ${sceneInfo.time}`;
          finalData += generateGeneralComponent(
            'p',
            'location',
            locationContent,
          );
        }
        if (singleScene.type === 'CHARACTER') {
          finalData += createCharacterElement(
            singleScene.content.character,
            singleScene.content.dialogue,
          );
        } else if (singleScene.type === 'ACTION') {
          const contentArray = singleScene.content;
          const clubbedContent = contentArray
            .map((item: any) => item.text)
            .join(' ');
          finalData += generateGeneralComponent('p', 'action', clubbedContent);
        } else if (singleScene.type === 'TRANSITION') {
          finalData += generateGeneralComponent(
            'p',
            'transition',
            singleScene.content.text,
          );
        }
        prevSceneInfo = sceneInfo;
      }
    }
  }

  return finalData;
}

function createCharacterElement(character: any, dialogueArray: any): string {
  let string = generateGeneralComponent('p', 'character', character);
  for (const dialogue of dialogueArray) {
    if (dialogue.startsWith('(') && dialogue.endsWith(')')) {
      string += generateGeneralComponent('p', 'parenthetical', dialogue);
    } else {
      string += generateGeneralComponent('p', 'dialogue', dialogue);
    }
  }
  return string;
}

function generateGeneralComponent(
  tag: string,
  className: string,
  text: string,
): string {
  return `<${tag} class="${className}">${text}</${tag}>`;
}
