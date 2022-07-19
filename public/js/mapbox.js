/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW5vb2Jjb2Rlcjk4IiwiYSI6ImNsNXFjbHl6ZTA5dGczY21lZHdnbG1pZm8ifQ.2-NM-BHUtGxJYxtdWMIm5g'
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/anoobcoder98/cl5qmomoh002915ln6l0ysbxi',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  })

  const bounds = new mapboxgl.LngLatBounds()
  locations.forEach((loc) => {
    // Create marker
    const e = document.createElement('div')
    e.className = 'marker'

    // Add marker
    new mapboxgl.Marker({
      element: e,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map)

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map)

    // Extend map bounds to include current locations
    bounds.extend(loc.coordinates)
    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    })
  })
}
