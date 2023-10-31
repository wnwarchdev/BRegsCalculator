import { jsPDF } from "jspdf";

`use strict`;

//ADD DATE

const now = new Date().toISOString().substring(0, 10);
document.getElementById("dateLine").value = now;

//ADD BUTTONS

const calcButton = document.getElementById("calcButton");
const pdfButton = document.getElementById("pdfButton");

const urinalCheck = document.getElementById("urinalCheck");
const separateCheck = document.getElementById("separateCheck");
const controlsDiv = document.getElementById("controls");

const maleRatioAtt = document.getElementById("maleRatio");
const femaleRatioAtt = document.getElementById("femaleRatio");
const occNumAtt = document.getElementById("occNum");
const resultParagraph = document.getElementById("resultsPara");
const arrangeParagraphMale = document.getElementById("arrangeMale");
const arrangeParagraphFemale = document.getElementById("arrangeFemale");

const descFirstLine = document.getElementById("firstLine");
const descSecondLine = document.getElementById("secondLine");
const descAuthorLine = document.getElementById("authorLine");
const descDateLine = document.getElementById("dateLine");
const descriptionDiv = document.getElementById("description");
const descriptionParagraph = document.getElementById("descriptionPara");

//ADD OCCUPANCYCALCULATOR

let occupancy;
occupancy = 100;

//ADD MALENUM AND FEMALENUM VARIABLES

let maleNum;
let femaleNum;
let maleRatio;
let femaleRatio;
let maleToilet;
let femaleToilet;
let maleWashbasin;
let femaleWashbasin;
let maleUrinal;
let uriBool = false;
let sepBool = false;

let defaultRatio = 60;
maleRatio = defaultRatio;
femaleRatio = defaultRatio;

function calcItems(num, uri) {
  let result;

  if (uri == true) {
    result =
      num <= 15
        ? [1, 1, 1]
        : num <= 30
        ? [2, 1, 2]
        : num <= 45
        ? [2, 2, 2]
        : num <= 60
        ? [3, 2, 3]
        : num <= 75
        ? [3, 3, 3]
        : num <= 90
        ? [4, 3, 4]
        : num <= 100
        ? [4, 4, 4]
        : [4, 4 + Math.ceil((num - 100) / 50), 4 + Math.ceil((num - 100) / 50)];
  } else {
    result =
      num <= 5
        ? [1, 0, 1]
        : num <= 15
        ? [2, 0, 2]
        : num <= 30
        ? [3, 0, 3]
        : num <= 45
        ? [4, 0, 4]
        : num <= 60
        ? [5, 0, 5]
        : num <= 75
        ? [6, 0, 6]
        : num <= 90
        ? [7, 0, 7]
        : num <= 100
        ? [8, 0, 8]
        : [8 + Math.ceil((num - 100) / 25), 0, 8 + Math.ceil((num - 100) / 25)];
  }
  return result;
}

function runDesc() {
  descriptionParagraph.innerHTML = null;
  descriptionParagraph.innerHTML = `<p class='rightMargin' >${now}</p><p>Description line 01</p><p>Description line 01</p><p>calculations by: Author</p>`;
}

function runCalcs() {
  maleRatio = maleRatioAtt.value;
  femaleRatio = femaleRatioAtt.value;
  occupancy = occNumAtt.value;
  maleNum = Math.ceil((occupancy * maleRatio) / 100);
  femaleNum = Math.ceil((occupancy * femaleRatio) / 100);
  maleToilet = calcItems(maleNum, uriBool)[0];
  maleUrinal = calcItems(maleNum, uriBool)[1];
  femaleToilet = calcItems(femaleNum)[0];
  maleWashbasin = calcItems(maleNum, uriBool)[2];
  femaleWashbasin = calcItems(femaleNum)[2];

  resultParagraph.innerHTML = null;
  resultParagraph.innerHTML = `
  <p>For ${occupancy} occupants, at ${maleRatio}/${femaleRatio} ratio male occupancy number is: ${maleNum} and female occupancy number is: ${femaleNum}</p>
  <p> Toilet provision based on BS 6465 part1 March 2006, (paragraph 6.4.1, table-${
    uriBool == false ? `3` : `4`
  } ):
    ${
      uriBool == false
        ? `<p>• Male toilet requires ${maleToilet} WCs and ${maleWashbasin} washbasins</p>`
        : `<p>• Male toilet requires ${maleToilet} WCs, ${maleUrinal} urinals and ${maleWashbasin} washbasins</p>`
    }
    <p>• Female toilet requires ${femaleToilet} WCs and ${femaleWashbasin} washbasins</p><br>`;

  arrangeParagraphMale.innerHTML = null;
  arrangeParagraphFemale.innerHTML = null;
  arrangeParagraphMale.innerHTML = arranger(maleToilet, sepBool, "Male");
  arrangeParagraphFemale.innerHTML = arranger(femaleToilet, sepBool, "Female");
}

function arranger(number, disSep, sex) {
  let arrangement = `<p>${sex} WC cubicle types: <p>`;
  let iterations = number <= 6 ? number : 6;
  //console.log(iterations);
  for (let i = 1; i <= iterations; i++) {
    if (disSep == false) {
      arrangement = arrangement.concat(`<p>cubicle ${i}`);
      arrangement =
        i == 1
          ? arrangement.concat(`: disabled accessible toilet</p> `)
          : i == 2
          ? arrangement.concat(`: ambulant disabled</p> `)
          : i == 3
          ? arrangement.concat(`: normal cubicle</p> `)
          : i == 4
          ? arrangement.concat(`: enlarged cubicle</p> `)
          : i == 5
          ? arrangement.concat(`: normal cubicle</p> `)
          : arrangement.concat(
              number == 6
                ? `: normal cubicle</p> `
                : ` to ${number}: normal cubicle</p> `,
            );
    } else {
      console.log(i);
      arrangement =
        i == 1
          ? arrangement.concat(`<p>separate`)
          : arrangement.concat(`<p>cubicle ${i - 1}`);
      arrangement =
        i == 1
          ? arrangement.concat(`: disabled accessible toilet</p> `)
          : i == 2
          ? arrangement.concat(`: ambulant disabled</p> `)
          : i == 3
          ? arrangement.concat(`: normal cubicle</p> `)
          : i == 4
          ? arrangement.concat(`: normal cubicle</p> `)
          : i == 5
          ? arrangement.concat(`: enlarged cubicle</p> `)
          : arrangement.concat(
              number == 6
                ? `: normal cubicle</p> `
                : ` to ${number}: normal cubicle</p> `,
            );
    }
  }
  return arrangement;
}

urinalCheck.addEventListener("change", function (event) {
  event.preventDefault();
  if (urinalCheck.checked) {
    uriBool = true;
  } else {
    uriBool = false;
  }
  runCalcs();
});

separateCheck.addEventListener("change", function (event) {
  event.preventDefault();
  if (separateCheck.checked) {
    sepBool = true;
  } else {
    sepBool = false;
  }
  runCalcs();
});

controlsDiv.addEventListener("change", (e) => {
  if (e.target.type == "number") {
    runCalcs();
  }
});

descriptionDiv.addEventListener("change", (e) => {
  if (e.target.type == "text" || "date") {
    runDesc();
  }
});

calcButton.addEventListener("click", function (event) {
  event.preventDefault();
  runCalcs();
});

pdfButton.addEventListener("click", function () {
  dateNow();
  const doc = new jsPDF("p", "in", "a4");

  doc.setFontSize(11);
  doc.text(
    `Based on ${occupancy} occupants, at ${maleRatio}/${femaleRatio} ratio:
    male occupancy number is: ${maleNum} and
    female occupancy number is: ${femaleNum}
    ${
      uriBool == false
        ? `male toilet requires ${maleToilet} WCs and ${maleWashbasin} washbasins`
        : `male toilet requires ${maleToilet} WCs, ${maleUrinal} urinals and ${maleWashbasin} washbasins`
    }
    female toilet requires ${femaleToilet} WCs and ${femaleWashbasin} washbasins`,
    1,
    1,
  );
  doc.setDrawColor("black");
  doc.setLineWidth(1 / 72);
  doc.line(0.5, 0.5, 0.5, 11.25);
  doc.line(7.75, 0.5, 7.75, 11.25);
  //doc.save("a4.pdf");
});
