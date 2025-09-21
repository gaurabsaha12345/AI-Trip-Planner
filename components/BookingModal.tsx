import React, { useState, useEffect } from 'react';
import type { Traveller } from '../types';
import { UserIcon, CakeIcon, IdentificationIcon, XMarkIcon, CheckCircleIcon } from './IconComponents';

interface BookingModalProps {
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ onClose }) => {
  const [travellerCount, setTravellerCount] = useState(1);
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setTravellers(prevTravellers => {
      const newTravellers: Traveller[] = Array.from({ length: travellerCount }, (_, i) => {
        return prevTravellers[i] || {
          id: i + 1,
          fullName: '',
          gender: '',
          dateOfBirth: '',
          verificationId: '',
        };
      });
      return newTravellers;
    });
  }, [travellerCount]);

  const handleTravellerChange = (index: number, field: keyof Omit<Traveller, 'id'>, value: string) => {
    const newTravellers = [...travellers];
    newTravellers[index] = { ...newTravellers[index], [field]: value };
    setTravellers(newTravellers);

    // Clear the specific error when user starts correcting it
    const errorKey = `${index}-${field}`;
    if (errors[errorKey]) {
        const newErrors = { ...errors };
        delete newErrors[errorKey];
        setErrors(newErrors);
    }
  };
  
  const today = new Date().toISOString().split('T')[0];

  const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};
      travellers.forEach((traveller, index) => {
          if (!traveller.fullName.trim()) {
              newErrors[`${index}-fullName`] = 'Full Name is required.';
          }
          if (!traveller.gender) {
              newErrors[`${index}-gender`] = 'Please select a gender.';
          }
          if (!traveller.dateOfBirth) {
              newErrors[`${index}-dateOfBirth`] = 'Date of Birth is required.';
          }
          if (!traveller.verificationId.trim()) {
              newErrors[`${index}-verificationId`] = 'Verification ID is required.';
          }
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        console.log('Booking submitted for:', travellers);
        setIsSubmitted(true);
    }
  };
  
  if (isSubmitted) {
      return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in" aria-modal="true" role="dialog">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                  <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">Your trip is booked. A confirmation email has been sent with all the details.</p>
                  <button
                      onClick={onClose}
                      className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full"
                  >
                      Close
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Trip Registration</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto pr-2" noValidate>
            <div className="mb-6">
                <label htmlFor="travellerCount" className="block text-sm font-medium text-gray-700 mb-1">Number of Travellers</label>
                <input
                type="number"
                id="travellerCount"
                name="travellerCount"
                min="1"
                max="10"
                value={travellerCount}
                onChange={(e) => setTravellerCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
            
            <div className="space-y-6">
                {travellers.map((traveller, index) => (
                    <div key={traveller.id} className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold text-lg text-gray-700 mb-4">Traveller {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`fullName-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input type="text" id={`fullName-${index}`} value={traveller.fullName} onChange={e => handleTravellerChange(index, 'fullName', e.target.value)} className={`w-full pl-10 pr-4 py-2 border ${errors[`${index}-fullName`] ? 'border-red-500' : 'border-gray-300'} rounded-md`} required />
                                </div>
                                {errors[`${index}-fullName`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-fullName`]}</p>}
                            </div>
                             <div>
                                <label htmlFor={`gender-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select id={`gender-${index}`} value={traveller.gender} onChange={e => handleTravellerChange(index, 'gender', e.target.value)} className={`w-full py-2 px-3 border ${errors[`${index}-gender`] ? 'border-red-500' : 'border-gray-300'} rounded-md`} required>
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors[`${index}-gender`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-gender`]}</p>}
                            </div>
                             <div>
                                <label htmlFor={`dob-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <div className="relative">
                                    <CakeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input type="date" id={`dob-${index}`} value={traveller.dateOfBirth} onChange={e => handleTravellerChange(index, 'dateOfBirth', e.target.value)} max={today} className={`w-full pl-10 pr-4 py-2 border ${errors[`${index}-dateOfBirth`] ? 'border-red-500' : 'border-gray-300'} rounded-md`} required />
                                </div>
                                {errors[`${index}-dateOfBirth`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-dateOfBirth`]}</p>}
                            </div>
                            <div>
                                <label htmlFor={`verificationId-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Verification ID (Passport, etc.)</label>
                                <div className="relative">
                                    <IdentificationIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input type="text" id={`verificationId-${index}`} value={traveller.verificationId} onChange={e => handleTravellerChange(index, 'verificationId', e.target.value)} className={`w-full pl-10 pr-4 py-2 border ${errors[`${index}-verificationId`] ? 'border-red-500' : 'border-gray-300'} rounded-md`} required />
                                </div>
                                {errors[`${index}-verificationId`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-verificationId`]}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
              <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              <button type="submit" className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors">Confirm Booking</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
