import React, {useState} from 'react';
import moment from 'moment';

function PatientDetail({patient}) {
    const [displayAdditionalInfo, setDisplayAdditionalInfo] = useState(false);
    
    const formatDate = (date) => moment.utc(date).format("DD/MM/YYYY");
    const toggleAdditionalInfo = () => setDisplayAdditionalInfo(!displayAdditionalInfo);

    return (
        <div>
            <img src={patient.avatar} /><br />
            <b>#{patient.id} - {patient.name}</b><br />
            <button onClick={toggleAdditionalInfo}>Show more info</button>
            {displayAdditionalInfo && <div>
                {patient.description}<br />
                <b>Website:</b> <a href={patient.website} target='_blank'>{patient.website}</a><br />
                <b>Joined:</b> {formatDate(patient.createdAt)}<br />
            </div>}
        </div>
    );
}

export default PatientDetail;