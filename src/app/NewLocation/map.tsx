import React from 'react';
import { GoogleMap, useLoadScript, Marker, Library } from '@react-google-maps/api';

const libraries: Library[] = ["places"];

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};
const center = {
    lat: 52.229676, //kooordynaty Warszawy to 52.229676, 21.012229
    lng: 21.012229,
};

type MapComponentProps = {
    onMarkerDragEnd: (coords: { lat: number, lng: number }) => void;
};

function MapComponent({ onMarkerDragEnd }: MapComponentProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCLrKRjcZmBYF97T1DvGrN9oA5VODQO-l4",
        libraries,
    });

    const [marker, setMarker] = React.useState(center);

    const handleDragEnd = (e: google.maps.KmlMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarker({ lat, lng });
            onMarkerDragEnd({ lat, lng });
        }
    };

    if (loadError) return "Błąd ładowania mapy";
    if (!isLoaded) return "Ładowanie mapy...";

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
        >
            <Marker position={marker} draggable={true} onDragEnd={(e: google.maps.MapMouseEvent) => handleDragEnd(e)} />
        </GoogleMap>
    );


}

export default MapComponent;