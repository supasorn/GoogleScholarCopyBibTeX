$(document).ready(function() {
  $("a:contains('BibTeX')").click(function(e) {
    var $a = $(this);
    chrome.runtime.sendMessage({ url: this.href }, bib => {
      clipboard.copy(bib);
      $a.html("Copied");
      setTimeout(function() { $a.html("Copy BibTeX") }, 1000);
    });

    //$.get(this.href, function(data) {
    //clipboard.copy(data);
    //$a.html("Copied");
    //setTimeout(function() {$a.html("Copy BibTeX")}, 1000);
    //});
    e.preventDefault();
  }).html("Copy BibTeX");
  $("cite").each(function() {

    // check if this is a link to arxix, by checking its text contains "arxiv.org"
    // if it is, then add a link to the pdf
    // if it is not, then add a link to the google scholar page
    var $cite = $(this);
    var text = $cite.text();

    var arxiv = text.indexOf("arxiv.org") >= 0;

    // let gscholar = '<img style="display:inline" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACYElEQVR4AWIY0gBQfDkAyRGEUXiLQRmxy4rtnMqxUYxt23ZSim3btm2ercHu9PW9m//Mrt7pubuueuve902/NwIQQCoXc8OLqasuePU5u74aSRqbXpZbXfF/PD82bKehBSzX0Gr0A/Rf8kr7Ga6fBVC5tM1rv/zNPndbrxtkngNACpj82Hz0IeEHgAalZd7p9AuWGLRSSyPjwgCk1mMe8p2X/qUACHbVXPdiDOWdY1oSQI6oF8k6m+d63pIAol4o5C0PIOiFYt6SAIJeKOYtCSDshVLeCgDiXojzVgYQ9wJAwJkXLFmctwKAuBcBmQCX3rCk4JUakzEcsM3EjCMW5hxnmHnUAmnOMR+m7U9Gz8WfpADajn2QdvxuRDJ550bw/j//1GOjXmL5QlZqWYa2+YwSRN9NP5CC9hMel2geNOWJ/vxL0vecCAqUMCKJHx6z10wtznzOcTKR0+xjJtoVAzFk+ZvU/9HGGeHByWth1PYbvgJ7wqyj0uY5opUoYL5433ddN/kc2QNRx4tvWCL1YiBl7gCA5vRY9Altxj5glLffJygA9d6H8i+zj1lcbCbQwWRu5/2V/svp+WDQ8WdI2fsAcKJjT9NTAAxUORvO2v8IPqcAB+y5AGaqAEw9oA4wWQWg/4nnSHYKQHMB9FUBqPbkJ0ynAE9/wQRQ1aMyYlLwYO9DcH/NaY49954bl2VNH/+A7i+AvXI6gEYeNwbjmHL5HTRZc/qtxTHB4+awOCbTSojioO9oywXmynE0sXO9T+Wihu9/BItEr+kzyhxA47K4Patqq5+tydnqq9D28h0Zey1R75tnUSAAAAAASUVORK5CYII=" style="height:18px;width:18px" alt="" data-atf="1" data-frt="0">'
    let gscholar = `<span style="display: inline-block; 
    background: no-repeat url('https://scholar.google.com/intl/en/scholar/images/1x/sprite_20161020.png');
    background-position: -69px -253px;
    background-size: 169px;
    width: 21px;
    height: 21px;
    opacity: 0.5;
      "></span>`
    let ar = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEVHcEyzrKWzrKWzrKWzFxqztKyzrqezGiGzsqqzVlazrKWzICWzHySzICWzfnqzQEGzVVSzICWzrKWzICWzrKWztKyzICWzHyWzrKWzFRyzDBazdHLQctjgAAAAHHRSTlMAJLQ4RUplWf4F390qH6aI/uyItdHpOf/////+LRR0ngAAAGtJREFUGJVlj1kOgCAQQ4uIgCuuM+D976nGhEX7M5mXtGkB2AGlNNUfsr5EtJF0pAHJVQSWSCveMlPv/bkXMWPwU/435gxPTgJsnNeFxXBhGYIzbDNAVDecet3FDkClYnbun6N4+WySLPDXBVpABFvIyeFvAAAAAElFTkSuQmCC" data-deferred="1" jsaction="error:trigger.Ci0Ntd" alt="" data-sz="16" data-iml="756.9000000953674" data-atf="true">`
    // console.log($cite);
    if (arxiv) {
      // var arxivNum = text.match(/(\d{4}\.\d{4,5})/)[0];
      // $cite.html(`<a href="https://arxiv.org/pdf/${arxivNum}.pdf">${text}</a>`);
      let a = $(this).closest("a");
      if (a.attr("href")) {
        let link = a.find("h3");

        link.html(link.html() + `<a href="https://scholar.google.com/scholar?hl=en&q=${link.text()}">${gscholar}</a><a href="${a.attr("href").replace("arxiv.org", "ar5iv.org")}">${ar}</a>`);
        // console.log(a.attr("href"));
        // console.log(text);
      }
    }
    // else if (google) {
    // var title = text.match(/\[PDF\]\s(.*)/)[1];
    // $cite.html(`<a href="https://scholar.google.com/scholar?hl=en&q=${title}">${text}</a>`);
    // }
  });
});
