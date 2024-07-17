import React, {useState} from 'react';
import isUrlHttp from 'is-url-http';


function PatientForm({onSavePatient, onCancel}) {
    const [patient, setPatient] = useState({
        name: '',
        avatar: '',
        website: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type='text' value={patient.name} onChange={handleChange} /><br />
            {errors.name && <i>{errors.name}</i> }
            <br />

            <label htmlFor="avatar">Avatar</label>
            <input id="avatar" name="avatar" type='text' value={patient.avatar} onChange={handleChange} /><br />
            {errors.avatar && <i>{errors.avatar}</i> }
            <br />

            <label htmlFor="website">Website</label>
            <input id="website" name="website" type='text' value={patient.website} onChange={handleChange} /><br />
            {errors.website && <i>{errors.website}</i> }
            <br />
            
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={patient.description} onChange={handleChange} /><br />
            {errors.description && <i>{errors.description}</i> }
            <br />
            
            
            <button>Save</button><br /><br />
            <button onClick={onCancel}>Cancel</button>
            
        </form>
    );
}

export default PatientForm;