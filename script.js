$(document).ready(function() {
  $("a:contains('BibTeX')").click(function(e) {
    var $a = $(this);
    $.get(this.href, function(data) {
      clipboard.copy(data);
      $a.html("Copied");
      setTimeout(function() {$a.html("Copy BibTeX")}, 1000);
    });
    e.preventDefault();
  }).html("Copy BibTeX");
});
