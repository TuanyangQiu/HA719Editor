console.log("hello main page.js");

chrome.runtime.onMessage.addListener((message) => {
  const { action, style, text } = message;
  if (action === "send-to-popup") {
    console.log("popup.onMessage");

    const el = document.createElement("div");
    //el.style = style;
    el.textContent = text;
    document.body.appendChild(el);

  }
});
