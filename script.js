var map = L.map('peta-saya').setView([-5.2, 105.3], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch('../data/peta_krb.geojson')
    .then(response => response.json())
    .then(data => {

 var krb = L.geoJSON(data, {
            style: {
                color: 'red',
                weight: 2,
                fillOpacity: 0.5
            },
            onEachFeature: function(feature, layer) {

                let popup = "";

                for (let key in feature.properties) {
                    popup += "<b>" + key + "</b>: " +
                             feature.properties[key] + "<br>";
                }

                layer.bindPopup(popup);
            }
        });


        krb.addTo(map);
        map.fitBounds(krb.getBounds());
    });