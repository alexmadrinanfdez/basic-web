function x2(n, i, x1, r) { return x1 + r * Math.sin(2 * Math.PI * n / i); };
function y2(n, i, y1, r) { return y1 - r * Math.cos(2 * Math.PI * n / i); };

(function () {
    function show_time() {
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        document.getElementById("txt").textContent = h + ":" + m + ":" + s;
        document.getElementById("sec").setAttribute("x2", x2(s, 60, 100, 50));
        document.getElementById("sec").setAttribute("y2", y2(s, 60, 70, 50));
        document.getElementById("min").setAttribute("x2", x2(m, 60, 100, 40))
        document.getElementById("min").setAttribute("y2", y2(m, 60, 70, 40))
        document.getElementById("hou").setAttribute("x2", x2(h, 12, 100, 30))
        document.getElementById("hou").setAttribute("y2", y2(h, 12, 70, 30))
    }
    setInterval(function () { show_time(); }, 1000);
    show_time();
})();