// todo
//   jQuery Dialog for warnings/errors?
//   jQuery Progressbar?

$(document).ready(function(){
  setupDatePickers();
  setupButtons();
  //requestData();
});


function setupDatePickers() {
  var dates = $("input#fromDateExt,input#toDateExt").datepicker({
    defaultDate: new Date(),
    minDate: new Date(2010, 9, 26),
    maxDate: new Date(2011, 5, 12),
    altFormat: "yymmdd",
    autoSize: true,
    showAnim: 'fade',
    duration: 'slow',
    onSelect: function (selectedDate) {
      var option = this.id == "fromDateExt" ? "minDate" : "maxDate",
        instance = $(this).data( "datepicker" ),
        date = $.datepicker.parseDate(
          instance.settings.dateFormat ||
          $.datepicker._defaults.dateFormat,
          selectedDate, instance.settings );
      dates.not( this ).datepicker( "option", option, date );
    }
  });
  $("input#fromDateExt").datepicker( "option", "altField", "input#fromDateInt" );
  $("input#toDateExt").datepicker( "option", "altField", "input#toDateInt" );
}

function setupButtons() {
  $("input:submit").button();
  $("input:submit").click(function() {
    var fromDate = $("input#fromDateInt").val();
    var toDate   = $("input#toDateInt"  ).val();
    // assert that if toDate is set, fromDate must be set too
    requestData(fromDate,toDate);
  });
}

function requestData (fromDate, toDate) {
  // arguments are optional
  // assert that fromDate and toDate follow valid format if specified
  // standard way to pass js arguments

  $("p#status").html("Updating");

  // url = "players.json?...
  // don't pass parameters if dates aren't specified
  url = "data.json?fromDate=" + fromDate + "&toDate=" + toDate;

  $.getJSON(url,function (data) {
    // assert that oXmlHttp.getResponseHeader("Content-Type") contains "application/json"
    // add error checking to determine if json data is valid
    // error/warning if status != 200
    //   $("p#status").html("An error occurred while updating (statusText = '" + oXmlHttp.statusText + "')");
    fillTable(data);
    $("p#status").html("&nbsp;");
  });
}

function fillTable (oJsonData) {
  // add error checking to determine if json data is valid

  table = "\n  <table border=1>\n";
  // row of table headers go here

  $.each(oJsonData, function(index, value) {
    var bse = value["box_score_entry"];
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

  $("div#table").html(table);
}
