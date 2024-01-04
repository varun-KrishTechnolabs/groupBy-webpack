/**@jsx myDom **/
import myDom from "./myDom.js";

import SearchBar from "./views/SearchBar.js";

import "./styles/index.css";

const root = document.getElementById("gb-minisearch-container");

root.appendChild(<div id="gb_mini-search-block">{SearchBar()}</div>);
