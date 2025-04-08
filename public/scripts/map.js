
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
container: 'map',
// You can add layers to the predetermined slots within the Standard style basemap.
style: 'mapbox://styles/mapbox/streets-v12',
center: coordinates,
zoom: 5,
});

console.log(coordinates);
const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(coordinates)
    .addTo(map);