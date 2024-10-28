import React, { useEffect, useState } from 'react';
import { createTopic, deleteTopic, getTopics, updateTopic } from "../../api";
import { Modal, TopicForm } from "../../components";
import { useForm } from '../../hooks/useForm';
import { useReduxStore } from "../../store";
import { ITopic } from "../../types";

export const TopicsScreen: React.FC = () => {
  const { auth } = useReduxStore();
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { values, errors, handleChange, resetForm, setFormData } = useForm<ITopic>({
    initialState: {
      name: '',
      permissions: {
        images: false,
        videos: false,
        texts: false,
      },
    } as ITopic,
  });

  const fetchTopics = async () => {
    const fetchedTopics = await getTopics();
    setTopics(fetchedTopics as ITopic[]);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleCreateOrUpdateTopic = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      await updateTopic(values);
    } else {
      await createTopic(values);
    }
    await fetchTopics();
    setIsModalOpen(false);
    resetForm();
    setIsEditing(false);
  };

  const handleDeleteTopic = async (id: string) => {
    const isDeleted = await deleteTopic(id);
    if (isDeleted) {
      setTopics(topics.filter(topic => topic?.id !== id));
    }
  };

  const handleEditTopic = (topic: ITopic) => {
    setFormData(topic);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Topics</h1>
      {auth?.user?.role === 'admin' && (
        <button
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            resetForm();
            setIsEditing(false);
            setIsModalOpen(true);
          }}
        >
          Create Topic
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <div key={topic?.id} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{topic?.name}</h2>
            <div className="flex gap-2">
              {topic?.permissions?.images && (
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                  <div className="mt-px">Images</div>
                </div>
              )}
              {topic?.permissions?.videos && (
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                  <div className="mt-px">Videos</div>
                </div>
              )}
              {topic?.permissions?.texts && (
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                  <div className="mt-px">Texts</div>
                </div>
              )}
            </div>
            {auth?.user?.role === 'admin' && (
              <div className="flex justify-end mt-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEditTopic(topic)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteTopic(topic?.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TopicForm
          values={values}
          errors={errors}
          handleChange={handleChange}
          setFormData={setFormData}
          handleSubmit={handleCreateOrUpdateTopic}
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

export default TopicsScreen;