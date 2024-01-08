/**@jsx myDom **/
import myDom from "./myDom.js";

import SearchBar from "./views/SearchBar.js";

import "./styles/index.css";
import { SearchListing } from "./views/SearchListing.js";

const root = document.getElementById("gb-minisearch-container");

root.appendChild(<div id="gb_mini-search-block">{SearchBar()}</div>);

/**
 * this is and event listner attached to the window to detect the change in url
 * so when the change is triggred the SearchListing function is triggred
 * if it is search page url then the fucntion renders the UI on the basis of the query param
 */
window.addEventListener("hashchange", SearchListing());
