import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { Logline, LoglineTemplate } from '../../models/co-writer/loglines.model'

// Create a new Logline Template
const createLoglineTemplate = async (req: Request, res: Response) => {
  try {
    const {
      fileId,
      templateTitle,
      templateLogline,
      templateOptions,
      templateOptionTitle
    } = req.body
    const createdBy = req.user._id
    if (
      !templateTitle ||
      !templateLogline ||
      !templateOptions ||
      templateOptions.length === 0
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const newTemplate = new LoglineTemplate({
      fileId,
      createdBy,
      templateTitle,
      templateOptionTitle,
      templateLogline,
      templateOptions
    })

    const savedTemplate = await newTemplate.save()
    return res.status(201).json({
      message: 'Logline Template created successfully',
      data: savedTemplate
    })
  } catch (error) {
    return res.status(500)
  }
}
const createLogline = async (req: Request, res: Response) => {
  try {
    const { fileId, templateId, templateOptions, draftTitle } = req.body
    if (!fileId) {
      return res.status(400).json({ error: 'fileId is required' })
    }

    let logline = await Logline.findOne({ fileId })

    if (!templateId || !templateOptions) {
      return res.status(400).json({
        error: 'templateId and templateOptions are required'
      })
    }
    if (!draftTitle) {
      return res.status(400).json({
        error: 'draftTitle is required'
      })
    }

    // Fetch the selected template
    const template = await LoglineTemplate.findById(templateId)
    if (!template) {
      return res.status(404).json({ error: 'Template not found' })
    }

    // Validate template options
    const completedTemplateOptions = template.templateOptions.map(
      templateOpt => {
        const providedAnswer = templateOptions.find(
          opt => opt.que === templateOpt.que
        )
        if (!providedAnswer || !providedAnswer.ans) {
          throw new Error(`Missing answer for question: ${templateOpt.que}`)
        }
        return {
          que: templateOpt.que,
          queDescription: templateOpt.queDescription,
          ans: providedAnswer.ans
        }
      }
    )

    // Create new draft logline
    const newLoglineDraft = {
      templateId,
      templateOptions: completedTemplateOptions,
      draftTitle,
      isDraft: true
    }

    if (logline) {
      if (logline.status === 'final') {
        // If the logline was finalized, reset it to draft and clear finalLogline
        logline.status = 'draft'
        logline.finalLogline = '' // Clear final logline
      }
      logline.loglineDrafts.push(newLoglineDraft)
      logline.updatedAt = new Date()
    } else {
      logline = new Logline({
        fileId,
        loglineDrafts: [newLoglineDraft],
        status: 'draft',
        finalLogline: ''
      })
    }

    await logline.save()

    res
      .status(201)
      .json({ message: 'Logline draft added successfully', logline })
  } catch (error) {
    console.error('Error creating logline:', error)
    res.status(500).json({ error: 'Failed to create logline' })
  }
}
const finalizeLogline = async (req: Request, res: Response) => {
  try {
    const { fileId, FinalLogline } = req.body

    if (!fileId) {
      return res.status(400).json({ error: 'fileId is required' })
    }

    let logline: any = await Logline.findOne({ fileId })

    if (FinalLogline) {
      if (logline) {
        if (logline.status === 'final') {
          // If logline is already finalized, just replace the finalLogline
          logline.finalLogline = FinalLogline
        } else {
          // If logline is in draft, finalize it
          logline.finalLogline = FinalLogline
          logline.status = 'final'
          logline.loglineDrafts = [] // Remove all drafts
        }
      } else {
        // If no logline exists, create and finalize
        logline = new Logline({
          fileId,
          finalLogline: FinalLogline,
          status: 'final'
        })
      }

      logline.updatedAt = new Date()
      await logline.save()

      return res
        .status(201)
        .json({ message: 'Logline finalized successfully', logline })
    }

    return res
      .status(400)
      .json({ error: 'FinalLogline is required to finalize a logline' })
  } catch (error) {
    console.error('Error finalizing logline:', error)
    res.status(500).json({ error: 'Failed to finalize logline' })
  }
}
const updateLoglineDraft = async (req: Request, res: Response) => {
  try {
    const { fileId, draftId } = req.params
    const { templateOptions, draftTitle } = req.body

    if (!fileId || !draftId) {
      return res.status(400).json({ error: 'fileId and draftId are required' })
    }

    if (!templateOptions || !Array.isArray(templateOptions)) {
      return res
        .status(400)
        .json({ error: 'updatedTemplateOptions must be an array' })
    }

    let logline: any = await Logline.findOne({ fileId })

    if (!logline) {
      return res.status(404).json({ error: 'Logline not found' })
    }

    // Find the draft by _id
    const draftIndex = logline.loglineDrafts.findIndex(
      draft => draft._id.toString() === draftId
    )

    if (draftIndex === -1) {
      return res.status(404).json({ error: 'Logline draft not found' })
    }

    // Update the templateOptions in the draft
    logline.loglineDrafts[draftIndex].templateOptions = templateOptions
    logline.loglineDrafts[draftIndex].updatedAt = new Date()
    logline.updatedAt = new Date()
    if (draftTitle) logline.loglineDrafts[draftIndex].draftTitle = draftTitle

    await logline.save()

    res
      .status(200)
      .json({ message: 'Logline draft updated successfully', logline })
  } catch (error) {
    console.error('Error updating logline draft:', error)
    res.status(500).json({ error: 'Failed to update logline draft' })
  }
}
const deleteLoglineDraft = async (req: Request, res: Response) => {
  try {
    const { fileId, draftId } = req.params

    if (!fileId || !draftId) {
      return res.status(400).json({ error: 'fileId and draftId are required' })
    }

    let logline: any = await Logline.findOne({ fileId })

    if (!logline) {
      return res.status(404).json({ error: 'Logline not found' })
    }

    // Filter out the draft that needs to be deleted
    const updatedDrafts = logline.loglineDrafts.filter(
      (draft: any) => draft._id.toString() !== draftId
    )
    // If no drafts remain and no final logline exists, delete the entire logline record
    if (updatedDrafts.length === 0 && !logline.finalLogline) {
      await Logline.findOneAndDelete({ fileId })
      return res
        .status(200)
        .json({ message: 'Logline and all drafts deleted successfully' })
    }

    logline.loglineDrafts = updatedDrafts
    logline.updatedAt = new Date()

    await logline.save()

    res
      .status(200)
      .json({ message: 'Logline draft deleted successfully', logline })
  } catch (error) {
    console.error('Error deleting logline draft:', error)
    res.status(500).json({ error: 'Failed to delete logline draft' })
  }
}
const getLogline = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params

    if (!fileId) {
      return res.status(400).json({ error: 'fileId is required' })
    }

    // Fetch the logline document for the given fileId
    const logline = await Logline.findOne({ fileId })
      .populate({
        path: 'loglineDrafts.templateId', // Populate the templateId inside loglineDrafts
        model: 'LoglineTemplate',
        select: 'templateTitle templateLogline templateOptions'
      })
      .populate('fileId', 'fileName') // Include file details if needed
      .populate('createdBy', 'name email') // Include creator details if needed
      .exec()

    if (!logline) {
      return res
        .status(204)
        .json({ message: 'No logline found for this fileId' })
    }

    res.status(200).json({
      success: true,
      message: 'Logline fetched successfully',
      logline
    })
  } catch (error) {
    console.error('Error fetching logline:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
const getLogLineTemplate = asyncHandler(async (req: Request, res: Response) => {
  try {
    const Templates = await LoglineTemplate.find({})
    res.status(200).json({
      success: true,
      message: 'Templates Take Successfully',
      Templates
    })
  } catch (error) {
    console.error('Error getting Templates:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while fatching the Templates'
    })
  }
})

const createFreeformLogline = async (req: Request, res: Response) => {
  try {
    const { fileId, freeformLogline, draftTitle } = req.body
    if (!draftTitle) {
      return res.status(400).json({
        error: 'draftTitle is required'
      })
    }
    if (!fileId || !freeformLogline) {
      return res
        .status(400)
        .json({ error: 'fileId and freeformLogline are required' })
    }

    let logline: any = await Logline.findOne({ fileId })

    const newFreeformDraft = {
      templateId: null, // No template ID for freeform drafts
      templateOptions: [], // No template-based questions
      freeformLogline, // Direct logline input
      isDraft: true,
      draftTitle
    }

    if (logline) {
      logline.loglineDrafts.push(newFreeformDraft)
      logline.updatedAt = new Date()
    } else {
      logline = new Logline({
        fileId,
        loglineDrafts: [newFreeformDraft],
        status: 'draft',
        finalLogline: ''
      })
    }

    await logline.save()

    res.status(201).json({ message: 'Freeform logline draft created', logline })
  } catch (error) {
    console.error('Error creating freeform logline:', error)
    res.status(500).json({ error: 'Failed to create freeform logline' })
  }
}

// Update a Freeform Logline Draft
const updateFreeformDraft = async (req: Request, res: Response) => {
  try {
    const { fileId, draftId } = req.params
    const { freeformLogline } = req.body

    if (!fileId || !draftId || !freeformLogline) {
      return res
        .status(400)
        .json({ error: 'fileId, draftId, and freeformLogline are required' })
    }

    let logline: any = await Logline.findOne({ fileId })
    if (!logline) {
      return res.status(404).json({ error: 'Logline not found' })
    }

    const draftIndex = logline.loglineDrafts.findIndex(
      draft => draft._id.toString() === draftId
    )
    if (draftIndex === -1) {
      return res.status(404).json({ error: 'Logline draft not found' })
    }

    logline.loglineDrafts[draftIndex].freeformLogline = freeformLogline
    logline.loglineDrafts[draftIndex].updatedAt = new Date()
    logline.updatedAt = new Date()

    await logline.save()

    res.status(200).json({ message: 'Freeform logline draft updated', logline })
  } catch (error) {
    console.error('Error updating freeform logline draft:', error)
    res.status(500).json({ error: 'Failed to update freeform logline draft' })
  }
}

// Delete a Freeform Logline Draft
const deleteFreeformDraft = async (req: Request, res: Response) => {
  try {
    const { fileId, draftId } = req.params

    if (!fileId || !draftId) {
      return res.status(400).json({ error: 'fileId and draftId are required' })
    }

    let logline: any = await Logline.findOne({ fileId })
    if (!logline) {
      return res.status(404).json({ error: 'Logline not found' })
    }

    logline.loglineDrafts = logline.loglineDrafts.filter(
      draft => draft._id.toString() !== draftId
    )

    if (logline.loglineDrafts.length === 0 && !logline.finalLogline) {
      await Logline.findOneAndDelete({ fileId })
      return res.status(200).json({ message: 'Logline and all drafts deleted' })
    }

    logline.updatedAt = new Date()
    await logline.save()

    res.status(200).json({ message: 'Freeform logline draft deleted', logline })
  } catch (error) {
    console.error('Error deleting freeform logline draft:', error)
    res.status(500).json({ error: 'Failed to delete freeform logline draft' })
  }
}
const getTemplateOptionsWithAnswers = templateResponse => {
  console.log(templateResponse)
  if (!templateResponse?.templateOptions?.length) {
    return {
      success: false,
      message: 'No templates found',
      templateOptions: []
    }
  }

  const templateOptions =
    templateResponse.templateOptions.map(option => ({
      que: option.que,
      ans: option.que.toLowerCase().replace(/ /g, '-') // Placeholder answer, replace with AI-generated answer later
    })) || []

  return {
    success: true,
    message: 'Template options fetched successfully',
    templateOptions
  }
}

const getAiLogLineTemplate = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { templateId } = req.params
      const Templates = await LoglineTemplate.findOne({ _id: templateId })
      res.status(200).json(getTemplateOptionsWithAnswers(Templates))
    } catch (error) {
      console.error('Error getting Templates:', error)
      res.status(500).json({
        success: false,
        message: 'An error occurred while fatching the Templates'
      })
    }
  }
)
const getAiLogLineFreeForm = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      res.status(200).json({
        success: true,
        message: 'Template options fetched successfully',
        data: 'ai logline'
      })
    } catch (error) {
      console.error('Error getting Templates:', error)
      res.status(500).json({
        success: false,
        message: 'An error occurred while fatching the Templates'
      })
    }
  }
)
export default {
  createLoglineTemplate,
  getLogLineTemplate,
  createLogline,
  getLogline,
  updateLoglineDraft,
  deleteLoglineDraft,
  finalizeLogline,
  createFreeformLogline,
  updateFreeformDraft,
  deleteFreeformDraft,
  getAiLogLineTemplate,
  getAiLogLineFreeForm
}
