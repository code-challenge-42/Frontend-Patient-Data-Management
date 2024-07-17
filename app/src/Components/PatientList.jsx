import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

import PatientDetail from './PatientDetail';
import PatientForm from './PatientForm';

const API_PATIENTS_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [isPatientFormVisible, setIsPatientFormVisible] = useState(false);

    useEffect(() => {
        getPatients()
    }, []);

    const getPatients = () => {
        axios.get(API_PATIENTS_URL).then((response) => {
            setPatients(response.data);
        });
    }

    const togglePatientForm = () => setIsPatientFormVisible(!isPatientFormVisible);

    const getMaxPatientId = () => Math.max(...patients.map(o => o.id))


    const savePatientCallback = (patient) => {
        const maxPatientId = getMaxPatientId()
        const newPatient = {
            id: maxPatientId + 1,
            ...patient,
            createdAt: moment().format()
        }
        
        setPatients([
            ...patients,
            newPatient
        ]);
        togglePatientForm();
    }
    
    return (
        <div>
            <div className="p-4 flex items-center justify-between">
                <div><h1 className="font-semibold">Patients</h1></div>
                <div><button className='bg-blue-700 text-white px-4 py-2 rounded-md' onClick={togglePatientForm}>Add new patient</button></div>
            </div>
            
            {isPatientFormVisible && <PatientForm onSavePatient={savePatientCallback} onCancel={togglePatientForm} />}
            <div className="grid grid-cols-4 gap-4">
                {patients.map((patient) => (
                    <PatientDetail key={patient.id} patient={patient} />
                ))}
            </div>
        </div>
    );
}

export default PatientList;