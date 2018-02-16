$(document).ready(function(){
  var searchGamesClicked = function(e){
    e.preventDefault();
    var gameInput = $("#searchInput").val();
    console.log(gameInput);
    var myurl = "https://cors-anywhere.herokuapp.com/http://www.boardgamegeek.com/xmlapi/search?search=" + gameInput;
    $.ajax({
      url: myurl,
      dataType: "xml",
      success : function(xml){
        console.log(xml);
        var results = "";
        var num_of_results = xml.firstChild.childElementCount;
        if(num_of_results === 0){
          results = "<div class=\"failedSearch\"><h1>Sad Day :( no games match your search</h1></div>";
        }
        else{
          results = "<div class=\"successSearch\"><h1>" + num_of_results + " Results:</h1><ul>";
        }
        var firstResult = xml.firstChild.firstElementChild;
        var sibling = firstResult;
        //console.log(sibling.getAttribute("objectid"));
        for(var i = 0; i < num_of_results; i++){
          var item = "";
          item += "<li><h3>" + sibling.firstElementChild.firstChild.nodeValue + ": published in " + sibling.lastElementChild.firstChild.nodeValue + "</h3></li>";
          results += item;
          sibling = sibling.nextElementSibling;
        }
        results += "</ul>"
        $("#search-results").html(results);
      }});
  };
  $("#searchButton").click(searchGamesClicked);




});
