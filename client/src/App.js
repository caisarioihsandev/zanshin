import './App.scss';
import 'leaflet/dist/leaflet.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import locator from './img/location-pin.png';

const App = () => {

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/Jakarta.json?access_token=pk.eyJ1IjoiY2Fpc2FyaW8iLCJhIjoiY2x4OG02enA3Mm0wZjJpczl0bm1hMGF6aiJ9.5Qy_slgirqy66gnGaDmevg`
        );
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.features && data.features[0] && data.features[0].geometry) {
      console.log(data.features[0].geometry.coordinates);
    }
  }, [data]);

  // markers
  const markers = [
    {
      id: 1,
      geocode: [-6.19999, 106.80],
      popUp: "Hello, I am pop up 1"
    },
    {
      id: 2,
      geocode: [-6.2112, 106.82],
      popUp: "Hello, I am pop up 2"
    },
    {
      id: 3,
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
            <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
              <Popup><h2>{marker.popUp}</h2></Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

      </MapContainer>    
    </div>
  );
}

export default App;
