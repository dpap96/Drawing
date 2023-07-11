"use strict";

//ο πιο σωστος τροπος ειναι ο καμβας να τρεξει οταν η σελιδα φορτωσει αρα θα την βαλω μεσα σε event listener:

window.addEventListener("load",()=>{ //ο κωδικας θα εκτελεστει...αφου γινει load το window
    
    const canv= document.querySelector("#canvas"); //παιρνω τον καμβα
    const cntx= canv.getContext("2d"); //οριζω διαστασεις στον καμβα
    const submitButton = document.querySelector("input[type='submit']"); // Επιλέγουμε το κουμπί υποβολής
    const colorInput = document.querySelector("input[type='color']"); // Επιλέγουμε το input του χρώματος
    const clearButton = document.querySelector("#clear");
    let selectedColor;
    let drawing=false; //declares if someone draws

//set width & height
canv.height=600; 
canv.width=window.innerWidth //ο καμβας παιρνει ολο το πλατος του παραθυρου

clearButton.addEventListener("click", () => {
  cntx.clearRect(0, 0, canv.width, canv.height);
  selectedColor = colorInput.value; // Ενημέρωση του επιλεγμένου χρώματος
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Αποτρέπουμε την προεπιλεγμένη συμπεριφορά υποβολής της φόρμας
    selectedColor = colorInput.value; // Παίρνουμε την τιμή του input του χρώματος
    console.log("Επιλεγμένο χρώμα:", selectedColor); // Εκτυπώνουμε το επιλεγμένο χρώμα
  });
  
//fat arrow function
let draw=(e)=>{
    if (!drawing) {
        return;
      } else {
        const canvasRect = canv.getBoundingClientRect(); // Παίρνουμε το πλαίσιο περιβάλλοντος του καμβά
        const mouseX = e.clientX - canvasRect.left; // Υπολογίζουμε τη  συντεταγμένη X εντός του καμβά
        const mouseY = e.clientY - canvasRect.top; // Υπολογίζουμε τη  συντεταγμένη Y εντός του καμβά
    
        cntx.lineTo(mouseX, mouseY); // Δημιουργούμε γραμμή στις συντεταγμένες
        cntx.strokeStyle = selectedColor;
        cntx.lineWidth = 10;
        cntx.stroke(); // Εμφανίζουμε τη γραμμή
      }
}
//pressed mouse
canv.addEventListener("mousedown",()=>{
        drawing = true;
})
//mouse is not pressed
canv.addEventListener("mouseup",()=>{
    cntx.beginPath(); //
    drawing=false; //δεν ζωγραφιζω
})
//drawing:
canv.addEventListener("mousemove",draw)

})
