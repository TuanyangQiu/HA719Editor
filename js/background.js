chrome.runtime.onInstalled.addListener(() => {
  console.log("hello background.js");

  
  chrome.contextMenus.create({
    id: "get-css-style",
    title: "Get CSS Style",
    contexts: ["selection", "link", "image", "video"],
  });


});



chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "get-css-style") {
    console.log("---------------------click contextMenus----------------------");
    var clickInfo = {

      mediaType: info.mediaType,
      linkUrl: info.linkUrl,
      selectionText: info.selectionText
    }


    chrome.tabs.sendMessage(tab.id, {
      action: "getCssInfo",
      clickInfo: clickInfo
    });
  }
});


chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    url: chrome.runtime.getURL("../html/mainPage.html"),
    type: "popup",
  });
});
