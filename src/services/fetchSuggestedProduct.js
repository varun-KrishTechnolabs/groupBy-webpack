// dummy json
import { autocompleteData } from "../data/searchPopup.js";

export const fetchSuggestedProducts = async ({ searchTerm }) => {
  try {
    //   here the actual api call will be executed

    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve(
            autocompleteData.filter((item) => {
              if (item.query.includes(searchTerm)) return item;
              else if (searchTerm.includes(item.query)) return item;
            })
          ),
        1000
      );
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: fetchSuggestedProduct.js:5 ~ fetchSuggestedProducts ~ error:",
      error
    );
    return error;
  }
};
