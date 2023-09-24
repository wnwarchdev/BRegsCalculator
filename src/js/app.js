"use strict";

//ADD CLASSNAMES

//ADD BUTTONS

const calcButton = document.getElementById('calcButton')
const pdfButton = document.getElementById('pdfButton')

const maleRatioAtt = document.getElementById('maleRatio')
const femaleRatioAtt = document.getElementById('femaleRatio')
const occNumAtt = document.getElementById('occNum')
const resultParagraph = document.getElementById('resultsPara')



//ADD OCCUPANCYCALCULATOR

let occupancy;
occupancy = 100;

//occupancy = prompt()


//ADD MALENUM AND FEMALENUM VARIABLES

let maleNum;
let femaleNum;
let maleRatio;
let femaleRatio;

let defaultRatio = 60
maleRatio = defaultRatio
femaleRatio = defaultRatio

//maleRatio = prompt()
//femaleRatio = prompt()

maleNum = occupancy * maleRatio / 100
femaleNum = occupancy * femaleRatio / 100

// console.log('occupancy is: ', occupancy)
// console.log('ratios are: Male(',maleRatio,') and Female(', femaleRatio, ')')
// console.log('maleNum is: ',maleNum)
// console.log('femaleNum is: ',femaleNum)



//ADD TOILETCALCULATOR

calcButton.addEventListener('click', function(){
    console.log('clicked calc');
    maleRatio = maleRatioAtt.value
    femaleRatio = femaleRatioAtt.value
    occupancy = occNumAtt.value
    //console.log(maleRatio)
    //console.log(femaleRatio)
    //console.log(occupancy)
    maleNum = occupancy * maleRatio / 100
    femaleNum = occupancy * femaleRatio / 100
    //console.log(maleNum, femaleNum)
    resultParagraph.innerHTML = null
    resultParagraph.innerHTML = `<p>Based on ${occupancy} occupants number, at ${maleRatio}/${femaleRatio} ratio</p>
    <p>male toilet number is: ${maleNum}</p> <p>female toilet number is: ${femaleNum}</p>`



  });

  pdfButton.addEventListener('click', function(){
    console.log('clicked pdf');
  });

//ADD BLOCKARRANGER