(function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    document.querySelector("h1").textContent = `${hours}:${minutes}:${seconds}`;

    document.querySelectorAll(".clock").forEach(clock => {
        const frame = clock.querySelector(".frame");
        const hourHand = clock.querySelector(".hour-hand");
        const minuteHand = clock.querySelector(".minute-hand");
        const secondHand = clock.querySelector(".second-hand");

        const hourRotation = hours * 30 + minutes / 2; // 360 degrees / 12 hours = 30 degrees per hour
        const minuteRotation = minutes * 6; // 360 degrees / 60 minutes = 6 degrees per minute
        const secondRotation = seconds * 6; // 360 degrees / 60 seconds = 6 degrees per second
        
        const x = frame.getAttribute("cx");
        const y = frame.getAttribute("cy");

        hourHand.setAttribute("transform", `rotate(${hourRotation}, ${x}, ${y})`);
        minuteHand.setAttribute("transform", `rotate(${minuteRotation}, ${x}, ${y})`);
        secondHand.setAttribute("transform", `rotate(${secondRotation}, ${x}, ${y})`);
    })

    setInterval(updateTime, 1000);
})();

// The position of the clock hands is calculated rotating from its center
// Another approach is to calculate the end point of the hands using trigonometry
// xEnd = (n, i, xStart, r) => xStart + r * Math.sin(2 * Math.PI * i / n);
// yEnd = (n, i, yStart, r) => yStart - r * Math.cos(2 * Math.PI * i / n);