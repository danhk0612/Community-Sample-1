function menuToggle() {
    $("#left-side").toggleClass("mini-left");
    $("#small-side").toggle();
    $("#big-side").toggle();
    $("#site-name").toggle();
}

function thumResize() {
    var windowWidth = $(".thumbnail img").width();
    $(".thumbnail img").height(windowWidth*0.66);
}

$("#menu-de-expand").click(function () {
    menuToggle();
});

$(document).ready(function(){
    // var windowWidth = $(window).width();
    var windowWidth = $("#main").width();
    if (windowWidth < 800) {
        $("#left-side").addClass("mini-left");
        $("#small-side").show();
        $("#big-side").hide();
        $("#site-name").hide();
    }
    thumResize();
});

$(window).resize(function () {
    thumResize();
});