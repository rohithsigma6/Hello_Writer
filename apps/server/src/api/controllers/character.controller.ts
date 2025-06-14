import { Request, Response } from "express";
import CharacterProfile from "../models/character.model";
import { uploadCommonImage } from "../helper/multimedia/multimedia";
import CharacterRelationship from "../models/characterRelationship.model";

export const addCharacterRelationship = async (req: Request, res: Response) => {
  try {
    const { fileId, characterId } = req.body;

    if (!fileId || !characterId) {
      return res.status(400).json({ message: "fileId and characterId are required." });
    }

    // Check if character exists
    const characterExists = await CharacterProfile.findById(characterId);
    if (!characterExists) {
      return res.status(404).json({ message: "Character not found." });
    }

    const newRelationship = new CharacterRelationship({
      fileId,
      characterId,
      connections: [],
    });

    await newRelationship.save();
    res.status(201).json({ message: "Character relationship created.", newRelationship });
  } catch (error) {
    console.error("Error creating character relationship:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// export const allCharacterRelationship = async (req: Request, res: Response) => { 
//   try {
//     const { fileId } = req.params;

//     if (!fileId) {
//       return res.status(400).json({ message: "fileId is required" });
//     }

//     // Fetch all finalized characters for the given fileId
//     const finalizedCharacters = await CharacterProfile.find({ 
//       fileId, 
//       characterStatus: "finalize" 
//     });

//     // Extract character IDs
//     const characterIds = finalizedCharacters.map(char => char._id);

//     // Fetch relationships where characterId is in the list
//     const relationships = await CharacterRelationship.find({ characterId: { $in: characterIds } })
//       .populate("characterId") // Populate character details
//       .populate("connections"); // Populate connections

//     // Filter out relationships where connections are empty
//     const filteredRelationships = relationships.filter(rel => rel.connections.length > 0);

//     // Extract IDs of characters that have connections
//     const charactersWithConnections = filteredRelationships.map(rel => rel.characterId.toString());

//     // Identify characters that have no connections
//     const charactersWithoutConnections = finalizedCharacters.filter(
//       char => !charactersWithConnections.includes(char._id.toString())
//     );

//     res.status(200).json({ 
//       withConnections: filteredRelationships, 
//       withoutConnections: charactersWithoutConnections 
//     });

//   } catch (error) {
//     console.error("Error processing character relationship:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


//working
// export const allCharacterRelationship = async (req: Request, res: Response) => {
//   try {
//     const { fileId } = req.params;

//     if (!fileId) {
//       return res.status(400).json({ message: "fileId is required" });
//     }

//     // Fetch all finalized characters for the given fileId
//     const finalizedCharacters = await CharacterProfile.find({ 
//       fileId, 
//       characterStatus: "finalize" 
//     });

//     // Extract character IDs
//     const characterIds = finalizedCharacters.map(char => char._id);

//     // Fetch relationships where characterId is in the list
    // const relationships = await CharacterRelationship.find({ characterId: { $in: characterIds } })
      // .populate("characterId") // Populate character details
      // .populate("connections.id"); // Populate the connection IDs (CharacterProfile)

//     // Filter out relationships where connections are empty
//     const filteredRelationships = relationships.filter(rel => rel.connections.length > 0);
//     // Extract IDs of characters that have connections
//     const charactersWithConnections = filteredRelationships.map(rel => rel.characterId.toString());
// console.log("charactersWithConnections", charactersWithConnections)
//     const charactersWithoutConnections = finalizedCharacters.filter(
//       char => !charactersWithConnections.includes(char._id.toString())
//     );

//     // Fetch characters that are finalized but have no relationship entry
//     const relationshipEntries = await CharacterRelationship.find({ characterId: { $in: characterIds } });
//     const charactersWithRelationshipEntries = relationshipEntries.map(rel => rel.characterId.toString());

//     finalizedCharacters.forEach(char => {
//       if (!charactersWithRelationshipEntries.includes(char._id.toString())) {
//         charactersWithoutConnections.push(char);
//       }
//     });

    // res.status(200).json({ 
    //   withConnections: filteredRelationships, 
    //   withoutConnections: charactersWithoutConnections 
    // });

//   } catch (error) {
//     console.error("Error processing character relationship:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const allCharacterRelationship = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    const finalizedCharacters = await CharacterProfile.find({
      fileId,
      characterStatus: "finalize",
    });
    const characterRelationships = await CharacterRelationship.find({ fileId })
      .populate<{ characterId: any }>("characterId") // Explicitly cast `characterId`
      .populate<{ connections: { id: any }[] }>("connections.id"); // Explicitly cast `connections.id`
    const connectedCharacterIds = new Set(
      characterRelationships.flatMap((rel) =>
        rel.connections.map((conn) => conn.id?._id?.toString() || "")
      )
    );
    const charactersInRelationships = new Set(
      characterRelationships
        .map((rel) => rel.characterId?._id?.toString() || "")
        .filter((id) => id) // Remove empty values
    );
    const unconnectedCharacters = finalizedCharacters.filter(
      (character) =>
        !connectedCharacterIds.has(character._id.toString()) &&
        !charactersInRelationships.has(character._id.toString())
    );
    const filteredRelationships = characterRelationships.filter(
      (rel) => rel.characterId && rel.connections.length > 0
    );
    res.status(200).json({
      withConnections: filteredRelationships,
      withoutConnections: unconnectedCharacters,
    });
  } catch (error) {
    console.error("Error processing character relationships:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const allCharacterRelationship = async (req, res) => {
//   try {
//     const { fileId } = req.params;

//     const finalizedCharacters = await CharacterProfile.find({       
//       fileId, 
//       characterStatus: "finalize" 
//  });
//     const characterIds = finalizedCharacters.map((char) => char._id);

//     // Fetch relationships
//     const relationships = await CharacterRelationship.find({ characterId: { $in: characterIds } })
//       .populate("characterId")
//       .populate("connections.id");

//     // Separate characters with and without connections
//     const withConnections = [];
//     const withoutConnections = [];

//     finalizedCharacters.forEach((character) => {
//       const hasConnection = relationships.some((rel) => rel.characterId.equals(character._id));
//       if (hasConnection) {
//         withConnections.push(character);
//       } else {
//         withoutConnections.push(character);
//       }
//     });

//     res.status(200).json({ withConnections, withoutConnections });
//   } catch (error) {
//     console.error("Error processing character relationship:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const addCharacterPosition = async (req: Request, res: Response) => {
  try {
    const { relationshipId, position } = req.body;
    if (!relationshipId || !position || position.x === undefined || position.y === undefined) {
      return res.status(400).json({ message: "relationshipId and position (x, y) are required." });
    }

    const updatedRelationship = await CharacterRelationship.findByIdAndUpdate(
      relationshipId,
      { position },
      { new: true }
    );

    if (!updatedRelationship) {
      return res.status(404).json({ message: "Character relationship not found." });
    }

    res.status(200).json({ message: "Position updated successfully.", data: updatedRelationship });
  } catch (error) {
    console.error("Error updating position:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const removeConnection = async (req: Request, res: Response) => {
  try {
    const { characterId } = req.body;

    if (!characterId) {
      return res.status(400).json({ message: "characterId is required." });
    }

    // Remove all connections from the given character
    await CharacterRelationship.updateOne(
      { characterId },
      { $set: { connections: [] } }
    );

    await CharacterRelationship.updateMany(
      { "connections.id": characterId },
      { $pull: { connections: { id: characterId } } }
    );

    res.status(200).json({ message: "Connections removed successfully." });
  } catch (error) {
    console.error("Error removing connections:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getRelationshipByFileId = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    if (!fileId) {
      return res.status(400).json({ message: "fileId is required." });
    }
    const relationships = await CharacterRelationship.find({ fileId }).populate("characterId connections.id");
    res.status(200).json({ message: "Relationships retrieved successfully.", relationships });
  } catch (error) {
    console.error("Error fetching relationships:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRelationshipByRelationshipId = async (req: Request, res: Response) => {
  try {
    const { relationshipId } = req.params;
    if (!relationshipId) {
      return res.status(400).json({ message: "relationshipId is required." });
    }
    const relationship = await CharacterRelationship.findById(relationshipId).populate("characterId connections.id");
    res.status(200).json({ message: "Relationship retrieved successfully.", relationship });
  } catch (error) {
    console.error("Error fetching relationship:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const saveCharacter = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user.id;
//     const { fileId, selectedTemplate, freeform, characterBuilder, characterBlueprint, characterStatus } = req.body;

//     // Validation
//     if (!fileId) {
//       return res.status(400).json({ message: "fileId is required." });
//     }

//     // Handle image upload
//     let imageUrl: string | null = null;
//     if (req.file) {
//       imageUrl = await uploadCommonImage(req.file, userId);
//     }
// console.log(imageUrl)
//     // Handle freeform template
//     if (selectedTemplate === 'freeform') {
//       // if (!freeform) {
//       //   return res.status(400).json({ message: "Freeform data is required." });
//       // }
      
//       freeform.photo = imageUrl || freeform.photo;
      
//       const character = new CharacterProfile({
//         fileId,
//         createdBy: userId,
//         selectedTemplate,
//         allTemplate: { freeform },
//         characterStatus,
//       });
//       await character.save();
//       return res.status(201).json({ message: "Character profile created successfully.", character });
//     }

//     // Validate templates
//     const validTemplates = ["characterBuilder", "characterBlueprint"];
//     if (!validTemplates.includes(selectedTemplate)) {
//       return res.status(400).json({
//         message: `Invalid selectedTemplate. Must be one of: ${validTemplates.join(", ")}`,
//       });
//     }

//     // Validate mutually exclusive fields
//     if ((characterBuilder && characterBlueprint) || (!characterBuilder && !characterBlueprint)) {
//       return res.status(400).json({
//         message: "Select either characterBuilder or characterBlueprint, but not both.",
//       });
//     }

//     if (selectedTemplate === "characterBuilder" && characterBuilder) {
//       characterBuilder.basicInfo = characterBuilder.basicInfo || {};
//       characterBuilder.basicInfo.photo = imageUrl;
//     } else if (selectedTemplate === "characterBlueprint" && characterBlueprint) {
//       characterBlueprint.basicInfo = characterBlueprint.basicInfo || {};
//       characterBlueprint.photo = imageUrl;
//     }

//     // Create and save character profile
//     const character = new CharacterProfile({
//       fileId,
//       createdBy: userId,
//       selectedTemplate,
//       allTemplate: {
//         characterBuilder: characterBuilder || null,
//         characterBlueprint: characterBlueprint || null,
//         freeform: null,
//       },
//       characterStatus
//     });

//     await character.save();
//     res.status(201).json({ message: "Character profile created successfully.", character });
//   } catch (error) {
//     console.error("Error saving character:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


const saveCharacter = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { fileId, selectedTemplate, freeform, characterBuilder, characterBlueprint, characterStatus } = req.body;

    if (!fileId) {
      return res.status(400).json({ message: "fileId is required." });
    }

    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = await uploadCommonImage(req.file, userId);
    }

    // Handle Freeform
    if (selectedTemplate === 'freeform') {
      if (!freeform || !freeform.characterName) {
        return res.status(400).json({ message: "Freeform data with characterName is required." });
      }

      freeform.characterName = freeform.characterName.toUpperCase();
      const isDuplicate = await CharacterProfile.findOne({
        fileId,
        "allTemplate.freeform.characterName": freeform.characterName
      });

      if (isDuplicate) {
        return res.status(409).json({ message: "Character name already exists for this file." });
      }

      freeform.photo = imageUrl || freeform.photo;

      const character = new CharacterProfile({
        fileId,
        createdBy: userId,
        selectedTemplate,
        allTemplate: { freeform },
        characterStatus,
      });
      await character.save();

      return res.status(201).json({ message: "Character profile created successfully.", character });
    }

    // Validate other templates
    const validTemplates = ["characterBuilder", "characterBlueprint"];
    if (!validTemplates.includes(selectedTemplate)) {
      return res.status(400).json({
        message: `Invalid selectedTemplate. Must be one of: ${validTemplates.join(", ")}`,
      });
    }

    if ((characterBuilder && characterBlueprint) || (!characterBuilder && !characterBlueprint)) {
      return res.status(400).json({
        message: "Select either characterBuilder or characterBlueprint, but not both.",
      });
    }

    let characterNameToCheck: string | null = null;

    if (selectedTemplate === "characterBuilder" && characterBuilder) {
      characterBuilder.basicInfo = characterBuilder.basicInfo || {};
      characterBuilder.basicInfo.photo = imageUrl;
      if (characterBuilder.basicInfo.name) {
        characterBuilder.basicInfo.name = characterBuilder.basicInfo.name.toUpperCase();
        characterNameToCheck = characterBuilder.basicInfo.name;
      }
    } else if (selectedTemplate === "characterBlueprint" && characterBlueprint) {
      characterBlueprint.basicInfo = characterBlueprint.basicInfo || {};
      characterBlueprint.photo = imageUrl;
      if (characterBlueprint.characterName) {
        characterBlueprint.characterName = characterBlueprint.characterName.toUpperCase();
        characterNameToCheck = characterBlueprint.characterName;
      }
    }

    if (characterNameToCheck) {
      const isDuplicate = await CharacterProfile.findOne({
        fileId,
        $or: [
          { "allTemplate.characterBuilder.basicInfo.name": characterNameToCheck },
          { "allTemplate.characterBlueprint.characterName": characterNameToCheck }
        ]
      });

      if (isDuplicate) {
        return res.status(409).json({ message: "Character name already exists for this file." });
      }
    }

    const character = new CharacterProfile({
      fileId,
      createdBy: userId,
      selectedTemplate,
      allTemplate: {
        characterBuilder: characterBuilder || null,
        characterBlueprint: characterBlueprint || null,
        freeform: null,
      },
      characterStatus
    });

    await character.save();

    return res.status(201).json({ message: "Character profile created successfully.", character });
  } catch (error) {
    console.error("Error saving character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const saveFreeformCharacter = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user.id;
//     const { fileId, name } = req.body;

//     if (!fileId || !name) {
//       return res.status(400).json({ message: "fileId and name are required." });
//     }

//     let imageUrl: string | null = null;
//     if (req.file) {
//       imageUrl = await uploadCommonImage(req.file, userId);
//     }

//     const freeform = {
//       characterName: name,
//       photo: imageUrl,
//     };

//     const character = new CharacterProfile({
//       fileId,
//       createdBy: userId,
//       selectedTemplate: "freeform",
//       allTemplate: { freeform },
//       characterStatus: "finalize", // default status
//     });

//     await character.save();

//     return res.status(201).json({
//       message: "Freeform character created successfully.",
//       character,
//     });

//   } catch (error) {
//     console.error("Error creating freeform character:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const getAllFinalizeCharacter = async (req: Request, res: Response) => {
//   try {
//     const { fileId } = req.params;

//     if (!fileId) {
//       return res.status(400).json({ message: "fileId is required." });
//     }

//     const characters = await CharacterProfile.find({
//       fileId,
//       characterStatus: "finalize",
//     });

//     const names: string[] = characters.map((char) => {
//       return (
//         char.allTemplate?.freeform?.characterName ||
//         char.allTemplate?.characterBlueprint?.characterName ||
//         char.allTemplate?.characterBuilder?.basicInfo?.name ||
//         null
//       );
//     }).filter(Boolean);

//     res.status(200).json({
//       message: "Finalized character names fetched successfully.",
//       data: names,
//     });
//   } catch (error) {
//     console.error("Error fetching finalized character names:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// const saveFreeformCharacter = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user.id;
//     const { fileId, name } = req.body;

//     if (!fileId || !name) {
//       return res.status(400).json({ message: "fileId and name are required." });
//     }

//     // Check if character with the same name already exists in 'finalize' state
//     const existingCharacter = await CharacterProfile.findOne({
//       fileId,
//       characterStatus: "finalize",
//       $or: [
//         { "allTemplate.freeform.characterName": new RegExp(`^${name}$`, "i") },
//         { "allTemplate.characterBlueprint.characterName": new RegExp(`^${name}$`, "i") },
//         { "allTemplate.characterBuilder.basicInfo.name": new RegExp(`^${name}$`, "i") },
//       ],
//     });

//     if (existingCharacter) {
//       return res.status(409).json({ message: "Character name already exists." });
//     }

//     let imageUrl: string | null = null;
//     if (req.file) {
//       imageUrl = await uploadCommonImage(req.file, userId);
//     }

//     const freeform = {
//       characterName: name,
//       photo: imageUrl,
//     };

//     const character = new CharacterProfile({
//       fileId,
//       createdBy: userId,
//       selectedTemplate: "freeform",
//       allTemplate: { freeform },
//       characterStatus: "finalize",
//     });

//     await character.save();

//     return res.status(201).json({
//       message: "Freeform character created successfully.",
//       character,
//     });

//   } catch (error) {
//     console.error("Error creating freeform character:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const saveFreeformCharacter = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { fileId, name } = req.body;

    if (!fileId || !name) {
      return res.status(400).json({ message: "fileId and name are required." });
    }

    const upperName = name.toUpperCase();

    const existingCharacter = await CharacterProfile.findOne({
      fileId,
      characterStatus: "finalize",
      $or: [
        { "allTemplate.freeform.characterName": new RegExp(`^${upperName}$`, "i") },
        { "allTemplate.characterBlueprint.characterName": new RegExp(`^${upperName}$`, "i") },
        { "allTemplate.characterBuilder.basicInfo.name": new RegExp(`^${upperName}$`, "i") },
      ],
    });

    if (existingCharacter) {
      return res.status(409).json({ message: "Character name already exists." });
    }

    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = await uploadCommonImage(req.file, userId);
    }

    const freeform = {
      characterName: upperName,
      photo: imageUrl,
    };

    const character = new CharacterProfile({
      fileId,
      createdBy: userId,
      selectedTemplate: "freeform",
      allTemplate: { freeform },
      characterStatus: "finalize",
    });

    await character.save();

    return res.status(201).json({
      message: "Freeform character created successfully.",
      character,
    });

  } catch (error) {
    console.error("Error creating freeform character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllFinalizeCharacter = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ message: "fileId is required." });
    }

    const characters = await CharacterProfile.find({
      fileId,
      characterStatus: "finalize",
    });

    const nameSet = new Set<string>();

    characters.forEach((char) => {
      const name =
        char.allTemplate?.freeform?.characterName ||
        char.allTemplate?.characterBlueprint?.characterName ||
        char.allTemplate?.characterBuilder?.basicInfo?.name;

      if (name) {
        nameSet.add(name);
      }
    });

    res.status(200).json({
      message: "Finalized character names fetched successfully.",
      data: Array.from(nameSet),
    });
  } catch (error) {
    console.error("Error fetching finalized character names:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAITypeData = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;

    const aiDataStructures: Record<string, any> = {
      "characterBuilder": {
        characterBuilder: {
          basicInfo: {
            husbandWife: "Husband or wife (describe relationship)",
            name: "John Doe",
            talentsSkills: [
              "Detective skills",
              "Hand-to-hand combat"
            ],
            birthdate: "1985-07-10",
            age: 39,
            gender: "Male",
            nationality: "American",
            hometown: "New York",
            currentResidence: "Los Angeles",
            occupation: "Private Investigator",
            income: "$80,000",
            backgroundAsChild: "Grew up in a rough neighborhood.",
            brothersSisters: "Brothers and sisters (describe relationship)",
            children: "Children (describe relationship)",
            relationshipSkills: "Good at persuasion",
            grandparents: "Grandparents (describe relationship)",
            grandchildren: "grandchildren (describe relationship)",
            significantOthers: "describe relationship"
          },
          physicalCharacteristics: {
            height: "5ft 10in",
            weight: "170 lbs",
            race: "Caucasian",
            hairColor: "Black",
            eyeColor: "Blue",
            glassesOrContacts: "gdgdg",
            skinColor: "Fair",
            shapeOfFace: "Oval",
            distinguishingFeatures: "Scar on left eyebrow",
            disabilities: "None",
            dressStyle: "Trench coat, formal shoes",
            mannerisms: "Taps fingers when thinking",
            physicalHabits: "Smokes occasionally",
            health: "Good",
            favoriteSayings: "Justice always prevails",
            style: "Classic noir detective",
            greatestFlaw: "Stubborn",
            bestQuality: "Loyal"
          },
          personalityPsychology: {
            introvertOrExtrovert: "Introvert",
            intelligenceLevel: "High",
            mentalHealth: "Stable",
            educationalBackground: "Police Academy, Criminology degree",
            learningExperiences: "Worked under a famous detective",
            shortTermGoals: "Solve the current case",
            longTermGoals: "Open his own detective agency",
            selfPerception: "Determined but haunted by past mistakes",
            perceptionByOthers: "Mysterious and dedicated",
            confidenceLevel: "High",
            emotionalLevel: "Controlled",
            logicalLevel: "Very logical",
            embarrassingFactors: "Failed to solve a high-profile case years ago"
          },
          characterStory: {
            roleInScreenPlay: "Main protagonist",
            firstAppearanceScene: "Opening scene in a crime alley",
            relationshipWithCharacters: "Mentor to a rookie detective",
            relationshipWithAllCharacters: "Has a past with the villain",
            characterChange: "Learns to trust others more",
            additionalNotes: "Inspired by noir detective characters"
          }
        },
      },
      "characterBlueprint": {
        characterBlueprint: {
          // photo: "https://screenplay-common.s3.ap-south-1.amazonaws.com/location/67ab227a31cead9965fa13c1-1741435641177.jpg",
          characterName: "John Doe 4",
          singleSentenceDescription: "A determined private investigator haunted by his past.",
          personality: "Intelligent, introverted, and meticulous.",
          purposeInStory: "To uncover the truth behind a conspiracy while dealing with personal demons.",
          uniqueness: "Sharp deductive skills and a mysterious past make him stand out.",
          readerInterest: "His internal conflict and relentless pursuit of justice.",
          caresMostAbout: "Seeking justice and protecting those he loves.",
          physicalTraits: "Tall, lean, sharp blue eyes, and a scar on his left eyebrow.",
          mostImportantEvent: "The unsolved case that cost him his career in the police force.",
          biggestConcerns: "Failing to protect innocent people and making wrong choices.",
          problemSolvingApproach: "Highly logical, relies on patterns, and trusts evidence over emotions.",
          significantChangeTrigger: "Forced to confront his past failures when an old enemy resurfaces.",
          relationshipsWithOthers: "Mentor to a rookie detective, estranged from his wife, and has a complicated history with the main antagonist."
        }
      },
      "freeform": {
        freeform: {
          "freeform": "Here all freeform data regading character"
        }
      }
    };

    // Check if requested type exists
    if (!aiDataStructures[type]) {
      return res.status(400).json({ message: "Invalid AI type specified." });
    }

    res.status(200).json({ type, structure: aiDataStructures[type] });
  } catch (error) {
    console.error("Error fetching AI type data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getCharactersByFileId = async (req: Request, res: Response) => {
    try {
      const { fileId } = req.params;
      const characters = await CharacterProfile.find({ fileId });
        const response = {
        finalized: characters.filter((char) => char.characterStatus === "finalize"),
        drafts: characters.filter((char) => char.characterStatus === "draft"),
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching characters:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const updateCharacterStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, draftTitle } = req.body;
      if (!["finalize", "draft"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      const updatedCharacter = await CharacterProfile.findByIdAndUpdate(
        id,
        { characterStatus: status, draftTitle: draftTitle },
        { new: true }
      );
      if (!updatedCharacter) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.status(200).json({ message: "Character status updated", updatedCharacter });
    } catch (error) {
      console.error("Error updating character status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
    
const getCharacterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character = await CharacterProfile.findById(id);
    if (!character) {
      return res.status(404).json({ message: "Character not found." });
    }
    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const updateCharacterById = async (req: Request, res: Response) => {
//   try {
//     const { id, selectedTemplate } = req.params;
//     let imageUrl: string | null = null;
//     if (req.file) {
//       imageUrl = await uploadCommonImage(req.file, req.user.id);
//     }
//     const character = await CharacterProfile.findOne({ _id: id });
//     if (!character) {
//       console.log("Character not found.");
//       return res.status(404).json({ message: "Character not found with the given ID and selected template." });
//     }
//     if (!character.allTemplate || !character.allTemplate[selectedTemplate]) {
//       console.log("Invalid template:", selectedTemplate);
//       return res.status(400).json({ message: "Invalid template selected for update." });
//     }
//     const templateUpdateData = req.body[selectedTemplate] || {};
//     Object.assign(character.allTemplate[selectedTemplate], templateUpdateData);
//     if (imageUrl) {
//       character.allTemplate[selectedTemplate].photo = imageUrl;
//     }
//     if (req.body.draftTitle !== undefined) {
//       character.draftTitle = req.body.draftTitle;
//     }
//     if (req.body.characterStatus !== undefined) {
//       character.characterStatus = req.body.characterStatus;
//     }
//     character.markModified(`allTemplate.${selectedTemplate}`);
//     await character.save();
//     res.status(200).json({ message: "Character updated successfully.", updatedCharacter: character });

//   } catch (error) {
//     console.error("Error updating character:", error);
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// const updateCharacterById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { currentTemplate, selectedTemplate, draftTitle, characterStatus } = req.body;

//     if (!id) {
//       return res.status(400).json({ error: "Character ID is required" });
//     }

//     const character = await CharacterProfile.findById(id);
//     if (!character) {
//       return res.status(404).json({ error: "Character not found" });
//     }

//     if (!character.allTemplate) {
//       character.allTemplate = {};
//     }

//     if (selectedTemplate && selectedTemplate !== currentTemplate) {
//       if (currentTemplate && character.allTemplate[currentTemplate]) {
//         console.log('currentTemplate', delete character.allTemplate[currentTemplate])
//         delete character.allTemplate[currentTemplate];
//       }
//       if (!character.allTemplate[selectedTemplate]) {
//         character.allTemplate[selectedTemplate] = {};
//       }
//       character.selectedTemplate = selectedTemplate;
//     } else {
//       if (selectedTemplate && !character.allTemplate[selectedTemplate]) {
//         character.allTemplate[selectedTemplate] = {};
//       }
//       if (selectedTemplate) {
//         character.selectedTemplate = selectedTemplate;
//       }
//     }

//     if (req.file) {
//       const imageUrl = await uploadCommonImage(req.file, req.user.id);
//       if (!character.allTemplate[selectedTemplate]) {
//         character.allTemplate[selectedTemplate] = {};
//       }
//       character.allTemplate[selectedTemplate].photo = imageUrl;
//     }

//     if (selectedTemplate && req.body[selectedTemplate] && typeof req.body[selectedTemplate] === 'object') {
//       const updateData = req.body[selectedTemplate];
//       for (const key of Object.keys(updateData)) {
//         const value = updateData[key];
//         if (value !== undefined) {
//           character.allTemplate[selectedTemplate][key] = value;
//         }
//       }
//     }

//     if (typeof draftTitle === 'string') {
//       character.draftTitle = draftTitle;
//     }
//     if (typeof characterStatus === 'string') {
//       character.characterStatus = characterStatus;
//     }
//     await character.save();
//     console.log('character', character)

//     return res.status(200).json({ message: "Character updated successfully", character });
//   } catch (error) {
//     return res.status(500).json({ error: error.message || "Internal server error" });
//   }
// };

const updateCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentTemplate, selectedTemplate, draftTitle, characterStatus } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Character ID is required" });
    }

    const character = await CharacterProfile.findById(id);
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    if (!character.allTemplate) {
      character.allTemplate = {};
    }
    if (selectedTemplate && selectedTemplate !== currentTemplate) {
      character.allTemplate = { [selectedTemplate]: character.allTemplate[selectedTemplate] || {} };
      character.selectedTemplate = selectedTemplate;
    } else if (selectedTemplate) {
      if (!character.allTemplate[selectedTemplate]) {
        character.allTemplate[selectedTemplate] = {};
      }
      character.selectedTemplate = selectedTemplate;
    }
    if (req.file) {
      const imageUrl = await uploadCommonImage(req.file, req.user.id);
      character.allTemplate[selectedTemplate].photo = imageUrl;
    }
    if (selectedTemplate && req.body[selectedTemplate] && typeof req.body[selectedTemplate] === 'object') {
      const updateData = req.body[selectedTemplate];
      for (const key of Object.keys(updateData)) {
        let value = updateData[key];
        
        if (selectedTemplate === 'characterBuilder' && key === 'basicInfo' && typeof value.name === 'string') {
          value.name = value.name.toUpperCase();
        } else if (selectedTemplate === 'characterBlueprint' && key === 'characterName' && typeof value === 'string') {
          value = value.toUpperCase();
        } else if (selectedTemplate === 'freeform' && key === 'characterName' && typeof value === 'string') {
          value = value.toUpperCase();
        }

        if (value !== undefined) {
          character.allTemplate[selectedTemplate][key] = value;
        }
      }
    }

    if (typeof draftTitle === 'string') {
      character.draftTitle = draftTitle;
    }
    if (typeof characterStatus === 'string') {
      character.characterStatus = characterStatus;
    }

    await character.save();
    console.log('Updated character:', character);

    return res.status(200).json({ message: "Character updated successfully", character });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};

const deleteCharacterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCharacter = await CharacterProfile.findByIdAndDelete(id);
    if (!deletedCharacter) {
      return res.status(404).json({ message: "Character not found." });
    }
    res.status(200).json({ message: "Character deleted successfully." });
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const upsertCharacterRelationship = async (req, res) => {
  try {
    const { fileId, characterId, connections } = req.body;

    if (!fileId || !characterId || !Array.isArray(connections)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const updateBidirectionalConnections = async (charId, targetId, relationship) => {
      let targetRelationship = await CharacterRelationship.findOne({ fileId, characterId: targetId });

      if (targetRelationship) {
        const existingConnection = targetRelationship.connections.find(conn => conn.id.toString() === charId);
        if (!existingConnection) {
          targetRelationship.connections.push({ id: charId, relationship });
          await targetRelationship.save();
        }
      } else {
        targetRelationship = new CharacterRelationship({
          fileId,
          characterId: targetId,
          connections: [{ id: charId, relationship }],
        });
        await targetRelationship.save();
      }
    };

    const existingRelationship = await CharacterRelationship.findOne({ fileId, characterId });

    if (existingRelationship) {
      existingRelationship.connections = connections;
      await existingRelationship.save();
    } else {
      const newRelationship = new CharacterRelationship({
        fileId,
        characterId,
        connections,
      });
      await newRelationship.save();
    }

    for (const conn of connections) {
      await updateBidirectionalConnections(characterId, conn.id, conn.relationship);
    }

    return res.status(200).json({ message: "Character relationship upserted successfully" });
  } catch (error) {
    console.error("Error processing character relationship:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  upsertCharacterRelationship,
  allCharacterRelationship,
  getRelationshipByFileId,
  removeConnection,
  addCharacterPosition,
  saveFreeformCharacter,
  getAllFinalizeCharacter,
  saveCharacter,
  getRelationshipByRelationshipId,
  getCharactersByFileId,
  getAITypeData,
  updateCharacterStatus,
  getCharacterById,
  updateCharacterById,
  deleteCharacterById,
};
