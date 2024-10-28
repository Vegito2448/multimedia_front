import React from 'react';
import { ICategory, IContent, ITopic } from '../types';

interface EditFormProps {
  values: Partial<IContent>;
  errors: { [key: string]: string; };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancel: () => void;
  categories: ICategory[];
  topics: ITopic[];
  getAcceptedFileTypes: () => string;
  setFile: (file: File | null) => void;
}

export const ContentForm: React.FC<EditFormProps> = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  handleCancel,
  categories,
  topics,
  getAcceptedFileTypes,
  setFile,
}) => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-6 px-9" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-5">
            <label htmlFor="title" className="mb-3 block text-base font-medium text-[#07074D]">Title</label>
            <input
              type="text"
              name="title"
              value={values?.title || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errors.titleError && <p className="text-red-500 text-xs italic">{errors.titleError}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="category" className="mb-3 block text-base font-medium text-[#07074D]">Categories</label>
            <select
              className="pl-2 outline-none border rounded w-full p-3"
              name="category"
              value={values?.category?._id || values?.category as unknown as string}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoryError && <p className="text-red-500 text-xs italic">{errors.categoryError}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="topic" className="mb-3 block text-base font-medium text-[#07074D]">Topics</label>
            <select
              className="pl-2 outline-none border rounded w-full p-3"
              name="topic"
              value={values?.topic?._id || values?.topic as unknown as string}
              onChange={handleChange}
              required
            >
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>{topic.name}</option>
              ))}
            </select>
            {errors.topicError && <p className="text-red-500 text-xs italic">{errors.topicError}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">Description</label>
            <textarea
              name="description"
              value={values.description || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errors.descriptionError && <p className="text-red-500 text-xs italic">{errors.descriptionError}</p>}
          </div>
          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload File</label>
            <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-yellow-700 bg-yellow-100 border border-yellow-300">
              <div slot="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info w-5 h-5 mx-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div className="text-xl font-normal max-w-full flex-initial">
                <div className="py-2">This is an info message
                  <div className="text-sm font-base">
                    You can upload files of type:
                    {getAcceptedFileTypes().split(',').map((type, index) => (
                      <span key={index} className="px-4 py-1 text-red-500 inline-flex items-center justify-center mb-2">{type}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-auto flex-row-reverse">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-yellow-400 rounded-full w-5 h-5 ml-2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <input type="file" name="file" id="file" accept={getAcceptedFileTypes()} onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
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
