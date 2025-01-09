import Category from "../models/Category";
import Article from "../models/Article";

// get home page data

export const getHomeService = async () => {
    try {
        const featuredArticles = await Article.find({ status: 'published', isFeatured:true }).limit(5).select('-content').populate({ path: 'category', select: 'name' }).sort({ createdAt: -1 });

        return {  featuredArticles };
    } catch (error:any) {
        throw new Error(error.message);
    }
};

// 