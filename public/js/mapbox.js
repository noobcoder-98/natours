/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations)
console.log(locations)
mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5vb2Jjb2Rlcjk4IiwiYSI6ImNsNXFjbHl6ZTA5dGczY21lZHdnbG1pZm8ifQ.2-NM-BHUtGxJYxtdWMIm5g'
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/anoobcoder98/cl5qmomoh002915ln6l0ysbxi',
  center: [-118.113491, 34.111745],
  zoom: 10,
  interactive: false
})
