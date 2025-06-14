// import Comment from '../../models/comment.model'

// const getTransformedComments = async (commentDoc: any) => {
//   const populatedComment = await Comment.findById(commentDoc._id)
//     .populate({
//       path: 'comments.userId',
//       model: 'User',
//       select: 'firstName lastName email'
//     })
//     .populate({
//       path: 'comments.replies.userId',
//       model: 'User',
//       select: 'firstName lastName email'
//     })

//   const transformedComments = populatedComment?.comments.map(comment => ({
//     id: comment.id,
//     message: comment.message,
//     user: comment.userId, // populated user info
//     lastUpdatedAt: comment.lastUpdatedAt,
//     replies: comment.replies.map(reply => ({
//       id: reply.id,
//       message: reply.message,
//       user: reply.userId, // populated user info
//       lastUpdatedAt: reply.lastUpdatedAt
//     }))
//   }))

//   return { fileId: populatedComment?.fileId, comments: transformedComments }
// }

// export const createCommentService = async (fileId: string, data) => {
//   let commentDoc
//   const existingComment = await Comment.findOne({ fileId })

//   if (existingComment) {
//     existingComment.comments.push(data)
//     await existingComment.save()
//     commentDoc = existingComment
//   } else {
//     const newComment = new Comment({
//       fileId,
//       comments: [data]
//     })
//     await newComment.save()
//     commentDoc = newComment
//   }

//   return await getTransformedComments(commentDoc)
// }

// export const getCommentsService = async (fileId: string) => {
//   const comments = await Comment.findOne({ fileId })
//     .populate({
//       path: 'comments.userId',
//       model: 'User',
//       select: 'firstName lastName email'
//     })
//     .populate({
//       path: 'comments.replies.userId',
//       model: 'User',
//       select: 'firstName lastName email'
//     })

//   if (!comments) {
//     return { fileId: fileId, comments: [] }
//   }

//   return await getTransformedComments(comments)
// }

// export const updateCommentService = async (
//   fileId: string,
//   updatedData: any
// ) => {
//   const commentId = updatedData.id
//   const comment = await Comment.findOne({ fileId })

//   if (!comment) {
//     throw new Error('File not found')
//   }

//   const index = comment.comments.findIndex(c => c.id === commentId)

//   if (index === -1) {
//     throw new Error('Comment not found')
//   }

//   // Update the specific comment
//   comment.comments[index] = { ...comment.comments[index], ...updatedData }
//   await comment.save()

//   return await getTransformedComments(comment)
// }

// export const removeCommentService = async (
//   fileId: string,
//   commentId: string
// ) => {
//   const comment = await Comment.findOne({ fileId })

//   if (!comment) {
//     throw new Error('File not found')
//   }

//   // Filter out the comment with the given ID
//   comment.comments = comment.comments.filter(c => c.id !== commentId)

//   await comment.save()

//   return await getTransformedComments(comment)
// }
import User from '../../models/user.model'
import VersionHistory from '../../models/version-history.model'

// Transform the versionHistory document by populating the nested comment user fields,
// and then mapping the comments data from the target version into the desired output format.
const getTransformedComments = async (doc: any, versionName: string) => {
  // Populate the document so we have user details in comments and replies.
  const version = doc.versionHistory.find(
    (version: any) => version.versionName === versionName
  )

  if (!version) {
    return { fileId: doc?.fileId, comments: [] }
  }

  const transformedComments = await Promise.all(
    version.comments.map(async (comment: any) => ({
      id: comment.id,
      message: comment.message,
      user: await User.findById(comment.userId).select([
        '_id',
        'firstName',
        'lastName'
      ]), // populated user info
      lastUpdatedAt: comment.lastUpdatedAt,
      replies: await Promise.all(
        comment.replies.map(async (reply: any) => ({
          id: reply.id,
          message: reply.message,
          user: await User.findById(reply.userId).select([
            '_id',
            'firstName',
            'lastName'
          ]), // populated user info
          lastUpdatedAt: reply.lastUpdatedAt
        }))
      )
    }))
  )

  return { fileId: doc?.fileId, comments: transformedComments }
}

// Create a new comment by adding it to the correct version.
// If a VersionHistory document exists for the file, find the version that matches versionName.
// If the version exists, push the new comment; otherwise, add a new version entry.
export const createCommentService = async (
  fileId: string,
  data: any,
  versionName: string
) => {
  let versionHistoryDoc
  const existingDoc = await VersionHistory.findOne({ fileId })

  const versionIndex = existingDoc.versionHistory.findIndex(
    (version: any) => version.versionName === versionName
  )
  existingDoc.versionHistory[versionIndex].comments.push(data)
  await existingDoc.save()
  versionHistoryDoc = existingDoc
  return await getTransformedComments(versionHistoryDoc, versionName)
}

// Retrieve all comments for the given file and version.
export const getCommentsService = async (
  fileId: string,
  versionName: string
) => {
  const versionHistoryDoc = await VersionHistory.findOne({ fileId })

  if (!versionHistoryDoc) {
    return { fileId, comments: [] }
  }

  return await getTransformedComments(versionHistoryDoc, versionName)
}

// Update an existing comment identified by its id within the specified version.
export const updateCommentService = async (
  fileId: string,
  updatedData: any,
  versionName: string
) => {
  const commentId = updatedData.id
  const versionHistoryDoc = await VersionHistory.findOne({ fileId })

  if (!versionHistoryDoc) {
    throw new Error('File not found')
  }

  // Find the version matching versionName.
  const version = versionHistoryDoc.versionHistory.find(
    (v: any) => v.versionName === versionName
  )
  console.log('version', version)
  if (!version) {
    throw new Error('Version not found')
  }

  const index = version.comments.findIndex((c: any) => c.id === commentId)

  if (index === -1) {
    throw new Error('Comment not found')
  }

  // Merge the existing comment with the updated data.
  version.comments[index] = {
    ...version.comments[index],
    ...updatedData
  }
  await versionHistoryDoc.save()

  return await getTransformedComments(versionHistoryDoc, versionName)
}

// Remove a comment by filtering it out from the specified version's comments array.
export const removeCommentService = async (
  fileId: string,
  commentId: string,
  versionName: string
) => {
  const versionHistoryDoc = await VersionHistory.findOne({ fileId })

  if (!versionHistoryDoc) {
    throw new Error('File not found')
  }

  // Find the version matching versionName.
  const version = versionHistoryDoc.versionHistory.find(
    (v: any) => v.versionName === versionName
  )

  if (!version) {
    throw new Error('Version not found')
  }

  version.comments = version.comments.filter((c: any) => c.id !== commentId)

  await versionHistoryDoc.save()

  return await getTransformedComments(versionHistoryDoc, versionName)
}
