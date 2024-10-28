import { mApi } from ".";
import { IContent } from "../types";

type PartialContent = Partial<IContent & {
  file: File;
}>;

const createFormData = (content: PartialContent) => {
  const formData = new FormData();
  if (content.title && content.category && content.topic && content.description) {
    formData.append('title', content.title);
    formData.append('category', content?.category?._id || content?.category as unknown as string);
    formData.append('topic', content?.topic?._id || content?.topic as unknown as string);
    formData.append('description', content.description);
  }
  if (content.file) {
    formData.append('file', content.file);
  }
  if (content.createdBy) {
    formData.append('createdBy', content.createdBy as unknown as string);
  }
  return formData;
};

const getContent = async (id?: string): Promise<IContent | IContent[] | null> => {
  try {
    if (id) {
      const req = await mApi.get<IContent>(`content/${id}`);
      const content = req?.data;

      return content;
    } else {
      const req = await mApi.get<IContent[]>('content');
      const content = req?.data;
      return content;
    }
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
};

const createContent = async (content: Partial<IContent & {
  file: File;
}>): Promise<IContent | null> => {
  try {


    const formData = createFormData(content);


    const req = await mApi.post<IContent>('content/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return req?.data;
  } catch (error) {
    console.error('Error creating content:', error);
    return null;
  }
};

const updateContent = async (content: Partial<IContent & {
  file: File;
}>): Promise<IContent | null> => {
  try {

    const formData = createFormData(content);

    const req = await mApi.put<{
      ok: boolean,
      msg: string,
      content: IContent;
    }>(`content/${content.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    console.log(`🚀 ~ updateContent ~ req:`, req);

    return req?.data?.content;

  } catch (error) {
    console.error('Error updating content:', error);
    return null;
  }
};

const deleteContent = async (id: string): Promise<boolean> => {
  try {
    const req = await mApi.delete(`content/${id}`);
    return req.status === 204 || req.status === 200;
  } catch (error) {
    console.error('Error deleting content:', error);
    return false;
  }
};

export {
  createContent, deleteContent, getContent, updateContent
};

