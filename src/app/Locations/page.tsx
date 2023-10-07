'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
const Locations = () => {
    const [locationsData, setLocationsData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const getAllLocations = async () => {
        try {
            const response = await fetch("http://188.68.247.32:9000/api/locations/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setLocationsData(data);
            setIsLoading(false);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllLocations();
        document.title = "Locations";
    }, []);

    const moveToAddNewLocationPage = () => {
        router.push('/NewLocation');
    };

    const addNewTestHandler = async (locationID: Number) => {
        router.push(`/NewTestForLocation?locationID=${locationID}`);
    };

    return (
        <div className="relative min-h-screen bg-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <button type='button' className="absolute top-0 right-0 m-4 px-4 py-2 bg-emerald-500 text-white rounded"
                onClick={moveToAddNewLocationPage}>Add new test location
            </button>
            <Head>
                <title>Locations</title>
                <meta name="description" content="Lokacje" />
                <link rel="icon" href="/img/logo.jpg" />
            </Head>
            <Image
                className="mb-4 dark:drop-shadow-[0_0_0.3rem_#ffffff70] object-cover"
                src="/img/logo.jpg"
                alt="Logo"
                width={180}
                height={37}
                priority
            />
            <div className="p-4">
                <h1 className="text-4xl font-medium text-white">List of locations</h1>
                <div className="flex flex-wrap -m-2">
                    {isLoading ? (
                        <div className="text-white font-medium mt-4">Download in progress... 🤬</div>
                    ) : (
                        locationsData.map((location: {
                            id: number, title: string, city: string, country: string, longitude: number,
                            latitude: number
                        }) => (
                            <div key={location.id} className="m-2 flex-1 min-w-[240px] max-w-[340px] p-4 rounded-lg shadow-md bg-white flex flex-col text-gray-600">
                                <h2 className="text-lg font-medium">{location.title}</h2>
                                <p><strong>City:</strong> {location.city}</p>
                                <p><strong>Country:</strong> {location.country}</p>
                                <p><strong>Longitude:</strong> {location.longitude}</p>
                                <p><strong>Latitude:</strong> {location.latitude}</p>
                                <button type='button' className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                    onClick={async () => await addNewTestHandler(location.id)}>
                                    Add new test
                                </button>
                                <button type='button' className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
                                    Delete location
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Locations;