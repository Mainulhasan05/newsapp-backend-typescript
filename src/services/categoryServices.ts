// categoryServices.ts
import Category from '../models/Category';
import generateSlug from '../utils/generateSlug';

// Create a new category
export const createCategoryService = async (categoryData: any) => {
    categoryData.slug = generateSlug(categoryData.name);
    if (!categoryData.parentCategory) {
        categoryData.parentCategory = null;
    }
    if (!categoryData.isFeatured) {
        categoryData.isFeatured = false;
    }
    const existingCategory = await Category.findOne({ "slug": categoryData.slug });
    if (existingCategory) {
        categoryData.slug = `${categoryData.slug}-${Date.now()}`;
    }
    const category = new Category(categoryData);
    return await category.save();
};

// Get all categories with pagination and optional search by name
export const getCategoriesService = async (page: number, name: string) => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const query = name ? { name: { $regex: name, $options: 'i' } } : {};

    const categories = await Category.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalCategories = await Category.countDocuments(query);

    return {
        categories,
        totalCategories,
        totalPages: Math.ceil(totalCategories / limit),
        currentPage: page
    };
};

// Get a category by ID
export const getCategoryByIdService = async (id: string) => {
    return await Category.findById(id);
};

// Update a category
export const updateCategoryService = async (id: string, updateData: any) => {
    if (updateData.name) {
        updateData.slug = generateSlug(updateData.name);
    }
    // check if the slug is already taken, add timestamp to make it unique
    const existingCategory = await Category.findOne({ "slug": updateData.slug });
    if (existingCategory && existingCategory._id.toString() !== id) {
        updateData.slug = `${updateData.slug}-${Date.now()}`;
    }
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a category
export const deleteCategoryService = async (id: string) => {
    return await Category.findByIdAndDelete(id);
};
