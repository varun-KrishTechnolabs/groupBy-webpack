export const renderLeftPanel = (data, searchTerm) => {
  const suggestion = data[0]?.suggested?.text;
  const alternatives = data[0]?.alternatives?.map((item) => {
    return `<li class="ktpl_leftlist" ><a href='#' class="ktpl_leftlist-link">${item.text}</a></li>`;
  });
  return `<div class="ktpl_leftpanel">
  <ul>
  <li class="ktpl_leftlist"><a href='#' class="ktpl_leftlist-link">${suggestion}</a></li>
  ${alternatives?.join("")}
  </ul>
  </div>`; // UI is retuned
};

export const renderRightPanel = (data) => {
  console.log(data);

  const category = data[0]?.facets.map((item) => {
    return `<li class="ktpl_category-list-item"><a href='#'>${item?.label}</a></li>`;
  });
  const rightSide = data[0]?.results?.map((item) => {
    const itemName =
      item?.name.split("(")[0].slice(0, 36) +
      (item?.name.split("(")[0].length > 16 ? "..." : "");
    return `
  <div class="ktpl_searchcard">
   <a href="#">
   <div class="ktpl_right-product-image">
   <img src=${item?.imageUrl} alt=${item?.name} />
 </div>
 <div>
   <p class="ktpl_item-name">${itemName}</p>
   <span class="ktpl_item-price">$${item?.price}</span>
 </div>
   </a>
  </div>
    `;
  });
  return `<div class="ktpl_searchRight">
  <div class='ktpl_searchCategory'>
  <ul>${category?.join("")}</ul></div>
  <div  class="ktpl_popUp-title">
  <strong class="ktpl_serach-suggestion-title">Product Suggestions</strong>
  <div class="ktpl_rightpanel">
  ${rightSide?.join("")}</div><div>
  <div class="ktpl_search-popup-footer"><a href="#">See ${
    data[0]?.results.length
  } results</a></div>
  </div>`; // UI is retuned
};
