const editorElement = document.querySelector(".editor");
const editorWrapperElement = document.querySelector(".editor-wrapper");
let currentSelectedElement = undefined;
let defaultFontFamily = "Montserrat, sans-serif";
const defaultText = "Lorem Ipsum";
let imgSourceFile = undefined;
let videoSourceFile = undefined;
let assetSourceFile = undefined;

const textClick = function(event) {

  if (event.target.matches(".text-icon")) {
    createTextElement(event.target);
    return;
  }
}

const mediaClick = function(event) {
  if (event.target.matches(".media-icon")) {
    createMediaElement(event.target);
    return;
  }
}

const textAlignClick = function(event) {
  if (event.target.matches(".text-align-icon")) {
    setTextAlign(event.target);
    return
  }
}

const gradientClick = function(event) {
  if (checkUndefinedSelectedElement() === true) {
    return;
  }
  
  if (event.target.matches(".gradient-icon")) {
    let gradientDirection = document.getElementById("gradient-direction-select");
    let gradientColor1 = document.getElementById("gradient-color-input-1");
    let gradientColor2 = document.getElementById("gradient-color-input-2");

    if (gradientDirection.value === null || gradientColor1.value === null || gradientColor2.value === null) {
      return;
    }

    const direction = getInputValue(gradientDirection);
    const color1 = getInputValue(gradientColor1);
    const color2 = getInputValue(gradientColor2);

    createGradient(direction, color1, color2);
  }
}

const mediaQueryClick = function(event) {
  if (event.target.matches(".media-query-icon")) {
    changeEditorSize(event);
  }
}

const gridClick = function(event) {
  if (event.target.matches(".grid-icon")) {
    createGrid();
  }
}

const buttonClick = function(event) {
  if (event.target.matches(".button-icon")) {
    createButton();
  }
}

const componentClick = function(event) {
  if (event.target.matches(".toolbar-icon2")) {
    createComponent(event.target);
  }
}

const flexClick = function(event) {
  if (event.target.matches(".flexbox-icon")) {
    setFlex();
  }
}

const alignItemsClick = function(event) {
  if (event.target.matches(".align-items-icon")) {
    setAlignItems();
  }
}

const alignContentClick = function(event) {
  if (event.target.matches(".align-content-icon")) {
    setAlignContent();
  }
}

const justifyContentClick = function(event) {
  if (event.target.matches(".justify-content-icon")) {
    setJustifyContent();
  }
}

const assetUploadClick = function(event) {
  if (event.target.matches(".file-upload-icon")) {
    setFileSource();
  }
}

const positionInput = function(event) {
  if (event.target.matches(".position-input")) {
    const property = event.target.getAttribute("data-property");
    const propertyType = event.target.getAttribute("data-type");
    const value = getInputValue(event.target);

    if (propertyType === "position") {
      setPositionValue(property, value);
      return;
    }

    if (propertyType === "margin") {
      setMarginValue(property, value);
      return;
    }

    if (propertyType === "padding") {
      setPaddingValue(property, value);
      return;
    }
  }
}

const positionChange = function(event) {
  if (event.target.matches("#position-select")) {
    const positionStyle = event.target.value;
    currentSelectedElement.style.position = `${positionStyle}`;
  }
}

const deleteElement = function(event) {
  if (event.key === "Delete") {
    if (currentSelectedElement !== undefined) {
      removeElement(currentSelectedElement);
    }

    if (currentSelectedElement === undefined) {
      return;
    }
  }
}

const selectElement = function(event) {
  /* if (event.target.parentNode.className !== "editor") {
    return;
  }  */

  if (editorElement.contains(event.target)){
    if (event.target !== undefined) {
      currentSelectedElement = event.target;
      return;
    }
  }
}

const removeElement = function(element) {
  try {
    if (currentSelectedElement === editorElement) {
      return;
    }

    if (editorElement.contains(element)) {
      element.parentNode.removeChild(element)
    }

    //editorElement.removeChild(element);
    currentSelectedElement = undefined; // reset element
  } catch (error) {
    // DOM exception error, only want user to be able to remove elements from the editor element.
    return;
  }
}

const mediaChange = function(event) {
  if (event.target.matches("#image-file-input")) {
    imgSourceFile = URL.createObjectURL(event.target.files[0]);
  }

  if (event.target.matches("#video-file-input")) {
    videoSourceFile = URL.createObjectURL(event.target.files[0]);
  }

  if (event.target.matches("#asset-file-input")) {
    assetSourceFile = URL.createObjectURL(event.target.files[0]);
  }
}

const changeEditorSize = function(event) {
  const mediaQuery = getMediaQuery(event.target);
  const desktopSize = "1440px";
  const tabletSize = "769px";
  const mobileSideSize = "568px";
  const mobileSize = "320px";

  if (mediaQuery === "desktop") {
    editorElement.style.width = desktopSize;
    editorWrapperElement.style.width = desktopSize;
    return;
  }

  if (mediaQuery === "tablet") {
    editorElement.style.width = tabletSize;
    editorWrapperElement.style.width = tabletSize;
    return;
  }

  if (mediaQuery === "mobile-side") {
    editorElement.style.width = mobileSideSize;
    editorWrapperElement.style.width = mobileSideSize;
    return;
  }

  if (mediaQuery === "mobile") {
    editorElement.style.width = mobileSize;
    editorWrapperElement.style.width = mobileSize;
    return;
  }
}

const fontSettingInput = function(event) {
  if (event.target.value === "") {
    return;
  }

  if (event.target.matches("#font-family-select")) {
    const fontFamily = event.target.value;
    currentSelectedElement.style.fontFamily = `${fontFamily}`;
  }

  if (event.target.matches("#font-weight-select")) {
    const fontWeight = event.target.value;
    currentSelectedElement.style.fontWeight = `${fontWeight}`;
  }

  if (event.target.matches("#font-size-input")) {
    const fontSize = event.target.value;
    currentSelectedElement.style.fontSize = `${fontSize}px`;
  }

  if (event.target.matches("#font-style-select")) {
    const fontStyle = event.target.value;
    currentSelectedElement.style.fontStyle = `${fontStyle}`;
  }

  if (event.target.matches("#font-color-input")) {
    const fontColor = event.target.value;
    currentSelectedElement.style.color = `${fontColor}`;
  }
}

const borderSettingInput = function(event) {
  if (event.target.value === "") {
    return;
  }

  if (event.target.matches("#border-style-select")) {
    const borderStyle = event.target.value;
    currentSelectedElement.style.borderStyle = `${borderStyle}`;
  }

  if (event.target.matches("#border-width-input")) {
    const borderWidth = event.target.value;
    currentSelectedElement.style.borderWidth = `${borderWidth}px`;
  }

  if (event.target.matches("#border-radius-input")) {
    const borderRadius = event.target.value;
    currentSelectedElement.style.borderRadius = `${borderRadius}px`;
  }

  if (event.target.matches("#border-color-input")) {
    const borderColor = event.target.value;
    currentSelectedElement.style.borderColor = `${borderColor}`;
  }
}

const backgroundSettingInput = function(event) {
  if (event.target.matches("#background-color-input")) {
    const backgroundColor = event.target.value;
    currentSelectedElement.style.backgroundColor = `${backgroundColor}`;
  }
}

const dimensionSettingInput = function(event) {
  if (event.target.matches("#element-width-input")) {
    const elementWidth = event.target.value;
    currentSelectedElement.style.width = `${elementWidth}px`;
  }

  if (event.target.matches("#element-height-input")) {
    const elementHeight = event.target.value;
    currentSelectedElement.style.height = `${elementHeight}px`;
  }
}

document.addEventListener("click", function(event) {
  selectElement(event);
  textClick(event);
  mediaClick(event);
  textAlignClick(event);
  gradientClick(event);
  mediaQueryClick(event);
  gridClick(event);
  //positionChange(event);
  buttonClick(event);
  componentClick(event);
  flexClick(event);
  alignItemsClick(event);
  alignContentClick(event);
  justifyContentClick(event);
  assetUploadClick(event);
  downloadClick(event);
});

document.addEventListener("keydown", function(event) {
  deleteElement(event);
});

document.addEventListener("change", function(event) {
  mediaChange(event);
});

document.addEventListener("input", function(event) {
  if (checkUndefinedSelectedElement() === true) {
    return;
  }

  positionInput(event);
  fontSettingInput(event);
  borderSettingInput(event);
  backgroundSettingInput(event);
  dimensionSettingInput(event);
  positionChange(event);
});


const createTextElement = function(target) {
  const elementTagName = getElementTagName(target);
  const documentFragment = createDocumentFragment();
  const newElement = createElement(elementTagName);

  setDefaultText(newElement);
  setColor(newElement, "black");
  setFontFamily(newElement, defaultFontFamily);
  setContentEditableTrue(newElement);
  appendElement(documentFragment, newElement);
  appendElement(editorElement, documentFragment);
}

const createMediaElement = function(target) {
  const elementTagName = getElementTagName(target);
  const documentFragment = createDocumentFragment();
  const newElement = createElement(elementTagName);
  const mediaFile = getMediaFile(elementTagName);

  if (mediaFile === undefined) {
    return;
  }

  newElement.src = mediaFile;
  
  appendElement(documentFragment, newElement);
  appendElement(editorElement, documentFragment);
}

const createComponent = function(target) {
  const tagName = getElementTagName(target);

  const navbarMarkup = `
    <div style="display: flex; background: white; padding: 24px 0px">
      <div id="logo-component" name="logo" style="height: 48px; width: 48px; background: gray; margin-right: auto" contenteditable="true"></div>
      <div style="display: flex; align-items: center">
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px; padding: 0px 16px">Link 1</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px; padding: 0px 16px">Link 2</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px; padding: 0px 16px">Link 3</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px; padding: 0px 16px">Link 4</a>
        <button style="width: 160px; height: 48px" contenteditable="true">Button</button>
      </div>
    </div>
  `;

  const heroMarkup = `
    <div style="display: flex; background: white; padding: 48px 0px">
      <div style="display: inherit; flex-direction: column; justify-content: center; background: white; margin-right: auto">
        <h1 style="font-family: ${defaultFontFamily}; font-size: 64px; padding: 8px 0px" contenteditable="true">Lorem Ipsum</h1>
        <p style="font-family: ${defaultFontFamily}; font-size: 32px; padding: 8px 0px" contenteditable="true">This is where the copy goes.</p>
        <button style="width: 160px; height: 48px; padding: 8px 0px" contenteditable="true">Button</button>
      </div>
      <div style="display: inherit; background: white">
        <img contenteditable="true" style="height: 700px; width: 700px; background: gray"></img>
      </div>
    </div>
  `;

  const cardsMarkup = `
    <div style="display: flex; justify-content: space-between; background: white; padding: 48px 0px">
      <div style="display: inherit; flex-direction: column; width: 33%">
        <img style="width: 100%; height: 300px; background: gray"></img>
        <h2 style="font-family: ${defaultFontFamily}; font-size: 16px; padding: 16px 0px; width: max-content" contenteditable="true">Header 2</h2>
        <p style="font-family: ${defaultFontFamily}; font-size: 16px; width: max-content" contenteditable="true">Some text.</p>
      </div>
      <div style="display: inherit; flex-direction: column; width: 33%">
        <img style="width: 100%; height: 300px; background: gray"></img>
        <h2 style="font-family: ${defaultFontFamily}; font-size: 16px; padding: 16px 0px; width: max-content" contenteditable="true">Header 2</h2>
        <p style="font-family: ${defaultFontFamily}; font-size: 16px; width: max-content" contenteditable="true">Some text.</p>
      </div>
      <div style="display: inherit; flex-direction: column; width: 33%">
        <img style="width: 100%; height: 300px; background: gray"></img>
        <h2 style="font-family: ${defaultFontFamily}; font-size: 16px; padding: 16px 0px; width: max-content" contenteditable="true">Header 2</h2>
        <p style="font-family: ${defaultFontFamily}; font-size: 16px; width: max-content" contenteditable="true">Some text.</p>
      </div>
    </div>
  `;

  const contactMarkup = `
    <div style="display: flex; flex-direction: column; width: 100%; background: white; padding: 48px 0px">
      <h2 style="font-family: ${defaultFontFamily}; font-size: 32px" contenteditable="true">Contact</h2>  
      <form style="display: inherit; flex-direction: column;">
        <label style="font-family: ${defaultFontFamily}; font-size: 16px; padding: 8px 0px" contenteditable="true">First Name</label>
        <input type="text" style="font-family: ${defaultFontFamily}; font-size: 16px; width: 350px; padding: 8px 0px" placeholder="Tuffy">
        <label style="font-family: ${defaultFontFamily}; font-size: 16px; padding: 8px 0px" contenteditable="true">Last Name</label>
        <input type="text" style="font-family: ${defaultFontFamily}; font-size: 16px; width: 350px; padding: 8px 0px" placeholder="Titan">
        <label style="font-family: ${defaultFontFamily}; font-size: 16px; padding: 8px 0px" contenteditable="true">Phone Number</label>
        <input type="text" style="font-family: ${defaultFontFamily}; font-size: 16px; width: 350px; padding: 8px 0px" placeholder="111111111">
        <label style="font-family: ${defaultFontFamily}; font-size: 16px; padding: 8px 0px" contenteditable="true">Email Address</label>
        <input type="text" style="font-family: ${defaultFontFamily}; font-size: 16px; width: 350px; padding: 8px 0px" placeholder="TuffyTitan@csu.fullerton.edu">
        <label style="font-family: ${defaultFontFamily}; font-size: 16px; padding: 8px 0px" contenteditable="true">Message</label>
        <textarea rows="10" cols="40" style="width: 700px; margin-bottom: 16px"></textarea>
        <button style="width: 160px; height: 48px" contenteditable="true">Submit</button>
      </form>
    </div>
  `;

  const footerMarkup = `
    <div style="display: flex; justify-content: space-between; background: white; padding: 64px 0px">
      <div style="display: inherit; flex-direction: column; width: 25%">
        <img style="width: 48px; height: 48px; background: gray"></img>
      </div>
      <div style="display: inherit; flex-direction: column; width: 25%">
        <h2 style="font-family: ${defaultFontFamily}; font-size: 16px; padding-bottom: 16px; width: max-content" contenteditable="true">Header 2</h2>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 1</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 2</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 3</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 4</a>
      </div>
      <div style="display: inherit; flex-direction: column; width: 25%">
        <h2 style="font-family: ${defaultFontFamily}; font-size: 16px; padding-bottom: 16px 0px; width: max-content" contenteditable="true">Header 2</h2>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 1</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 2</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 3</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 4</a>
      </div>
      <div style="display: inherit; flex-direction: column; width: 25%">
        <h2 style="font-family: ${defaultFontFamily}; font-size: 16px; padding-bottom: 16px 0px; width: max-content" contenteditable="true">Header 2</h2>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 1</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 2</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 3</a>
        <a contenteditable="true" style="color: black; font-family: ${defaultFontFamily}; font-size: 16px">Link 4</a>
      </div>
    </div>
    <div style="font-family: ${defaultFontFamily}; font-size: 16px" contenteditable="true">Copyright © 2020 &ltInsert Name&gt All rights reserved.</div>
  `;

  switch (tagName) {
    case "navbar":
      const navbar = document.createElement("nav");
      navbar.innerHTML = navbarMarkup;
      navbar.style.padding = "0px 24px";
      appendElement(editorElement, navbar);
      break;
    case "hero":
      const hero = document.createElement("div");
      hero.innerHTML = heroMarkup;
      hero.style.padding = "0px 24px";
      appendElement(editorElement, hero);
      break;
    case "cards":
      const cards = document.createElement("div");
      cards.innerHTML = cardsMarkup;
      cards.style.padding = "0px 24px";
      appendElement(editorElement, cards);
      break;
    case "contact":
      const contact = document.createElement("div");
      contact.innerHTML = contactMarkup;
      contact.style.padding = "0px 24px";
      appendElement(editorElement, contact);
      break;
    case "footer":
      const footer = document.createElement("footer");
      footer.innerHTML = footerMarkup;
      footer.style.padding = "0px 24px";
      appendElement(editorElement, footer);
      break;
    default:
      return;
  }
  
}

const createGrid = function() {
  const gridColumnInput = document.getElementById("grid-columns");
  const gridColumnUnitInput = document.getElementById("grid-column-unit-select");
  const gridColumnSizeInput = document.getElementById("grid-column-size");
  const gridRowInput = document.getElementById("grid-rows");
  const gridRowUnitInput = document.getElementById("grid-row-unit-select");
  const gridRowSizeInput = document.getElementById("grid-row-size");
  const gridGapInput = document.getElementById("grid-gap");

  const gridWrapper = document.createElement("div");
  const display = "grid";
  const gridColumns = getInputValue(gridColumnInput);
  const gridRows = getInputValue(gridRowInput);
  const gridColumnUnit = getInputValue(gridColumnUnitInput);
  const gridRowUnit = getInputValue(gridRowUnitInput);
  const gridColumnSize = getInputValue(gridColumnSizeInput);
  const gridRowSize = getInputValue(gridRowSizeInput);
  const gridGap = `${getInputValue(gridGapInput)}px`;

  const gridTemplateColumns = `repeat(${gridColumns}, ${gridColumnSize}${gridColumnUnit})`;
  const gridTemplateRows = `repeat(${gridRows}, ${gridRowSize}${gridRowUnit})`;


  gridWrapper.style.position = "absolute";
  gridWrapper.style.display = display;
  gridWrapper.style.gridTemplateColumns = gridTemplateColumns;
  gridWrapper.style.gridTemplateRows = gridTemplateRows;
  gridWrapper.style.gridGap = gridGap;
  gridWrapper.style.width = "100%";
  gridWrapper.style.height = "100%";
  gridWrapper.style.zIndex = "-1";

  appendElement(editorElement, gridWrapper);
}

const createButton = function() {
  const buttonWidthInput = document.getElementById("button-width-input");
  const buttonHeightInput = document.getElementById("button-height-input");
  const buttonWidth = buttonWidthInput.value;
  const buttonHeight = buttonHeightInput.value;

  console.log(buttonHeight, buttonWidth);

  if (buttonWidth === null || buttonHeight === null) {
    return;
  }

  const button = createElement("button");
  button.textContent = "Button";
  button.style.width = `${buttonWidth}px`;
  button.style.height = `${buttonHeight}px`;
  setContentEditableTrue(button);

  appendElement(editorElement, button);
}

const createElement = function(tagName) {
  return document.createElement(tagName);
}

const createDocumentFragment = function() {
  return document.createDocumentFragment();
}

const createGradient = function(direction, color1, color2) {
  currentSelectedElement.style.backgroundImage = `linear-gradient(to ${direction}, ${color1}, ${color2})`;
}

const getElementTagName = function(element) {
  return element.getAttribute("data-tagName");
}

const getTextAlign = function(element) {
  return element.getAttribute("data-align");
}

const getMediaQuery = function(element) {
  return element.getAttribute("data-media-query");
}

const getMediaFile = function(tagName){
  if (tagName === "img") {
    if (imgSourceFile === undefined) {
      return;
    }

    return imgSourceFile;
  }

  if (tagName === "video") {
    if (videoSourceFile === undefined) {
      return;
    }

    return videoSourceFile;
  }
}

const getInputValue = function(element) {
  return element.value;
}

const getWidthInput = function(element) {
  return element.width;
}

const getHeightInput = function(element){
  return element.height;
}

const setDefaultText = function(element) {
  element.textContent = defaultText;
}

const setColor = function(element, desiredColor) {
  element.style.color = desiredColor;
}

const setFontFamily = function(element, desiredFontFamily) {
  element.style.fontFamily = desiredFontFamily;
}

const setContentEditableTrue = function(element) {
  element.contentEditable = "true";
}

const setFlex = function() {
  const flexDirection = document.getElementById("flex-direction-select");
  const flexWrap = document.getElementById("flex-wrap-select");
  const direction = flexDirection.value;
  const wrap = flexWrap.value;

  currentSelectedElement.style.display = `flex`;
  currentSelectedElement.style.flexDirection = `${direction}`;
  currentSelectedElement.style.flexWrap = `${wrap}`;
}

const setAlignItems = function() {
  const alignItemsSelect = document.getElementById("align-items-select");
  const alignItems = alignItemsSelect.value;

  currentSelectedElement.style.alignItems = `${alignItems}`;
}

const setAlignContent = function() {
  const alignContentSelect = document.getElementById("align-content-select");
  const alignContent = alignContentSelect.value;

  currentSelectedElement.style.alignContent = `${alignContent}`;
}

const setJustifyContent = function() {
  const justifyContentSelect = document.getElementById("justify-content-select");
  const justifyContent = justifyContentSelect.value;

  currentSelectedElement.style.justifyContent = `${justifyContent}`;
}

const setFileSource = function() {
  const tagName = currentSelectedElement.tagName;

  if (tagName === "IMG") {
    if (assetSourceFile !== undefined) {
      currentSelectedElement.src = assetSourceFile;
    }
  }

}

const appendElement = function(parentElement, childElement) {
  parentElement.appendChild(childElement);
}

const setTextAlign = function(element) {
  const alignment = getTextAlign(element);
  switch (alignment) {
    case "left":
      currentSelectedElement.style.textAlign = alignment;
      break;
    case "center":
      currentSelectedElement.style.textAlign = alignment;
      break;
    case "right":
      currentSelectedElement.style.textAlign = alignment;
      break;
    case "justify":
      currentSelectedElement.style.textAlign = alignment;
      break;
    default:
      return;
  }
}

const setPositionValue = function(positionProperty, value) {
  if (currentSelectedElement === undefined) {
    return;
  }

  //currentSelectedElement.style.position = "absolute";

  switch (positionProperty) {
    case "position-left":
      currentSelectedElement.style.left = `${value}px`;
      break;
    case "position-right":
      currentSelectedElement.style.right = `${value}px`;
      break;
    case "position-top":
      currentSelectedElement.style.top = `${value}px`;
      break;
    case "position-bottom":
      currentSelectedElement.style.bottom = `${value}px`;
      break;
    default:
      return;
  }
}

const setMarginValue = function(positionProperty, value) {
  if (currentSelectedElement === undefined) {
    return;
  }

  switch (positionProperty) {
    case "margin-left":
      currentSelectedElement.style.marginLeft = `${value}px`;
      break;
    case "margin-right":
      currentSelectedElement.style.marginRight = `${value}px`;
      break;
    case "margin-top":
      currentSelectedElement.style.marginTop = `${value}px`;
      break;
    case "margin-bottom":
      currentSelectedElement.style.marginBottom = `${value}px`;
      break;
    default:
      return;
  }
}

const setPaddingValue = function(positionProperty, value) {
  if (currentSelectedElement === undefined) {
    return;
  }

  switch (positionProperty) {
    case "padding-left":
      currentSelectedElement.style.paddingLeft = `${value}px`;
      break;
    case "padding-right":
      currentSelectedElement.style.paddingRight = `${value}px`;
      break;
    case "padding-top":
      currentSelectedElement.style.paddingTop = `${value}px`;
      break;
    case "padding-bottom":
      currentSelectedElement.style.paddingBottom = `${value}px`;
      break;
    default:
      return;
  }
}

const checkUndefinedSelectedElement = function() {
  if (currentSelectedElement === undefined) {
    return true;
  }

  return false;
}

const downloadFile = function(filename, html) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
const downloadClick = function(event) {
  if (event.target.matches("#download-link")) {
    download();
  }
}
  
const download = function() {
  const editorHTML = document.querySelector(".editor-wrapper");
  const html = editorHTML.innerHTML;

  downloadFile("prototype.html", html);
}