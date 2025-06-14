export const EnvironmentOptions = ["I/E.", "INT.", "EXT.", "E/I."]
export const SceneEnvironmentOptions = [
  "DAY",
  "NIGHT",
  "AFTERNOON",
  "MORNING",
  "EVENING",
  "LATER",
  "MOMENTS LATER",
  "CONTINUOUS",
  "SAME TIME",
  "THE NEXT DAY",
  "SUNRISE",
  "SUNDOWN",
]


export const EditorContentKey = (fileId?:string, sceneId?:string|null)=>["NewEditorContent", fileId, sceneId]
