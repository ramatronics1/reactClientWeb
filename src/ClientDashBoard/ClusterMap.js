import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

const ClusterMap = () => {
  const [data, setData] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hotelsDisplay');
      if (response.data) {
        setData(response.data)
      }
    } catch (error) {
      console.error('Error fetching hotels', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhc2hhbmstZ3VydWthciIsImEiOiJjbGtwcXI4ZjgybTIxM2prZ3dpNmQ4dWtqIn0.oDl1b4ApWzfljGg8dXSOBQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [76.6417743289852, 12.281808553148265],
      zoom: 16
    });

    map.on('load', () => {
      map.addSource('hotels', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: data.map(hotel => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: hotel.geometry.coordinates
            },
            properties: {
              name: hotel.name,
              description: hotel.description,
              _id:hotel._id
            }
          }))
        }
      });

      map.addLayer({
        id: 'hotels-layer',
        type: 'circle',
        source: 'hotels',
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      map.on('click', 'hotels-layer', (e) => {
        const { properties } = e.features[0];
        const { _id } = properties;
        console.log(properties)
      
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`<a href="/Admin/hotel/${_id}">View Hotel</a>`)
          .addTo(map);
      });
      

      map.on('mouseenter', 'hotels-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'hotels-layer', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => map.remove();
  }, [data]);

  return (
    <div>
      <div id='map' style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default ClusterMap;