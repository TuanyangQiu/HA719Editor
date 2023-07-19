chrome.contextMenus.create({
    type: "normal",
    title: "HA719 Editor",
    contexts: ["all"],
    // contexts: ["link", "selection"],
    //id: "hello",
    onclick: getSelectedElementStyles
    //function (i, t) {

    //     console.log(i);
    //     console.log('-------++++++++++++++++----------');
    //     console.log(t);
    //}
},
    function () { });


function getSelectedElementStyles(info, tab) {
    chrome.tabs.executeScript(
        tab.id,
        {
            code: `
              function getXPath(element) {
                if (element && element.tagName) {
                  var xpath = '';
                  for (; element && element.nodeType == 1; element = element.parentNode) {
                    var id = Array.from(element.parentNode.children).filter((child) => child.tagName === element.tagName).indexOf(element) + 1;
                    id = id > 1 ? '[' + id + ']' : '';
                    xpath = '/' + element.tagName.toLowerCase() + id + xpath;
                  }
                  return xpath;
                }
                return '';
              }
      
              function getStylesByXPath(xpath) {
                var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                var styles = window.getComputedStyle(element);
                var computedStyles = Array.from(styles).reduce(function(obj, style) {
                  obj[style] = styles.getPropertyValue(style);
                  return obj;
                }, {});
                return computedStyles;
              }
      
              var selectedElement = window.getSelection().anchorNode.parentElement;
              var selectedText = window.getSelection().toString();
              var xpath = getXPath(selectedElement);
              var computedStyles = getStylesByXPath(xpath);
              var selectedElementData = {
                text: selectedText,
                xpath: xpath,
                styles: computedStyles
              };
              selectedElementData;
            `
        },
        function (result) {
            var selectedElement = result[0];
            var mxpath = selectedElement.xpath;
            console.log(mxpath);
            var xr = document.evaluate(mxpath, document, null, XPathResult.ANY_TYPE, null);
            //xr.iterateNext();
            console.log();
            console.log(xr.iterateNext());
            // Do something with the selectedElement object
        }
    );
}
