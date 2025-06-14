import React, { useState } from 'react'
import WelcomePlot from './WelcomePlot'

const Plot = () => {
    const [activePage, setActivePage] = useState<'welcome' | 'initialize'>('welcome')
    return (
        <div className='overflow-y-auto min-h-full w-full'>
            {activePage === "welcome" ?
                <WelcomePlot setPlotStatus={setActivePage} />
                :
                <>
                </>
            }
        </div>
    )
}

export default Plot