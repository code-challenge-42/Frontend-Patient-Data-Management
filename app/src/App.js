import React, {useState, useEffect, createContext } from 'react';
import moment from 'moment';
import axios from 'axios';

import PatientList from './Components/PatientList';
import PatientForm from './Components/PatientForm';
import Toast from './Components/Toast';

const API_PATIENTS_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

export const PatientsContext = createContext();

function App() {
  const [toastData, setToastData] = useState({type: '', message: ''});
  const [patientToEdit, setPatientToEdit] = useState(false);
  const [isPatientFormVisible, setIsPatientFormVisible] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
      getPatients();
  }, []);

  useEffect(() => {
      if(!isPatientFormVisible)
          setPatientToEdit(false)
  }, [isPatientFormVisible]);

  const getPatients = () => {
      axios.get(API_PATIENTS_URL).then((response) => {
          setPatients(response.data);
      });
  }

  const showToast = (type, message) => {
      setToastData({
          type: type,
          message: message
      });
      setTimeout(onToastClose, 3000);
  }

  const onToastClose = () => {
      setToastData({
          type: '',
          message: ''
      });
  }

  const togglePatientForm = () => setIsPatientFormVisible(!isPatientFormVisible);

  const getMaxPatientId = () => Math.max(...patients.map(o => o.id));

  const savePatientCallback = (patient) => {
      if(patient.id !== '') {
          const updatedPatientsList = patients.map((p) => p.id === patient.id ? patient : p);
          setPatients(updatedPatientsList);
      }
      else {
          const maxPatientId = getMaxPatientId();
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
      showToast('success', 'User saved!');
      togglePatientForm();
  }

  const onEditPatient = (patient) => {
      setPatientToEdit(patient);
      togglePatientForm();
  };

  return (
    <PatientsContext.Provider value={patients}>
        <div className="p-4 flex items-center justify-between">
            <div><h1 className="font-semibold">Patients</h1></div>
            <div><button className='bg-blue-700 text-white px-4 py-2 rounded-md' onClick={togglePatientForm}>Add new patient</button></div>
        </div>

        <Toast toastData={toastData} onClose={onToastClose}  />
        
        {isPatientFormVisible && <PatientForm onSavePatient={savePatientCallback} onCancel={togglePatientForm} patientToEdit={patientToEdit} />}

        <div className="grid grid-cols-4 gap-4">
            <PatientList onEditPatient={onEditPatient} />
        </div>
    </PatientsContext.Provider>
  );
}

export default App;
