import React, { useState } from 'react'
import { EquipmentItemRow } from './EquipmentReq'
import TextArea from './TextArea'

const ShootingInfo = () => {
    const [shootingInfoText, setShootingInfoText] = useState("")
    return (
        <div className="mt-6 border border-gray-400 rounded-xl p-4 text-sm space-y-4">
            <EquipmentItemRow label='Shooting Information' />

            <TextArea setValue={setShootingInfoText} value={shootingInfoText} label='Shooting Information' placeholder='Write a shooting information' />
        </div>
    )
}

export default ShootingInfo