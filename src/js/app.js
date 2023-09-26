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
let maleToilet;
let maleToiletAlt
let femaleToilet;
let maleWashbasin
let maleWashbasinAlt
let femaleWashbasin
let maleUrinal

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

function calcItems(num){
    let result
    let over100 = 0
    result = num<=5 ? 1 : num<=15 ? 2 : num<=30 ? 3 : num<=45 ? 4 : num<=60 ? 5: num<=75 ? 6 : num<=90 ? 7 : 8
    over100 = num-100 > 0 ? Math.ceil((num - 100)/25) : 0 
    //console.log('result of over: ',over100)
    result = result + over100
return result}

function calcAltItems(num){
    let result
    let over100 = 0
    result = num<=15 ? [1,1,1] : num<=30 ? [2,1,2] : num<=45 ? [2,2,2] : num<=60 ? [3,2,3] : num<=75 ? [3,3,3] : num<=90 ? [4,3,4] : [4,4,4]
    over100 = num-100 > 0 ? Math.ceil((num - 100)/50) : 0 
    //result = result + over100
    console.log(num)
return result}

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
    
    console.log(femaleNum)
    maleToilet = calcItems(maleNum)
    console.log(maleToilet)
    femaleToilet = calcItems(femaleNum)
    console.log(femaleToilet)
    maleWashbasin = maleToilet
    femaleWashbasin = femaleToilet
    maleToiletAlt = calcAltItems(maleNum)[0]
    maleWashbasinAlt = calcAltItems(maleNum)[2]
    maleUrinal = calcAltItems(maleNum)[1]
    
    
    console.log(femaleToilet)


    //console.log(maleNum, femaleNum)
    resultParagraph.innerHTML = null
    resultParagraph.innerHTML = `<p>Based on ${occupancy} occupants number, at ${maleRatio}/${femaleRatio} ratio</p>
    <p>male occupancy number is: ${maleNum} and female occupancy number is: ${femaleNum}</p>
    <p>male toilet requires ${maleToilet} WCs and ${maleWashbasin} washbasins</p>
    <p>alternatively, male toilet requires ${maleToiletAlt} WCs, ${maleUrinal} urinals and ${maleWashbasinAlt} washbasins</p>
    <p>female toilet requires ${femaleToilet} WCs and ${femaleWashbasin} washbasins</p>`

    calcAltItems(maleNum)
    console.log(calcAltItems(maleNum))

  });

  pdfButton.addEventListener('click', function(){
    console.log('clicked pdf');
  });

//ADD BLOCKARRANGER