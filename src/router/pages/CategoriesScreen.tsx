import React, { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../api";
import { CategoryForm, Modal } from "../../components";
import { useForm } from '../../hooks/useForm';
import { useReduxStore } from "../../store";
import { ICategory } from "../../types";

export const CategoriesScreen: React.FC = () => {
  const { auth } = useReduxStore();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { values, errors, handleChange, resetForm, setFormData } = useForm<ICategory>({
    initialState: {} as ICategory,
  });

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories as ICategory[]);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      await updateCategory(values);
    } else {
      await createCategory(values);
    }
    fetchCategories();
    setIsModalOpen(false);
    resetForm();
    setIsEditing(false);
  };

  const handleDeleteCategory = async (id: string) => {
    const isDeleted = await deleteCategory(id);
    if (isDeleted) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleEditCategory = (category: ICategory) => {
    setFormData(category);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      {
        auth?.user?.role === 'admin' &&
        <button
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            resetForm();
            setIsEditing(false);
            setIsModalOpen(true);
          }}
        >
          Create Category
        </button>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <div className={`text-sm font-bold ${category.deletedAt ? 'text-red-500' : 'text-green-500'}`}>
              {category.deletedAt ? 'Deleted' : 'Active'}
            </div>
            {
              auth?.user?.role === 'admin' &&
              <div className="flex justify-end mt-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEditCategory(category)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </div>}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CategoryForm
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleCreateOrUpdateCategory}
          handleCancel={() => {
            setIsModalOpen(false);
            resetForm();
            setIsEditing(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default CategoriesScreen;