chrome.contextMenus.create({
  type: "normal",
  title: "Get CSS Styles",
  contexts: ["link", "selection"],
  id: "getCssInfo",
  onclick: function (info, tab) {
    chrome.tabs.sendMessage(tab.id, { action: "getCssInfo" });
  }

},
  function () { });

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

