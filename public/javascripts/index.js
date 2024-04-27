function createElement(type, attrs, ...children) {
    const ele = document.createElement(type);
  
    // add element attributes
    for (const prop in attrs) {
      if (attrs.hasOwnProperty(prop)) {
        ele.setAttribute(prop, attrs[prop]);
      }
    }
  
    // add child nodes to element
    children.forEach(c => ele.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  
    return ele;
}

function makeSetRow(set,olElement){
  const prevText = `${set.weight} lbs x ${set.reps} reps`; // stats of same set of their last recent attempt
  const liElement = createElement('li',{class:""},prevText+"\t");
  const weightInput = createElement('input',{
    type:'number',
    id:'weight-input',
    name:'weight',
    placeholder:'Weight (in lbs)'}, " x ");
  const repsInput = createElement('input',{
    type:'number',
    id:'reps-input',
    name:'reps',
    placeholder:'Reps'},"");

  const doneText = document.createTextNode('\tDone?');

  const doneBox = createElement('input',{
    type:'checkbox',
    id:'done-check',
  });

  doneBox.addEventListener('click',function(evt){
    if(doneBox.checked === true){
      liElement.setAttribute('class','set-completed')
    }
    else{
      liElement.setAttribute('class','')
    }
  })
  
  liElement.appendChild(weightInput);
  liElement.appendChild(repsInput);
  liElement.appendChild(doneText);
  liElement.appendChild(doneBox);

  olElement.appendChild(liElement);
}

function insertExerciseDiv(exerciseObj,isFirstTime=false){
  
  let prevAttempt = [{weight:0,reps:0}];
  
  if(!isFirstTime){
    prevAttempt = exerciseObj.lastAttempt.sets;
  }

  // const dateOfAttempt = exerciseObj.lastAttempt.lastDone;  
  const exerciseName = exerciseObj.exerciseName;
  
  const exerciseList = document.querySelector('#exercise-list');

  const divElement = createElement('div',{class:'exercise-box'});
  const h3Element = createElement('h3',{id:'exercise-name'},exerciseName);
  const olElement = createElement('ol',{style:'list-style-type:decimal'},"");
  // const h4Element = createElement('h4',{},`Last Performed: ${dateOfAttempt}`);

  prevAttempt.map((set)=>makeSetRow(set,olElement));


  
  const addSetButton = createElement('button',{
    class:'add-set',
    value:"Add Set!"
  },"Add Set!")

  addSetButton.addEventListener('click',function(evt){
    makeSetRow({weight:0,reps:0},olElement);
  })

  divElement.appendChild(h3Element);
  divElement.appendChild(olElement);
  divElement.appendChild(addSetButton);
  exerciseList.appendChild(divElement);
  exerciseList.appendChild(createElement('br'));
}

const searchButton = document.querySelector("#search-exercise");

searchButton.addEventListener("click",async function(evt){
    const exerciseToSearch = document.querySelector("#exercise-query");
    const queryValue = exerciseToSearch.value.replace(/\s/g,"+");
    exerciseToSearch.value = "";
    const fullPath = `/exercises?name=${queryValue}`;
    console.log(fullPath);
    const response = await fetch(fullPath);
    const exerciseList = await response.json();

    const foundExercise = exerciseList[0]
    if(foundExercise.lastAttempt === null){
      console.log(`No last attempt with this exercise!`);
      insertExerciseDiv(foundExercise,true);
    }

    else{
      insertExerciseDiv(foundExercise);
    }
      // console.log("Yuh!\n"+foundExercise.lastAttempt.sets[0].weight);
    
    
})

const finishButton = document.querySelector("#finish-workout");

finishButton.addEventListener("click", async function(evt){
  evt.preventDefault();
  const exerciseBoxes = document.getElementsByClassName('exercise-box');

  const allDoneInfo = [];

  for(let i=0;i<exerciseBoxes.length;i++){
    const exerciseName = exerciseBoxes[i].childNodes[0].childNodes[0].textContent;
    const validRows = exerciseBoxes[i].childNodes[1].getElementsByClassName('set-completed');
    if(validRows.length === 0){
      continue;
    }
    const sets = []

    for(let j=0;j<validRows.length;j++){
        const weightValue = validRows[j].childNodes[1].value*1;
        const repValue = validRows[j].childNodes[2].value*1;
        sets.push({
          weight: weightValue,
          reps: repValue});
    }

    const thisExerciseInfo = {
      exerciseName: exerciseName,
      sets: sets
    }

    allDoneInfo.push(thisExerciseInfo);
  }

  // console.log(exerciseBoxes[0].childNodes[0].childNodes[0].textContent);
  // console.log(exerciseBoxes[0].childNodes[1]);
  // const newCompleted = exerciseBoxes[0].childNodes[1].getElementsByClassName('set-completed');

  // console.log(newCompleted[0].childNodes[1].value);
  console.log(allDoneInfo);
  await fetch("/create",{
    method: "POST",
    body: JSON.stringify(allDoneInfo),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response=>{
    if (response.redirected) {
      window.location.href = response.url;
    }
  });


})