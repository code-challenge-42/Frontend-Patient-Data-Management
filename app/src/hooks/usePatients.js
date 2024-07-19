import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

export const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [patientToEdit, setPatientToEdit] = useState(false);
    const [isPatientFormVisible, setIsPatientFormVisible] = useState(false);
    
    const API_PATIENTS_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

    useEffect(() => {
        if(!isPatientFormVisible)
            setPatientToEdit(false)
    }, [isPatientFormVisible]);

    const getPatients = () => {
        axios.get(API_PATIENTS_URL).then((response) => {
            setPatients(response.data);
        });
    }

    const togglePatientForm = () => setIsPatientFormVisible(!isPatientFormVisible);

    const _getMaxPatientId = () => Math.max(...patients.map(o => o.id));

    const savePatientCallback = (patient) => {
        if(patient.id !== '') {
            const updatedPatientsList = patients.map((p) => p.id === patient.id ? patient : p);
            setPatients(updatedPatientsList);
        }
        else {
            const maxPatientId = _getMaxPatientId();
            const newPatient = {
                ...patient,
                id: maxPatientId + 1,
                createdAt: moment().format()
            }
            
            setPatients([
                ...patients,
                newPatient
            ]);
        }
        //showToast('success', 'User saved!');
        togglePatientForm();
    }

    const onEditPatient = (patient) => {
        setPatientToEdit(patient);
        togglePatientForm();
    };

    return { 
        patients,
        getPatients,
        patientToEdit,
        isPatientFormVisible,
        savePatientCallback,
        onEditPatient,
        togglePatientForm
    }
  }