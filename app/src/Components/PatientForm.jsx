import React, {useState} from 'react';
import isUrlHttp from 'is-url-http';

function PatientForm({onSavePatient, onCancel}) {

    const [errors, setErrors] = useState({});

    const [patient, setPatient] = useState({
        name: '',
        avatar: '',
        website: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({
            ...patient,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(patient);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {
            onSavePatient(patient)
        }
    };

    const validateForm = (data) => {
        const errors = {};
 
        if (!data.name.trim()) {
            errors.name = 'Name is required';
        }
 
        if (!isUrlHttp(data.avatar.trim())) {
            errors.avatar = 'Avatar is required and must be a URL';
        }

        if (!isUrlHttp(data.website.trim())) {
            errors.website = 'Website is required and must be a URL';
        }
        
        if (!data.description.trim()) {
            errors.description = 'Description is required';
        }
 
        return errors;
    };

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <form onSubmit={handleSubmit}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">

                                <div className="col-span-full">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                    <div className="mt-2">
                                        <input id="name" name="name" type="text" 
                                            value={patient.name} onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                    {errors.name && <p className="mt-3 text-sm leading-6 text-red-600">{errors.name}</p> }
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-gray-900">Avatar</label>
                                    <div className="mt-2">
                                        <input id="avatar" name="avatar" type="text" 
                                            value={patient.avatar} onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                    {errors.avatar && <p className="mt-3 text-sm leading-6 text-red-600">{errors.avatar}</p> }
                                </div>
                                
                                <div className="col-span-full">
                                    <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">Website</label>
                                    <div className="mt-2">
                                        <input id="website" name="website" type="text" 
                                            value={patient.website} onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                    {errors.website && <p className="mt-3 text-sm leading-6 text-red-600">{errors.website}</p> }
                                </div>
                                
                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                    <div className="mt-2">
                                        <textarea id="description" name="description" rows="3" 
                                            value={patient.description} onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                    {errors.description && <p className="mt-3 text-sm leading-6 text-red-600">{errors.description}</p> }
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Save</button>
                        <button type="button" onClick={onCancel} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                    </div>
                </div>
                </div>
            </div>
            </form>
        </div>
    );
}

export default PatientForm;