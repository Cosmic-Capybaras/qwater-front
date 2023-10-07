'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image';
const NewTestForLocation = () => {
    const router = useRouter();
    const params = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState<number | null>(null);
    const [testTypes, setTestTypes] = useState<any>(null);
    const [formData, setFormData] = useState<FormData>({
        testDate: "",
        location: location,
        data_values: [],
        description: "",
        status: 0
    });


    useEffect(() => {
        document.title = "New test for location";
        setLocation(parseInt(params.get('location')!, 10));
        getTestTypes();
        setFormData({
            ...formData,
            location: location!,
        });
    }, []);

    useEffect(() => {
        if (testTypes) {
            const locationValue = params.get('location');
            setFormData(prevFormData => ({
                ...prevFormData,
                location: locationValue ? parseInt(locationValue, 10) : null,
            }));
        }
    }, [testTypes]);



    const getTestTypes = async () => {
        try {
            const response = await fetch("http://188.68.247.32:9000/api/data-types/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setTestTypes(data);
            console.log(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    type Test = {
        testTypeId: number;
        value: number;
    };


    type FormData = {
        testDate: string;
        location: number | null;
        data_values: Test[];
        description?: string;
        status?: number;
    };


    const [formState, setFormState] = useState<FormData>({
        testDate: "",
        location: location,
        status: 0,
        data_values: [],
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name.startsWith("testType-")) {
            const typeId = parseInt(e.target.name.split("-")[1]);
            const inputValue = parseFloat(e.target.value); // konwersja na liczbę
            setFormData(prevFormData => {
                const updatedTests = prevFormData.data_values.map((test) =>
                    test.testTypeId === typeId ? { ...test, value: inputValue } : test
                );
                return { ...prevFormData, data_values: updatedTests };
            });
        } else {
            const { name, value } = e.target;
            setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        }
    };


    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        addNewTestToAPI();
    }

    const addNewTestToAPI = async () => {
        const response = await fetch('http://188.68.247.32:9000/api/data/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
    }

    const backToList = () => {
        router.push('/Locations');
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
            <h1 className="text-4xl font-medium text-white">New test for location</h1>

            <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
                {isLoading ? (
                    <div className="text-white font-medium mt-4 text-red-700 text-center">Download in progress... 🤬</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Date">
                                Date of sample collection
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                    leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                id="Date"
                                type="date"
                                name="testDate"
                                value={formData.testDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                    leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                id="description"
                                name="description"
                                value={formData.description || ''}
                                onChange={handleTextareaChange}
                                placeholder="Enter the description here..."
                            ></textarea>
                        </div>

                        {testTypes.map((testType: any, index: number) => (
                            <div className="mb-4" key={index}>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`testType-${testType.id}`}>
                                    {testType.name}
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full 
                                    py-2 px-3 text-gray-700 
                                        leading-tight focus:outline-none focus:ring-cyan-500 
                                        focus:border-cyan-500"
                                    id={`testType-${testType.id}`}
                                    type="number"
                                    name={`testType-${testType.id}`}
                                    value={(formData.data_values.find((test: Test) => test.testTypeId === testType.id) as Test | undefined)?.value ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white 
                                font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Save
                        </button>
                    </form>
                )}
                <div className="self-start w-full flex justify-between items-start px-4 py-2">
                    <div></div>
                    <button type='button' className="absolute top-0 right-0 m-4 bg-blue-500 
                hover:bg-blue-700 text-white font-bold py-2 px-4 
                    rounded focus:outline-none focus:shadow-outline"
                        onClick={backToList}>
                        Back to list
                    </button>
                </div>
            </div>

        </div>
    );
};

export default NewTestForLocation;