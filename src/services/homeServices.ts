import Category from "../models/Category";
import Article from "../models/Article";

// get home page data

export const getHomeService = async () => {
    try {
        const featuredArticle = await Article.findOne({ status: 'published', isFeatured:true }).select('-content').populate({ path: 'category', select: 'name' }).sort({ createdAt: -1 });
        // latest news except featured news
        const latestArticles = await Article.find({ status: 'published', isFeatured:false }).limit(5).select('-content').populate({ path: 'category', select: 'name' }).sort({ createdAt: -1 });

        return {  featuredArticle, latestArticles };
    } catch (error:any) {
        throw new Error(error.message);
    }
};

// getArticlesByCategoryService

export const getArticlesByCategoryService = async (page: number, title: string, slug: string) => {
    try {
        const category = await Category.findOne({ slug: slug });
        if (!category) {
            throw new Error('Category not found');
        }

        const limit = 30;
        const skip = (page - 1) * limit;

        const query = title ? { title: { $regex: title, $options: 'i' }, category: category._id } : { category: category._id };

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
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// getArticleBySlugService

export const getArticleBySlugService = async (slug: string) => {
    try {
        // only get published articles, if not published throw error
        const article = await Article.findOne({ slug: slug, status: 'published' }).populate({ path: 'author', select: 'name' }).populate({ path: 'category', select: 'name' });
        if (!article) {
            throw new Error('Article not found');
        }
        const relatedArticles = await Article.find({ category: article.category, status: 'published' }).limit(3).select('-content').populate({ path: 'category', select: 'name' }).sort({ createdAt: -1 });
        return { article, relatedArticles };
    } catch (error: any) {
        throw new Error(error.message);
    }
};