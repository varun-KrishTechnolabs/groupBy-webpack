/**@jsx myDom **/
import myDom from "../myDom.js";

import { fetchSearchPageData } from "../services/fetchSearchPageData.js";

import { loader } from "../constants/loader.js";

const root = document.getElementById("gb_search-listing");

export const SearchListing = async () => {
  root.innerText = "";

  const url = new URL(window.location.href);
  const query = url.searchParams.get("q");

  root.style.display = "block";
  root.appendChild(loader());
  try {
    const data = await fetchSearchPageData();

    const ui = RenderSearchUI(data, query);

    root.innerText = "";

    root.appendChild(ui);
  } catch (error) {
    console.log(
      "🚀 ~ file: searchListing.js:25 ~ showSearchListing ~ error:",
      error
    );
    return error;
  }
};

const RenderSearchUI = (data, query) => {
  return (
    <div className="gb_searchPageListing" id="gb_searchPageListing">
      <div>this is the listing block for {query}</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
