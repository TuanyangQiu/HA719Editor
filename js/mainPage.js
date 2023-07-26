console.log("hello main page.js");

chrome.runtime.onMessage.addListener((message) => {
  const { action, style, text, expectedClickInfo } = message;
  if (action === "send-to-popup") {

    //Popup a modal here so user can select what styles they care about
    $('#SelectionBoxContent').html('<p>good done! </p>');
    $('#stylesSelectionBox').modal('show');

    //Saving styles selection
    $('#saveSelectionChanges').click(function () {
      $('#stylesSelectionBox').modal('hide');
    });

    //Discard styles selection
    $('#discardSelectionChages').click(function () {
      $('#stylesSelectionBox').modal('hide');
    });
  }
});

