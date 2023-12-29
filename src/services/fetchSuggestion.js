// dummy json
import { categories } from "../data/searchPopup.js";

export const fetchSuggestions = async ({ searchTerm }) => {
  try {
    //   here the actual api call will be executed
    return new Promise((resolve, reject) =>
      setTimeout(
        () =>
          resolve(
            categories.filter((item) => {
              if (item.query.includes(searchTerm)) return item;
              else if (searchTerm.includes(item.query)) return item;
            })
          ),
        1000
      )
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: fetchSuggestion.js:5 ~ fetchSuggestions ~ error:",
      error
    );
    return error;
  }
};
