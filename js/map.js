/*// enable the visual refresh
google.maps.visualRefresh = true;

var map;
function initialize() {
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    // try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            localStorage.clear();
            var Lat = position.coords.latitude;
            var Lng = position.coords.longitude;
            localStorage.setItem("Lat", Lat);
            localStorage.setItem("Lng", Lng);

            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'Position de la ruche'
            });

            map.setCenter(pos);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // browser doesn't support geolocation
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Erreur: La puce GPS n\'a pas était trouvée';
    } else {
        var content = 'Erreur: Votre navigateur ne support pas le service de géolocalisation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}
google.maps.event.addDomListener(window, 'load', initialize);*/
function initialize() {
    map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 19,
        center: new google.maps.LatLng(48.858565, 2.347198),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

if (navigator.geolocation)
    var watchId = navigator.geolocation.watchPosition(successCallback,
        null,
        {enableHighAccuracy:true});
else
    alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");

function successCallback(position){
    map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map
    });
}