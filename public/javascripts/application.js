// todo
//   jQuery Dialog for warnings/errors
//   jQuery Progressbar?

window.onload = function () {
  setupDatePickers();
  setupButtons();
  requestData();
}

function setupDatePickers() {
  var dates = $( "#fromDateExt, #toDateExt" ).datepicker({
    defaultDate: new Date(),
    minDate: new Date(2010, 9, 26),
    maxDate: new Date(2011, 5, 12),
    altFormat: "yymmdd",
    autoSize: true,
    showAnim: 'fade',
    duration: 'slow',
    onSelect: function( selectedDate ) {
      var option = this.id == "fromDateExt" ? "minDate" : "maxDate",
        instance = $( this ).data( "datepicker" ),
        date = $.datepicker.parseDate(
          instance.settings.dateFormat ||
          $.datepicker._defaults.dateFormat,
          selectedDate, instance.settings );
      dates.not( this ).datepicker( "option", option, date );
    }
  });
  $( "#fromDateExt" ).datepicker( "option", "altField", "#fromDateInt" );
  $( "#toDateExt" ).datepicker( "option", "altField", "#toDateInt" );
}

function setupButtons() {
  $( "input:submit" ).button();
  $( "input:submit" ).click(function() {
    fromDate = document.getElementById("fromDateInt").value;
    toDate   = document.getElementById("toDateInt"  ).value;

    // assert that if toDate is set, fromDate must be set too

    requestData(fromDate,toDate);
  });
}

function requestData (fromDate, toDate) {
  // arguments are optional
  // assert that fromDate and toDate follow valid format

  document.getElementById("status").innerHTML = "Updating";

// use jquery ajax to make XMLHttpRequest

  var oXmlHttp = new XMLHttpRequest();

// build url based on fromDate and toDate
// "players.json?fromDate=20110607&toDate=20110607"
  url = "data.json?fromDate=20110607&toDate=20110607"

  oXmlHttp.open("GET", url, true);
  oXmlHttp.onreadystatechange = function () {
    if (oXmlHttp.readyState == 4) {
      if (oXmlHttp.status == 200) {
        // assert that oXmlHttp.getResponseHeader("Content-Type") contains "application/json"
        fillTable(oXmlHttp.responseText);
        document.getElementById("status").innerHTML = "&nbsp;";
      } else {
        document.getElementById("status").innerHTML = "An error occurred while updating (statusText = '" + oXmlHttp.statusText + "')";
      }
    }
  };
  oXmlHttp.send(null);
}

function fillTable (sJsonData) {
// validate json data passed
  var table = "  <table border=1>\n";
// row of table headers
  JSON.parse(sJsonData).forEach ( function (element, index, array ) {
    var bse = element["box_score_entry"];
    table += "    <tr>\n";
    table += "      <td>" + bse.id + "</td>\n";
    table += "      <td>" + bse.espn_id + "</td>\n";
    table += "      <td>" + bse.fname + "</td>\n";
    table += "      <td>" + bse.lname + "</td>\n";
    table += "      <td>" + bse.team + "</td>\n";
    table += "      <td>" + bse.pos + "</td>\n";
    table += "      <td>" + bse.min + "</td>\n";
    table += "      <td>" + bse.fgm + "</td>\n";
    table += "      <td>" + bse.fga + "</td>\n";
    table += "      <td>" + bse.tpm + "</td>\n";
    table += "      <td>" + bse.tpa + "</td>\n";
    table += "      <td>" + bse.ftm + "</td>\n";
    table += "      <td>" + bse.fta + "</td>\n";
    table += "      <td>" + bse.oreb + "</td>\n";
    table += "      <td>" + bse.dreb + "</td>\n";
    table += "      <td>" + bse.reb + "</td>\n";
    table += "      <td>" + bse.ast + "</td>\n";
    table += "      <td>" + bse.stl + "</td>\n";
    table += "      <td>" + bse.blk + "</td>\n";
    table += "      <td>" + bse.to + "</td>\n";
    table += "      <td>" + bse.pf + "</td>\n";
    table += "      <td>" + bse.plusminus + "</td>\n";
    table += "      <td>" + bse.pts + "</td>\n";
    table += "      <td>" + bse.verified + "</td>\n";
    table += "      <td>" + bse.created_at + "</td>\n";
    table += "      <td>" + bse.updated_at + "</td>\n";
    table += "    </tr>\n";
  });
  table += "  </table>\n";
  document.getElementById("table").innerHTML = table
}
