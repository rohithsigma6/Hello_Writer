export interface IScene {
  /** id assigned at runtime for handling drag and drop; will change on every page refresh or new content */
  id: number;
  /** text content od scene node */
  text: string;
  /** starting index of `scene` node in `editor.getJSON().content` */
  contentIndex: number;
  /** range of scenes in `editor.getJSON().content` starting from `contentIndex` (inclusive) to `contentIndex + contentSpan` (exclusive) */
  contentSpan: number;
}

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
  More = 'more',
  DualDialogue = 'dualdialogue',
  DualDialogueItem = 'dualdialogueitem',
}
