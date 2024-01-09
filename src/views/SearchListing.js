/**@jsx myDom **/
import myDom from "../myDom.js";

import { fetchSearchPageData } from "../services/fetchSearchPageData.js";

import { loader } from "../constants/loader.js";

import grid from "../assets/grid.svg";
import list from "../assets/list.svg";

import "../styles/searchlisting.css";

const root = document.getElementById("gb_search-listing");

export const SearchListing = async () => {
  root.innerText = "";

  const url = new URL(window.location.href);
  const query = url.searchParams.get("q");

  if (query) {
    root.style.display = "block";
    root.appendChild(loader());
    try {
      const data = await fetchSearchPageData({ query });
      console.log(
        "🚀 ~ file: SearchListing.js:24 ~ SearchListing ~ data:",
        data
      );

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
  const searchPageBreadcrumbs = data?.query;
  // console.log(filterid, "filterid");

  const toggleFilter = (index) => {
    let demo = document.getElementById(`filterlist-${index}`);
    demo.classList.toggle("myStyle");
  };

  const toggleView = (viewtype) => {
    let view = document.getElementById("ktpl_card-list");
    let cardView = document.querySelectorAll("[id='grid-card-view']");
    if (viewtype === "list") {
      view.classList.remove("ktpl_search-list-cardList");
      for (var i = 0; i < cardView.length; i++) {
        cardView[i].classList.add("ktpl_search-list-Listcard-items");
      }
    } else {
      view.classList.add("ktpl_search-list-cardList");
      for (var i = 0; i < cardView.length; i++) {
        cardView[i].classList.remove("ktpl_search-list-Listcard-items");
      }
    }
  };

  const searchFilter = data?.facets?.map((item, index) => {
    // if (item?.values.length > 0) {
    //   return (
    //     <li onClick={() => toggleFilter(index)}>
    //       <p className="ktpl_searc-filter-items">{item.label}</p>
    //       <span id={`filterlist-${index}`} className="ktpl_filter_subcategory">
    //         hii
    //       </span>
    //     </li>
    //   );
    // } else {
    //   return null;
    // }
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
                  {data?.pageInfo?.recordStart} - {data?.pageInfo?.recordEnd}
                </span>
                <span class="ktpl toolbar-number ng-binding">
                  {" "}
                  of {data?.totalRecordCount}
                </span>
              </p>
              <div class="ktpl modes">
                <strong class="ktpl modes-label" id="modes-label">
                  Display Type
                </strong>
                <button
                  className="ktpl_listview"
                  onClick={() => toggleView("list")}
                >
                  <img src={list} className="ktpl_listicon" />
                </button>
                <button
                  className="ktpl_gridview"
                  onClick={() => toggleView("grid")}
                >
                  <img src={grid} className="ktpl_gridicon" />
                </button>
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
            <div className="ktpl_search-list-cardList" id="ktpl_card-list">
              {data?.records.map((item) => {
                // Set the HTML content of the textarea to the encoded name
                const decodedName = (() => {
                  const textarea = document.createElement("textarea");
                  textarea.innerHTML = item?._t || "";
                  return textarea.value;
                })();
                return (
                  <div
                    className="ktpl_search-list-card-items"
                    id="grid-card-view"
                  >
                    <a href={item?.allMeta?.uri}>
                      <div className="ktpl_card-image-wrapper">
                        <img
                          src={item?.allMeta?.images[0]?.uri}
                          alt={item?.name}
                          className="ktpl_card-images "
                        />
                      </div>
                    </a>
                    <div className="ktpl_card-info">
                      <div className="ktpl_cardname-wrapper">
                        <a href={item?.allMeta?.uri} className="ktpl_cardname">
                          {decodedName}
                        </a>
                      </div>
                      <div className="ktpl_card-action">
                        <strong className="ktpl_cardprice">
                          {item?.allMeta?.priceInfo?.abc
                            ? item?.allMeta?.priceInfo
                            : "$100"}
                        </strong>
                        <button className="ktpl_cardbtn">Add to cart</button>
                      </div>
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
