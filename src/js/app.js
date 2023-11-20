import { jsPDF } from "jspdf";

`use strict`;

//ADD DATE
const now = new Date().toISOString().substring(0, 10);
document.getElementById("dateLine").value = now;

//CHANGE DATE FORMAT TO EUROPEAN
function dateFormat(isoDate) {
  date = `${isoDate.slice(8, 10)}-${isoDate.slice(5, 7)}-${isoDate.slice(
    0,
    4,
  )}`;
  return date;
}

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
const arrangeParagraphDDA = document.getElementById("arrangeDDA");

const firstLine = document.getElementById("firstLine");
const secondLine = document.getElementById("secondLine");
const authorLine = document.getElementById("authorLine");
const descriptionDiv = document.getElementById("description");
const dateLineDesc = document.getElementById("dateLineDesc");
const descriptionToggle = document.getElementById("descriptionToggle");

const firstLineCheck = document.getElementById("firstLineCheck");
const secondLineCheck = document.getElementById("secondLineCheck");
const authorLineCheck = document.getElementById("authorLineCheck");
const dateLineCheck = document.getElementById("dateLineCheck");

//ADD VARIABLES
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

//SET OCCUPANCY
let occupancy;
occupancy = 100;

//SET RATIO
let defaultRatio = 60;
maleRatio = defaultRatio;
femaleRatio = defaultRatio;

//ADD FUNCTION THAT RETURNS SPECIFIC RESULT BASED ON GIVEN OCCUPANT NUMBER
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
        : [
            4 + Math.ceil((num - 100) / 50),
            4 + Math.ceil((num - 100) / 50),
            4 + Math.ceil((num - 100) / 50),
          ];
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

dateLineDesc.innerHTML = `<p>${dateFormat(now)}</p>`;

//ADD FUNCTION TO CONTROL DESCRIPTION LINES IN DIV
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

//ADD FUNCTION TO ADD DESCRIPTION FROM INPUTS TO DIV
function runLine(line) {
  let lineDiv = document.getElementById(`${line.id}Desc`);
  lineDiv.innerHTML = null;
  line.id == `dateLine`
    ? (lineDiv.innerHTML = `<p>${dateFormat(line.value)}</p>`)
    : (lineDiv.innerHTML = `<p>${line.value}</p>`);
}

//ADD FUNCTION TO INJECT PLURAR SUFFIX TO STRING IF REQUIRED
function pluralForm(number) {
  const result = number == 1 ? `` : `s`;
  return result;
}

//ADD FUNCTION TO CALCULATE GROUP OCCUPANCIES AND PROVIDE RESULT TEXT TO DIV
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
  <p>Disclaimer: Calculations and results are indicative only; To be cross checked with relevant documents</p>
  <br>
  <p>For <b>${occupancy}</b> occupants at a single floor, at ${maleRatio}/${femaleRatio} ratio male occupancy number is: ${maleNum} and female occupancy number is: ${femaleNum}</p>
  <p> Toilet provision based on BS 6465 part1 March 2006, (paragraph 6.4.1, table-${
    uriBool == false ? `3` : `4`
  } ):
    ${
      uriBool == false
        ? `<p>• <b>Male</b> toilet requires <b>${maleToilet} WC${pluralForm(
            maleToilet,
          )}</b> and <b>${maleWashbasin} washbasin${pluralForm(
            maleWashbasin,
          )}</b></p>`
        : `<p>• <b>Male</b> toilet requires <b>${maleToilet} WC${pluralForm(
            maleToilet,
          )}</b>, <b>${maleUrinal} urinal${pluralForm(
            maleUrinal,
          )}</b> and <b>${maleWashbasin} washbasin${pluralForm(
            maleWashbasin,
          )}</b></p>`
    }
    <p>• <b>Female</b> toilet requires <b>${femaleToilet} WC${pluralForm(
      femaleToilet,
    )}</b> and <b>${femaleWashbasin} washbasin${pluralForm(
      femaleWashbasin,
    )}</b></p><br>
    ${
      sepBool == true
        ? `<p>With unisex<b> wheelchair-accessible toilet separated</b>  from the main toilet block(s), required cubicle types are:</p>`
        : `<p>With <b>wheelchair-accessible cubicles included</b> into the same-sex toilet blocks, required cubicle types are:</p>`
    }`;

  arrangeParagraphMale.innerHTML = null;
  arrangeParagraphFemale.innerHTML = null;
  arrangeParagraphMale.innerHTML = arranger(maleToilet, sepBool, "Male");
  arrangeParagraphFemale.innerHTML = arranger(femaleToilet, sepBool, "Female");
  pdfButton.removeAttribute("disabled");
}

//ADD FUNCTION TO PROVIDE TEXT TO TOILET ARRANGEMENT DIVS
function arranger(number, disSep, sex) {
  let arrangement = `<p>${sex} toilet block:<p>`;
  let iterations = number <= 5 ? number : 5;
  for (let i = 1; i <= iterations; i++) {
    if (disSep == false) {
      arrangement = arrangement.concat(`<p>cubicle ${i}`);
      arrangement =
        i == 1
          ? arrangement.concat(`: wheelchair-accessible</p> `)
          : i == 2
          ? arrangement.concat(`: ambulant</p> `)
          : i == 3
          ? arrangement.concat(`: normal</p> `)
          : i == 4
          ? arrangement.concat(`: enlarged</p> `)
          : // : i == 5
            // ? arrangement.concat(`: normal cubicle</p> `)
            arrangement.concat(
              number == 5 ? `: normal cubicle</p> ` : `-${number}: normal</p> `,
            );
      arrangeParagraphDDA.classList.add("invisible");
    } else {
      arrangement = arrangement.concat(`<p>cubicle ${i}`);
      //   i == 1
      //     ? arrangement.concat(`<p>separate`)
      //     : arrangement.concat(`<p>cubicle ${i - 1}`);
      arrangement =
        // i == 1
        //   ? arrangement.concat(`: DDA toilet</p> `)
        i == 1
          ? arrangement.concat(`: ambulant</p> `)
          : i == 2
          ? arrangement.concat(`: normal</p> `)
          : i == 3
          ? arrangement.concat(`: normal</p> `)
          : i == 4
          ? arrangement.concat(`: enlarged</p> `)
          : // : i == 5
            // ? arrangement.concat(`: normal cubicle</p> `)
            arrangement.concat(
              number == 5 ? `: normal</p> ` : `-${number}: normal</p> `,
            );
      arrangeParagraphDDA.classList.remove("invisible");
    }
  }
  return arrangement;
}

//URINAL USE CHECKBOX FUNCTIONALITY
urinalCheck.addEventListener("change", function (event) {
  event.preventDefault();
  if (urinalCheck.checked) {
    uriBool = true;
  } else {
    uriBool = false;
  }
  runCalcs();
});

//SEPARATE CUBICLE CHECKBOX FUNCTIONALITY
separateCheck.addEventListener("change", function (event) {
  event.preventDefault();
  if (separateCheck.checked) {
    sepBool = true;
  } else {
    sepBool = false;
  }
  runCalcs();
});

//CALCULATION UPDATE ON TYPING
controlsDiv.addEventListener("change", (e) => {
  if (e.target.type == "number") {
    runCalcs();
  }
});

//SHOWING TOGGLED LINES IN DESCRIPTION DIV
descriptionDiv.addEventListener("change", (e) => {
  if (e.target.type == "checkbox") {
    runDesc(e.target);
  } else if (e.target.type == "text" || "date") {
    runLine(e.target);
  }
});

//DESCRIPTION UPDATE ON TYPING
descriptionDiv.addEventListener("keyup", (e) => {
  try {
    runLine(e.target);
  } catch {
    console.log(`select line`);
  }
});

//SHOW HIDDEN DIV ON CLICK
descriptionToggle.addEventListener("click", (e) => {
  descriptionDiv.setAttribute("style", "display:block !important");
});

//RESET BUTTON FUNCTIONALITY
resetButton.addEventListener("click", function (event) {
  event.preventDefault();
  location.reload();
});

//PDF BUTTON FUNCTIONALITY
pdfButton.addEventListener("click", function () {
  const doc = new jsPDF("p", "in", "a4");
  const timestamp = Date.now();

  doc.setFontSize(12);
  doc.setFont("Helvetica");
  doc.text(`${dateLineCheck.checked ? date : ``}`, 7.5, 1, { align: "right" });
  doc.text(
    `
  ${firstLineCheck.checked ? firstLine.value : ``}
  ${secondLineCheck.checked ? secondLine.value : ``}
  ${authorLineCheck.checked ? authorLine.value : ``} 

  
  • Estimated occupancy: ${occupancy}
  • Male/Female ratio: ${maleRatio}% / ${femaleRatio}%
  ${
    uriBool == true
      ? "• Urinals to be used in the male toilet"
      : "• Male toilets do not use urinals"
  }
  ${
    sepBool == true
      ? "• Wheelchair-accessible toilet is separate from same-sex toilet blocks"
      : "• Same-sex toilet blocks to have wheelchair accesible cubicles"
  }`,
    0.8,
    1.8,
  );
  doc.text(
    `
    For ${occupancy} occupants at a single floor, at ${maleRatio}/${femaleRatio} ratio:

  • Male occupancy number is: ${maleNum}
  • Female occupancy number is: ${femaleNum}

  Toilet provision based on BS 6465 part1 March 2006, (paragraph 6.4.1, table-${
    uriBool == false ? `3` : `4`
  }):

  ${
    uriBool == false
      ? `• Male toilet requires ${maleToilet} WC${pluralForm(
          maleToilet,
        )} and ${maleWashbasin} washbasin${pluralForm(maleWashbasin)}`
      : `• Male toilet requires ${maleToilet} WC${pluralForm(
          maleToilet,
        )}, ${maleUrinal} urinal${pluralForm(
          maleUrinal,
        )} and ${maleWashbasin} washbasin${pluralForm(maleWashbasin)}`
  }
  • Female toilet requires ${femaleToilet} WC${pluralForm(
    femaleToilet,
  )} and ${femaleWashbasin} washbasin${pluralForm(femaleWashbasin)}`,
    0.8,
    4.6,
  );

  if (sepBool == false) {
    doc.text(`${arrangeParagraphMale.innerText}`, 1.5, 7.8, { align: "left" });
    doc.text(`${arrangeParagraphFemale.innerText}`, 4.75, 7.8, {
      align: "left",
    });
  } else {
    doc.text(`${arrangeParagraphDDA.innerText}`, 1, 7.8, { align: "left" });
    doc.text(`${arrangeParagraphMale.innerText}`, 3.1, 7.8, { align: "left" });
    doc.text(`${arrangeParagraphFemale.innerText}`, 5.2, 7.8, {
      align: "left",
    });
  }

  doc.setFontSize(11);
  doc.setFont("Times", "italic");
  doc.text(`Workplace Sanitary Provision Report`, 0.5, 0.5, { align: "left" });
  doc.text(`Variables:`, 0.5, 2.65, { align: "left" });
  doc.text(`Calculation result:`, 0.5, 4.15, { align: "left" });
  doc.text(`Cubicle types required:`, 0.5, 7.15, { align: "left" });

  doc.text(
    `calculated with Workplace Sanitary Provision Calculator v1.1.0 beta
to be cross checked with BS 6465-1:2006+A1:2009, and other relevant documents
for educational purposes only`,
    0.5,
    11,
    { align: "left" },
  );
  doc.text(`page 1 of 1`, 7.75, 11, { align: "right" });

  doc.setDrawColor("black");
  doc.setLineWidth(1 / 72);
  doc.line(0.5, 10.85, 7.75, 10.85);
  doc.line(0.5, 7, 7.75, 7);
  doc.line(0.5, 4, 7.75, 4);
  doc.line(0.5, 2.5, 7.75, 2.5);
  doc.output("dataurlnewwindow");
  //doc.save(`Sanitary Provision Report_${date + `_` + timestamp}.pdf`);
});
