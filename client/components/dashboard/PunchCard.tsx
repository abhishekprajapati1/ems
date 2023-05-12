import React from 'react'
import Image from 'next/image';
import useMe from '@queries/useMe';
import PunchButton from './PunchButton';

const PunchCard = () => {
    const { data, isLoading } = useMe();

    return (
        <div className="bg-white flex items-center justify-between my-4 w-[90%] mx-auto rounded-xl p-10">
            <div>
                <div>
                    <h2 className='font-bold text-gray-800 text-2xl'>Hello, {data?.name}</h2>
                </div>

                <PunchButton />
            </div>
            <div className='w-[10rem] h-[10rem]'>
                <Image src="https://source.unsplash.com/random/?man,women" alt="random image" width={200} height={200} className="w-full h-full rounded-full" />
            </div>
        </div>
    )
}

export default PunchCard