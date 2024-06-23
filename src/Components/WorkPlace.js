import Sidebar from './Sidebar';

import { useState } from 'react';

function WorkPlace() {
    const [currentPlace, setComponents] = useState();
    return (
        <div className="workPlace">
            <Sidebar handlePlace={setComponents}/>
            {currentPlace}
        </div>
    );
}



export default WorkPlace;