import { useEffect, useState } from 'react';
import usePunchInfo from '@queries/usePunchInfo';
import usePunchInCreate from '@mutations/punch/usePunchInCreate';
import dayjs from 'dayjs';



const PunchButton = () => {
    const { data, isLoading } = usePunchInfo();
    const { mutate: punch_in } = usePunchInCreate();
    const [workedTime, setWorkedTime] = useState("");


    useEffect(() => {
        if (!isLoading) {
            setInterval(() => {
                const end = dayjs();
                const start = dayjs(data.start);
                const diff = end.diff(start, 'm');
                let hours = Math.floor(diff / 60);
                let remainingMins = diff % 60;
                setWorkedTime(`${hours} : ${remainingMins}`);
            }, 1000);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="mt-4">
            {
                !data ?
                    <button onClick={() => punch_in()} className="bg-green-600 px-4 py-2 rounded text-white">Punch in</button> :
                    <div className="flex items-center gap-6">
                        <div>{workedTime}</div>
                        <button className="bg-gray-600 px-4 py-2 rounded text-white">Punch out</button>
                    </div>
            }
        </div>
    )
}

export default PunchButton