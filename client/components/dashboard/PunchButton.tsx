import React from 'react';
import usePunchInfo from '@queries/usePunchInfo';



const PunchButton = () => {
    const { data, isLoading } = usePunchInfo();

    console.log("see punch info", data);

    return (
        <div className="mt-4">
            asdfkl
            <button className="bg-green-600 px-4 py-2 rounded text-white">Punch in</button>
        </div>
    )
}

export default PunchButton