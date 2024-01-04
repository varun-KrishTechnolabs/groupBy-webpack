import { debounce } from "./helpers/debounce";

/**
 * The below comment specifies the babel to use our function
 * It is not need over here
 * But wherever we want to use the jsx syntax we need to import this funtion below and the comment
 */

/**@jsx myDom **/

/**
 * This is a custom jsx pragma for rendering the jsx in the vanilla js project what this function does is that it takes the jsx code and then converts it to browser readable js format and such kind of function are called "pragma" it is like creating your own mini react library
 * @param {string} tag the name of the tag
 * @param {object} props the id, class etc of the tag
 * @param  {Array} children the child of the tag if there are any they could be string , html nodes etc
 */
export default function myDom(tag, props, ...children) {
  const elem = document.createElement(tag); // creation of the parent element of type "tag" , ex : div, span, a etc

  // to asign the attributes such as className, id etc
  Object.keys(props || {}).forEach((key) => {
    if (key === "onKeyUp") {
      elem.addEventListener("keyup", debounce(props[key], 1000));
    } else if (key === "onClick") {
      elem.addEventListener("click", props[key]);
    } else if (key === "id") {
      elem.setAttribute("id", props[key]);
    } else if (key === "className") {
      elem.setAttribute("class", props[key]);
    } else {
      elem.setAttribute(key, props[key]);
    }
  });

  // fuction to add child and subchild to form a tree like structure
  const addChild = (child) => {
    if (Array.isArray(child)) {
      child.forEach((subChild) => addChild(subChild)); // recursively add the subchild
    } else if (typeof child === "object") {
      // directly append the element
      if (child !== null) elem.appendChild(child);
    } else {
      // to add the string as the final value
      elem.appendChild(document.createTextNode(child));
    }
  };

  children.forEach((child) => addChild(child)); // to add the childs

  return elem; // returns the element tree
}
