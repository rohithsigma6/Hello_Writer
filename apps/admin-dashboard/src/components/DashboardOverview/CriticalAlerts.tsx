// import React from 'react'
import RedFire from '@/assets/dashboardOverview/redFire.svg'
import SunBurn from '@/assets/dashboardOverview/sun.svg'
import Tickets from '@/assets/dashboardOverview/toolRinche.svg'

const CriticalAlerts = () => {
    return (
        <div className="p-4 flex-1 w-full border-[1px] border-gray-300 rounded-xl">
            <h1 className="font-semibold text-lg">Critical Alerts</h1>

            <div className="flex flex-row gap-4 flex-wrap mt-4">
                {[
                    { title: "Unusual login activity detected", reason: "login", time: 600000 },
                    { title: "High server load on US-EAST", reason: "server", time: 600000 },
                    { title: "Spike in support tickets", reason: "tickets", time: 600000 },
                ].map(({ title, reason, time }) => (
                    <div key={`${title}-${reason}`} className="flex w-[49%] flex-row items-center justify-between p-4 border-[1px] border-gray-300 rounded-xl">
                        <section className='flex flex-row gap-4'>
                            <RightIcon name={reason} />
                            <div className='flex flex-col gap-0.5'>
                                <p className='font-medium'>{title}</p>
                                <p className='text-sm text-[#6A6A75]'>{time / 60}</p>
                            </div>
                        </section>

                        <section>
                            <button className='text-[#653EFF] font-semibold cursor-pointer hover:underline'>View</button>
                        </section>
                    </div>
                ))}
            </div>
        </div>
    )
}

const RightIcon = ({ name }: { name: string }) => {
    return (
        <img
            src={name == "login" ?
                RedFire : name == "server" ?
                    SunBurn : Tickets}
            alt="Icon"
            className='w-12 h-12'
        />
    )
}

export default CriticalAlerts