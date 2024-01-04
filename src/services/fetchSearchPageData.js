import { searchData } from "../data/searchListing.js";

export const fetchSearchPageData = async () => {
  try {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(searchData);
      }, 1000);
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: fetchSearchPageData.js:11 ~ fetchSearchPageData ~ error:",
      error
    );
    return error;
  }
};
