console.log("hello content-script.js");

document.addEventListener("contextmenu", function (event) {
  posX = event.clientX;
  poxY = event.clientY;
});

function getXPath(element) {
  if (element && element.tagName) {
    var xpath = "";
    for (; element && element.nodeType == 1; element = element.parentNode) {
      var id =
        Array.from(element.parentNode.children)
          .filter((child) => child.tagName === element.tagName)
          .indexOf(element) + 1;
      id = id > 1 ? "[" + id + "]" : "";
      xpath = "/" + element.tagName.toLowerCase() + id + xpath;
    }
    return xpath;
  }
  return "";
}

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "getCssInfo") {
    var e = document.elementFromPoint(posX, poxY);
    var xp = getXPath(e);
    var style = getCssStyles(xp);
   

    sendMessage({
      action: "send-to-popup",
      text: style.textContent,
      clickInfo: message.clickInfo,
      style: {
        color: style.color,
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
      },
    });
  }
});

function sendMessage(message) {
  try {
    console.log('cotent.js send out message');
    chrome.runtime.sendMessage(message);
  } catch (err) {
    console.log("content-script.sendMessage", err);
  }
}

function getCssStyles(xpath) {
  const target = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  var linkInfo = {};

  if (target) {
    console.log("target is true");
    // Extract the common CSS styles from the target element
    linkInfo.textContent = target.textContent;
    const styles = window.getComputedStyle(target);
    linkInfo.fontSize = styles.fontSize;
    linkInfo.fontFamily = styles.fontFamily;
    linkInfo.fontWeight = styles.fontWeight;
    linkInfo.fontStyle = styles.fontStyle;
    linkInfo.color = styles.color;
    linkInfo.textDecoration = styles.textDecoration;
    linkInfo.textAlign = styles.textAlign;
  } else {
    console.log("target is false");
  }

  return linkInfo;
}
