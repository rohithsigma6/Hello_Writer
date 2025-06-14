import { Plot, Template } from '../models/plot.model'

const saveWriteFreely = async (req, res) => {
  try {
    const { createdBy, fileId, content, status, id, draftTitle } = req.body
    if (!content) {
      return res.status(400).json({ error: 'Content is required.' })
    }
    if (!draftTitle) {
      return res.status(400).json({
        error: 'draftTitle is required'
      })
    }
    if (status === 'finalized') {
      await Plot.deleteMany({ fileId, status: 'draft' })
    }

    let plot
    if (id) {
      plot = await Plot.findByIdAndUpdate(id, req.body, { new: true })
    } else {
      plot = new Plot({
        createdBy,
        fileId,
        templateType: 'writeFreely',
        draftTitle,
        writeFreelyData: { content },
        status: status || 'draft'
      })
      await plot.save()
    }
    res.status(201).json(plot)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const saveTemplatePlot = async (req, res) => {
  try {
    const createdBy = req.user._id
    const { fileId, templateData, status, templateType, draftTitle } = req.body
    if (!draftTitle) {
      return res.status(400).json({
        error: 'draftTitle is required'
      })
    }
    if (!templateData || templateData.length === 0) {
      return res.status(400).json({ error: 'Template data is required.' })
    }

    if (!templateType) {
      return res.status(400).json({ error: 'Template type is required.' })
    }

    if (status === 'finalized' && fileId) {
      await Plot.deleteMany({ fileId })
    }

    let plot
    const isTemplatedExist = await Plot.findOne({ templateType, fileId })

    if (isTemplatedExist) {
      plot = await Plot.findOneAndUpdate({ templateType, fileId }, req.body, {
        new: true
      })
    } else {
      plot = new Plot({
        createdBy,
        fileId,
        templateType: templateType,
        draftTitle,
        templateData,
        status: status || 'draft'
      })
      plot = await Plot.create(plot)
    }

    return res.status(201).json(plot)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const updatePlotStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status, templateType, templateData } = req.body

    if (!['draft', 'finalized'].includes(status)) {
      res.status(400).json({ error: 'Invalid status value.' })
    }

    if (templateType == 'writeFreely') {
      const updatedPlot = await Plot.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      )

      if (!updatedPlot) {
        return res.status(404).json({ error: 'Plot not found.' })
      }
      if (status === 'finalized') {
        // Delete all other drafts of the same fileId
        await Plot.deleteMany({ fileId: updatedPlot?.fileId, status: 'draft' })
      }
      res.status(200).json(updatedPlot)
    } else {
      const updatedPlot = await Plot.findByIdAndUpdate(
        id,
        { status, templateData },
        { new: true }
      )

      if (!updatedPlot) {
        res.status(404).json({ error: 'Plot not found.' })
      }

      res.status(200).json(updatedPlot)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const getFilePlot = async (req, res) => {
  try {
    const { fileId } = req.params
    if (!fileId) {
      return res.status(400).json({ error: 'File id is needed' })
    }
    const plot = await Plot.find({ fileId })
      .populate({
        path: 'templateData.template.predefinedBeat.characters',
        model: 'CharacterProfile'
      });
    res.status(200).json(plot)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const deleteAct = async (req, res) => {
  try {
    const { templateId, actId } = req.params

    const updatedTemplate = await Template.findByIdAndUpdate(
      templateId,
      { $pull: { template: { _id: actId } } },
      { new: true }
    )

    if (!updatedTemplate) {
      return res.status(404).json({ error: 'Template or Act not found.' })
    }

    res
      .status(200)
      .json({ message: 'Act deleted successfully', updatedTemplate })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const deletePredefinedBeat = async (req, res) => {
  try {
    const { templateId, actId, beatId } = req.params

    const updatedTemplate = await Template.findOneAndUpdate(
      { _id: templateId, 'template._id': actId },
      { $pull: { 'template.$.predefinedBeat': { _id: beatId } } },
      { new: true }
    )

    if (!updatedTemplate) {
      return res
        .status(404)
        .json({ error: 'Template, Act, or Beat not found.' })
    }

    res.status(200).json({
      message: 'Predefined Beat deleted successfully',
      updatedTemplate
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const deleteManualBeat = async (req, res) => {
  try {
    const { templateId, actId, beatId } = req.params

    const updatedTemplate = await Template.findOneAndUpdate(
      { _id: templateId, 'template._id': actId },
      { $pull: { 'template.$.manualBeats': { _id: beatId } } },
      { new: true }
    )

    if (!updatedTemplate) {
      return res
        .status(404)
        .json({ error: 'Template, Act, or Manual Beat not found.' })
    }

    res
      .status(200)
      .json({ message: 'Manual Beat deleted successfully', updatedTemplate })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
const createPlotTemplate = async (req, res) => {
  try {
    const { type, template } = req.body

    const createTemplate = await Template.create(
      { type, template },
      { new: true }
    )

    if (!createTemplate) {
      return res
        .status(404)
        .json({ error: 'Template, Act, or Beat not found.' })
    }

    res.status(200).json({
      message: 'Predefined Beat deleted successfully',
      createTemplate
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params
    const template = await Template.findById(id)

    if (!template) {
      return res.status(404).json({ error: 'Template not found.' })
    }

    res.status(200).json({ data: template })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const getTemplateByIdWithAiContent = async (req, res) => {
  try {
    const { plotTemplateId } = req.params
    const template = await Template.findById(plotTemplateId).lean() // ✅ Use .lean() to return plain JSON

    if (!template) {
      return res.status(404).json({ error: 'Template not found.' })
    }

    // Function to add AI-generated content
    const addAIContent = data => {
      if (Array.isArray(data)) {
        return data.map(item => addAIContent(item))
      } else if (typeof data === 'object' && data !== null) {
        const newData = { ...data }

        // Ensure _id is converted to a string if it's an ObjectId
        if (newData._id && typeof newData._id === 'object') {
          newData._id = newData._id.toString()
        }

        // Add content to predefinedBeat
        if (Array.isArray(newData.predefinedBeat)) {
          newData.predefinedBeat = newData.predefinedBeat.map(beat => ({
            ...beat,
            content: 'Here should be a response that is generated by AI.'
          }))
        }

        for (const key in newData) {
          newData[key] = addAIContent(newData[key])
        }

        return newData
      }
      return data
    }

    const updatedTemplate = addAIContent(template)

    res.status(200).json({ data: updatedTemplate })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const getAllPlotTemplate = async (req, res) => {
  try {
    const getTemplate = await Template.find({})

    if (!getTemplate) {
      return res
        .status(404)
        .json({ error: 'Template, Act, or Beat not found.' })
    }

    res.status(200).json({
      data: getTemplate
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}


const deletePlotById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const template = await Plot.findByIdAndDelete(id);
    console.log(template)

    if (!template) {
      return res.status(404).json({ error: 'Template not found.' });
    }

    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};


///create predefined beat

export default {
  saveWriteFreely,
  updatePlotStatus,
  saveTemplatePlot,
  getFilePlot,
  deleteAct,
  deleteManualBeat,
  deletePredefinedBeat,
  createPlotTemplate,
  getAllPlotTemplate,
  getTemplateById,
  getTemplateByIdWithAiContent,
  deletePlotById
}
