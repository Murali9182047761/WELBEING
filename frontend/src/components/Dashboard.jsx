import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Dashboard = ({ data }) => {
    if (!data) return null;

    const screenTimeData = [
        { name: 'Work', value: parseFloat(data.Work_Screen_Time) },
        { name: 'Social', value: parseFloat(data.Social_Media_Hours) },
        { name: 'Gaming', value: parseFloat(data.Gaming_Hours) },
    ].filter(d => d.value > 0);

    const COLORS = ['#6366f1', '#ec4899', '#8b5cf6'];

    const comparisonData = [
        { name: 'Sleep', User: parseFloat(data.Sleep_Hours), Recommended: 8 },
        { name: 'Activity', User: parseFloat(data.Physical_Activity_Hours), Recommended: 1 },
    ];

    return (
        <div className="grid grid-cols-1 gap-6">
            <div className="card">
                <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Screen Time Distribution</h4>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={screenTimeData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {screenTimeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card">
                <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Lifestyle Comparison</h4>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData}>
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Legend />
                            <Bar dataKey="User" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Recommended" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
