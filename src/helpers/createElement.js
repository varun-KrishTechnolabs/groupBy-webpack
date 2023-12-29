export const createElement = ({ elementType, id, className }) => {
  const element = document.createElement(elementType);
  element.id = id ? id : null;
  element.className = className ? className : null;
  return element;
};
