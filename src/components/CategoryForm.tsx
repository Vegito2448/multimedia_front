import React from 'react';
import { ICategory } from '../types';

interface CategoryFormProps {
  values: Partial<ICategory>;
  errors: { [key: string]: string; };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-6 px-9" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">Name</label>
            <input
              type="text"
              name="name"
              value={values?.name || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errors.nameError && <p className="text-red-500 text-xs italic">{errors.nameError}</p>}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;