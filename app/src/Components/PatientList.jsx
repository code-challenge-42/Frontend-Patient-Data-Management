import React, {useContext} from 'react';

import PatientDetail from './PatientDetail';
import { PatientsContext } from '../App';


function PatientList({onEditPatient}) {
    const patients = useContext(PatientsContext);

    return (
        <>
            {patients.map((patient) => (
                <PatientDetail key={patient.id} patient={patient} onEditPatient={onEditPatient} />
            ))}
        </>
    );
}

export default PatientList;