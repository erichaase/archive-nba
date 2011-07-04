window.onload = function () {
  requestData();
}

function requestData() {
  var oXmlHttp = new XMLHttpRequest();
  url = "data.json?fromDate=20110607&toDate=20110607"
  oXmlHttp.open("GET", url, true);
  oXmlHttp.onreadystatechange = function () {
    if (oXmlHttp.readyState == 4) {
      fillTable(oXmlHttp, document.getElementById("table"));
    }
  };
  oXmlHttp.send(null);
}

function fillTable (oXmlHttp, divTable) {
  if (oXmlHttp.status == 200) {
    // assert that oXmlHttp.getResponseHeader("Content-Type") contains "application/json"

    table = "  <table border=1>\n";
    JSON.parse(oXmlHttp.responseText).forEach ( function (element, index, array ) {
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
    divTable.innerHTML = table

  } else {
    divTable.innerHTML = "An error occurred: " + oXmlHttp.statusText;
  }
}
