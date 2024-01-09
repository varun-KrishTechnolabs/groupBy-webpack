import { fetchInstance } from "../api.js";

export const fetchSearchPageData = async ({ query }) => {
  try {
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
