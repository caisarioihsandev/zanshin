import './App.scss';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import locator from './img/location-pin.png';

const App = () => {

  // markers
  const markers = [
    {
      geocode: [-6.19999, 106.80],
      popUp: "Hello, I am pop up 1"
    },
    {
      geocode: [-6.2112, 106.82],
      popUp: "Hello, I am pop up 2"
    },
    {
      geocode: [-6.215, 106.799],
      popUp: "Hello, I am pop up 3"
    }
  ];

  const customIcon = new Icon({
    iconUrl: locator,
    iconSize: [38, 38] // size of the icon

  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      // iconSize: point(33, 33, true),
    });
  }

  return (
    <div className="App">
      <MapContainer center={[-6.200000, 106.816666]} zoom={13}>
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* <TileLayer
          attribution='Stamen Watercolor'
          url='https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
        /> */}

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map(marker => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup><h2>{marker.popUp}</h2></Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

      </MapContainer>    
    </div>
  );
}

export default App;
