function initMap() {
    var customMapType = new google.maps.StyledMapType(
        [{
                "stylers": [{
                    "visibility": "simplified"
                }, {
                    "gamma": 5
                }, {
                    "weight": 0.25
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },  {
                "featureType": "landscape",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.neighborhood",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {"color": "#00BCD4"},
                    {"weight": 0.1},
                    //{"saturation": -30}
                ]
            },{
              "featureType": "poi",
              //"elementType": "geometry",
              "stylers": [
                {"visibility": "off"},
                { "color": "#B2EBF2" },
                { "saturation": -100}
              ]
            }]

        , {
            name: 'Custom Style'
        });
    var customMapTypeId = 'custom_style';

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.7833,
            lng: -122.4167
        },
        zoom: 14,
        scrollwheel: false,
        draggable: false,
        disableDefaultUI: true,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        }
    });

    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);
    var input = /** @type {!HTMLInputElement} */ (
        document.getElementById('pac-input'));

    var autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)']
    });
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        input.value = place.address_components[0].long_name;
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(14); // Why 17? Because it looks good.
        }
        marker.setIcon( /** @type {google.maps.Icon} */ ({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(false);

    });

}
//prevent key enter to sumbit form
function preventSubmit(e) {
  var code = e.keyCode || e.which;
  if (code == 13) {
    e.preventDefault();
    return false;
  }
}
$('#pac-input').on('keyup keypress', preventSubmit);
$('#signup').on('keyup keypress', preventSubmit);

$('input.thumb-input:checked').siblings('.thumb-label').find('.svgfill').css({ "fill": "#009688","fill-opacity": "1"});
$('input.thumb-input:checked').siblings('.landing-label').css({ "color": "#B2EBF2"});

$('.landing-label').on('click',function(){
    $('.svgfill').css({'fill-opacity':'0'});
    $('.landing-label').css({'color':'#FFFFFF'});
    $(this).siblings('.thumb-label').find('.svgfill').css({ "fill": "#009688","fill-opacity": "1"});
    $(this).css({ "color": "#B2EBF2"});
});
