import Comment from "../comment/comment.model.js";
import Post from "../post/post.model.js";

export const addComment = async (req, res) => {
  try {
    const data = req.body;

    const userPhoto = req.files?.userPhoto?.[0]?.filename || null;

    if (!data.userName || !data.content || !data.post) {
      return res.status(400).json({
        success: false,
        message: "post, userName y content son requeridos"
      });
    }

    const post = await Post.findById(data.post);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada"
      });
    }

    const newComment = new Comment({
      ...data,
      userPhoto,
    });

    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({
      success: true,
      message: "Comentario agregado correctamente",
      comment: newComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al agregar comentario",
      error: error.message
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'post',
        model: 'Post'
      });

    res.status(200).json({
      success: true,
      message: "Comentarios obtenidos con datos de publicación",
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener comentarios",
      error: error.message
    });
  }
};


