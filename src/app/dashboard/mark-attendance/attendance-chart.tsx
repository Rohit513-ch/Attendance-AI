
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
    { name: 'Mon', present: 28, absent: 2 },
    { name: 'Tue', present: 29, absent: 1 },
    { name: 'Wed', present: 30, absent: 0 },
    { name: 'Thu', present: 27, absent: 3 },
    { name: 'Fri', present: 25, absent: 5 },
    { name: 'Sat', present: 22, absent: 8 },
];

export function AttendanceChart() {
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
