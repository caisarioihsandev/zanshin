import './App.scss';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";

import locator from './img/gps.png';

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

  })

  return (
    <div className="App">
      <MapContainer center={[-6.200000, 106.816666]} zoom={13}>
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {markers.map(marker => (
          <Marker position={marker.geocode} icon={customIcon}></Marker>
        ))}
      </MapContainer>    
    </div>
  );
}

export default App;
