window.onload = function () {
  var oXmlHttp = new XMLHttpRequest();
  oXmlHttp.open("GET", "data.json?fromDate=20110607&toDate=20110607", true);
  //oXmlHttp.setRequestHeader("fromDate","20110607");
  //oXmlHttp.setRequestHeader("toDate","20110607");
  oXmlHttp.onreadystatechange = function () {
    if (oXmlHttp.readyState == 4) {
      var divCustomerInfo = document.getElementById("data");
      if (oXmlHttp.status == 200) {
        var sContentType = oXmlHttp.getResponseHeader("Content-Type");
        divCustomerInfo.innerHTML = "'" + sContentType + "' data returned: " + oXmlHttp.responseText;
      } else {
        divCustomerInfo.innerHTML = "An error occurred: " + oXmlHttp.statusText;
      }
    }
  };
  oXmlHttp.send(null);
}
