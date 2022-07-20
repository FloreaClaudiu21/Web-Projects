//adresa fictiva a restaurantului
function myMap() {
    let mapCanvas = document.getElementById('map');
    let mapOptions = {
        center: new google.maps.LatLng(44.4437475, 26.0703389),
        zoom: 18
    };
    let map = new google.maps.Map(mapCanvas, mapOptions);
    let location = {
        lat: 44.4437475,
        lng: 26.0703389
    };
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });
}