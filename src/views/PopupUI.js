/**@jsx myDom **/

import myDom from "../myDom.js";
import { SearchListing } from "./SearchListing.js";

/**
 * This function changes the url and triggres the function for further UI changes
 * @param {string} searchTerm the query/suggested word on which the user click
 */
const showSearchListing = async ({ searchTerm }) => {
  const url = window.location.origin;
  const newUrl = `${url}/search?q=${searchTerm}`;
  history.pushState(null, null, newUrl);

  const autoCompletePopup = document.getElementById("ketpl_autocomplete-popup");
  autoCompletePopup.innerText = "";

  SearchListing();
};

export const renderLeftPanel = (data, searchTerm) => {
  const url = window.location.origin;
  return (
    <div class="ktpl_leftpanel">
      <ul>
        <li
          className="ktpl_leftlist"
          onClick={() =>
            showSearchListing({ searchTerm: data[0]?.suggested?.text })
          }
        >
          <span
            // href={url + `/search?q=` + data[0]?.suggested?.text}
            className="ktpl_leftlist-link"
          >
            {data[0]?.suggested?.text}
          </span>
        </li>
        {data[0]?.alternatives?.map((item, index) => {
          return (
            <li
              className="ktpl_leftlist"
              onClick={() => showSearchListing({ searchTerm: item.text })}
            >
              <span
                // href={url + `/search?q=` + item.text}
                className="ktpl_leftlist-link "
              >
                {item.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  ); // UI is retuned
};

export const renderRightPanel = (data, searchTerm) => {
  return (
    <div>
      <div className="ktpl_searchRight">
        <div className="ktpl_searchCategory">
          <ul>
            {data[0]?.facets.map((item) => {
              return (
                <li class="ktpl_category-list-item">
                  <span className="ktpl_category-list-label">
                    {item?.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="ktpl_popUp-title">
          <strong className="ktpl_serach-suggestion-title">
            Product Suggestions
          </strong>
          <div className="ktpl_rightpanel">
            {data[0]?.results?.map((item) => {
              const itemName =
                item?.name.split("(")[0].slice(0, 36) +
                (item?.name.split("(")[0].length > 16 ? "..." : "");
              return (
                <div class="ktpl_searchcard">
                  <a href="#">
                    <div class="ktpl_right-product-image">
                      <img src={item?.imageUrl} alt={item?.name} />
                    </div>
                    <div>
                      <p class="ktpl_item-name">{itemName}</p>
                      <span class="ktpl_item-price">{item?.price}</span>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
          <div>
            <div
              className="ktpl_search-popup-footer"
              id="minisearch-all-results"
            >
              <button className="ktpl_seeall">
                See {data[0]?.results.length} results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
