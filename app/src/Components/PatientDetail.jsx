import React, {useState} from 'react';
import moment from 'moment';

function PatientDetail({patient, onEditPatient}) {
    const [displayAdditionalInfo, setDisplayAdditionalInfo] = useState(false);
    
    const formatDate = (date) => moment.utc(date).format("DD/MM/YYYY");
    const toggleAdditionalInfo = () => setDisplayAdditionalInfo(!displayAdditionalInfo);
    const getToggleAdditionalInfoLabel = () => displayAdditionalInfo ? 'Hide': 'Show more...'

    return (
        <div className='w-full max-w-sm bg-white border my-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className="flex flex-col items-center pb-10 pt-4">
                <img src={patient.avatar} alt={patient.name} className="w-24 h-24 mb-3 rounded-full shadow-lg" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{patient.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400"><a href={patient.website} target='_blank' rel="noreferrer">{patient.website}</a></span>
                {displayAdditionalInfo && <div className='p-4'>
                    {patient.description}<br />
                    
                    <b>Joined:</b> {formatDate(patient.createdAt)}<br />
                </div>}
                <div className="flex mt-4 md:mt-6">
                    <a href="#!" onClick={toggleAdditionalInfo} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{getToggleAdditionalInfoLabel()}</a>
                    <a href="#!" onClick={() => onEditPatient(patient)} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Edit</a>
                </div>
            </div>
        </div>
    );
}

export default PatientDetail;