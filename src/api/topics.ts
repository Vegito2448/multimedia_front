import { mApi } from ".";
import { ITopic } from "../types";

const createTopic = async (topic: ITopic): Promise<ITopic | null> => {

  try {
    const req = await mApi.post<ITopic>('topics/', topic);
    return req?.data;
  } catch (error) {
    console.error('Error creating topic:', error);
    return null;
  }

};


const getTopics = async (): Promise<ITopic[] | null> => {
  try {
    const req = await mApi.get<ITopic[]>('topics');
    const topics = req?.data;
    return topics;
  } catch (error) {
    console.error('Error loading topics:', error);
    return null;
  }
};

const getTopic = async (id: string): Promise<ITopic | null> => {
  try {
    const req = await mApi.get<ITopic>(`topics/${id}`);
    const topic = req?.data;
    return topic;
  } catch (error) {
    console.error('Error loading topic:', error);
    return null;
  }
};

const updateTopic = async (topic: ITopic): Promise<ITopic | null> => {
  try {
    const req = await mApi.put<ITopic>(`topics/${topic.id || topic._id}`, topic);
    return req?.data;
  } catch (error) {
    console.error('Error updating topic:', error);
    return null;
  }
};

const deleteTopic = async (id: string): Promise<boolean> => {
  try {
    const req = await mApi.delete(`topics/${id}`);
    return req.status === 204 || req.status === 200;
  } catch (error) {
    console.error('Error deleting topic:', error);
    return false;
  }
};

export {
  createTopic, deleteTopic, getTopic, getTopics, updateTopic
};

