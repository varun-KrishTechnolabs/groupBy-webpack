import { renderLeftPanel, renderRightPanel } from "./views/popupUI.js";

import { fetchSuggestions } from "./services/fetchSuggestion.js";
import { fetchSuggestedProducts } from "./services/fetchSuggestedProduct.js";

import { debounce } from "./helpers/debounce.js";
import { createElement } from "./helpers/createElement.js";

import { loader } from "./constants/loader.js";

export function secondChild() {
  const gb_searchcontainer = document.getElementById("gb_searchcontainer");

  const container = createElement({
    elementType: "div",
    id: "ketpl_autocomplete-popup",
  });
  // container.id = "ketpl_autocomplete-popup";
  container.style.display = "none";

  // function to listen to the change event of the search bar
  const onChange = async (e) => {
    const searchTerm = e.target.value;

    const suggestions = createElement({
      elementType: "div",
      className: "ktpl_suggestionscontainer",
    });
    const suggestedProducts = createElement({ elementType: "div" });

    // To get and show fresh results everytime the change event is triggred
    container.innerText = "";
    suggestedProducts.innerText = "";
    suggestions.innerText = "";

    if (searchTerm.length > 0) {
      container.style.display = "flex";
      container.style.justifyContent = "center";

      container.innerHTML = loader;

      // need to await these queries together in order to reduce api call time
      const suggestedCategories = await fetchSuggestions({ searchTerm });
      const autoCompleteData = await fetchSuggestedProducts({ searchTerm });

      // suggestions.className = "ktpl_suggestionscontainer";

      container.innerHTML = "";

      suggestions.innerHTML = renderLeftPanel(suggestedCategories, searchTerm); // function used to render the HTML
      suggestedProducts.innerHTML = renderRightPanel(autoCompleteData); // function used to render the HTML

      container.appendChild(suggestions);
      container.appendChild(suggestedProducts);
    }
  };

  document.getElementById("inputField").addEventListener(
    "keyup",
    debounce((e) => onChange(e), 1000)
  );

  gb_searchcontainer.appendChild(container);
}
