function updateTime() {
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    hours = hours.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    mins = mins.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    secs = secs.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    $("#date").text(`${hours}:${mins}:${secs}`);
}

function updateVolume() {
    $(".volume-indicator-inner").text($("#slider").val());
}

function main() {
    updateTime();
    updateVolume();
    setTimeout(main, 1);
}

$(document).ready(function() {
    $(".group-content").hide();
    $(".group-content").css("opacity", 0);
    $(".group-content").each(function() {
        $(this).css("transform", "translateX(" + -$(this).width() + "px)");
    });
    
    $(".app-group").hover(function() {
        let x = $(this).find(".group-content");

        $(this).find(".group-content-clipper").width(x.width());

        x.show();
        
        x.css("opacity", 1);
        x.css("transform", "translateX(0)");

    }, function() {
        let x = $(this).find(".group-content");

        x.css("opacity", 0);
        x.css("transform", "translateX(" + -x.width() + "px)");
        $(this).find(".group-content-clipper").width(0);

        setTimeout(function() {
            x.hide();
        }, 500);
    });
});

main();