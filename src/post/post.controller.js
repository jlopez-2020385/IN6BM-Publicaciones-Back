import Post from "./post.model.js";

export const createPost = async (req, res) => {
  try {
    const data = req.body;

    const profilePicture = req.files?.profilePicture?.[0]?.filename || null;
    const authorPhoto = req.files?.authorPhoto?.[0]?.filename || null;

    if (!data.title || !data.description || !data.course || !data.authorName) {
      return res.status(400).json({
        success: false,
        message: "Título, descripción, curso y nombre del autor son requeridos"
      });
    }

    const newPost = new Post({
      ...data,
      profilePicture,
      authorPhoto
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Publicación creada exitosamente",
      post: newPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear la publicación",
      error: error.message
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("comments") 
      .sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hay publicaciones disponibles"
      });
    }

    res.status(200).json({
      success: true,
      message: "Publicaciones obtenidas exitosamente",
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las publicaciones",
      error: error.message
    });
  }
};