/**@jsx myDom **/
import myDom from "../myDom.js";

import { fetchSearchPageData } from "../services/fetchSearchPageData.js";

import { loader } from "../constants/loader.js";

import "../styles/searchlisting.css";

const root = document.getElementById("gb_search-listing");

export const SearchListing = async () => {
  root.innerText = "";

  const url = new URL(window.location.href);
  const path = url.pathname;
  const query = url.searchParams.get("q");

  if (path === "/search" && query) {
    root.style.display = "block";
    root.appendChild(loader());
    try {
      const data = await fetchSearchPageData();

      const ui = RenderSearchUI({ data, query });

      root.innerText = "";

      root.appendChild(ui);
    } catch (error) {
      console.log(
        "🚀 ~ file: searchListing.js:25 ~ showSearchListing ~ error:",
        error
      );
      return error;
    }
  }
};

export const RenderSearchUI = ({ data, query }) => {
  const searchPageBreadcrumbs = data?.breadcrumbs[0]?.filterValue;

  const searchFilter = data?.facets.map((item) => {
    return <li className="ktpl_searc-filter-items">{item.label}</li>;
  });

  // const handleClick = (item) => {
  //   console.log(item, "item");
  // };

  return (
    <div className="gb_searchPageListing" id="gb_searchPageListing">
      <div className="ktpl_search-listing-breadcrumbs">
        <ul className="ktpl_breadcrumbs-items">
          <li className="ktpl_breadcrumbs-home">
            <a href="/">Home</a>
          </li>
          <li className="ktpl_breadcrumbs-currentpage">
            {searchPageBreadcrumbs}
          </li>
        </ul>
      </div>
      <div className="ktpl_search-page-content">
        <div className="ktpl_search-listing-left-container">
          <div className="ktpl_search-listing-left">
            <div>
              <strong className="ktpl_left-header">Narrow Your Search</strong>
            </div>
            <div className="ktpl_search-filter-content">
              <ul className="ktpl_search-filter-list">{searchFilter}</ul>
            </div>
          </div>
        </div>
        <div className="ktpl_search-listing-right">
          <div>
            <span className="ktpl_right-header">
              Showing results for "{query}"
            </span>
          </div>
          <div className="ktpl_search-right-toolbar">
            <div class="ktpl toolbar toolbar-products">
              <p class="ktpl toolbar-amount" id="toolbar-amount">
                Items{" "}
                <span class="ktpl toolbar-number ng-binding">
                  {data?.pagination?.begin} - {data?.pagination?.end}
                </span>
                <span class="ktpl toolbar-number ng-binding">
                  {" "}
                  of {data?.pagination?.totalResults}
                </span>
              </p>
              <div class="ktpl modes">
                <strong class="ktpl modes-label" id="modes-label">
                  Display Type
                </strong>
                <a
                  style="cursor: pointer;"
                  class="ktpl modes-mode mode-list ng-scope"
                  title="List"
                  id="mode-list"
                  ng-if="layout == 'grid'"
                  ng-click="swapLayout('list')"
                  ss-ps=""
                >
                  <span>List</span>
                </a>
                <strong
                  ng-if="layout == 'grid'"
                  title="Grid"
                  class="ktpl modes-mode active mode-grid ng-scope"
                >
                  <span>Grid</span>
                </strong>
              </div>
              <div class="ktpl ss-toolbar-col ss-per-page-container field limiter">
                <label class="ktpl ss-menu-label label">
                  <span class="ktpl ss-menu-label-desktop">
                    Results per Page
                  </span>
                </label>
                <div class="ktpl ss-menu-dropdown control">
                  <select
                    id="limiter"
                    ng-model="pagination.perPage"
                    ng-options="n for n in [pagination.defaultPerPage, 36, 48]"
                    class="ktpl ss-menu-select limiter-options ng-pristine ng-valid"
                  >
                    <option value="0" selected="selected" label="30">
                      30
                    </option>
                    <option value="1" label="36">
                      36
                    </option>
                    <option value="2" label="48">
                      48
                    </option>
                  </select>
                </div>
              </div>
              <div
                id="ss-sort"
                class="ktpl ss-menu-dropdown toolbar-sorter sorter"
              >
                <label class="ktpl sorter-label" for="sorter">
                  Sort By
                </label>
                <select
                  id="sorter"
                  ng-model="sorting.current"
                  ng-options="option.label for option in sorting.options"
                  class="ktpl ss-menu-select sorter-options ng-pristine ng-valid"
                  // onClick={(e) => handleClick(e.target.value)}
                >
                  {data?.sorting?.options.map((item) => {
                    return (
                      <option value={item?.label} label={item?.label}>
                        {item?.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="ktpl_search-list-card">
            <div className="ktpl_search-list-cardList">
              {data?.results.map((item) => {
                // Set the HTML content of the textarea to the encoded name
                const decodedName = (() => {
                  const textarea = document.createElement("textarea");
                  textarea.innerHTML = item?.name || "";
                  return textarea.value;
                })();
                return (
                  <div className="ktpl_search-list-card-items">
                    <div className="ktpl_card-image-wrapper">
                      <img
                        src={item?.imageUrl}
                        alt={item?.name}
                        className="ktpl_card-images "
                      />
                    </div>
                    <div className="ktpl_card-info">
                      <span className="ktpl_cardname">{decodedName}</span>
                      <strong className="ktpl_cardprice">${item?.price}</strong>
                      <button className="ktpl_cardbtn">Add to cart</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
