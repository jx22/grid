const placeslist = document.querySelector('#placeslist');
const form = document.querySelector('#add-place-form');

// create element and render place
function renderplace(doc){
    let li = document.createElement('li');
    let destination = document.createElement('span');
    let description = document.createElement('span');
    let location = document.createElement('span');
    let link = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id)
    destination.textContent = doc.data().destination;
    description.textContent = doc.data().description;
    location.textContent = doc.data().location;
    link.textContent = doc.data().link;
    cross.textContent = 'Delete Entry';

    li.appendChild(destination);
    li.appendChild(description);
    li.appendChild(location);
    li.appendChild(link);
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
        destination: form.destination.value,
        description: form.description.value,
        location: form.location.value,
        link: form.link.value,
    });
    form.destination.value = '';
    form.description.value = '';
    form.location.value = '';
    form.link.value = '';

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