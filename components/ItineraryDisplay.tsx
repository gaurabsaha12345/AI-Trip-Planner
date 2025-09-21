import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Itinerary, TripPreferences } from '../types';
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon, PrinterIcon, ArrowPathIcon, ChevronDownIcon } from './IconComponents';
import BookingModal from './BookingModal';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  preferences: TripPreferences;
  onStartOver: () => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary, preferences, onStartOver }) => {
    const [openDay, setOpenDay] = useState<number | null>(1);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const toggleDay = (day: number) => {
        setOpenDay(openDay === day ? null : day);
    };

    const handlePrint = () => {
        window.print();
    };

    const costData = itinerary.costBreakdown.map(item => ({ name: item.category, value: item.amount }));

    const mapSrc = `https://www.google.com/maps/embed/v1/search?key=${process.env.API_KEY}&q=tourist+attractions+in+${encodeURIComponent(itinerary.destination)}`;

    return (
        <>
            <div className="animate-fade-in max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
                    <h1 className="text-4xl font-extrabold text-gray-800">{itinerary.tripTitle}</h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-gray-600">
                        <div className="flex items-center gap-2"><MapPinIcon className="h-5 w-5 text-blue-500" /><span>{itinerary.destination}</span></div>
                        <div className="flex items-center gap-2"><CalendarIcon className="h-5 w-5 text-green-500" /><span>{itinerary.duration} ({preferences.startDate} to {preferences.endDate})</span></div>
                        <div className="flex items-center gap-2"><CurrencyDollarIcon className="h-5 w-5 text-yellow-500" /><span>Est. Total: ${itinerary.totalCost.toLocaleString()}</span></div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4">
                        <button onClick={handlePrint} className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">
                            <PrinterIcon className="h-5 w-5" /> Print / Save
                        </button>
                        <button onClick={onStartOver} className="flex items-center gap-2 bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-lg hover:bg-gray-300 transition-colors">
                            <ArrowPathIcon className="h-5 w-5" /> Start Over
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Daily Plan */}
                    <div className="lg:col-span-2 space-y-4">
                        {itinerary.dailyPlan.map(dayPlan => (
                            <div key={dayPlan.day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <button onClick={() => toggleDay(dayPlan.day)} className="w-full flex justify-between items-center p-5 text-left">
                                    <div className="flex items-center">
                                        <span className="text-xl font-bold text-blue-600 mr-4">Day {dayPlan.day}</span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{dayPlan.theme}</h3>
                                            <p className="text-sm text-gray-500">{dayPlan.date}</p>
                                        </div>
                                    </div>
                                    <ChevronDownIcon className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${openDay === dayPlan.day ? 'rotate-180' : ''}`} />
                                </button>
                                {openDay === dayPlan.day && (
                                    <div className="px-5 pb-5 border-t border-gray-200 animate-fade-in-down">
                                        <ul className="mt-4 space-y-4">
                                            {dayPlan.activities.map((activity, index) => (
                                                <li key={index} className="flex gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-20 text-center text-sm font-semibold text-blue-700 bg-blue-100 rounded-md py-1">{activity.time}</div>
                                                        <div className="flex-grow w-px bg-gray-300 my-1"></div>
                                                    </div>
                                                    <div className="pb-4 w-full">
                                                        <h4 className="font-semibold text-gray-800">{activity.description}</h4>
                                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                                            <span className="bg-gray-200 px-2 py-0.5 rounded-full mr-2">{activity.type}</span>
                                                            <span>Est. Cost: ${activity.cost}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Map & Costs */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Explore Destination</h3>
                            <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-gray-200">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    src={mapSrc}>
                                </iframe>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">A visual overview of your journey's key locations.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Cost Breakdown</h3>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        {/* FIX: The 'percent' prop from recharts can be inferred as a non-numeric type by TypeScript.
                                            Using `Number(percent || 0)` ensures the value is a number before multiplication, resolving the type error. */}
                                        <Pie data={costData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label={({ name, percent }) => `${name} ${(Number(percent || 0) * 100).toFixed(0)}%`}>
                                            {costData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl text-white text-center shadow-lg">
                            <h3 className="text-xl font-bold mb-2">Ready to Book?</h3>
                            <p className="text-sm opacity-90 mb-4">Finalize your dream trip! We'll hand you off to our secure booking system.</p>
                            <button 
                                onClick={() => setIsBookingModalOpen(true)}
                                className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors w-full">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isBookingModalOpen && <BookingModal onClose={() => setIsBookingModalOpen(false)} />}
        </>
    );
};

export default ItineraryDisplay;