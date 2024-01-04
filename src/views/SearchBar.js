/**@jsx myDom **/
import myDom from "../myDom.js";

import { createElement } from "../helpers/createElement.js";
import { fetchSuggestedProducts } from "../services/fetchSuggestedProduct.js";
import { fetchSuggestions } from "../services/fetchSuggestion.js";

import { loader } from "../constants/loader.js";
import { renderLeftPanel, renderRightPanel } from "./PopupUI.js";

import "../styles/index.css";

const SearchBar = () => {
  let suggestedCategories = [];
  let autoCompleteData = [];

  const onChange = async (e) => {
    const container = document.getElementById("ketpl_autocomplete-popup");
    const input = e.target.value;
    const searchTerm = input.trim();

    const suggestions = createElement({
      elementType: "div",
      className: "ktpl_suggestionscontainer",
    });
    const suggestedProducts = createElement({ elementType: "div" });

    // To get and show fresh results everytime the change event is triggred

    container.innerText = "";
    suggestions.innerText = "";
    suggestedProducts.innerText = "";

    if (searchTerm.length > 0) {
      container.style.display = "flex";
      container.style.justifyContent = "center";

      container.appendChild(loader()); // temporary loader

      // need to await these queries together in order to reduce api call time
      suggestedCategories = await fetchSuggestions({ searchTerm });
      autoCompleteData = await fetchSuggestedProducts({ searchTerm });

      container.innerHTML = "";

      suggestions.appendChild(renderLeftPanel(suggestedCategories, searchTerm)); // function used to render the HTML
      suggestedProducts.appendChild(
        renderRightPanel(autoCompleteData, searchTerm)
      ); // function used to render the HTML

      container.appendChild(suggestions);
      container.appendChild(suggestedProducts);
    }
  };

  return (
    <div id="gb_searchcontainer" className="gb_searchcontainer">
      <input
        type="text"
        name="search"
        id="gb_searchbar"
        className="gb_searchbar"
        onKeyUp={(e) => onChange(e)}
      ></input>
      <button type="button" className="gb_searchbtn">
        search
      </button>
      <div id="gb_searchcontainer">
        <div id="ketpl_autocomplete-popup" style="display: none;"></div>
      </div>
    </div>
  );
};

export default SearchBar;
