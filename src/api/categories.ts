import { mApi } from ".";
import { ICategory } from "../types";

const createCategory = async (category: ICategory): Promise<ICategory | null> => {

  try {
    const req = await mApi.post<ICategory>('categories/', category);
    return req?.data;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }

};

const getCategories = async (): Promise<ICategory[] | null> => {
  try {
    const req = await mApi.get<ICategory[]>('categories');
    const categories = req?.data;
    return categories;
  } catch (error) {
    console.error('Error loading categories:', error);
    return null;
  }
};

const getCategory = async (id: string): Promise<ICategory | null> => {
  try {
    const req = await mApi.get<ICategory>(`categories/${id}`);
    const category = req?.data;
    return category;
  } catch (error) {
    console.error('Error loading category:', error);
    return null;
  }
};

const updateCategory = async (category: ICategory): Promise<ICategory | null> => {
  try {
    const req = await mApi.put<ICategory>(`categories/${category.id || category._id}`, category);
    return req?.data;
  } catch (error) {
    console.error('Error updating category:', error);
    return null;
  }
};

const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    const req = await mApi.delete(`categories/${id}`);
    return req.status === 200 || req.status === 204;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};

export {
  createCategory, deleteCategory, getCategories, getCategory, updateCategory
};

