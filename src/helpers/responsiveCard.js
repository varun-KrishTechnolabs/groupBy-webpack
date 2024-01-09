export default function responsiveData(data) {
  let newData = [];
  let cards = 6;
  const windowWidth = window.outerWidth;
  console.log(windowWidth, "windowWidth");

  if (windowWidth < 768) {
    cards = 2;
  } else if (windowWidth < 992) {
    cards = 3;
  } else {
    cards = 6;
  }
  console.log("cards", cards);
  for (let i = 0; i < cards; i++) {
    newData.push(data[i]);
  }
  console.log(newData, "object");

  return newData;
}
