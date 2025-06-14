import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { Theme, ThemeTemplate } from '../../models/co-writer/theme.model'

// Create a new Theme Template
const createThemeTemplate = async (req: Request, res: Response) => {
  try {
    const {
      fileId,
      templateTitle,
      templateTheme,
      templateOptions,
      templateOptionTitle
    } = req.body
    const createdBy = req.user._id
    if (
      !templateTitle ||
      !templateTheme ||
      !templateOptions ||
      templateOptions.length === 0
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const newTemplate = new ThemeTemplate({
      fileId,
      createdBy,
      templateTitle,
      templateOptionTitle,
      templateTheme,
      templateOptions
    })
    console.log('newTemplate', newTemplate)
    const savedTemplate = await newTemplate.save()
    console.log('savedTemplate', savedTemplate)
    return res.status(201).json({
      message: 'Theme Template created successfully',
      data: savedTemplate
    })
  } catch (error) {
    return res.status(500)
  }
}
const createTheme = async (req: Request, res: Response) => {
  try {
    const { fileId, templateId, templateOptions, draftTitle } = req.body
    if (!fileId) {
      return res.status(400).json({ error: 'fileId is required' })
    }
    console.log(draftTitle)
    if (!draftTitle) {
      return res.status(400).json({
        error: 'draftTitle is required'
      })
    }

    let theme = await Theme.findOne({ fileId })

    if (!templateId || !templateOptions) {
      return res.status(400).json({
        error: 'templateId and templateOptions are required'
      })
    }

    // Fetch the selected template
    const template = await ThemeTemplate.findById(templateId)
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
          ans: Array.isArray(providedAnswer.ans)
            ? providedAnswer.ans
            : [providedAnswer.ans]
        }
      }
    )

    // Create new draft theme
    const newThemeDraft = {
      templateId,
      draftTitle,
      templateOptions: completedTemplateOptions,
      isDraft: true
    }

    if (theme) {
      if (theme.status === 'final') {
        theme.status = 'draft'
        theme.finalTheme = '' // Clear final Theme
      }
      theme.themeDrafts.push(newThemeDraft)
      theme.updatedAt = new Date()
    } else {
      theme = new Theme({
        fileId,
        themeDrafts: [newThemeDraft],
        status: 'draft',
        finalTheme: ''
      })
    }
    await theme.save()

    res.status(201).json({ message: 'Theme draft added successfully', theme })
  } catch (error) {
    console.error('Error creating Theme:', error)
    res.status(500).json({ error: 'Failed to create theme' })
  }
}
const finalizeTheme = async (req: Request, res: Response) => {
  try {
    const { fileId, finalTheme } = req.body

    if (!fileId) {
      return res.status(400).json({ error: 'fileId is required' })
    }

    let theme: any = await Theme.findOne({ fileId })

    if (!finalTheme) {
      return res
        .status(400)
        .json({ error: 'FinalTheme is required to finalize a theme' })
    }

    if (theme) {
      theme.finalTheme = finalTheme
      theme.status = 'final'
      theme.themeDrafts = [] // Remove all drafts
    } else {
      // If no Theme exists, create and finalize
      theme = new Theme({
        fileId,
        finalTheme: finalTheme,
        status: 'final'
      })
    }

    theme.updatedAt = new Date()
    await theme.save()

    return res
      .status(201)
      .json({ message: 'theme finalized successfully', theme })
  } catch (error) {
    console.error('Error finalizing theme:', error)
    res.status(500).json({ error: 'Failed to finalize theme' })
  }
}
const updateThemeDraft = async (req: Request, res: Response) => {
  try {
    const { fileId, draftId } = req.params
    const { templateOptions, draftTitle } = req.body

    if (!fileId || !draftId) {
      return res.status(400).json({ error: 'fileId and draftId are required' })
    }
    if (!draftTitle) {
      return res.status(400).json({
        error: 'draftTitle is required'
      })
    }

    if (!templateOptions || !Array.isArray(templateOptions)) {
      return res
        .status(400)
        .json({ error: 'updatedTemplateOptions must be an array' })
    }

    let theme: any = await Theme.findOne({ fileId })

    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' })
    }

    // Find the draft by _id
    const draftIndex = theme.themeDrafts.findIndex(
      draft => draft._id.toString() === draftId
    )

    if (draftIndex === -1) {
      return res.status(404).json({ error: 'theme draft not found' })
    }

    // Update the templateOptions in the draft
    theme.themeDrafts[draftIndex].templateOptions = templateOptions
    theme.themeDrafts[draftIndex].updatedAt = new Date()
    theme.updatedAt = new Date()
    if (draftTitle) theme.themeDrafts[draftIndex].draftTitle = draftTitle

    await theme.save()

    res.status(200).json({ message: 'theme draft updated successfully', theme })
  } catch (error) {
    console.error('Error updating theme draft:', error)
    res.status(500).json({ error: 'Failed to update theme draft' })
  }
}
const deleteThemeDraft = async (req: Request, res: Response) => {
  try {
    const { fileId, draftId } = req.params

    if (!fileId || !draftId) {
      return res.status(400).json({ error: 'fileId and draftId are required' })
    }

    let theme: any = await Theme.findOne({ fileId })

    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' })
    }

    // Filter out the draft that needs to be deleted
    const updatedDrafts = theme.themeDrafts.filter(
      (draft: any) => draft._id.toString() !== draftId
    )
    // If no drafts remain and no final theme exists, delete the entire theme record
    if (updatedDrafts.length === 0 && !theme.finalTheme) {
      await Theme.findOneAndDelete({ fileId })
      return res
        .status(200)
        .json({ message: 'Theme and all drafts deleted successfully' })
    }

    theme.themeDrafts = updatedDrafts
    theme.updatedAt = new Date()

    await theme.save()

    res.status(200).json({ message: 'Theme draft deleted successfully', theme })
  } catch (error) {
    console.error('Error deleting theme draft:', error)
    res.status(500).json({ error: 'Failed to delete theme draft' })
  }
}
const getTheme = async (req, res) => {
  try {
    const { fileId } = req.params
    if (!fileId) {
      return res.status(400).json({ error: 'fileId is required' })
    }

    // Fetch the theme document for the given fileId
    let theme = await Theme.findOne({ fileId })
      .populate({
        path: 'themeDrafts.templateId',
        model: 'ThemeTemplate',
        select: 'templateTitle templateTheme templateOptions'
      })
      .populate('fileId', 'fileName')
      .populate('createdBy', 'name email')
      .exec()

    if (!theme) {
      return res.status(204).json({ message: 'No theme found for this fileId' })
    }

    // Only populate finalTheme.templateId if finalTheme exists
    if (theme.finalTheme) {
      theme = await Theme.populate(theme, {
        path: 'finalTheme.templateId',
        model: 'ThemeTemplate',
        select: 'templateTitle templateTheme templateOptions',
        match: { _id: { $exists: true } }
      })
    }

    res.status(200).json({
      success: true,
      message: 'Theme fetched successfully',
      theme
    })
  } catch (error) {
    console.error('Error fetching theme:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getThemeTemplate = asyncHandler(async (req: Request, res: Response) => {
  try {
    const Templates = await ThemeTemplate.find({})
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

const createFreeformTheme = async (req: Request, res: Response) => {
  try {
    const { fileId, freeformTheme, draftTitle } = req.body
    if (!draftTitle) {
      return res.status(400).json({
        error: 'draftTitle is required'
      })
    }
    if (!fileId || !freeformTheme) {
      return res
        .status(400)
        .json({ error: 'fileId and freeformTheme are required' })
    }

    let theme: any = await Theme.findOne({ fileId })

    const newFreeformDraft = {
      templateId: null, // No template ID for freeform drafts
      templateOptions: [], // No template-based questions
      freeformTheme, // Direct theme input
      isDraft: true,
      draftTitle
    }

    if (theme) {
      theme.themeDrafts.push(newFreeformDraft)
      theme.updatedAt = new Date()
      if (theme.status === 'final') {
        theme.status = 'draft'
        theme.finalTheme = '' // Clear final Theme
      }
    } else {
      theme = new Theme({
        fileId,
        themeDrafts: [newFreeformDraft],
        status: 'draft',
        finalTheme: ''
      })
    }

    // Update the final theme if the freeform theme is finalized
    if (req.body.isFinal) {
      theme.finalTheme = freeformTheme
      theme.status = 'final'
      theme.themeDrafts = [] // Clear drafts as the theme is finalized
    }

    await theme.save()

    res.status(201).json({ message: 'Freeform theme draft created', theme })
  } catch (error) {
    console.error('Error creating freeform theme:', error)
    res.status(500).json({ error: 'Failed to create freeform theme' })
  }
}

// Update a Freeform theme Draft
const updateFreeformDraft = async (req: Request, res: Response) => {
  try {
    const { fileId, draftId } = req.params
    const { freeformTheme, draftTitle } = req.body

    if (!fileId || !draftId || !freeformTheme) {
      return res
        .status(400)
        .json({ error: 'fileId, draftId, and freeformTheme are required' })
    }

    let theme: any = await Theme.findOne({ fileId })
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' })
    }

    const draftIndex = theme.themeDrafts.findIndex(
      draft => draft._id.toString() === draftId
    )
    if (draftIndex === -1) {
      return res.status(404).json({ error: 'theme draft not found' })
    }

    theme.themeDrafts[draftIndex].freeformTheme = freeformTheme
    theme.themeDrafts[draftIndex].updatedAt = new Date()
    theme.themeDrafts[draftIndex].draftTitle = draftTitle
    theme.updatedAt = new Date()

    await theme.save()

    res.status(200).json({ message: 'Freeform theme draft updated', theme })
  } catch (error) {
    console.error('Error updating freeform theme draft:', error)
    res.status(500).json({ error: 'Failed to update freeform theme draft' })
  }
}

// Delete a Freeform theme Draft
const deleteFreeformDraft = async (req: Request, res: Response) => {
  try {
    const { fileId, draftId } = req.params

    if (!fileId || !draftId) {
      return res.status(400).json({ error: 'fileId and draftId are required' })
    }

    let theme: any = await Theme.findOne({ fileId })
    if (!theme) {
      return res.status(404).json({ error: 'final not found' })
    }

    theme.themeDrafts = theme.themeDrafts.filter(
      draft => draft._id.toString() !== draftId
    )

    if (theme.themeDrafts.length === 0 && !theme.finalTheme) {
      await theme.findOneAndDelete({ fileId })
      return res.status(200).json({ message: 'theme and all drafts deleted' })
    }

    theme.updatedAt = new Date()
    await theme.save()

    res.status(200).json({ message: 'Freeform theme draft deleted', theme })
  } catch (error) {
    console.error('Error deleting freeform theme draft:', error)
    res.status(500).json({ error: 'Failed to delete freeform theme draft' })
  }
}
const getTemplateOptionsWithAnswers = templateResponse => {
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

const getAiThemeTemplate = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { templateId } = req.params
    const Templates = await ThemeTemplate.findOne({ _id: templateId })
    console.log(Templates)
    res.status(200).json(getTemplateOptionsWithAnswers(Templates))
  } catch (error) {
    console.error('Error getting Templates:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while fatching the Templates'
    })
  }
})
const getAiThemeFreeForm = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Template options fetched successfully',
      data: 'ai theme'
    })
  } catch (error) {
    console.error('Error getting Templates:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while fatching the Templates'
    })
  }
})
export default {
  createThemeTemplate,
  getThemeTemplate,
  createTheme,
  getTheme,
  updateThemeDraft,
  deleteThemeDraft,
  finalizeTheme,
  createFreeformTheme,
  updateFreeformDraft,
  deleteFreeformDraft,
  getAiThemeTemplate,
  getAiThemeFreeForm
}
