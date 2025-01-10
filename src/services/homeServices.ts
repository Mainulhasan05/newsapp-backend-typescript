import Category from "../models/Category";
import Article from "../models/Article";

// get home page data

export const getHomeService = async () => {
    try {
        const featuredArticle = await Article.findOne({ status: 'published', isFeatured:true }).select('-content').populate({ path: 'category', select: 'name' }).sort({ createdAt: -1 });
        // latest news except featured news
        const latestArticles = await Article.find({ status: 'published', isFeatured:false }).limit(3).select('-content').populate({ path: 'category', select: 'name' }).sort({ createdAt: -1 });

        return {  featuredArticle, latestArticles };
    } catch (error:any) {
        throw new Error(error.message);
    }
};

// 