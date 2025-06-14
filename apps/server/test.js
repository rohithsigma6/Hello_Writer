const exampleLoglineStudioPayload = {
  template: id,
  hero: [
    {
      part: "1",
      content: "part-1 content",
    },
    {
      part: "2",
      content: "part-2 content",
    },
  ],
  goal: "",
  opposition: "",
  stakes: "",
  method: "",
  action: "",
  inciting_incident: "",
  world_of_story: "",
};
const exampleLoglineStudioPayloadDescription = {
  hero: {
    description: {
      adjective: "Describe the hero's personality (e.g., brave, anxious).",
      stage:
        "The stage of life/occupation (e.g., retired detective, college student).",
    },
  },
  goal: "What does the hero want to achieve? (Must be significant and difficult to obtain.)",
  stakes:
    "What is at stake if the hero succeeds or fails? (e.g., saving loved ones, avoiding disgrace.)",
  opposition:
    "What challenges or antagonists prevent the hero from achieving their goal?",
  method:
    "What is the hero's primary approach to achieving their goal? (e.g., using wit, brute force.)",
  incitingIncident: "What event sets the story in motion for the hero?",
  worldOfStory:
    "Describe the world where the story takes place (e.g., futuristic dystopia, medieval village).",
  setting: "When and where does the story take place?",
  conflict: "What is the major conflict or obstacle in the story?",
  problem: "What initial issue causes the hero to take action?",
  antagonist: "Who or what opposes the hero's goal?",
  reasons: "Why is the conflict occurring? (Underlying cause or motivation.)",
  timeElement: "Is there a deadline or time constraint affecting the story?",
  genre: "Specify the genre of the story (e.g., action, drama, mystery).",
  loglineTemplate:
    "Select from available templates based on focus (e.g., hero-centric, event-centric, world-centric).",
};
const standardLoglinePayload = {
  tamplateId: "sdsd",
  setting: {
    when: "Post-apocalyptic future",
    where: "Swampy wastelands of Louisiana",
  },
  protagonist: {
    name: "Evelyn Marsh",
    role: "Biologist",
    adjective: "Resilient",
    background:
      "Evelyn lost her family to mutated predators and vowed to protect humanity.",
    goal: "To destroy the Killogator, a deadly apex predator threatening humanity's survival",
  },
  antagonist: {
    name: "The Killogator",
    type: "Mutated predator",
    description:
      "A 30-foot mutant alligator with razor-sharp claws and intelligent hunting instincts",
    motivation: "A highly evolved predator driven to dominate its environment",
  },
  conflict: {
    problem:
      "The Killogator is destroying nearby villages and targeting the last human settlement.",
    stakes: {
      consequences:
        "If Evelyn fails, the last settlement will fall, dooming humanity's survival.",
      importance:
        "Humanity’s survival depends on defeating this apex predator.",
    },
    time_limit:
      "Before the next full moon when the Killogator is expected to attack",
  },
  actions: {
    steps:
      "Evelyn must develop a biological toxin, navigate dangerous swamps, and lure the Killogator into a trap.",
    obstacles:
      "Treacherous terrain, lack of resources, sabotage by fearful settlers, and the Killogator's cunning.",
  },
  reasons: {
    cause: "Toxic waste mutations created dangerous apex predators.",
    motivation:
      "Evelyn wants to honor her family's memory and protect her community.",
    importance: "The Killogator’s defeat is critical for humanity’s survival.",
  },
  unique_elements: {
    intrigue:
      "A race against nature and time to destroy a creature born of human mistakes.",
    genre: "Sci-fi thriller with horror elements",
  },
};

const killogator = {
  title: "The Killogator",
  setting: {
    when: "Post-apocalyptic future",
    where: "Swampy wastelands of Louisiana",
  },
  protagonist: {
    name: "Evelyn Marsh",
    role: "Biologist",
    adjective: "Resilient",
    background:
      "Evelyn lost her family to mutated predators and has vowed to study and destroy them.",
    goal: "To destroy the Killogator, a deadly apex predator threatening the last human settlement",
  },
  antagonist: {
    name: "The Killogator",
    type: "Mutated predator",
    description:
      "A 30-foot mutant alligator with razor-sharp claws and an intelligent hunting instinct",
  },
  conflict: {
    problem:
      "The Killogator has destroyed nearby villages, and the last settlement is next.",
    stakes: "If Evelyn fails, humanity's remnants will perish.",
    time_limit: "Before the next full moon when the Killogator attacks",
  },
  reasons: {
    cause: "Toxic waste mutations turned wildlife into predators.",
    motivation:
      "Evelyn’s need to protect her community and honor her family's memory.",
    importance: "Humanity's survival depends on eliminating this threat.",
  },
  actions: {
    steps:
      "Evelyn must gather rare resources to create a biological toxin to neutralize the Killogator.",
    obstacles:
      "Treacherous swamps, dwindling resources, and sabotage from a fearful villager",
  },
  unique_elements: {
    intrigue:
      "A race against nature to destroy a creature born of human mistakes.",
    genre: "Sci-fi thriller with horror elements",
  },
};
const Who_What_Where_log_line = {
  title: "Who_What_Where_log_line",
  who: {
    name: "Evelyn Marsh",
    role: "Biologist",
    adjective: "Resilient",
    goal: "To destroy the Killogator",
  },
  what: {
    task: "Destroy the Killogator, a deadly apex predator",
    steps:
      "Gather rare resources to create a biological toxin and lure the Killogator into a trap",
  },
  where: "Swampy wastelands of Louisiana",
  when: "Post-apocalyptic future, before the next full moon",
  how: {
    consequence:
      "If Evelyn fails, the last human settlement will be wiped out.",
  },
  why: {
    importance: "Humanity’s survival depends on defeating this apex predator.",
  },
};
const Logline_inator = {
  title: "The Killogator",
  protagonist: {
    name: "Evelyn Marsh",
    role: "Biologist",
    adjective: "Resilient",
    goal: "To destroy the Killogator, a deadly apex predator",
  },
  problem: {
    issue:
      "The Killogator is destroying nearby villages and threatening the last human settlement.",
  },
  stakes: {
    consequences:
      "If Evelyn fails, the settlement will be destroyed, and humanity's survival will be in jeopardy.",
  },
  antagonist: {
    name: "The Killogator",
    type: "Mutated predator",
    description:
      "A 30-foot apex predator mutated by toxic waste, with sharp claws and intelligent hunting instincts",
  },
  reasons: {
    cause: "Toxic waste mutations created dangerous predators.",
    importance:
      "Eliminating the Killogator is critical for humanity's survival.",
  },
};
const Log_line_Elements = {
  title: "The Killogator",
  protagonist: {
    name: "Evelyn Marsh",
    role: "Biologist",
    adjective: "Resilient",
    goal: "To destroy the Killogator, the apex predator threatening humanity's survival",
    background:
      "Evelyn lost her family to mutated predators and vowed to protect the survivors.",
  },
  antagonist: {
    name: "The Killogator",
    type: "Mutated predator",
    description:
      "A deadly 30-foot alligator mutated by toxic waste, with enhanced intelligence and predatory instincts",
  },
  conflict: {
    problem: "The Killogator has targeted the last human settlement.",
    stakes:
      "If Evelyn fails, the settlement will fall, dooming humanity's future.",
    time_limit: "Before the next full moon",
  },
  actions: {
    steps:
      "Evelyn must develop a biological toxin, navigate dangerous swamps, and outsmart the Killogator.",
    obstacles:
      "Treacherous terrain, lack of resources, and resistance from fearful settlers",
  },
  unique_elements: {
    intrigue:
      "A post-apocalyptic sci-fi thriller with horror elements where nature fights back.",
  },
};
