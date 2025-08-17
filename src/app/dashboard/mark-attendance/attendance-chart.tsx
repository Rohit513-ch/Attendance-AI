
'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { AttendanceRecord } from '@/app/dashboard/attendance-details/page';
import { format } from 'date-fns';

interface AttendanceChartProps {
    data: AttendanceRecord[];
}

export function AttendanceChart({ data }: AttendanceChartProps) {
    const chartData = useMemo(() => {
        if (!data || data.length === 0) {
            return [
                { name: 'Mon', present: 0, absent: 0 },
                { name: 'Tue', present: 0, absent: 0 },
                { name: 'Wed', present: 0, absent: 0 },
                { name: 'Thu', present: 0, absent: 0 },
                { name: 'Fri', present: 0, absent: 0 },
                { name: 'Sat', present: 0, absent: 0 },
            ];
        }

        const dailyData: { [key: string]: { present: number; absent: number } } = {
            'Mon': { present: 0, absent: 0 },
            'Tue': { present: 0, absent: 0 },
            'Wed': { present: 0, absent: 0 },
            'Thu': { present: 0, absent: 0 },
            'Fri': { present: 0, absent: 0 },
            'Sat': { present: 0, absent: 0 },
        };

        data.forEach(record => {
            try {
                const dayOfWeek = format(new Date(record.date), 'EEE');
                if (dailyData[dayOfWeek]) {
                    if (record.status === 'Present') {
                        dailyData[dayOfWeek].present++;
                    } else if (record.status === 'Absent') {
                        dailyData[dayOfWeek].absent++;
                    }
                }
            } catch (e) {
                // Ignore invalid dates
            }
        });
        
        return Object.entries(dailyData).map(([name, values]) => ({
            name,
            ...values,
        }));

    }, [data]);

    return (
        <div className="w-full h-[300px] text-black">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: 'var(--radius)'
                        }}
                        labelStyle={{
                            color: 'hsl(var(--foreground))'
                        }}
                    />
                    <Legend wrapperStyle={{fontSize: "14px"}} />
                    <Bar dataKey="present" fill="#4CAF50" name="Present" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Absent" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
