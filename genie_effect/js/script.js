var duration = 1000;

$(document).ready(function() {
    var ctx;

    var c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    Icon.draw(c, ctx);
    Window.draw(c, ctx);
});