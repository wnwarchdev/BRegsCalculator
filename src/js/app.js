import { jsPDF } from "jspdf";

`use strict`;

//ADD DATE

const now = new Date().toISOString().substring(0, 10);
document.getElementById("dateLine").value = now;

//ADD BUTTONS

const resetButton = document.getElementById("resetButton");
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

const firstLine = document.getElementById("firstLine");
const secondLine = document.getElementById("secondLine");
const authorLine = document.getElementById("authorLine");
const dateLine = document.getElementById("dateLine");
const descriptionDiv = document.getElementById("description");
const descriptionParagraph = document.getElementById("descriptionPara");
const dateLineDesc = document.getElementById("dateLineDesc");
const descriptionToggle = document.getElementById("descriptionToggle");

const firstLineCheck = document.getElementById("firstLineCheck");
const secondLineCheck = document.getElementById("secondLineCheck");
const authorLineCheck = document.getElementById("authorLineCheck");
const dateLineCheck = document.getElementById("dateLineCheck");

//ADD OCCUPANCYCALCULATOR

let occupancy;
occupancy = 0;

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
let date;
let line01;
let line02;
let author;

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

function dateFormat(isoDate) {
  console.log(isoDate);
  date = `${isoDate.slice(8, 10)}-${isoDate.slice(5, 7)}-${isoDate.slice(
    0,
    4,
  )}`;
  console.log(date);
  return date;
}

dateLineDesc.innerHTML = `<p>${dateFormat(now)}</p>`;

function runDesc(checkbox) {
  let checkboxDiv = document.getElementById(`${checkbox.id.slice(0, -5)}Desc`);
  let checkboxLine = document.getElementById(`${checkbox.id.slice(0, -5)}`);

  if (checkbox.checked == true) {
    checkboxLine.removeAttribute(`disabled`);
    checkboxDiv.setAttribute(`style`, `display:block`);
  } else {
    checkboxLine.setAttribute(`disabled`, ``);
    checkboxDiv.setAttribute(`style`, `display:none`);
  }
}

function runLine(line) {
  let lineDiv = document.getElementById(`${line.id}Desc`);
  lineDiv.innerHTML = null;
  line.id == `dateLine`
    ? (lineDiv.innerHTML = `<p>${dateFormat(line.value)}</p>`)
    : (lineDiv.innerHTML = `<p>${line.value}</p>`);
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
  <p>For <b>${occupancy}</b> occupants, at ${maleRatio}/${femaleRatio} ratio male occupancy number is: ${maleNum} and female occupancy number is: ${femaleNum}</p>
  <p> Toilet provision based on BS 6465 part1 March 2006, (paragraph 6.4.1, table-${
    uriBool == false ? `3` : `4`
  } ):
    ${
      uriBool == false
        ? `<p>• <b>Male</b> toilet requires <b>${maleToilet} WCs</b> and <b>${maleWashbasin} washbasins</b></p>`
        : `<p>• <b>Male</b> toilet requires <b>${maleToilet} WCs</b>, <b>${maleUrinal} urinals</b> and <b>${maleWashbasin} washbasins</b></p>`
    }
    <p>• <b>Female</b> toilet requires <b>${femaleToilet} WCs</b> and <b>${femaleWashbasin} washbasins</b></p><br>`;

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
          ? arrangement.concat(`: DDA toilet</p> `)
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
          ? arrangement.concat(`: DDA toilet</p> `)
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
  if (e.target.type == "checkbox") {
    runDesc(e.target);
  } else if (e.target.type == "text" || "date") {
    runLine(e.target);
  }
});

descriptionDiv.addEventListener("keyup", (e) => {
  runLine(e.target);
});

descriptionToggle.addEventListener("click", (e) => {
  console.log(`clicked`);
  descriptionDiv.setAttribute("style", "display:block !important");
});

//RESET BUTTON
resetButton.addEventListener("click", function (event) {
  event.preventDefault();
  location.reload();
});

pdfButton.addEventListener("click", function () {
  const doc = new jsPDF("p", "in", "a4");
  // console.log(descriptionParagraph.innerHTML);
  // console.log(resultParagraph.innerHTML);
  doc.setFontSize(11);
  doc.text(`${dateLineCheck.checked ? date : ``}`, 7.5, 1, { align: "right" });
  doc.text(
    `
    ${firstLineCheck.checked ? `Line 01` : ``}
    ${secondLineCheck.checked ? `Line 02` : ``}
    ${authorLineCheck.checked ? `Author` : ``} 


    For ${occupancy} occupants, at ${maleRatio} male / ${femaleRatio} female ratio:
    male occupancy number is: ${maleNum}
    female occupancy number is: ${femaleNum}

    Toilet provision based on BS 6465 part1 March 2006, (paragraph 6.4.1, table-${
      uriBool == false ? `3` : `4`
    } ):

    ${
      uriBool == false
        ? `• Male toilet requires ${maleToilet} WCs and ${maleWashbasin} washbasins`
        : `• Male< toilet requires ${maleToilet} WCs, ${maleUrinal} urinals and ${maleWashbasin} washbasins`
    }
    • Female toilet requires ${femaleToilet} WCs and ${femaleWashbasin} washbasins
    `,
    0.5,
    2.5,
  );

  doc.setDrawColor("black");
  doc.setLineWidth(1 / 72);
  //doc.line(0.5, 0.5, 0.5, 11.25);
  //doc.line(7.75, 0.5, 7.75, 11.25);
  doc.output("dataurlnewwindow");
  //doc.save("a4.pdf");
});
