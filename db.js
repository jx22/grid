const placeslist = document.querySelector('#placeslist');
const form = document.querySelector('#add-place-form');

// create element and render place
function renderplace(doc){
    let li = document.createElement('li');
    let description = document.createElement('span');
    let destination = document.createElement('span');
    let location = document.createElement('span');
    let cross = document.createElement('span');

    li.setAttribute('data-id', doc.id)
    description.textContent = doc.data().description;
    destination.textContent = doc.data().destination;
    location.textContent = doc.data().location;
    cross.textContent = 'Delete Entry';

    li.appendChild(description);
    li.appendChild(destination);
    li.appendChild(location);
    li.appendChild(cross);

    placeslist.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('places').doc(id).delete();
    })
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('places').add({
        description: form.description.value,
        destination: form.destination.value,
        location: form.location.value
    });
    form.description.value = '';
    form.destination.value = '';
    form.location.value = '';

});

// real time listener
db.collection('places').orderBy('destination').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderplace(change.doc)
        } else if (change.type == 'removed'){
            let li = placeslist.querySelector('[data-id=' + change.doc.id + ']')
            placeslist.removeChild(li);
        }
    })
    
})