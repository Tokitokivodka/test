function maPosition(position) {
  var infopos = "Position déterminée :\n";
  infopos += "Latitude : "+position.coords.latitude +"\n";
  infopos += "Longitude: "+position.coords.longitude+"\n";
  infopos += "Altitude : "+position.coords.altitude +"\n";
  infopos += "Vitesse  : "+position.coords.speed +"\n";
  document.getElementById("infoposition").innerHTML = infopos;
  // Position par défaut (Châtelet à Paris)
  var centerpos = new google.maps.LatLng(48.579400,7.7519);

  // Options relatives à la carte
  var optionsGmaps = {
      center:centerpos,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 15
  };
    // Initialisation de la carte pour l'élément portant l'id "map"
  var map = new google.maps.Map(document.getElementById("map"), optionsGmaps);

  // .. et la variable qui va stocker les coordonnées
  var latlng;
    latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    // Ajout d'un marqueur à la position trouvée
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"Vous êtes ici"
    });

    // Permet de centrer la carte sur la position latlng
    map.panTo(latlng);
}

function process(event) {
  var x = event.accelerationIncludingGravity.x;
  var y = event.accelerationIncludingGravity.y;
  var z = event.accelerationIncludingGravity.z;

  document.getElementById("log").innerHTML = "<ul><li>X : " + x + "</li><li>Y : " + y + "</li><li>Z : " + z + "</li></ul>"; 
}
function orientation(event)
{
  var alpha = event.alpha;
  var beta = event.beta;
  var gamma = event.gamma;
   document.getElementById("log2").innerHTML = "<ul><li>Alpha : " + alpha + "</li><li>Beta : " + beta + "</li><li>Gamma : " + gamma + "</li></ul>";
}
if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition(maPosition);

if(window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", orientation, false);
} else {
  // Le navigateur ne supporte pas l'événement deviceorientation
}
if(window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", process, false);

} else {
  // Le navigateur ne supporte pas l'événement devicemotion
}
