const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.querySelector(".js-range");
const mode = document.querySelector(".js-mode");
const save_btn = document.querySelector(".js-save");

canvas.width = 450;
canvas.height = 450;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 450, 450);

let draw = false;
let fill = false;

function handleMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!draw) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startDraw(event) {
    draw = true;
}

function stopDraw(event) {
    draw = false;
}

function changeColor(event) {
    event.target.classList.add("controls_color_clicked");
    if(fill == false) {
        const bg_color = event.target.style.backgroundColor;
        ctx.strokeStyle = bg_color;
    }
    else {
        ctx.fillStyle = event.target.style.backgroundColor;
        ctx.fillRect(0, 0, 450, 450);
    }
    setTimeout(function() {
        event.target.classList.remove("controls_color_clicked");
    }, 250);
}

function handleRangeChange(event) {
    const changed_range = event.target.value;
    ctx.lineWidth = changed_range;
}

function handleModeChange(event) {
    if(fill == false) {
        fill = true;
        mode.innerText = "Draw";
    }
    else {
        fill = false;
        mode.innerText = "Fill";
    }
}

function handleSave(event) {
    const img = canvas.toDataURL("img/png")
    const link = document.createElement("a");
    link.href = img;
    link.download = "1.png";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
}

if(colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
}

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) { 
    mode.addEventListener("click", handleModeChange);
}

if(save_btn) {
    save_btn.addEventListener("click", handleSave);
}