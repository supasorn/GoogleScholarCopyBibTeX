$(document).ready(function() {
  $("a:contains('BibTeX')").click(function(e) {
    var $a = $(this);
    chrome.runtime.sendMessage( {url: this.href}, bib => {
      clipboard.copy(bib);
      $a.html("Copied");
      setTimeout(function() {$a.html("Copy BibTeX")}, 1000);
    });

    //$.get(this.href, function(data) {
      //clipboard.copy(data);
      //$a.html("Copied");
      //setTimeout(function() {$a.html("Copy BibTeX")}, 1000);
    //});
    e.preventDefault();
  }).html("Copy BibTeX");
});
