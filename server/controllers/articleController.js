import Article from "../models/Article.js";

// Get all 
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create 
export const createArticle = async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, status } = req.body;

    if (!title || !excerpt || !category) {
      return res.status(400).json({ message: "Title, excerpt, and category are required" });
    }

    const article = new Article({
      title,
      excerpt,
      content,
      category,
      tags: tags || [],
      status: status || "Draft",
      author: req.admin.name,
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update  
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const { title, excerpt, content, category, tags, status } = req.body;

    article.title = title || article.title;
    article.excerpt = excerpt || article.excerpt;
    article.content = content || article.content;
    article.category = category || article.category;
    article.tags = tags || article.tags;
    article.status = status || article.status;

    await article.save();
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete 
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    await article.remove();
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
