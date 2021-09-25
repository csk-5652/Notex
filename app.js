// javascript

// variable declaration 
var i=0;
var txt='Welcome to Notex';
var speed=150;

// function for typing Animation

function typewriter(){
    if (i<txt.length){
        document.getElementById("typ").innerHTML+=txt.charAt(i);
        i++;
        setTimeout(typewriter,speed);
    }
}
 typewriter() //print func 

// print function to show notes 
ShowNotes(); 

// main 

let addbtn=document.getElementById("add-btn"); 
addbtn.addEventListener("click",function(e){
    let addtxt=document.getElementById("add-txt");
    let addTitle = document.getElementById("addTitle");
    let notes=localStorage.getItem("notes");
    if (notes==null){
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    let myobj={
        title:addTitle.value,
        text:addtxt.value
    }
    notesobj.push(myobj);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    addtxt.value="";
    addTitle.value="";
    ShowNotes();
});

// function for showing notes 
function ShowNotes(){
    let notes=localStorage.getItem("notes");
    if (notes==null){
        notesobj=[];      
    }else{
        notesobj=JSON.parse(notes);
    }
    let html="";
    notesobj.forEach(function(element,index) {
        html +=

`       
        <div class ="notecard my-3 mx-3 card" style="width: 18rem;">            
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary bg-dark">Remove</button>
            </div>
          </div> `
        
        
    });
    let notesElm=document.getElementById("notes");
    if (notesobj.length !=0){
        notesElm.innerHTML=html;
    }else{
        notesElm.innerHTML=`<h6 style="color="black">Nothing to show! No notes added please add the note.</h6>`;
    }
}
// function for deleting notes 
function deleteNote(index)
{
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesobj=[];
    }else{
        notesobj=JSON.parse(notes);
    }
   
    notesobj.splice(index, 1);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    ShowNotes();
}
// code for search bar 
let search=document.getElementById('search-txt');
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    let notecard=document.getElementsByClassName("notecard");
    Array.from(notecard).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})



