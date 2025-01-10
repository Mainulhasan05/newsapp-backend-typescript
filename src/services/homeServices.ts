import Category from "../models/Category";
import Article from "../models/Article";

// get home page data

export const getHomeService = async () => {
    try {
        const featuredArticle = await Article.findOne({ status: 'published', isFeatured:true }).select('-content').populate({ path: 'category', select: 'name' }).sort({ createdAt: -1 });
        // latest news except featured news
        const latestArticles = await Article.find({ status: 'published', isFeatured:false }).limit(3).select('-content').populate({ path: 'category', select: 'name' }).sort({ createdAt: -1 });
        const allArticles = await Article.aggregate([
            { $match: { status: 'published' } }, // Filter only published articles
            { 
              $lookup: { 
                from: 'categories', 
                localField: 'category', 
                foreignField: '_id', 
                as: 'category' 
              }
            }, // Join with the category collection
            { $unwind: '$category' }, // Deconstruct the category array
            { $sort: { 'createdAt': -1 } }, // Sort by createdAt in descending order
            { 
              $group: { 
                _id: '$category._id', 
                name: { $first: '$category.name' }, 
                articles: { 
                  $push: { 
                    title: '$title', 
                    slug: '$slug', 
                    createdAt: '$createdAt', 
                    featuredImage: '$featuredImage' 
                  } 
                }
              }
            }, // Group by category and collect necessary fields
            { 
              $project: { 
                _id: 0, 
                category: { id: '$_id', name: '$name' }, 
                articles: { $slice: ['$articles', 5] } 
              }
            }, // Limit to the latest 5 articles per category
            { $addFields: { articlesCount: { $size: '$articles' } } }, // Add a field for the number of articles
            { $sort: { articlesCount: -1 } }, // Sort categories by articles count in descending order
            { $match: { 'articles.0': { $exists: true } } } // Only include categories with articles
          ]);
          
          
          
        return {  allArticles,featuredArticle, latestArticles };
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