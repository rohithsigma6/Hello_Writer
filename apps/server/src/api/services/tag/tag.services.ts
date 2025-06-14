import {
  ContentItem,
  Document,
  TaggedWord,
  ContentObject,
  Mark,
  WordTagResponse,
  DocumentData,
  Tag,
  ParagraphContent,
  Paragraph,
  paragraphDocument
} from './type'
import OpenAI from 'openai'
import Configuration from 'openai'
import axios from 'axios'
import { integer } from 'aws-sdk/clients/storagegateway'
import EditorContent from '../../models/editor-content.model'
import TagMongo from '../../models/tag.model'
import { handleTag } from '../../controllers/tag.controller'
import { response } from 'express'
import Category from '../../models/category.model'

export const separateUntaggingText = async (
  contentData: DocumentData,
  index: integer
) => {
  const taggingText: string[] = []
  const IGNORE_WORDS = [
    'is',
    'are',
    'your',
    'the',
    'a',
    'an',
    'in',
    'on',
    'at',
    'by',
    'with',
    'to',
    'for',
    'from',
    'of',
    'and',
    'or',
    'but',
    'was',
    'he',
    'she',
    'it',
    'they',
    'we',
    'you',
    'I',
    'me',
    'him',
    'her',
    'them',
    'us'
  ]
  contentData?.content[index]?.content?.forEach((contentItem: ContentItem) => {
    if (IGNORE_WORDS.includes(contentItem.text.trim().toLowerCase())) {
      // console.log(`Skipping ignored word: ${contentItem.text}`);
      return
    }
    if (contentItem.marks) {
      const hasCustomTag = contentItem.marks.some(
        mark => mark.type === 'CustomTag'
      )
      if (!hasCustomTag) {
        taggingText.push(contentItem.text)
      }
    } else {
      // If "marks" is missing, add text to taggingText
      taggingText.push(contentItem.text)
    }
  })
  return taggingText
}

function deleteKey<T extends object, K extends keyof T> (obj: T, key: K): void {
  delete obj[key] // Use delete to remove the key
}

export const mergeTagging = async (
  contentData: DocumentData,
  assignTag: WordTagResponse[],
  index: integer,
  user_scene_file: any
) => {
  const IGNORE_WORDS = [
    'is',
    'are',
    'your',
    'the',
    'a',
    'an',
    'in',
    'on',
    'at',
    'by',
    'with',
    'to',
    'for',
    'from',
    'of',
    'and',
    'or',
    'but',
    'he',
    'she',
    'it',
    'they',
    'we',
    'you',
    'I',
    'me',
    'him',
    'her',
    'them',
    'us',
    ' '
  ]
  // console.log("TAg Assign =>" , assignTag);

  for (const contentItem of contentData.content[index]?.content || []) {
    if (IGNORE_WORDS.includes(contentItem.text)) {
      // console.log(`Skipping ignored word: ${contentItem.text}`);
      continue
    }
    if (contentItem.marks) {
      const hasCustomTag = contentItem.marks.some(
        mark => mark.type === 'CustomTag'
      )
      if (!hasCustomTag) {
        const assign = assignTag.find(
          tag =>
            tag.assignText?.trim().toLowerCase() ==
            contentItem?.text?.trim().toLowerCase()
        )
        if (assign) {
          // console.log("Assign =>", assign);
          // delete assign?.assignText;
          contentItem.marks = [assign]
        }
      }
    } else {
      let assign = assignTag.find(
        obj =>
          obj.assignText.trim().toLowerCase() ==
          contentItem?.text?.trim().toLowerCase()
      )
      if (assign) {
        const tag = await handleTag({
          sceneId: user_scene_file.sceneId,
          searchParams: {
            fileId: user_scene_file.fileId,
            categoryId: assign.attrs.categoryId,
            name: contentItem?.text?.trim().toLowerCase()
          },
          updateOptions: { userId: user_scene_file.userId }
        })
        if (tag) {
          assign['attrs']['_id'] = tag._id.toString()
        }
        // const tag = await handleTag({
        //     sceneId: "6748d2b6f87e4842866343ae",
        //     searchParams: {
        //         fileId: "6748d2a2f87e48428663431c",
        //         categoryId: assign.attrs.categoryId,
        //         name: contentItem?.text?.trim().toLowerCase()
        //     },
        //     updateOptions: { userId: "673e342525bf1040e88e5c5f" }
        // });
        // if (tag) {
        //     assign["attrs"]["_id"] = tag._id;
        // }
        // console.log("Assign In Marge =>", assign);
        let updatedAssign = { ...assign, assignText: contentItem.text }
        deleteKey(updatedAssign, 'assignText')
        contentItem.marks = [updatedAssign]
        // console.log("Updated contentItem:", contentItem);
      }
    }
  }

  // console.log("contentData =>", contentData);
  return contentData
}
export const splitTextContent = (document: Document): Document => {
  // console.log("🚀 ~ splitTextContent ~ document:", document)
  const splitContent = (contentArray: ContentObject[]): ContentObject[] => {
    const result: ContentObject[] = []

    contentArray.forEach(content => {
      if (content.type === 'text' && content.text) {
        // Split the text into words, keeping punctuation and spaces
        const words = content.text.trim().split(/(\s+|,\.)/)
        // console.log(words, "words")
        // Process each word or token
        words.forEach((word, index) => {
          const nextWord = words[index + 1]
          const isSpecialNext = nextWord && /[,.]/.test(nextWord)

          // Add a space only if the next word is not a special character
          let text = word + (isSpecialNext == true ? '' : ' ')
          // Handle special cases to avoid unnecessary spaces
          if (text === ', ') {
            text = ','
          } else if (text === '. ') {
            text = '.'
          } else if (text == '') {
            return // Skip entirely empty strings
          } else if (text.trim() == '') {
            return // Skip entirely empty strings
          }

          // Push the processed word to the result
          result.push({
            type: 'text',
            text: text,
            ...(content.marks && { marks: content.marks })
          })
        })
      } else if (content.content) {
        // Recursively process nested content arrays
        result.push({
          ...content,
          content: splitContent(content.content)
        })
      } else {
        // Push non-text content as is
        result.push(content)
      }
    })

    return result
  }

  return {
    ...document,
    content: splitContent(document.content)
  }
}

export const updateTagIdInJsonContent = async (
  jsonObject: any,
  targetTagId: string,
  assignTagId: string
) => {
  // console.log("*********** Update Content ***********");
  var contentUpdated = false
  if (jsonObject) {
    // Traverse the content structure and update the color
    if (jsonObject?.content) {
      // console.log("jsonObject=>" , jsonObject.content);
      if (jsonObject.content?.content?.length > 0) {
        jsonObject.content.content.forEach((contentItem: any) => {
          // console.log("Content item =>" , contentItem);
          if (contentItem.content) {
            contentItem.content.forEach((item: any) => {
              if (item.marks) {
                // const index = item.marks.findIndex((mark: any) => mark.type === 'CustomTag' && mark.attrs._id === targetTagId);
                // console.log("index" , index);
                // if(index !== -1){
                //     contentUpdated = true
                //     item.marks.splice(index, 1);
                // }
                item.marks.forEach((mark: any) => {
                  if (
                    mark?.type === 'CustomTag' &&
                    mark?.attrs?._id.toString() === targetTagId.toString()
                  ) {
                    mark.attrs._id = assignTagId
                    contentUpdated = true
                  }
                })
              }
            })
          }
        })
      }
    }
    return { update: contentUpdated, updateJson: jsonObject.content }
  }
}
// export const assignTagsToWords = async(words: string[], tags:Tag[])=>{
//     // console.log("Tag",tags);
//     // console.log("words",tags);
//     const prompt = `Match tags with words based on context.
//     Words: ${JSON.stringify(words)}
//     Tags: ${JSON.stringify(tags.map(tag => ({ id: tag._id, name: tag.color })))}
//     Return an array of objects with properties:
//     {
//         "type": "CustomTag",
//         "attrs": {
//         "class": "color",
//         "color": "tag color",
//         "tagId": "tag id",
//         "notes": "related notes or empty if none"
//         }
//         "assignedText": "text of the assigned tag"
//     }`;
//     try {
//         const response = await openai.chat.completions.create({
//             model: 'gpt-3.5-turbo',
//             messages: [{ role: 'user', content: prompt }],
//             max_tokens: 200,
//         });

//         console.log("response =>" , response.choices[0].message);
//         console.log("response =>" , response.choices[0].message.content);
//         if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
//             const tagsResponse: CustomTag[] = JSON.parse(response.choices[0].message.content.trim());
//             return tagsResponse;
//           } else {
//             throw new Error("Incomplete response from OpenAI");
//           }
//         // const tagsResponse: CustomTag[] = JSON.parse(response.choices[0].message.content.trim());
//         // return "tagsResponse";
//         // if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
//         //     const content = response.choices[0].message.content.trim();

//         //     // Try to parse the JSON and handle errors
//         //     try {
//         //       const tagsResponse: CustomTag[] = JSON.parse(content);
//         //       return tagsResponse;
//         //     } catch (parseError) {
//         //       console.error("Error parsing JSON response:", parseError);
//         //       throw new Error("Invalid JSON response from OpenAI.");
//         //     }
//         // } else {
//         //     throw new Error("Incomplete response from OpenAI");
//         // }
//     } catch (error) {
//         console.error("Error assigning tags:", error);
//         throw error;
//     }
// }
// function generatePrompt(words: string[], tags: Tag[]): string {
//     const tagList = tags.map(tag => `- ${tag.color} (${tag._id})`).join('\n');
//     return `
//     You are a tag assignment system. Assign the most relevant tags from the following list to the given words:

//     Tags:
//     ${tagList}

//     Words: ${words.join(', ')}

//     Respond with a JSON array where each object has:
//     - "type": "CustomTag"
//     - "attrs": {"class": "color", "color": "tag color", "tagId": "tag ID", "notes": ""}
//     - "assignText": "<word>"
//   `;
// }
function generatePrompt (words: string[], tags: Tag[]): string {
  const tagDescriptions = tags
    .map(
      (tag, index) =>
        `${index + 1}- ${tag.name} : (ID: ${tag._id}, Color: ${tag.color})`
    )
    .join('\n')

  const prompt = `
        You are a tagging assistant. Your task is to assign relevant categories (tags) to individual words based on their meaning. Below is the list of available categories, each with a unique ID and color.

        Categories:
            ${tagDescriptions}

        When responding:
        - **Always respond with a JSON array of objects.** If no tags can be assigned to any word, return an empty JSON array: [].
        - Do not include explanations, strings, or any other format outside the specified JSON array.

        Instructions for Tagging:
        1. **Analyze Each Word Individually:** Treat each word as a standalone entity. If it clearly matches a category, assign the category.
        2. **Assign Only One Tag per Word:** Use the most specific and relevant category for each word.
        3. **Stop Words and Irrelevant Words:** Exclude words that:
        - Are common stop words (e.g., "is," "the," "and") or irrelevant in this context.
        - Do not match any of the provided categories.
        4. **Example Mapping:**
            - "TV" → Props
            - "Person" → Characters
            - "Car" → Vehicles
        5. **Special Instructions:**
            - If a word is a proper noun (e.g., a person's name), assign the "Characters" category.
        6. **Tag the word on the base of context like cricket match, where cricket is not animal context is**

        Generate a JSON array of objects for each word in the provided list. Each object should have the following fields:
    - type: "CustomTag"
    - attrs: {
        class: string,            // Use "color" or any relevant class name
        color: string hex code,   // Exact hex code for the tag's color
        categoryId: string,       // Use the exact MongoDB ObjectId from the tag's _id field
        notes: string,            // Additional notes if required, otherwise leave blank
        tooltip: string           // Use the tag's name or relevant description
    }
    - assignText: string         // The original word being tagged

Important Notes:
- The "categoryId" field must strictly use the value of the "_id" field from the corresponding category. Do not use any other value.
- The "color" field must strictly use the value of the "color" field from the corresponding category. Do not confuse this with "categoryId".
- Ensure strict adherence to the JSON structure.
        
        Example Response:
            [
                {
                    "type": "CustomTag",
                    "attrs": {
                        "class": "color",
                        "color": "#ff0000",
                        "categoryId": "67595bd634c7a29e1d1ed370 (strictly follow this)",
                        "notes": "",
                        "tooltip:"Characters"
                    },
                    "assignText": "Person"
                },
            ]
        
        Words to tag: [${words.map(word => `'${word}'`).join(',')}]
    `

  return prompt
}
function generatePrompt2 (string: string, tags: Tag[]) {
  // Construct the category descriptions for the prompt
  const tagDescriptions = tags
    .map(cat => `${cat.name} (ID: ${cat._id}, Color: ${cat.color})`)
    .join('\n')

  // Construct the prompt
  // const prompt = `
  //     You are a tagging assistant. Your task is to assign relevant categories (tags) to individual words or phrases based on their meaning. Below is the list of available categories, each with a unique ID and color.

  //     Categories:
  //     ${tagDescriptions}

  //     Instructions for tagging:
  //     1. Analyze each word or phrase in the given input string individually.
  //     2. For each word or phrase, assign a relevant category if it matches any of the categories provided.
  //     3. If no category matches, exclude the word or phrase from the result.

  //     Response Format:
  //     - Always return an array of JSON objects in the following format:
  //         { "text": "Word or phrase", "category": "Category Name" }
  //     - Do not include any other data or explanation in your response.

  //     Example:
  //     Input: "Saad Aziz is going to the office."
  //     Output:
  //     [
  //         { "text": "Alister Cock", "category": "Characters" },
  //         { "text": "Walking", "category": "Action" }
  //     ]

  //     Input string: ${string}
  // `;
  const prompt = `
        You are a tagging assistant. Your task is to assign relevant categories (tags) to individual words or phrases based on their meaning. Below is the list of available categories, each with a unique ID and color.

        Categories:
        ${tagDescriptions}

        Instructions for tagging:
        1. Analyze each word or phrase in the given input string individually.
        2. For each word or phrase, assign a relevant category if it matches any of the categories provided.
        3. If no category matches, exclude the word or phrase from the result.

        Response Format:
        - Always return an array of JSON objects in the following strict format:
        [
            { "text": "Word or phrase", "category": "Category Name" },
            { "text": "Another word", "category": "Another Category" }
        ]
        - Do not include any explanations, additional text, or deviating syntax outside of the JSON array.

        Example:
        Input: "Saad Aziz is going to the office."
        Output:
        [
            { "text": "Saad Aziz", "category": "Characters" },
            { "text": "office", "category": "Locations" }
        ]

        Input string: ${string}
        `

  return prompt
}
function convertToJson (
  inputString: string,
  tagsArray: WordTagResponse[]
): paragraphDocument {
  const paragraphs = inputString.split('\n')
  console.log('Convert to JSON:')
  const tagMap = new Map<string, WordTagResponse['attrs']>()
  tagsArray.forEach(tag => {
    tagMap.set(tag.assignText, tag.attrs)
  })

  const content: Paragraph[] = paragraphs.map(paragraph => {
    const paragraphContent: ParagraphContent[] = []
    let remainingText = paragraph
    // Process tagged parts first
    for (const [assignText, attrs] of tagMap.entries()) {
      const regex = new RegExp(`\\b${assignText}\\b`, 'g') // Match whole words only
      const matches = [...remainingText.matchAll(regex)]

      matches.forEach(match => {
        const beforeText = remainingText.slice(0, match.index)
        const taggedText = match[0]
        const afterText = remainingText.slice(match.index! + taggedText.length)

        // Add untagged text before the match
        if (beforeText.trim()) {
          paragraphContent.push({
            type: 'text',
            text: beforeText
          })
        }

        // Add tagged text with marks
        paragraphContent.push({
          type: 'text',
          text: taggedText,
          marks: [
            {
              type: 'CustomTag',
              attrs: {
                class: attrs.class,
                color: attrs.color,
                // _id: attrs.categoryId, // Assuming categoryId serves as _id
                notes: attrs.notes,
                name: taggedText,
                categoryId: attrs.categoryId,
                tooltip: attrs.tooltip
              }
            }
          ]
        })

        // Update the remaining text
        remainingText = afterText
      })
    }

    // Add any remaining untagged text
    if (remainingText.trim()) {
      paragraphContent.push({
        type: 'text',
        text: remainingText
      })
    }

    return {
      type: 'paragraph',
      content: paragraphContent
    }
  })

  return {
    type: 'doc',
    content
  }
}
async function generateTaggedJSONImproved (
  inputString: string,
  taggedWords: TaggedWord[],
  fileId: string
): Promise<any> {
  const jsonStructure: any = {
    type: 'doc',
    content: []
  }

  const tagMap = new Map<string, string>()
  for (const taggedWord of taggedWords) {
    tagMap.set(taggedWord.text, taggedWord.category)
  }

  const segments = inputString.split('\n')

  for (const segment of segments) {
    const paragraph: any = {
      type: 'paragraph',
      content: []
    }
    let remainingText = segment.trim()

    while (remainingText.length > 0) {
      let matchFound = false

      for (const [phrase, category] of tagMap.entries()) {
        if (remainingText.startsWith(phrase)) {
          const categoryDetails = await Category.findOne({
            name: category,
            fileId: fileId
          }).exec()
          if (!categoryDetails) {
            throw new Error(`Category not found for ${category}`)
          }

          paragraph.content.push({
            type: 'text',
            marks: [
              {
                type: 'CustomTag',
                attrs: {
                  class: 'color',
                  color: categoryDetails.color,
                  // _id: categoryDetails._id,
                  notes: '',
                  name: phrase,
                  categoryId: categoryDetails._id,
                  tooltip: categoryDetails.name
                }
              }
            ],
            text: `${phrase} `
          })

          remainingText = remainingText.slice(phrase.length).trimStart()
          matchFound = true
          break
        }
      }
      if (!matchFound) {
        const nextSpaceIndex = remainingText.indexOf(' ')
        const word =
          nextSpaceIndex === -1
            ? remainingText
            : remainingText.slice(0, nextSpaceIndex)

        paragraph.content.push({
          type: 'text',
          text: `${word} `
        })

        remainingText =
          nextSpaceIndex === -1
            ? ''
            : remainingText.slice(nextSpaceIndex + 1).trimStart()
      }
    }
    jsonStructure.content.push(paragraph)
  }

  return jsonStructure
}
export async function assignTagsToTheScripts (
  text: string,
  tags: Tag[],
  fileId: string
) {
  // try {
  const prompt = generatePrompt2(text, tags)
  console.log('Prompt:', prompt)
  const openAiResponse = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an assistant that assigns tags to words.`
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      functions: [
        {
          name: 'assignTags',
          description:
            'Assign tags based on the words and tags provided in the user prompt',
          parameters: {
            type: 'object',
            properties: {
              final: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    text: { type: 'string' },
                    category: { type: 'string' }
                  },
                  required: ['text', 'category'],
                  additionalProperties: false
                }
              }
            },
            required: ['final']
          }
        }
      ]
    },

    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )
  console.log(
    'APi response =>',
    openAiResponse.data.choices[0].message.function_call.arguments
  )

  // const functionCallResponse = openAiResponse.data.choices[0].message.function_call.arguments;
  const apiResponse =
    openAiResponse.data.choices[0].message.function_call.arguments
  console.log('apiResponse', apiResponse)
  // Parse and validate functionCallResponse to ensure correctness.
  // const parsedResponse = JSON.parse(functionCallResponse);
  const parsedResponse = JSON.parse(apiResponse)?.final
  console.log('parsedResponse', parsedResponse)
  const result = await generateTaggedJSONImproved(text, parsedResponse, fileId)
  // const tagsResponse = parsedResponse;

  // const result = await convertToJson(text, tagsResponse);
  // console.log("Tagging Response:", openAiResponse);
  // console.log("result =>" , result);
  return result
  // } catch (error) {
  //     console.error('Error assigning tags:', error);
  //     throw new Error('Failed to assign tags to the script');
  // }
  // try {
  //     const prompt = generatePrompt2(text, tags);
  //     console.log("Prompt:", prompt);
  //     // Send the request to OpenAI
  //     const response = await axios.post(
  //         'https://api.openai.com/v1/chat/completions',
  //         {
  //             model: 'gpt-4',
  //             messages: [
  //                 { role: "system", content: "You are a tagging assistant." },
  //                 { role: "user", content: prompt }
  //             ],
  //             temperature: 0.3,
  //         },
  //         {
  //             headers: {
  //                 Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //                 'Content-Type': 'application/json',
  //             },
  //         }
  //     );

  //     // Extract and return the response as TaggedWord[]
  //     const apiResponse = response.data.choices[0].message.content;
  //     console.log("apiResponse", JSON.parse(apiResponse));
  //     return JSON.parse(apiResponse);
  // } catch (error) {
  //     console.error('Error during OpenAI API call:', error);
  //     throw new Error('Failed to assign tags');
  // }
}
export async function getTagForWords (
  words: string[],
  tags: Tag[]
): Promise<WordTagResponse[]> {
  try {
    const prompt = generatePrompt(words, tags)
    // console.log("🚀 ~ getTagForWords ~ prompt:", prompt)

    const openAiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'Always use function calling. make sure categoryId always gets the mongoDB schema objectId'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        functions: [
          {
            name: 'assignTags',
            description:
              'Assign tags based on the words and tags provided in the user prompt',
            parameters: {
              type: 'object',
              properties: {
                final: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      attrs: {
                        type: 'object',
                        properties: {
                          class: { type: 'string' },
                          color: {
                            type: 'string',
                            description:
                              'The color of assigned category goes here'
                          },
                          categoryId: {
                            type: 'string',
                            description:
                              'The categoryId/ID/_id of assigned category goes here 67595bd634c7a29e1d1ed370 (strictly follow this)'
                          },
                          notes: { type: 'string' },
                          tooltip: {
                            type: 'string',
                            description: 'The name of category goes here '
                          }
                        },
                        required: [
                          'class',
                          'color',
                          'categoryId',
                          'notes',
                          'tooltip'
                        ]
                      },
                      assignText: { type: 'string' }
                    },
                    required: ['type', 'attrs', 'assignText']
                  }
                }
              },
              required: ['final']
            }
          }
        ]
        // max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const functionCallResponse =
      openAiResponse.data.choices[0].message.function_call.arguments

    // Log the function call response
    // console.log("Function Call Response:", typeof functionCallResponse);
    // console.log(openAiResponse.data.choices[0], "openAiResponse.data")
    const result = openAiResponse.data.choices[0].message.content
    // console.log("🚀 ~ getTagForWords ~ result:")
    // console.log(result)
    const tagging = JSON.parse(functionCallResponse)?.final
    // console.log("🚀 ~ getTagForWords ~ tagging:", tagging)
    return tagging
    // return transformResponse(JSON.parse(result), tags);
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw new Error('Failed to fetch tags from OpenAI')
  }
}
function transformResponse (openAiResult: any, tags: Tag[]): WordTagResponse[] {
  return openAiResult.map((item: any) => {
    // console.log("item" , item);
    const matchingTag = tags.find(tag => tag._id == item.attrs.categoryId)
    return {
      type: 'CustomTag',
      attrs: {
        class: 'color',
        color: matchingTag ? matchingTag.color : '#5593CC',
        tagId: item.attrs.categoryId,
        notes: item.attrs.notes || ''
      },
      assignText: item.assignText
    }
  })
}
// export function removeMatchingMarks(jsonObject: any, targetTagId: string): any {
//     // Traverse the JSON structure and modify it in place
//     if (Array.isArray(jsonObject)) {
//         return jsonObject
//             .map(item => removeMatchingMarks(item, targetTagId)) // Recursively apply to child elements
//             .filter(item => item !== null); // Filter out removed items
//     } else if (typeof jsonObject === "object" && jsonObject !== null) {
//         if (jsonObject.marks) {
//             // Check if `marks` contains an object with a matching tagId
//             const hasMatchingTagId = jsonObject.marks.some(
//                 (mark: Mark) => mark.type === "CustomTag" && mark?.attrs?.tagId === targetTagId
//             );

//             if (hasMatchingTagId) {
//                 return null; // Remove this object
//             }
//         }

//         // Recursively process properties of the object
//         for (const key in jsonObject) {
//             jsonObject[key] = removeMatchingMarks(jsonObject[key], targetTagId);
//         }
//     }

//     return jsonObject;
// }
export async function removeMatchingMarks (
  jsonObject: any,
  editorContentId: string,
  targetTagId: string
) {
  // Traverse the JSON structure and modify it in place
  if (Array.isArray(jsonObject)) {
    return jsonObject.map(item =>
      removeMatchingMarks(item, editorContentId, targetTagId)
    ) // Recursively apply to child elements
  } else if (typeof jsonObject === 'object' && jsonObject !== null) {
    if (jsonObject.marks) {
      // Check if `marks` contains an object with a matching tagId
      jsonObject.marks = jsonObject.marks.filter(
        (mark: Mark) =>
          !(
            mark.type === 'CustomTag' && mark?.attrs?.categoryId === targetTagId
          )
      )
    }

    // Recursively process properties of the object
    for (const key in jsonObject) {
      jsonObject[key] = removeMatchingMarks(
        jsonObject[key],
        editorContentId,
        targetTagId
      )
    }
  }

  await EditorContent.findByIdAndUpdate(editorContentId, {
    content: jsonObject
  })
}

export const updateContent = async (jsonObject: any, targetTagId: string) => {
  // console.log("*********** Update Content ***********");
  var contentUpdated = false
  if (jsonObject) {
    // Traverse the content structure and update the color
    if (jsonObject?.content) {
      // console.log("jsonObject=>", jsonObject.content);
      if (jsonObject.content?.content?.length > 0) {
        jsonObject.content.content.forEach((contentItem: any) => {
          // console.log("Content item =>", contentItem);
          if (contentItem.content) {
            contentItem.content.forEach((item: any) => {
              if (item.marks) {
                const index = item.marks.findIndex(
                  (mark: any) =>
                    mark.type === 'CustomTag' &&
                    mark.attrs?._id?.toString() === targetTagId?.toString()
                )
                // console.log("index", index);
                if (index !== -1) {
                  contentUpdated = true
                  item.marks.splice(index, 1)
                }
              }
            })
          }
        })
      }
    }
    // console.log("🚀 ~ updateContent ~ jsonObject:", jsonObject)

    return { update: contentUpdated, updateJson: jsonObject.content }
  }
}

// Utility function to update content and mark tags as deletede
export const updateContentAndDeleteTag = async (json: any, tagId: string) => {
  if (!json || !json.content) return { contentUpdated: false }

  const data = await updateContent(json, tagId) // Call your existing updateContent function
  let contentUpdated = false

  if (data?.update) {
    json.content = data.updateJson
    contentUpdated = true
  }

  await TagMongo.findByIdAndUpdate(tagId)

  return { contentUpdated, updatedJson: json }
}

export const deleteTagHelper = async (
  tagId: any,
  key: 'sceneId' | 'fileId',
  value: string
) => {
  const tag = await TagMongo.findById(tagId)
  if (!tag) {
    return {
      success: false,
      message: `Tag with ID ${tagId} not found.`
    }
  }
  if (key === 'fileId') {
    tag.scenes = []
    tag.overallOccurrence = 0
    tag.scenesOccurrence = 0

    // Mark as deleted if no scenes remain
    if (tag.scenes.length === 0) {
      tag.isDeleted = true
    }
    await tag.save()
    return {
      success: true,
      message: `All scenes with fileId: ${value} removed successfully.`,
      updatedTag: tag
    }
  } else if (key === 'sceneId') {
    // Find the scene index by sceneId
    const foundSceneIndex = tag.scenes.findIndex(
      (scene: any) => scene.sceneId?.toString() === value
    )
    if (foundSceneIndex === -1) {
      return {
        success: false,
        message: `No scene found with the specified sceneId: ${value}.`
      }
    }

    const foundScene = tag.scenes[foundSceneIndex]
    const foundSceneOccurrence = foundScene.occurrence as unknown as number

    // Remove the scene
    tag.scenes.splice(foundSceneIndex, 1)

    // Adjust occurrences
    tag.overallOccurrence -= foundSceneOccurrence
    tag.scenesOccurrence = tag.scenes.length

    // Mark as deleted if no scenes remain
    if (tag.scenes.length === 0) {
      tag.isDeleted = true
    }
    await tag.save()
    return {
      success: true,
      message: `Scene with sceneId: ${value} removed successfully.`,
      updatedTag: tag
    }
  } else {
    return {
      success: false,
      message: "Invalid key provided. Use 'sceneId' or 'fileId'."
    }
  }
}

export const processContent = async (inputJson: Document): Promise<string> => {
  return inputJson.content
    .map(node => {
      if (node.content) {
        return node.content.map(contentItem => contentItem.text || '').join('')
      }
      return ''
    })
    .filter(Boolean) // Remove any empty paragraphs
    .join('\n') // Separate paragraphs with double newlines
}
