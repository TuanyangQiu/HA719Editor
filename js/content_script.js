var posX = 0;
var poxY = 0;


//Get the position where user right clicks on PC mouse
document.addEventListener("contextmenu", function (event) {

    console.log('original right click position:  x=' + event.clientX + '  y=' + event.clientY);
    posX = event.clientX;
    poxY = event.clientY;
});


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

function getCssStyles(xpath) {

    const target = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    var linkInfo = {};

    if (target) {
        console.log('target is true');
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
        console.log('target is false');
    }

    return linkInfo;

}



// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "getCssInfo") {
        console.log('recv getCssInfo cmd!  x=' + posX + '  y=' + poxY);

        var e = document.elementFromPoint(posX, poxY);
        console.log(e);
        var xp = getXPath(e);
        console.log('xp=' + xp);
        var style = getCssStyles(xp);
        console.log('text = ' + style.textContent);
        console.log('style.color=' + style.color);
        console.log('style.fontsize=' + style.fontSize);

    }
});
