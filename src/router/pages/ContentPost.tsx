import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteContent, getCategories, getContent, getTopics, updateContent } from "../../api";
import { ContentForm } from "../../components";
import { useForm } from "../../hooks";
import { useReduxStore } from "../../store";
import { ICategory, IContent, ITopic } from "../../types";

export const ContentPost = () => {
  const { auth } = useReduxStore();
  const { id } = useParams<{ id: string; }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<IContent>({} as IContent);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [file, setFile] = useState<File | null>(null); // Estado para manejar el archivo

  const { values, errors, handleChange, resetForm } = useForm<Partial<IContent>>({
    initialState: content,
  });

  const fetchContent = async () => {
    const allContent = await getContent(id);
    if (allContent) {
      setContent(allContent as IContent);
      resetForm(allContent as IContent);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const updatedContent = await updateContent(
      {
        ...values,
        file: file!
      }
    );
    if (updatedContent) {
      setContent(updatedContent as IContent);
      resetForm(updatedContent as IContent);
      setIsEditing(false);
    }
    setLoading(false);
  };



  const handleDelete = async () => {
    setLoading(true);
    const isDeleted = await deleteContent(id!);
    if (isDeleted) {
      navigate("/content", { replace: true });
    }
    setLoading(false);
  };

  const onEdit = async () => {
    setIsEditing(true);
    const allTopics = await getTopics();
    if (allTopics) setTopics(allTopics);
    const allCategories = await getCategories();
    if (allCategories) setCategories(allCategories);
  };

  const getPermissions = (type: 'images' | 'videos' | 'texts') => {
    const topic = topics.find((topic) => topic.id === (values?.topic?._id || values?.topic as unknown as string));
    return values?.topic?.permissions?.[type] || topic?.permissions?.[type];
  };

  const getAcceptedFileTypes = () => {
    const acceptedTypes = [];
    if (getPermissions('images')) acceptedTypes.push('image/*');
    if (getPermissions('videos')) acceptedTypes.push('video/*');
    if (getPermissions('texts')) acceptedTypes.push('text/*');
    return acceptedTypes.join(',');
  };

  const isContentURLAnImage = content?.url?.match(/\.(jpeg|jpg|gif|png|bmp|svg)$/) !== null;
  const isContentURLAVideo = content?.url?.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|3gp)$/) !== null;

  return (
    !loading && content && (
      <main className="mt-20">
        {!isEditing && <>
          <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{ height: '24em' }}>
            <div className="absolute left-0 bottom-0 w-full h-full z-10" style={{ backgroundImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,.7))' }}></div>
            {isContentURLAnImage && <img src={content?.url} className="absolute left-0 top-0 w-full h-full z-0 object-cover" />}
            {isContentURLAVideo && <video className="absolute left-0 top-0 w-full h-full z-0 object-cover" controls>
              <source src={content?.url} />
            </video>}
            <div className="p-4 absolute bottom-0 left-0 z-20">
              <div className="flex flex-col items-start pb-2">
                <div>
                  <span className="px-4 py-1 bg-white text-black-200 inline-flex items-center justify-center mb-2 font-bold mr-2">Category:</span>
                  <Link to="/categories" className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">{content?.category?.name || 'Loading...'}</Link>
                </div>
                <div>
                  <span className="px-4 py-1 bg-white text-black-200 inline-flex items-center justify-center mb-2 font-bold mr-2">Topic:</span>
                  <Link to="/topics" className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">{content?.topic?.name || 'Loading...'}</Link>
                </div>
                <div>
                  <span className="px-4 py-1 bg-white text-black-200 inline-flex items-center justify-center mb-2 font-bold mr-2">Topic Permissions:</span>
                  {getPermissions('images') && <span className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">Images</span>}
                  {getPermissions('videos') && <span className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">Videos</span>}
                  {getPermissions('texts') && <span className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">Texts</span>}
                </div>
              </div>
              <h2 className="text-4xl font-semibold text-gray-100 leading-tight">{content?.title}</h2>
              <div className="flex mt-3">
                <div>
                  <p className="font-semibold text-gray-200 text-sm">{content?.createdBy?.username}</p>
                  <p className="font-semibold text-gray-400 text-xs">{moment(content?.createdAt).format('MMMM Do YYYY')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
            {content?.url && <>
              <h5 className="font-semibold text-gray-800 text-xl">Actual File:</h5>
              <Link to={content?.url} target="_blank" className="text-blue-500">File</Link>
            </>}
            <p className="pb-6">{content?.description}</p>
          </div>
        </>}

        <div className="flex justify-end mt-4">
          {!isEditing && auth?.user?.role !== 'reader' && <button onClick={onEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>}
          {auth?.user?.role === 'admin' && <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>}
        </div>

        {isEditing && (
          <ContentForm
            categories={categories}
            errors={errors}
            handleChange={handleChange}
            handleCancel={() => {
              setIsEditing(false);
              resetForm();
            }}
            handleSubmit={handleEdit}
            topics={topics}
            values={values}
            setFile={setFile}
            getAcceptedFileTypes={getAcceptedFileTypes}

          />
        )}
      </main>
    )
  );
};