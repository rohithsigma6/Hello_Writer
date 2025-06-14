import SceneCardsLogo from '@/assets/treatment-img.svg';
import SceneCardsSMLogo from '@/assets/treatment-img.svg';

export const sceneCardData = [
  {
    type: 'plot',
    icon: SceneCardsLogo,
    smIcon: SceneCardsSMLogo,
    btnText: 'Develop Your Treatment',
    tipsHeading: 'Treatment tips',
    heading: 'Expand Your Outline Into a Treatment',
    paragrapgh:
      'A treatment is the bridge between your outline and your screenplay. It provides a prose-style narrative of your film, describing key beats, character actions, and emotional arcs without screenplay formatting.',
    Ul: 'A well-crafted scene card can:',
    list: [
      { li: 'Expand your story beats into a fluid, cinematic narrative' },
      { li: `Help visualize character arcs and emotional depth` },
      { li: 'Identify pacing issues and missing story elements early' },
      { li: 'Provide a clear guide for writing your full screenplay' },
      {
        li: 'Assist in pitching your screenplay to producers and collaborators',
      },
    ],
    tips: [
      {
        number: 1,
        title: 'Structure:',
        text: 'Follow a clear structure (e.g., three-act structure) to organize your story',
      },
      {
        number: 2,
        title: 'Conflict:',
        text: 'Introduce central conflicts early to drive the story forward',
      },
      {
        number: 3,
        title: 'Pacing:',
        text: 'Balance fast-paced and slower scenes to maintain audience interest',
      },
      {
        number: 4,
        title: 'Causality:',
        text: 'Ensure each event logically leads to the next',
      },
      {
        number: 5,
        title: 'Subplots:',
        text: 'Use subplots to add depth and support the main plot',
      },
      {
        number: 6,
        title: 'Turning:',
        text: ' Include key turning points that shift the direction of the story',
      },
      {
        number: 7,
        title: 'Stakes:',
        text: 'Gradually raise the stakes to increase tension',
      },
      {
        number: 8,
        title: 'Foreshadowing:',
        text: 'Plant subtle hints early on for future plot developments',
      },
      {
        number: 9,
        title: ': Build:',
        text: 'Climax:a compelling climax that resolves the main conflict',
      },
      {
        number: 10,
        title: ': Provide:',
        text: 'Resolutiona satisfying conclusion that ties up loose ends',
      },
    ],
  },
];
