`use strict`;

//ADD CLASSNAMES

//ADD BUTTONS

const calcButton = document.getElementById('calcButton');
const pdfButton = document.getElementById('pdfButton');

const urinalCheck = document.getElementById('urinalCheck');
const separateCheck = document.getElementById('separateCheck');

const maleRatioAtt = document.getElementById('maleRatio');
const femaleRatioAtt = document.getElementById('femaleRatio');
const occNumAtt = document.getElementById('occNum');
const resultParagraph = document.getElementById('resultsPara');
const arrangeParagraph = document.getElementById('arrangePara');



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
let femaleToilet;
let maleWashbasin;
let maleWashbasinAlt;
let femaleWashbasin;
let maleUrinal;
let uriBool = false;
let sepBool = false;

let defaultRatio = 60;
maleRatio = defaultRatio;
femaleRatio = defaultRatio;

//maleRatio = prompt()
//femaleRatio = prompt()



// console.log('occupancy is: ', occupancy)
// console.log('ratios are: Male(',maleRatio,') and Female(', femaleRatio, ')')
// console.log('maleNum is: ',maleNum)
// console.log('femaleNum is: ',femaleNum)



//ADD TOILETCALCULATOR

function calcItems(num, uri){
  let result;

  //let over100 = 0
  if (uri == true) {

    result = num<=15 ? [1,1,1] : num<=30 ? [2,1,2] : num<=45 ? [2,2,2] : num<=60 ? [3,2,3] : num<=75 ? [3,3,3] : num<=90 ? [4,3,4] : num<=100 ? [4,4,4] : [4 , 4 + Math.ceil((num - 100)/50), 4 + Math.ceil((num - 100)/50)];
    //over100 = num-100 > 0 ? Math.ceil((num - 100)/50) : 0 



  } else {

    result = num<=5 ? [1,0,1] : num<=15 ? [2,0,2] : num<=30 ? [3,0,3] : num<=45 ? [4,0,4] : num<=60 ? [5,0,5]: num<=75 ? [6,0,6] : num<=90 ? [7,0,7] : num<=100 ? [8,0,8] : [8 + Math.ceil((num - 100)/25),0,8 + Math.ceil((num - 100)/25)];
    //over100 = num-100 > 0 ? Math.ceil((num - 100)/25) : 0 

  }


  //console.log('result of over: ',over100)
  //result = result + over100
  return result;}

// function calcItems(num){
//   let result
//   let over100 = 0
//   result = num<=5 ? 1 : num<=15 ? 2 : num<=30 ? 3 : num<=45 ? 4 : num<=60 ? 5: num<=75 ? 6 : num<=90 ? 7 : 8
//   over100 = num-100 > 0 ? Math.ceil((num - 100)/25) : 0 
//   //console.log('result of over: ',over100)
//   result = result + over100
// return result}

// function calcAltItems(num){
//     let result
//     let over100 = 0
//     result = num<=15 ? [1,1,1] : num<=30 ? [2,1,2] : num<=45 ? [2,2,2] : num<=60 ? [3,2,3] : num<=75 ? [3,3,3] : num<=90 ? [4,3,4] : [4,4,4]
//     over100 = num-100 > 0 ? Math.ceil((num - 100)/50) : 0 
//     //result = result + over100
//     //console.log(num)
// return result}

function arranger(number,disSep){
  let arrangement = '';
  for (let i = 1; i <= number; i++) {
    if (disSep == false){
      arrangement = arrangement.concat(`<p>cubicle ${i}: `);
      arrangement = i==1 ? arrangement.concat(`disabled accessible toilet</p> `) : i==2 ? arrangement.concat(`ambulant disabled</p> `) : i==3 ? arrangement.concat(`normal cubicle</p> `) : i==4 ? arrangement.concat(`enlarged cubicle</p> `) : arrangement.concat(`normal cubicle</p> `);
    } else {


      arrangement = i==1 ? arrangement.concat(`<p>separate cubicle: `) : arrangement.concat(`<p>cubicle ${i-1}: `);
      arrangement = i==1 ? arrangement.concat(`disabled accessible toilet</p> `) : i==2 ? arrangement.concat(`ambulant disabled</p> `) : 3<=i<=4 ? arrangement.concat(`normal cubicle</p> `) : i==5 ? arrangement.concat(`enlarged cubicle</p> `) : arrangement.concat(`normal cubicle</p> `);
    }
  }
  return arrangement;
}


// function toggler(funcName, boolName){
//   if (urinalCheck.checked) {
//     boolName = true
//     //console.log('uriBool: ' , uriBool)
//       } else {
//         boolName = false
//         console.log(`${boolName}:` , uriBool)
//       } }
// }

urinalCheck.addEventListener('change', function() {
  if (urinalCheck.checked) {
    uriBool = true;
    //console.log('uriBool: ' , uriBool)
  } else {
    uriBool = false;
    //console.log('uriBool: ' , uriBool)
  } });

separateCheck.addEventListener('change', function() {
  if (separateCheck.checked) {
    sepBool = true;
  //console.log('sepBool: ' , sepBool)
  } else {
    sepBool = false;
    //console.log('sepBool: ' , sepBool)
  } });


calcButton.addEventListener('click', function(){
  //console.log('clicked calc');
  maleRatio = maleRatioAtt.value;
  femaleRatio = femaleRatioAtt.value;
  occupancy = occNumAtt.value;
  //console.log(maleRatio)
  //console.log(femaleRatio)
  //console.log(occupancy)
  maleNum = Math.ceil(occupancy * maleRatio / 100);
  femaleNum = Math.ceil(occupancy * femaleRatio / 100);
    
  //console.log(femaleNum)
  maleToilet = calcItems(maleNum,uriBool)[0];
  maleUrinal = calcItems(maleNum,uriBool)[1];
  //console.log(maleToilet)
  femaleToilet = calcItems(femaleNum)[0];
  //console.log(femaleToilet)
  maleWashbasin = calcItems(maleNum,uriBool)[2];
  femaleWashbasin = calcItems(femaleNum)[2];
  // maleToiletAlt = calcAltItems(maleNum)[0]
  // maleWashbasinAlt = calcAltItems(maleNum)[2]
  // maleUrinal = calcAltItems(maleNum)[1]

    
    
    
  //console.log(femaleToilet)


  //console.log(maleNum, femaleNum)
  resultParagraph.innerHTML = null;
  resultParagraph.innerHTML = `<p>Based on ${occupancy} occupants number, at ${maleRatio}/${femaleRatio} ratio</p>
    <p>male occupancy number is: ${maleNum} and female occupancy number is: ${femaleNum}</p>
    ${uriBool==false ? `<p>male toilet requires ${maleToilet} WCs and ${maleWashbasin} washbasins</p>` : `<p>male toilet requires ${maleToilet} WCs, ${maleUrinal} urinals and ${maleWashbasinAlt} washbasins</p>` }
    <p>female toilet requires ${femaleToilet} WCs and ${femaleWashbasin} washbasins</p>`;

  arrangeParagraph.innerHTML = null;
  arrangeParagraph.innerHTML = arranger(maleToilet,sepBool);

  // calcAltItems(maleNum)
  //console.log(calcAltItems(maleNum))
//    <p>alternatively, male toilet requires ${maleToiletAlt} WCs, ${maleUrinal} urinals and ${maleWashbasinAlt} washbasins</p>
});

pdfButton.addEventListener('click', function(){
  console.log('clicked pdf');
});

//ADD BLOCKARRANGER