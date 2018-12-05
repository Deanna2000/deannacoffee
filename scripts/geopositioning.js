function createDrivingDirectionsMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 500
        });
    }
    else {
        document.getElementById(map).innerHTML = "No support for geolocation, we can't find you."
    }
};

function OnSuccess(position) {
    showMap(
        position.coords.latitude,
        position.coords.longitude
    );
};

function OnError() {
    let mapDiv = document.getElementById("map");
    switch (Error.code) {
        case Error.PERMISSION_DENIED:
        mapDiv.innerHTML = "User denied the request for Geolocation."
        break;
        case Error.POSITION_UNAVAILBLE:
        mapDiv.innerHTML = "Location information is unavailable."
        break;
        case Error.TIMEOUT:
        mapDiv.innerHTML = "The request to get user location timed out."
        break;
        case Error.UNKNOWN_ERROR:
        mapDiv.innerHTML = "An unknown error occurred."
        break;    
    }
};

function showMap(lat,long) {
    let directionService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();

    let route = {
        origin: new google.maps.LatLng(lat,long),
        destination: "Nashville, TN",
        travelMode: google.maps.TravelMode.DRIVING
    };

    let mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(36.1863124, -87.0661237),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsRenderer.setMap(map);
    directionService.route(route, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        }
    });
}