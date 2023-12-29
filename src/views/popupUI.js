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
  const rightSide = data[0]?.results?.map((item) => {
    return `<div class="ktpl_searchcard">
        <div class="ktpl_right-product-image">
          <img src=${item?.imageUrl} alt=${item?.name} />
        </div>
        <div>
        <p>${item?.name}</p>
        <span>${item?.price}</span>
        </div>
      </div>`;
  });
  return `<div class="ktpl_rightpanel">${rightSide?.join("")}</div>`; // UI is retuned
};
