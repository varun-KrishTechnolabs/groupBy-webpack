export const renderLeftPanel = (data) => {
  const suggestion = data[0]?.suggested?.text;
  const alternatives = data[0]?.alternatives?.map((item) => {
    return `<li class="ktpl_leftlist" ><a href='#'>${item.text}</a></li>`;
  });
  return `<div class="ktpl_leftpanel">
  <ul>
  <li class="ktpl_leftlist"><a href='#'>${suggestion}</a></li>
  ${alternatives?.join("")}
  </ul>
  </div>`; // UI is retuned
};

export const renderRightPanel = (data) => {
  console.log(data);

  const category = data[0]?.facets.map((item) => {
    return `<li class="ktpl_category-list-item">${item?.label}</li>`;
  });
  const rightSide = data[0]?.results?.map((item) => {
    return `
  <div class="ktpl_searchcard">
    <div class="ktpl_right-product-image">
      <img src=${item?.imageUrl} alt=${item?.name} />
    </div>
    <div>
      <p class="ktpl_item-name">${item?.name}</p>
      <span class="ktpl_item-price">$${item?.price}</span>
    </div>
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
  </div>`; // UI is retuned
};
