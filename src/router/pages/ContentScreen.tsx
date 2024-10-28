import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { createContent, getCategories, getContent, getTopics } from "../../api";
import { searchByCollection } from "../../api/search";
import { CardContent, ContentForm, Modal } from "../../components";
import { useForm } from "../../hooks";
import { useReduxStore } from "../../store";
import { ICategory, IContent, ITopic, IUser } from "../../types";

const socket = io('https://multimedia-9gv4zgf9hkpq.deno.dev/');

export const ContentScreen: React.FC = () => {
  const { auth } = useReduxStore();
  const createdBy = auth?.user?.id;

  const [content, setContent] = useState<IContent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IContent[]>([]);
  const { values, errors, handleChange, resetForm } = useForm<Partial<IContent>>({
    initialState: {},
  });

  const fetchContent = async () => {
    const allCategories = await getCategories();
    const allTopics = await getTopics();
    const allContent = await getContent();
    if (allContent) setContent(allContent as IContent[]);
    if (allCategories) setCategories(allCategories as ICategory[]);
    if (allTopics) setTopics(allTopics as ITopic[]);
  };

  useEffect(() => {
    fetchContent();

    socket.on('newContent', () => {
      fetchContent();
    });

    return () => {
      socket.off('newContent');
    };
  }, []);

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContent = await createContent({
      ...values,
      file: file!,
      createdBy: createdBy as unknown as IUser,
    });
    if (newContent) {
      setContent([...content, newContent]);
      setIsModalOpen(false);
      resetForm();
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await searchByCollection('content', searchTerm);

    console.log(`🚀 ~ handleSearch ~ results:`, results);

    if (results?.length) {
      setSearchResults(results as IContent[]);
    }
  };

  const getPermissions = (type: 'images' | 'videos' | 'texts') => {
    const topic = topics.find((topic) => topic.id === (values?.topic as unknown as string));
    return values?.topic?.permissions?.[type] || topic?.permissions?.[type];
  };

  const getAcceptedFileTypes = () => {
    const acceptedTypes = [];
    if (getPermissions('images')) acceptedTypes.push('image/*');
    if (getPermissions('videos')) acceptedTypes.push('video/*');
    if (getPermissions('texts')) acceptedTypes.push('text/*');
    return acceptedTypes.join(',');
  };

  const images = content?.filter(content => content?.topic?.permissions?.images);
  const videos = content?.filter(content => content?.topic?.permissions?.videos);
  const texts = content?.filter(content => content?.topic?.permissions?.texts);

  return (
    <>
      <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
        <div className="container">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                <span className="font-semibold text-lg text-primary mb-2 block">
                  Multimedia Content
                </span>
                <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                  Explore Our Latest Content
                </h2>
                <p className="text-base text-body-color">
                  Discover a variety of multimedia content including images, videos, and texts, curated for your interests.
                </p>
                {auth?.user?.role !== 'reader' && <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(true)}
                >
                  Crear Contenido
                </button>}
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <input
                type="text"
                placeholder="Search content by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
              <button type="submit" className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded">
                Search
              </button>
            </form>
          </div>
          {searchResults.length > 0 ? (
            <div
              className="flex flex-wrap -mx-4"
            >
              {searchResults.map(content => (
                <CardContent key={content.id} {...content} />
              ))}
            </div>
          ) : (
            <>
              {images.length > 0 && <>
                <h3 className="font-semibold text-xl text-primary mb-2 block my-2">
                  Images
                </h3>
                <div className="flex flex-wrap -mx-4">
                  {images.map(content => (
                    <CardContent key={content.id} {...content} />
                  ))}
                </div>
              </>}
              {videos.length > 0 && <>
                <h3 className="font-semibold text-xl text-primary mb-2 block my-2">
                  Videos
                </h3>
                <div className="flex flex-wrap -mx-4">
                  {videos.map(content => (
                    <CardContent key={content.id} {...content} />
                  ))}
                </div>
              </>}
              {texts.length > 0 && <>
                <h3 className="font-semibold text-xl text-primary mb-2 block my-2">
                  Texts
                </h3>
                <div className="flex flex-wrap -mx-4">
                  {texts.map(content => (
                    <CardContent key={content.id} {...content} />
                  ))}
                </div>
              </>}
            </>
          )}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        resetForm();
      }}>
        <ContentForm
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleCreateContent}
          handleCancel={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          categories={categories}
          topics={topics}
          getAcceptedFileTypes={getAcceptedFileTypes}
          setFile={setFile}
        />
      </Modal>
    </>
  );
};
