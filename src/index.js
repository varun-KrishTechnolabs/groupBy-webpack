import { createElement } from "./helpers/createElement.js";
import { secondChild } from "./search.js";

import "./styles/index.css";

const root = document.getElementById("root");
const content = createElement({
  elementType: "div",
  id: "gb_searchcontainer",
  className: "gb_searchcontainer",
});

content.innerHTML = `<input type="text" name="search" id="inputField" class="gb_searchbar"/>
<button type="button" class="gb_searchbtn">search</button>
`;

root.appendChild(content);
secondChild();
