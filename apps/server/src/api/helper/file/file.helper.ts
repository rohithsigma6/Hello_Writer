const typeMap = {
  "Scene Heading": "scene",
  Action: "action",
  Character: "character",
  Dialogue: "dialogue",
  Transition: "transition",
  Parenthetical: "parenthetical",
  More: "more",
  DualDialogue: "dualdialogue",
};

function formatScreenplay(inputArray) {
  const formattedOutput = {
    type: "doc",
    content: inputArray.map((item) => {
      return {
        type: "Screenplay",
        attrs: {
          class: typeMap[item.type] || "unknown",
        },
        content: generateContent(item),
      };
    }),
  };

  return formattedOutput;
}

// Generate dual dialogue
const generateDualDialogue = (characters: string[], dialogues: string[]) => {
  if (characters.length !== dialogues.length) return [];
  const dualDialogue = [];

  for (let i = 0; i < characters.length; i++) {
    dualDialogue.push({
      type: "dualdialogue",
      character: characters[i],
      dialogue: dialogues[i],
    });
  }

  return dualDialogue;
};

// Generate content
const generateContent = (item: any) => {
  return item.text
    ? [
        {
          type: "text",
          text: item.text,
        },
      ]
    : typeMap[item.type] === "dualdialogue"
      ? generateDualDialogue(item.characters, item.dialogues)
      : [];
};

export { formatScreenplay };
