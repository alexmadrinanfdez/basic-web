function init(x, y) {
    timer = setInterval(function() {
        doAnim(x, y);
    }, 1000);
}

function doAnim(x, y) {
    var d = new Date();
    var h = (d.getHours() * 30) + (d.getMinutes() / 2);
    var m = d.getMinutes() * 6;
    var s = d.getSeconds() * 6;
    document.getElementById("hou").setAttribute("transform", "rotate(" + [h, x, y].join(" ") + ")");
    document.getElementById("min").setAttribute("transform", "rotate(" + [m, x, y].join(" ")  + ")");
    document.getElementById("sec").setAttribute("transform", "rotate(" + [s, x, y].join(" ")  + ")");
}