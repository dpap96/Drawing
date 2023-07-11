"use strict";

//ο πιο σωστος τροπος ειναι ο καμβας να τρεξει οταν η σελιδα φορτωσει αρα θα την βαλω μεσα σε event listener:
window.addEventListener("load",()=>{ 
    
    const canv= document.querySelector("#canvas"); //selecting canva
    const cntx= canv.getContext("2d"); //οριζω διαστασεις στον καμβα
    const submitButton = document.querySelector("#submitBtn"); // selecting Submit button
    const colorInput = document.querySelector("#colorPicker"); // Επιλέγουμε το input του χρώματος
    const clearButton = document.querySelector("#clearBtn");
    const saveButton = document.querySelector("#saveBtn");
    let selectedColor,link;
    let drawing=false; //declares if someone draws

//set width & height of canva
    canv.height=600; 
    canv.width=window.innerWidth //ο καμβας παιρνει ολο το πλατος του παραθυρου

//Listener for cleaning canva
clearButton.addEventListener("click", () => {
  cntx.clearRect(0, 0, canv.width, canv.height);
  selectedColor = colorInput.value; // Ενημέρωση του επιλεγμένου χρώματος
});

//Listener for selecting the drawing color
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  selectedColor = colorInput.value;
  console.log("Επιλεγμένο χρώμα:", selectedColor);
});

//Listener for downloading the img
saveButton.addEventListener("click", () => { //savebutton is clicked..
  link = document.createElement('a'); 
  link.href = canv.toDataURL('image/png');
  link.download = 'drawing.png'; //the name of drawing which user will download
  link.click(); //downloading the png img
});
  
//fat arrow function for drawing
let draw=(e)=>{
    if (!drawing) {
        return;
      } else {
        const canvasRect = canv.getBoundingClientRect(); // Παίρνουμε το πλαίσιο περιβάλλοντος του καμβά
        const mouseX = e.clientX - canvasRect.left; // Υπολογίζουμε τη  συντεταγμένη X εντός του καμβά
        const mouseY = e.clientY - canvasRect.top; // Υπολογίζουμε τη  συντεταγμένη Y εντός του καμβά
    
        cntx.lineTo(mouseX, mouseY); // Δημιουργούμε γραμμή στις συντεταγμένες
        cntx.strokeStyle = selectedColor;
        cntx.lineWidth = 5;
        cntx.stroke(); // Εμφανίζουμε τη γραμμή
      }
}
//Listener for pressed mouse
canv.addEventListener("mousedown",()=>{
        drawing = true;
})
//Listener for no-pressed mouse
canv.addEventListener("mouseup",()=>{
    cntx.beginPath(); //
    drawing=false; //δεν ζωγραφιζω
})
//Listener for drawing
canv.addEventListener("mousemove",draw)

})
