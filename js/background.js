chrome.contextMenus.create({
  type: "normal",
  title: "Get CSS Styles",
  contexts: ["link", "selection"],
  id: "getLinkInfo",

},
  function() { });

chrome.contextMenus.onClicked.addListener(function (info, tab) {

  if (info.menuItemId === "getLinkInfo") {
    console.log('clicked getLinkInfo');
      
    
    chrome.tabs.sendMessage(tab.id, { action: "getLinkInfo" });
  }
});

//Listen the click event on the extension icon,
//then display the page in a new tab
chrome.browserAction.onClicked.addListener(function (tab) {

  chrome.windows.create({
    url: chrome.runtime.getURL("../html/mainPage.html"),
    type: "popup"//hide tool bar
  },
    function (event) {
      console.log('mainpage has been opened!');
    });
});

