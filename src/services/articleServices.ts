import Article from '../models/Article';
import generateSlug from '../utils/generateSlug';

// Create a new article
export const createArticleService = async (articleData: any) => {
    articleData.slug = generateSlug(articleData.title);
    const existingArticle = await Article.findOne({ slug: articleData.slug });
    if (existingArticle) {
        articleData.slug = `${articleData.slug}-${Date.now()}`;
    }
    const article = new Article(articleData);
    return await article.save();
};

// Get all articles with pagination and optional search by title
export const getArticlesService = async (page: number, title: string) => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const query = title ? { title: { $regex: title, $options: 'i' } } : {};

    const articles = await Article.find(query)
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 })
  .select('-content -tags -metaTitle -metaDescription -metaKeywords')
  .populate({ path: 'author', select: 'name' })
  .populate({ path: 'category', select: 'name' });

    const totalArticles = await Article.countDocuments(query);

    return {
        articles,
        totalArticles,
        totalPages: Math.ceil(totalArticles / limit),
        currentPage: page
    };
};

// Get an article by ID
export const getArticleByIdService = async (id: string) => {
    return await Article.findById(id);
};

// Update an article
export const updateArticleService = async (id: string, updateData: any) => {
    if (updateData.title) {
        updateData.slug = generateSlug(updateData.title);
    }
    const existingArticle = await Article.findOne({ slug: updateData.slug });
    if (existingArticle && existingArticle._id.toString() !== id) {
        updateData.slug = `${updateData.slug}-${Date.now()}`;
    }
    return await Article.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete an article
export const deleteArticleService = async (id: string) => {
    return await Article.findByIdAndDelete(id);
};
