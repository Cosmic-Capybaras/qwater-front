'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
function NewTestForLocation() {
    const router = useRouter();
    const params = useSearchParams();
    const [locationID, setLocationID] = useState<number | null>(null);
    const [typesOfTests, setTypesOfTests] = useState<any>(null);
    const [statuses, setStatuses] = useState<any>(null);
    const [formData, setFormData] = useState<{
        location: number | null;
        status: number;
        description: string;
        test_date: string;
        data_values: DataTypeValue[];
    }>({
        location: locationID,
        status: 1,
        description: "",
        test_date: "",
        data_values: []
    });

    interface DataTypeValue {
        data_type: number;
        value: number | null;
    }

    interface Type {
        name: string;
        id: number;
    }


    useEffect(() => {
        document.title = "New test for location";
        const locationIdString = params.get('locationID');
        if (locationIdString !== null) {
            const locationIdInt = parseInt(locationIdString);
            console.log(locationIdInt);
            setLocationID(locationIdInt);
        }
    }, []);

    useEffect(() => {
        getTypesOfTests(); //download types of tests
        getStatuses();
    }, []);

    const getTypesOfTests = async () => {
        try {
            const response = await fetch("http://188.68.247.32:9000/api/data-types/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setTypesOfTests(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getStatuses = async () => {
        try {
            const response = await fetch("http://188.68.247.32:9000/api/status/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setStatuses(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendDataToApi();
        console.log(formData);
        router.push('/Locations');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "dateOfTest") {
            setFormData(prev => ({ ...prev, test_date: value + "T10:00:00Z" }));
        } else if (typesOfTests && typesOfTests.some((type: Type) => type.name === name)) {
            const newEntry = {
                data_type: typesOfTests.find((type: Type) => type.name === name)?.id,
                value: parseFloat(value), // Convert value to number
            };

            // Filter out the existing entry if it exists and append the new one
            const updatedDataValues = formData.data_values.filter(dataValue => dataValue.data_type !== newEntry.data_type);

            setFormData(prev => ({
                ...prev,
                data_values: [...updatedDataValues, newEntry]
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };



    const sendDataToApi = async () => {
        formData.location = locationID;
        try {
            const response = await fetch("http://188.68.247.32:9000/api/data/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(formData);
        } catch (error) {
            console.log(error);
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

            <button type='button' className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-900"
                onClick={() => router.push('/Locations')}>↗️ Back to list of locations
            </button>

            <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
                <h2 className="text-center text-2xl font-bold text-cyan-600 
                    drop-shadow-[0_0_0.3rem_#ffffff70]">
                    Add new test data [ID: {locationID}]
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfTest">
                            Date of test
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 
                            text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type='date'
                            name='dateOfTest'
                            id='dateOfTest'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testStatus">
                            Test Status
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                            id="testStatus"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {statuses && statuses.map((status: { id: number, title: string, description: string }) => ( // 3. Dodaj typ dla status
                                <option key={status.id} value={status.id}>
                                    [{status.id}] {status.title} - {status.description}
                                </option>
                            ))}
                        </select>
                    </div>


                    {typesOfTests && typesOfTests.map((type: any) => (
                        <div className="mb-4" key={type.id}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={type.name}>
                                {type.name}
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                step={0.01}
                                name={type.name}
                                id={type.name}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type='text'
                            name='description'
                            id='description'
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button type='submit' className="w-full bg-emerald-500 text-white 
                    font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                    hover:bg-emerald-900">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewTestForLocation;