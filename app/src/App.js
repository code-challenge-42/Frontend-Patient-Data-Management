import React, {useState, useEffect, createContext } from 'react';

import PatientList from './Components/PatientList';
import PatientForm from './Components/PatientForm';
import Toast from './Components/Toast';
import { usePatients } from './hooks/usePatients';

export const PatientsContext = createContext();

function App() {
  const [toastData, setToastData] = useState({type: '', message: ''});
  const {
    patients,
    getPatients,
    patientToEdit,
    isPatientFormVisible,
    savePatientCallback,
    onEditPatient,
    togglePatientForm
  } = usePatients();
  
  useEffect(() => {
      getPatients();
  }, []);

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
