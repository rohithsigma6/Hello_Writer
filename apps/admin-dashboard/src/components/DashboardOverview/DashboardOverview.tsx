// import React from 'react'
import Users from '@/assets/dashboardOverview/users.svg'
import Revenue from '@/assets/dashboardOverview/revenue.svg'
import ActiveSessions from '@/assets/dashboardOverview/active.svg'
import Tickets from '@/assets/dashboardOverview/tickets.svg'
import { AiOutlineFall, AiOutlineRise } from 'react-icons/ai'
import SubscriptionTrends from './SubscriptionTrends'
import SubscriptionMetrics from './SubscriptionMetrics'
import CriticalAlerts from './CriticalAlerts'
import { useRevenueStats, useVerifiedUsersCount } from './api/fetchOverviewValues'

const DashboardOverview = () => {
    const { data: activeUsers } = useVerifiedUsersCount();
    const { data: revenueStats } = useRevenueStats();

    function formatAmount(amount: number): string {
        if (!amount) return "₹0.00"

        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(amount);
    }

    return (
        <div className="p-6 bg-white rounded-2xl font-['Poppins']">
            <h1 className="font-semibold text-xl">Dashboard Overview</h1>

            <div className="flex flex-row gap-4 mt-6">
                {[
                    { name: "Users", value: activeUsers?.count ?? 0, percentage: activeUsers?.percentageChange ?? 0, },
                    { name: "Revenue", value: formatAmount(revenueStats?.thisWeek), percentage: revenueStats?.percentageChange, },
                    { name: "Active Sessions", value: "1,120", percentage: 100 },
                    { name: "Support Tickets", value: "45", percentage: -9 },
                ].map(({ name, percentage, value }) => (
                    <div key={`${name}-${percentage}}`} className='flex flex-1 flex-col gap-3 border-[1px] border-gray-300 rounded-xl p-4'>
                        <MainIcon name={name} />
                        <h4 className='text-[#4D4D5A] text-base font-medium'>{name}</h4>
                        <h1 className='text-3xl font-semibold'>{value}</h1>

                        {name == "Active Sessions" ?
                            <p className={`${percentage > 99 ? 'text-[#653EFF]' : 'text-amber-400'}` + " text-sm"}>
                                All systems opertational
                            </p> :
                            <p className={`${percentage >= 10 ? 'text-[#40BB7B]' : 'text-amber-400'}` + " flex flex-row items-center text-sm font-medium"}>
                                {percentage >= 10 ? <AiOutlineRise /> : <AiOutlineFall />}
                                {percentage > 0 ? "+" : ""}{percentage}%
                                {" "}
                                from last week
                            </p>}
                    </div>
                ))}
            </div>

            <div className='flex flex-row gap-4 mt-6'>
                <SubscriptionTrends />
                <SubscriptionMetrics />
            </div>

            <div className='mt-6'>
                <CriticalAlerts />
            </div>
        </div >
    )
}

const MainIcon = ({ name }: { name: string }) => {
    return (
        <img
            alt="Icon"
            className='w-12 h-12 object-contain'
            src={name === "Users" ?
                Users : name === "Revenue" ?
                    Revenue : name === "Active Sessions" ?
                        ActiveSessions : Tickets}
        />
    )
}

export default DashboardOverview;