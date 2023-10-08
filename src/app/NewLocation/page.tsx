// AdminForm.js
'use client';
import React, { useState } from 'react';
import MapComponent from './map';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Router } from 'next/router';
function LocationForm() {
    const [isMapVisible, setIsMapVisible] = useState(false);
    const router = useRouter();
    const [error, setError] = useState(null); //error message
    const [formData, setFormData] = useState({
        title: "",
        city: "",
        country: "",
        latitude: "",
        longitude: "",
        description: "",
    });

    const handleToggleMapVisibility = () => {
        setIsMapVisible(!isMapVisible);
    };

    const handleMarkerDragEnd = (coordinates: google.maps.LatLngLiteral) => {
        setFormData(prevState => ({
            ...prevState,
            latitude: coordinates.lat.toString(),
            longitude: coordinates.lng.toString(),
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addNewLocationToAPI();
        console.log(formData);
        router.push('/Locations');
    };
    //api link: http://188.68.247.32:9000/api/locations/
    const addNewLocationToAPI = async () => {

        const response = await fetch('http://188.68.247.32:9000/api/locations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        //check if response is ok
        if (!response.ok) {
            throw new Error(response.statusText)
        }
    }


    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Image
                className="mb-4 dark:drop-shadow-[0_0_0.3rem_#ffffff70] object-cover"
                src="/img/logo.jpg"
                alt="Logo"
                width={180}
                height={37}
                priority
            />
            <button type='button' className="px-4 py-2 bg-cyan-500 text-white rounded"
                onClick={() => router.push('/Locations')}>List of locations
            </button>

            <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
                {error && <p>{error}</p>}
                <h2 className="text-center text-2xl font-bold text-cyan-600 drop-shadow-[0_0_0.3rem_#ffffff70]">Dodaj lokalizację</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Wprowadź nazwę"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Wprowadź miasto"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                            Country
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="country"
                            name="country"
                            type="text"
                            placeholder="Wprowadź kraj"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                            Latitude
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="latitude"
                            name="latitude"
                            type="text"
                            placeholder="Enter latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
                            Longitude
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="longitude"
                            name="longitude"
                            type="text"
                            placeholder="Enter longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                        onClick={handleToggleMapVisibility}>
                        {isMapVisible ? 'Enter manually' : 'Show MAP 🌍'}
                    </button>
                    {isMapVisible ? (
                        <MapComponent onMarkerDragEnd={handleMarkerDragEnd} />
                    ) : (
                        <p>Kosmiczne kapibary boom boom</p>
                    )}
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LocationForm;
