console.log("hello main page.js");

chrome.runtime.onMessage.addListener((message) => {
  const { action, style, text, clickInfo } = message;
  if (action === "send-to-popup") {
    var kvp = new Map();

    for (var p in clickInfo) {
      if (clickInfo.hasOwnProperty(p)) {
        kvp.set(p, clickInfo[p]);
      }
    }


    var checkBoxes;
    var i = 0;
    for (var [k, v] of kvp) {

      i++;
      var el = `<div class="form-check">
      <input class="form-check-input" type="checkbox" value="${v}" id="checkbox-${k}">
      <label class="form-check-label" for="checkbox-${k}">${k} = ${v} </label>
      </div>`;

      if (checkBoxes)
        checkBoxes = checkBoxes + el;
      else
        checkBoxes = el;
    }


    //Popup a modal here so user can select what styles they care about
    $('#SelectionBoxContent').html(checkBoxes);
    $('#stylesSelectionBox').modal('show');


    $('#saveSelectionChanges').unbind('click').click(function () {
      var rules = null;
      var index = 0;
      $('#SelectionBoxContent input[type=checkbox]:checked').each(function () {
        var checkBoxId = $(this).attr('id');
        var checkBoxValue = $(this).val();

        if (checkBoxId)
          checkBoxId = checkBoxId.substring(9);//remove checkbox- from id
        index++;
        var temp = `<tr>
          <td><input type="checkbox"></td>
          <td>${index}</td>
          <td>something here</td>
          <td>https://wwww.abc.com/?q=100&v=a</td>
        </tr>`;
        rules = rules + temp;
        console.log(`style = ${checkBoxId}, value = ${checkBoxValue}`);

      });

      $('#stylesSelectionBox').modal('hide');

      if (rules)
        $('#validationRulesTable').html(rules);
    });


    //Discard styles selection
    $('#discardSelectionChages').unbind('click').click(function () {
      $('#stylesSelectionBox').modal('hide');
    });
  }
});