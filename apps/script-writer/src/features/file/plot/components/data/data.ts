import React,{useEffect,useState} from "react";
type Act = {
    type: string;
    template: {
      title: string;
      content: {
        title: string;
        description?: string;
      }[];
    }[];
  };
  
  
  export const templateData: Act[] = [
    {
      type: "3-act",
      template: [
        {
          title: "ACT 1 - Setup",
          content: [
            {
              title: "Opening Image",
              description:
                "A visual or scene that establishes the tone, setting, and initial status quo of the story. This image often contrasts with the final image to showcase the story's transformation.",
            },
            {
              title: "Introduction of Protagonist",
              description:
                "Present the main character in their everyday life. This is where we see their initial wants, flaws, and environment.",
            },
            {
              title: "Inciting Incident",
              description:
                "A pivotal event that disrupts the protagonist's world and sets the story in motion. This incident challenges the status quo and introduces the main conflict or quest.",
            },
            {
              title: "Theme Stated",
              description:
                "A line or scene that hints at the story's overarching theme or lesson. It's often subtle and becomes more evident as the story unfolds.",
            },
            {
              title: "Build-Up",
              description:
                "Scenes that build on the inciting incident's consequences. The protagonist might resist the impending change or approach it with curiosity.",
            },
            {
              title: "Act I Climax / Break into Act II",
              description:
                "The protagonist makes a significant decision or takes an action that propels them into a new direction. It's a point of no return.",
            },
          ],
        },
        {
          title: "ACT 2 - Confrontation",
          content: [
            {
              title: "Introduction to the New World",
              description:
                "The protagonist explores the new environment, situation, or context they've entered post the Act I decision. This could be a physical location or a metaphorical space.",
            },
            {
              title: "Rising Conflicts & Challenges",
              description:
                "A series of obstacles, conflicts, or challenges the protagonist must face. These events should escalate in intensity, forcing the protagonist to adapt and grow.",
            },
            {
              title: "Midpoint",
              description:
                "A significant event, turning point, or revelation that either grants the protagonist a temporary victory or results in a substantial setback. It reignites the story's momentum.",
            },
            {
              title: "Subplots & Character Development",
              description:
                "Diversify the narrative by exploring secondary storylines or deepening relationships with side characters. These subplots often mirror or contrast the main plot, providing additional layers to the story.",
            },
            {
              title: "Dark Night of the Soul",
              description:
                "The lowest emotional point for the protagonist. Their efforts seem in vain, their goal unreachable, and their beliefs shaken. It's a period of reflection and doubt.",
            },
            {
              title: "Act II Climax / Break into Act III",
              description:
                "An event or decision that propels the story towards its final confrontation. The stakes are clear, and the protagonist is committed to seeing their quest through.",
            },
          ],
        },
        {
          title: "ACT 3 - Resolution",
          content: [
            {
              title: "Gathering Resources & Allies",
              description:
                "The protagonist prepares for the final showdown or climax. This could involve rallying allies, revisiting past locations, or acquiring vital tools or knowledge.",
            },
            {
              title: "Climax",
              description:
                "The story's peak confrontation. The protagonist faces off against the antagonist or confronts the primary challenge. Their growth is tested, and the central story question is answered.",
            },
            {
              title: "Falling Action",
              description:
                "The immediate consequences of the climax are dealt with. Loose ends concerning secondary characters or subplots are tied up.",
            },
            {
              title: "Resolution",
              description:
                "The new status quo is established. We see how the protagonist's world has changed due to their journey and the choices they've made.",
            },
            {
              title: "Closing Image",
              description:
                "A scene or visual that echoes or contrasts the opening image, underscoring the story's transformation and emotional arc.",
            },
          ],
        },
      ],
    },
    {
      type: "freely",
      template: [
        {
          title: "ACT 1 - Setup",
          content: [],
        },
        {
          title: "ACT 2 - Confrontation",
          content: [],
        },
        {
          title: "ACT 3 - Resolution",
          content: [],
        },
      ],
    },
    {
      type: "writer-journey",
      template: [
        {
          title: "Act I: Departure",
          content: [
            {
              title: "Ordinary World",
              description:
                "Introduce the protagonist in their everyday life. This sets the stage for the forthcoming adventure by showing the hero's normal environment.",
            },
            {
              title: "Call to Adventure",
              description:
                "A triggering event or challenge disrupts the protagonist's status quo, beckoning them to an adventure or mission.",
            },
            {
              title: "Refusal of the Call",
              description: "The hero might resist or hesitate, due to fear, obligation, or a myriad of other reasons.",
            },
            {
              title: "Meeting the Mentor",
              description:
                "The protagonist encounters someone who provides advice, training, or an essential item. This mentor figure readies them for the challenges ahead.",
            },
            {
              title: "Crossing the First Threshold",
              description: "The hero commits to the adventure and moves from their familiar world to the unknown.",
            },
          ],
        },
        {
          title: "Act II: Initiation",
          content: [
            {
              title: "Tests, Allies, Enemies",
              description:
                "As the protagonist navigates this unfamiliar territory, they face tests, make allies, and encounter enemies. This phase helps establish the rules of the special world.",
            },
            {
              title: "Approach to the Inmost Cave",
              description:
                "The hero and their allies prepare for the significant challenge in the special world, often the story's central goal.",
            },
            {
              title: "Ordeal",
              description:
                "The protagonist confronts death or faces their deepest fear. Overcoming this ordeal often grants them a reward.",
            },
            {
              title: "Reward (Seizing the Sword)",
              description:
                "After overcoming the ordeal, the hero takes possession of the treasure or achieves their goal. This could be a physical item, insight, or reconciliation.",
            },
          ],
        },
        {
          title: "Act III: Return",
          content: [
            {
              title: "The Road Back",
              description:
                "With their mission accomplished, the hero decides to return to the ordinary world. This often involves a chase scene or some form of conflict.",
            },
            {
              title: "Resurrection",
              description:
                "Before the hero can return home, they face another test, often a final showdown where they must apply everything they've learned. It's a cleansing or purification that makes them ready for reintegration into the ordinary world.",
            },
            {
              title: "Return with the Elixir",
              description:
                "The hero returns home, transformed, and bearing some element of treasure, knowledge, or wisdom that can be used to improve the ordinary world.",
            },
          ],
        },
      ],
    },
    {
      type: "4-act",
      template: [
        {
          title: "Act I: Setup",
          content: [
            { title: "Opening Image", description: "A scene that establishes the story's tone and setting..." },
            { title: "Introduction of Protagonist", description: "Introduce the main character's normal life..." },
            { title: "Inciting Incident", description: "An event disrupts the status quo and introduces conflict..." },
            { title: "Response & Exploration", description: "The protagonist reacts to the inciting incident..." },
            {
              title: "Act I Climax / Break into Act II",
              description: "A decision that pushes the protagonist forward...",
            },
          ],
        },
        {
          title: "Act II: Response",
          content: [
            {
              title: "New World & Adjustments",
              description: "The protagonist learns the rules of their new situation...",
            },
            { title: "Building Relationships", description: "Develop relationships with allies or antagonists..." },
            { title: "Rising Challenges", description: "A series of escalating obstacles..." },
            { title: "Midpoint Shift", description: "A major event that changes the protagonist's approach..." },
          ],
        },
        {
          title: "Act III: Attack",
          content: [
            { title: "Proactive Approach", description: "The protagonist takes active steps toward their goal..." },
            { title: "Higher Stakes", description: "The risks become more severe..." },
            { title: "Complications & Reversals", description: "Unexpected twists force adjustments..." },
            {
              title: "Act III Climax / Break into Act IV",
              description: "A pivotal event setting up the final confrontation...",
            },
          ],
        },
        {
          title: "Act IV: Resolution",
          content: [
            { title: "Final Preparations", description: "The protagonist readies themselves for the climax..." },
            { title: "Climax", description: "The peak confrontation where everything is tested..." },
            { title: "Falling Action", description: "The aftermath of the climax is addressed..." },
            { title: "Denouement & Transformation", description: "The protagonist's world is changed..." },
            { title: "Closing Image", description: "A final scene that contrasts the opening image..." },
          ],
        },
      ],
    },
    {
      type: "7-act",
      template: [
        {
          title: "ACT I: Introduction",
          content: [
            {
              title: "Opening Image",
              description: "A visual or moment that sets the tone, atmosphere, and theme of the story.",
            },
            {
              title: "Status Quo & Protagonist Introduction",
              description:
                "Establish the world, its rules, and introduce the main character with their desires, flaws, and initial situation.",
            },
            {
              title: "Inciting Incident",
              description: "An event that disrupts the status quo and introduces the central conflict or challenge.",
            },
          ],
        },
        {
          title: "ACT II: Early Complications",
          content: [
            {
              title: "Response to the Incident",
              description: "Protagonist's initial reaction and approach to the inciting incident.",
            },
            {
              title: "First Minor Climax",
              description:
                "An event or decision that increases the stakes and further involves the protagonist in the conflict.",
            },
            {
              title: "Rising Challenges",
              description: "A series of minor obstacles or confrontations that the protagonist must navigate.",
            },
          ],
        },
        {
          title: "ACT III: Initial Crisis",
          content: [
            {
              title: "Deepening Conflict",
              description: "Complications grow, making the protagonist's journey more challenging.",
            },
            {
              title: "First Major Climax",
              description:
                "A significant confrontation, setback, or revelation that changes the course of the protagonist's journey.",
            },
            {
              title: "Reassessment & New Strategy",
              description: "The protagonist must reconsider their approach and prepare for new challenges ahead.",
            },
          ],
        },
        {
          title: "ACT IV: Escalation",
          content: [
            {
              title: "Rising Stakes",
              description: "The consequences of failure become more severe, and the challenges intensify.",
            },
            {
              title: "Subplots & Expanding World",
              description: "Introduce or deepen secondary storylines, relationships, or elements of the story world.",
            },
            {
              title: "Second Major Climax",
              description:
                "Another significant event, turning point, or confrontation that further complicates the protagonist's journey.",
            },
          ],
        },
        {
          title: "Act V: Point of No Return",
          content: [
            {
              title: "Commitment to the Goal",
              description: "The protagonist solidifies their resolve, understanding the full weight of their journey.",
            },
            {
              title: "Highest Tension",
              description: "Challenges and conflicts reach their peak intensity.",
            },
            {
              title: "Third Major Climax",
              description:
                "A crucial event or confrontation that solidifies the protagonist's path to the final confrontation.",
            },
          ],
        },
        {
          title: "Act VI: Final Preparations",
          content: [
            {
              title: "Gathering Resources & Allies",
              description:
                "The protagonist consolidates their resources, knowledge, and relationships in preparation for the final showdown.",
            },
            {
              title: "Revelations & Realizations",
              description: "Important truths come to light, shaping the protagonist's understanding or approach.",
            },
            {
              title: "Emotional Climax",
              description:
                "A significant emotional beat — it could be a loss, realization, betrayal, or emotional reconciliation.",
            },
          ],
        },
        {
          title: "Act VII: Climax & Resolution",
          content: [
            {
              title: "Final Confrontation",
              description:
                "The ultimate showdown or confrontation where the protagonist faces the central antagonist or challenge.",
            },
            {
              title: "Falling Action & Consequences",
              description: "The aftermath of the climax is dealt with, and the ramifications become clear.",
            },
            {
              title: "Denouement & Closing Image",
              description:
                "The story's final moments that tie up any loose ends, highlight the protagonist's transformation, and provide a sense of closure, often mirroring the opening image to demonstrate change.",
            },
          ],
        },
      ],
    },
    {
      type: "story-circle",
      template: [
        {
          title: "Story Circle",
          content: [
            {
              title: "You (Establish a Protagonist)",
              description:
                "Introduce the main character in their ordinary world, showing their daily life, environment, and inherent desires or needs.",
            },
            {
              title: "Need (Something Isn't Right)",
              description: "Highlight the protagonist's dissatisfaction, longing, or a problem they face.",
            },
            {
              title: "Go (Enter an Unfamiliar Situation)",
              description:
                "The protagonist makes a decision or is forced into a new, unfamiliar situation, stepping beyond their comfort zone.",
            },
            {
              title: "Search (Adapt to the Situation)",
              description: "The protagonist faces challenges and obstacles, adapting and growing along the way.",
            },
            {
              title: "Find (Get What They Wanted)",
              description: "The protagonist achieves their goal or encounters a significant revelation.",
            },
            {
              title: "Take (Pay a Heavy Price)",
              description: "The protagonist faces consequences or an emotional low point due to their journey.",
            },
            {
              title: "Return (Go Back to the Familiar Situation)",
              description: "With newfound understanding, the protagonist returns to their familiar world, changed.",
            },
            {
              title: "Change (Having Changed)",
              description:
                "The protagonist demonstrates their transformation, showing how they have grown from their experiences.",
            },
          ],
        },
      ],
    },
    {
      type: "save-the-cat",
      template: [
        {
          title: "Save the Cat",
          content: [
            {
              title: "Opening Image",
              description:
                "Tone Setter: A visual or moment that sets the mood, theme, and stakes of the story. It's a snapshot of the world and the condition of the protagonist, offering a clear contrast by the story's end.",
            },
            {
              title: "Need (Something Isn't Right)",
              description: "Highlight the protagonist's dissatisfaction, longing, or a problem they face.",
            },
            {
              title: "Go (Enter an Unfamiliar Situation)",
              description:
                "The protagonist makes a decision or is forced into a new, unfamiliar situation, stepping beyond their comfort zone.",
            },
            {
              title: "Search (Adapt to the Situation)",
              description: "The protagonist faces challenges and obstacles, adapting and growing along the way.",
            },
            {
              title: "Find (Get What They Wanted)",
              description: "The protagonist achieves their goal or encounters a significant revelation.",
            },
            {
              title: "Take (Pay a Heavy Price)",
              description: "The protagonist faces consequences or an emotional low point due to their journey.",
            },
            {
              title: "Return (Go Back to the Familiar Situation)",
              description: "With newfound understanding, the protagonist returns to their familiar world, changed.",
            },
            {
              title: "Change (Having Changed)",
              description:
                "The protagonist demonstrates their transformation, showing how they have grown from their experiences.",
            },
          ],
        },
      ],
    },
    {
      type: "story-map",
      template:  [
        {
          title: "Act I",
          content: [
            { title: "Opening Image", description: "A visual that establishes the tone, setting, main character, or thematic premise of the story." },
            { title: "Setup Sequence", description: "Establish the protagonist's status quo, their world, relationships, desires, and central conflict or problem." },
            { title: "Theme Stated", description: "Hint or state outright the story's thematic essence or the lesson the protagonist needs to learn." },
            { title: "Catalyst", description: "A major event that disrupts the status quo and propels the protagonist into the story's main conflict." },
            { title: "Debate Sequence", description: "The protagonist grapples with the implications of the catalyst, leading to a pivotal choice about whether to engage with the main conflict." }
          ]
        },
        {
          title: "Act II (Part 1)",
          content: [
            { title: "Break into Two", description: "The protagonist makes a clear choice, committing to a new path or goal." },
            { title: "B Story Introduction", description: "Introduce a secondary plot or character relationship, which often supports or contrasts the A story." },
            { title: "Fun and Games Sequence", description: "The protagonist explores the new world, faces initial challenges, and experiences the consequences of their decisions." },
            { title: "Midpoint", description: "A significant event or revelation that escalates the stakes, intensifies the conflict, and provides a clearer understanding of the protagonist's goal." }
          ]
        },
        {
          title: "Act II (Part 2)",
          content: [
            { title: "Bad Guys Close In Sequence", description: "The antagonistic forces, whether external or internal, tighten their grip, making the protagonist's journey increasingly difficult." },
            { title: "All Is Lost", description: "The protagonist faces a significant setback, failure, or loss, reaching the narrative's emotional nadir." },
            { title: "Dark Night of the Soul", description: "A moment of introspection, doubt, and hopelessness where the protagonist grapples with their failures." },
            { title: "Break into Three", description: "Armed with a new understanding or plan, the protagonist decides to confront the antagonist or challenge head-on." }
          ]
        },
        {
          title: "Act III",
          content: [
            { title: "Finale Sequence", description: "The protagonist faces the main antagonist or obstacle in a climactic showdown. This sequence resolves the central conflict and any major subplots." },
            { title: "Final Image", description: "A closing visual or moment that mirrors the opening image, emphasizing the protagonist's transformation and the story's thematic journey." }
          ]
        }
      ]
    },
  
    {
      type: "syd-field",
      template:  [
        {
          title: "Act I: Setup",
          content: [
            { title: "Opening Image", description: "A scene or visual that sets the tone, introduces the world, and possibly the main character, providing context for the story to unfold." },
            { title: "Setup", description: "Establish the main character's life, including their environment, relationships, desires, and the central challenge or conflict they face." },
            { title: "Inciting Incident", description: "A key event or moment that disrupts the protagonist's status quo, setting the story in motion." },
            { title: "Key Incident" , description: "The protagonist's initial reaction to the inciting incident, indicating its significance." },
            { title: "Plot Point I", description: "A major event, decision, or action that propels the protagonist into a new direction, concluding Act I and leading into Act II. The stakes are clear, and the goal is established." }
          ]
        },
        {
          title: "Act II: Confrontation",
          content: [
            { title: "Rising Action", description: "The protagonist takes steps towards achieving their goal, facing a series of escalating challenges, obstacles, and conflicts." },
            { title: "Midpoint", description: "A turning point that introduces new information, raises the stakes, or changes the protagonist's objective. This can be a false high (things seem good) or a false low (things seem bad)." },
            { title: "Pinch Points", description: "Moments where the antagonistic forces apply pressure on the protagonist, testing their resolve. There are typically two pinch points in Act II, one before and one after the midpoint." },
            { title: "Subplots & Character Development", description: "Introduce or develop secondary storylines and relationships that support or contrast the main narrative. This adds depth and complexity to the story." },
            { title: "Plot Point II", description: "A critical event or realization that usually has the protagonist at their lowest point, leading to a vital decision. This concludes Act II and sets the stage for Act III." }
          ]
        },
        {
          title: "Act III: Resolution",
          content: [
            { title: "Climactic Decision or Action", description: "The protagonist decides to face the antagonist or central challenge, leading to a climactic showdown or series of events." },
            { title: "Climax", description: "The highest point of tension where the protagonist confronts the main obstacle or antagonist, determining whether they achieve their goal." },
            { title: "Denouement", description: "Loose ends are tied up, characters reflect on the events, and a new status quo is established, showcasing the aftermath and the protagonist's transformation." }
          ]
        }
        
      ]
    },
  
    {
      type: "six-stage",
      template:  [
        {
          title: "Stage 1: Setup",
          content: [
            { title: "Introduce Hero in Their Ordinary World", description: "Establish the protagonist's everyday life, their environment, key relationships, and their current state of being." },
            { title: "State the Hero's Longing or Need", description: "Identify the protagonist's internal desire, something they might not even be consciously aware of. This is often a deep-seated emotional need." },
            { title: "Inciting Incident", description: "A significant event or revelation disrupts the protagonist's world, offering a new opportunity or challenge." }
          ]
        },
        {
          title:" Stage 2: New Situation",
          content: [
            { title: "Hero Enters a New World or Condition", description: "Following the inciting incident, the protagonist is thrust into a new environment or situation, which they need to navigate." },
            { title: "Initial Exploration", description: "The protagonist familiarizes themselves with the rules, challenges, and characters of this new world." }
          ]
        },
        {
          title: "Stage 3: Progress",
          content: [
            { title: "The Plan", description: "The protagonist devises a strategy or approach to address the challenges or opportunities presented by the new situation." },
            { title: "Initial Success", description: "The protagonist experiences success, either by making headway towards their goal, forging new relationships, or overcoming initial obstacles." },
            { title: "Complications Begin", description: "New challenges, adversaries, or internal conflicts arise, making the protagonist's journey more complex." }
          ]
        },
        {
          title: "Stage 4: Complications & Higher Stakes",
          content: [
            { title: "Intensified Challenges", description: "The protagonist's path becomes harder, with escalating external conflicts and increased stakes." },
            { title: "Internal Struggles", description: "As the external world becomes more challenging, the protagonist also grapples with internal dilemmas, often related to their unfulfilled emotional need." }
          ]
        },
        {
          title: "Stage 5: Final Push",
          content: [
            { title: "Point of No Return", description: "The protagonist commits to a final course of action, understanding that there's no turning back." },
            { title: "Climax", description: "The protagonist faces the highest obstacle, conflict, or antagonist. This is the story's most intense and dramatic moment." }
          ]
        },
        {
          title: "Stage 6: Aftermath",
          content: [
            { title: "Resolution", description: "The aftermath of the climax is shown, with the protagonist's external goal being either achieved or lost." },
            { title: "Transformation Complete", description: "The protagonist's internal journey reaches its conclusion. Their transformation, growth, or regression becomes evident." },
            { title: "New Equilibrium", description: "The story settles, showing the protagonist's new state of being, transformed by the events of the narrative." }
          ]
        }
        
        
      ]
    },
  
    {
      type: "Kishōtenketsu",
      template:  [
        {
          title: "Ki (起): Introduction",
          content: [
            { title: "Establish Setting & Tone", description: "Introduce the story world, its rules, and its atmosphere." },
            { title: "Introduce Characters", description: "Present the main characters, their roles, relationships, and initial dispositions." },
            { title: "Suggest Theme or Motif", description: "Introduce a recurring idea, motif, or thematic element that will weave throughout the narrative." }
          ]
        },
        {
          title:" Shō (承): Development",
          content: [
            { title: "Elaborate on the Theme", description: "Develop and expand upon the theme or motif introduced in the first act." },
            { title: "Deepen Character Relationships", description: "Showcase interactions and moments that flesh out relationships and character dynamics." },
            { title: "Introduce Routine or Status Quo", description: "Establish a sense of normalcy or routine, emphasizing the story's predictable flow." }
          ]
        },
        {
          title: "Ten (転): Twist",
          content: [
            { title: "Introduce a Contrast or Twist", description: "Present an element, event, or perspective that contrasts sharply with what's been established. This isn't a conflict in the Western sense but rather a surprising variation or deviation." },
            { title: "Deepen the Mystery or Question", description: "This twist should raise questions, curiosity, or a sense of mystery, pulling the audience deeper into the story." }
          ]
        },
        {
          title: "Ketsu (結): Conclusion",
          content: [
            { title: "Reconciliation", description: "Merge elements from the first three acts, harmonizing the twist from the third act with what was established earlier. This isn't about resolving conflict but rather about showing how the contrasting elements can coexist." },
            { title: "Theme Reflection", description: "Revisit and emphasize the central theme or motif, illustrating how it's been explored or altered throughout the narrative." },
            { title:" Closing Image or Thought", description: "Offer a final scene or idea that encapsulates the essence of the story, leaving the audience with a sense of completion and reflection." }
          ]
        }
        
        
        
      ]
    },
  
  
  ];
  
  
  const sequenceData=  [{
    type: "sequence",
    template: [
      {
        title:"ACT-1",
        content:[
          {
            title: "Act I: Setup",
            content: [
              { title: "Opening Image", description: "A scene that establishes the story's tone and setting..." },
              { title: "Introduction of Protagonist", description: "Introduce the main character's normal life..." },
              { title: "Inciting Incident", description: "An event disrupts the status quo and introduces conflict..." },
              { title: "Response & Exploration", description: "The protagonist reacts to the inciting incident..." },
              {
                title: "Act I Climax / Break into Act II",
                description: "A decision that pushes the protagonist forward...",
              },
            ],
          },
          {
            title: "Act II: Response",
            content: [
              {
                title: "New World & Adjustments",
                description: "The protagonist learns the rules of their new situation...",
              },
              { title: "Building Relationships", description: "Develop relationships with allies or antagonists..." },
              { title: "Rising Challenges", description: "A series of escalating obstacles..." },
              { title: "Midpoint Shift", description: "A major event that changes the protagonist's approach..." },
            ],
          },
        ]
      },
  
      {
        title:"ACT-1",
        content:[
          {
            title: "Act I: Setup",
            content: [
              { title: "Opening Image", description: "A scene that establishes the story's tone and setting..." },
              { title: "Introduction of Protagonist", description: "Introduce the main character's normal life..." },
              { title: "Inciting Incident", description: "An event disrupts the status quo and introduces conflict..." },
              { title: "Response & Exploration", description: "The protagonist reacts to the inciting incident..." },
              {
                title: "Act I Climax / Break into Act II",
                description: "A decision that pushes the protagonist forward...",
              },
            ],
          },
          {
            title: "Act II: Response",
            content: [
              {
                title: "New World & Adjustments",
                description: "The protagonist learns the rules of their new situation...",
              },
              { title: "Building Relationships", description: "Develop relationships with allies or antagonists..." },
              { title: "Rising Challenges", description: "A series of escalating obstacles..." },
              { title: "Midpoint Shift", description: "A major event that changes the protagonist's approach..." },
            ],
          },
        ]
      },
     
    
    ],
  }]