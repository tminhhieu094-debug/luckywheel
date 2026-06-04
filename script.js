const STORAGE_KEY="wheel_data";

let items=
JSON.parse(localStorage.getItem(STORAGE_KEY))
||
[
{text:"10K",color:"#E9D27B"},
{text:"20K",color:"#F0C165"},
{text:"50K",color:"#ED7E2F"},
{text:"100K",color:"#7C3AED"},
{text:"200K",color:"#D7A7C8"},
{text:"500K",color:"#D96EA5"}
];

const canvas=document.getElementById("wheel");
const ctx=canvas.getContext("2d");

const radius=350;

let currentRotation=0;
let spinning=false;

function save(){
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(items)
);
}

function drawWheel(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

const arc=
Math.PI*2/items.length;

for(let i=0;i<items.length;i++){

let start=i*arc;

ctx.beginPath();

ctx.moveTo(radius,radius);

ctx.arc(
radius,
radius,
radius,
start,
start+arc
);

ctx.fillStyle=
items[i].color;

ctx.fill();

ctx.save();

ctx.translate(radius,radius);

ctx.rotate(start+arc/2);

ctx.fillStyle="white";
ctx.font="bold 22px Arial";
ctx.textAlign="right";

ctx.fillText(
items[i].text,
radius-50,
10
);

ctx.restore();
}

ctx.beginPath();

ctx.arc(
radius,
radius,
45,
0,
Math.PI*2
);

ctx.fillStyle="#5f8df7";
ctx.fill();

ctx.beginPath();

ctx.arc(
radius,
radius,
18,
0,
Math.PI*2
);

ctx.fillStyle="#fff";
ctx.fill();
}

drawWheel();

function renderList(){

const list=
document.getElementById("itemList");

list.innerHTML="";

items.forEach((item,index)=>{

let div=
document.createElement("div");

div.className="item";

div.style.background=
item.color;

div.innerHTML=`
<span>${item.text}</span>
<button onclick="removeItem(${index})">
X
</button>
`;

list.appendChild(div);

});
}

renderList();

function removeItem(index){

items.splice(index,1);

save();

renderList();

drawWheel();
}

document
.getElementById("addBtn")
.onclick=()=>{

const text=
document
.getElementById("newText")
.value;

const color=
document
.getElementById("newColor")
.value;

if(!text) return;

items.push({
text,
color
});

save();

renderList();

drawWheel();
};

function spin(){

if(spinning) return;

spinning=true;

let random=
Math.random()*360;

let final=
currentRotation+
360*8+
random;

canvas.style.transition=
"transform 6s cubic-bezier(.15,.85,.12,1)";

canvas.style.transform=
`rotate(${final}deg)`;

const tick=
setInterval(()=>{

// Tick sound
// new Audio("sounds/tick.mp3").play();

},100);

setTimeout(()=>{

clearInterval(tick);

let sector=
360/items.length;

let angle=
final%360;

let index=
Math.floor(
((360-angle)+sector/2)
/sector
)%items.length;

showResult(
items[index].text
);

currentRotation=
final;

spinning=false;

},6000);
}

document
.getElementById("spinBtn")
.onclick=spin;

function showResult(text){

document
.getElementById("resultText")
.innerText=text;

document
.getElementById("resultModal")
.style.display="flex";

confetti({
particleCount:250,
spread:180,
origin:{y:.6}
});
}

function closeModal(){

document
.getElementById("resultModal")
.style.display="none";
}
