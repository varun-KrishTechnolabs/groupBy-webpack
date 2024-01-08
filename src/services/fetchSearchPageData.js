import { fetchInstance } from "../api.js";
import { searchData } from "../data/searchListing.js";

export const fetchSearchPageData = async ({ query }) => {
  try {
    // return await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(searchData);
    //   }, 1000);
    // });

    const data = await fetchInstance.post({
      url: "https://search.spiral.groupbycloud.com/api/search",
      data: {
        query,
        collection: "MBdev",
        area: "MBdev",
        skip: "0",
        pageSize: 24,
        refinements: [],
      },
    });

    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: fetchSearchPageData.js:11 ~ fetchSearchPageData ~ error:",
      error
    );
    return error;
  }
};
