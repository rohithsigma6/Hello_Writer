function formatScreenplay(inputArray: any[]) {
  const typeMap = {
    'Scene Heading': 'scene',
    Action: 'action',
    Character: 'character',
    Dialogue: 'dialogue',
    Transition: 'transition',
    Parenthetical: 'parenthetical',
    More: 'more',
  };

  const formattedOutput = {
    type: 'doc',
    content: inputArray.map((item) => {
      return {
        type: 'Screenplay',
        attrs: {
          class: typeMap[item.type] || 'unknown',
        },
        content: item.text
          ? [
              {
                type: 'text',
                text: item.text,
              },
            ]
          : [],
      };
    }),
  };

  return formattedOutput;
}

export { formatScreenplay };
