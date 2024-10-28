import { mApi } from ".";
import { IContent, ITopic } from "../types";

export const searchByCollection = async (collection: string, query: string) => {

  try {
    const response = await mApi.get<{
      ok: boolean;
      results: IContent[] | ITopic[];
    }>(`search/${collection}/${query}`);

    console.log(`🚀 ~ searchByCollection ~ response:`, response);

    return response.data.results;
  } catch (error) {
    console.error('Error fetching data', error);
    return null;
  }

};