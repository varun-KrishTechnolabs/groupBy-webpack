/**@jsx myDom **/
import myDom from "./myDom.js";

import SearchBar from "./views/SearchBar.js";

import "./styles/index.css";
import { SearchListing } from "./views/SearchListing.js";

const root = document.getElementById("gb-minisearch-container");

async function postData() {
  try {
    // custom headers
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "authorization",
      "client-key 7917ec75-cb89-4330-8830-6331220d707b"
    );
    headers.append("x-customer-id", "spiral");

    // data payload
    const data = {
      collection: "covers",
      area: "MBprod",
      skip: "0",
      pageSize: 1,
      query: "",
      refinements: [],
      preFilter: '(availability: ANY("IN_STOCK"))',
      responseMask: ["id", "availability", "title", "*"],
      customUrlParams: [
        {
          key: "pageUrl",
          value: "sdd",
        },
      ],
      sorts: [
        {
          field: "Price",
          order: "Ascending",
        },
      ],
      variantRollupKeys: ["colorFamilies"],
    };

    // Make a POST request using fetch with custom headers and data
    const response = await fetch(
      "https://search.spiral.groupbycloud.com/api/v3/search/",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      }
    );

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON response
    const responseData = await response.json();

    // Log headers and data
    console.log("Headers:", headers);
    console.log("Data:", data);
    console.log("Response:", responseData);
  } catch (error) {
    // Handle errors
    console.error("Fetch error:", error);
  }
}

postData();

root.appendChild(<div id="gb_mini-search-block">{SearchBar()}</div>);

/**
 * this is and event listner attached to the window to detect the change in url
 * so when the change is triggred the SearchListing function is triggred
 * if it is search page url then the fucntion renders the UI on the basis of the query param
 */
window.addEventListener("hashchange", SearchListing());
