// LOGIC TO WRITE DATA
var db = firebase.firestore();

function storeData(){

var destinationText = document.getElementById("destination_field").value; 
var locationText = document.getElementById("location_field").value; 
var descriptionText = document.getElementById("description_field").value; 

db.collection("Places").doc().set({
    destination: destinationText,
    location: locationText,
    description: descriptionText,

})
.then(function() { 
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

}

// for list of places
const placesList = document.querySelector('#places-list');

// create element and render places
function renderPlaces(doc){
    let li = document.createElement('li'); 
    let destination = document.createElement('span');
    let location = document.createElement('span'); 
    let description = document.createElement('span'); 

    li.setAttribute('data-id', doc.id);
    destination.textContent = doc.data().destination;
    location.textContent = doc.data().location;
    description.textContent = doc.data().description;

    li.appendChild(destination);
    li.appendChild(location);
    li.appendChild(description); 

    placesList.appendChild(li);

}

// LOGIC FOR READING DATA TO SHOW IN BULLETS ON LANDMARK.HTML
// db.collection("places").get().then((snapshot) => {

//     snapshot.docs.forEach(doc => {
//         renderPlaces(doc);
        
//     }) 
// })