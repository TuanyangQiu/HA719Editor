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