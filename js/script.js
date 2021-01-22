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
    setTimeout(updateTime, 1);
}

setTimeout(updateTime, 1);