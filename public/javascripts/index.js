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

function insertExerciseDiv(exerciseObj){
  const prevAttempt = exerciseObj.lastAttempt.sets;
  // const dateOfAttempt = exerciseObj.lastAttempt.lastDone;  
  const exerciseName = exerciseObj.exerciseName;
  
  const exerciseList = document.querySelector('#exercise-list');

  const divElement = createElement('div',{class:'exercise-box'});
  const h3Element = createElement('h3',{id:'exercise-name'},exerciseName);
  const ulElement = createElement('ol',{style:'list-style-type:decimal'},"");
  // const h4Element = createElement('h4',{},`Last Performed: ${dateOfAttempt}`);

  for(let set of prevAttempt){
    const prevText = `${set.weight} lbs x ${set.reps}`; // stats of same set of their last recent attempt
    const liElement = createElement('li',{class:""},prevText);
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
    const doneBox = createElement('input',{
      type:'checkbox',
      id:'done-check',
    })

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
    liElement.appendChild(doneBox);

    ulElement.appendChild(liElement);
  }

  divElement.appendChild(h3Element);
  divElement.appendChild(ulElement);
  exerciseList.appendChild(divElement);
}

const searchButton = document.querySelector("#search-exercise");

searchButton.addEventListener("click",async function(evt){
    const exerciseToSearch = document.querySelector("#exercise-query");
    const queryValue = exerciseToSearch.value.replace(/\s/g,"+");
    const fullPath = `/exercises?name=${queryValue}`;
    console.log(fullPath);
    const response = await fetch(fullPath);
    const exerciseList = await response.json();

    if(exerciseList.length === 0){
      console.log("Zero!");
      
    }
    else{
      const foundExercise = exerciseList[0]
      insertExerciseDiv(foundExercise);
      // console.log("Yuh!\n"+foundExercise.lastAttempt.sets[0].weight);
    }
    
})