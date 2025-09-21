
import React, { useState } from 'react';
import type { TripPreferences } from '../types';
import { CalendarIcon, MapPinIcon, CurrencyDollarIcon, SparklesIcon, ClockIcon, ArrowRightIcon, ArrowLeftIcon } from './IconComponents';

interface PreferenceFormProps {
  onSubmit: (preferences: TripPreferences) => void;
}

const interestsOptions = [
  'Adventure', 'Culture', 'Nightlife', 'Wellness', 'Shopping', 'Family-Friendly', 'Foodie', 'History', 'Nature'
];

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TripPreferences>({
    destination: '',
    budget: '1000',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
    interests: [],
    pace: 'moderate',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interests.length === 0) {
      alert("Please select at least one interest.");
      return;
    }
    onSubmit(formData);
  };
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Plan Your Next Adventure</h1>
      <p className="text-center text-gray-500 mb-8">Let our AI craft the perfect trip for you. Just a few details and you're set!</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-700">Where & When?</h2>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" name="destination" id="destination" value={formData.destination} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Paris, France" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleInputChange} min={today} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                </div>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleInputChange} min={formData.startDate} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
             <h2 className="text-xl font-semibold text-gray-700">Your Style</h2>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget (USD)</label>
               <div className="relative">
                <CurrencyDollarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="number" name="budget" id="budget" value={formData.budget} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 2000" min="100" required />
              </div>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pace</label>
              <div className="flex justify-center space-x-2 sm:space-x-4">
                {(['relaxed', 'moderate', 'packed'] as const).map((pace) => (
                  <button type="button" key={pace} onClick={() => setFormData(p => ({...p, pace}))} className={`flex-1 py-3 px-2 text-sm sm:text-base rounded-lg transition-all border-2 ${formData.pace === pace ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>
                    {pace.charAt(0).toUpperCase() + pace.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-700">What do you love?</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interests <span className="text-gray-500">(select at least one)</span></label>
                <div className="flex flex-wrap gap-3">
                {interestsOptions.map((interest) => (
                    <button type="button" key={interest} onClick={() => handleInterestToggle(interest)} className={`py-2 px-4 rounded-full text-sm font-medium transition-colors border ${formData.interests.includes(interest) ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'}`}>
                    {interest}
                    </button>
                ))}
                </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                <ArrowLeftIcon className="h-5 w-5" />
                Back
            </button>
          ) : <div></div>}
          
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Next
                <ArrowRightIcon className="h-5 w-5" />
            </button>
          ) : (
            <button type="submit" className="flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                <SparklesIcon className="h-5 w-5" />
                Generate Trip
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PreferenceForm;
