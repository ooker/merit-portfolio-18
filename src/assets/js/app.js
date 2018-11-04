
import $ from 'jquery';
//import whatInput from 'what-input';

window.$ = $;

/*
import Foundation from 'foundation-sites';
*/
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

$(document).foundation();


$(".m-card").on("click", function(e){
    e.preventDefault();
    var file = $(this).data("file");
    //console.log("file: " + file);
    $(this).addClass("m-card--clicked");
    //$.ajax("assets/content/"+file).done(function(content){
    $.ajax("content/"+file).done(function(content){
        $('#m-card__modalContent').html(content);
        $('#m-card__modal').foundation('open');
      
        if( $(".m-image-reveal__trigger").length > -1 ) {
            galleryEvents();
        }
    });
});

function galleryEvents(){
    $(".m-image-reveal__trigger").on("click", function(e){
        e.preventDefault();
        //console.log("gallery click");
        var file = $(this).attr("href");
        var loadingImage = new Image();
        loadingImage.onload = function(){
            $('#m-img__modalContent').empty().append(loadingImage);
            $('#m-img__modal').foundation('open');
        };
        loadingImage.src = file;
    });
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function() {

    $(window).on( 'open.zf.reveal', function () {
        /*if( $(".m-image-reveal__trigger").length > -1 ) {
            galleryEvents();
        }*/
    });


    var query = getParameterByName("open");
    var pages = [
      "cv",
      "eneseanalyys",
      "oppijate-tyybid",
      "videod-oppetoost",
      "taiendkoolitused",
      "opetajate-vorgustik",
      "oppevara",
      "opilassaavutused",
      "haridusprojektid",
      "toodokumentatsioon",
      "meedia",
      "koolitustoo",
      "pedagoogiline-mote",
      "toendusmaterjalid",
      "opikeskkond",
      "logiraamat",
      "isiklikud-saavutused",
      "kogukonnategevus-ja-hobid"
    ];

    if(query){
        if($.inArray(query, pages) > -1){
            $.ajax("content/"+query+".html").done(function(content){
                $('#m-card__modalContent').html(content);
                $('#m-card__modal').foundation('open');
            });
        }
    }
});
