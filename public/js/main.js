// testing data
const dojo = [
  {
      "nama": "UKM Karate IPB A",
      "perguruan": "INKAI",
      "alamat": "IPB Dramaga",
      "koordinat": [-6.556731, 106.725945]
  },
  
  {
      "nama": "UKM Karate IPB B",
      "perguruan": "INKAI",
      "alamat": "IPB Beranangsiang",
      "koordinat": [-6.600243, 106.806734]
  },

  {
      "nama": "UKM Karate Pakuan",
      "perguruan": "INKAI",
      "alamat": "Universitas Pakuan",
      "koordinat": [-6.599196, 106.812435]
  },

  {
      "nama": "UKM Karate Cilandak",
      "perguruan": "INKAI",
      "alamat": "Kompleks Marinir Cilandak",
      "koordinat": [-6.305031, 106.811410]
  },

  {
      "nama": "UKM Karate Rawamangun",
      "perguruan": "INKAI",
      "alamat": "Rawamangun",
      "koordinat": [-6.187548, 106.875292]
  }
]

// JQuery untuk autocomplete
$( function() {
    const availableDojo = dojo.map( dojo => dojo.nama);
    $( "#dojo-tag" ).autocomplete({
      source: availableDojo
    });
  }
);

// Memilih element tombol search
const dojoTag = document.getElementById('dojo-tag');
let namaDojo;

// map
const mapQ = document.getElementById('map');
let map;
// console.log(mapQ);

dojoTag.addEventListener("change", updateValue);

// Jalankan semua fungsi untuk mengambil data, menampilkan di map dan card
// Jika data dojo diambil dari API, ubah fungsi jadi async function
function updateValue(e) {
  namaDojo = e.target.value;
  
  const data = dojo.filter( function (eventData) {
    if (namaDojo === '') {
      return eventData;
    } else if (eventData.nama.toLowerCase() === namaDojo.toLowerCase()) {
      return eventData;
    }
  });

  // Map
  let map;
  if (!data[0]) {
    mapQ.innerHTML = `<p>Maaf, data yang Anda cari tidak ditemukan</p>`;
  } else {
    if (document.getElementById('map')) {
      document.getElementById('map').remove();
    }

    // Recreate the map container
    const mapContainer = document.createElement('section');
    mapContainer.id = 'map';
    // mapContainer.style.height = '400px';
    document.body.appendChild(mapContainer);

    map = L.map('map').setView(data[0].koordinat, 13);
    // mengambil data json
    // fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/Jakarta.json?access_token=pk.eyJ1IjoiY2Fpc2FyaW8iLCJhIjoiY2x4OG02enA3Mm0wZjJpczl0bm1hMGF6aiJ9.5Qy_slgirqy66gnGaDmevg')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log(data); // Data JSON yang diambil
    //   })
    //   .catch(error => {
    //     console.error('There was a problem with the fetch operation:', error);
    //   });
    
    // Buat load map ke halaman html
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    // untuk marker
    let markerCoordinate = data[0].koordinat;
    const marker = L.marker(markerCoordinate).addTo(map);
    marker.bindPopup(`<b>${data[0].nama}</b><br>${data[0].alamat}`).openPopup();


    // Data pada Card
    if (document.getElementById('list-dojo')) {
      document.getElementById('list-dojo').remove();
    }

    // Recreate
    const listDojoContainer = document.createElement('section');
    listDojoContainer.id = 'list-dojo';
    // mapContainer.style.height = '400px';
    document.body.appendChild(listDojoContainer);

    const listDojo = document.getElementById('list-dojo');
    listDojo.style.display = "block";
    let card;
    for (let i = 0; i < data.length; i++) {
        card = `
            <div class="card mx-auto" style="width: 18rem;">
              <img src="upload/img/logo.png" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data[0].nama}</h5>
                <p class="card-text">${data[0].alamat}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">${data[0].perguruan}</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
              </ul>
              <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>    
        `;
        listDojo.innerHTML += card;
    }
  }
}