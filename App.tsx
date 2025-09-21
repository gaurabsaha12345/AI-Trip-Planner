
import React, { useState } from 'react';
import type { TripPreferences, Itinerary } from './types';
import { generateTripItinerary } from './services/geminiService';
import PreferenceForm from './components/PreferenceForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<TripPreferences | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateItinerary = async (prefs: TripPreferences) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setPreferences(prefs);

    try {
      const generatedItinerary = await generateTripItinerary(prefs);
      setItinerary(generatedItinerary);
    } catch (err) {
      console.error(err);
      setError(
        'Failed to generate itinerary. The model may be unavailable or the request timed out. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setPreferences(null);
    setItinerary(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">An Error Occurred</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleStartOver}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        ) : itinerary && preferences ? (
          <ItineraryDisplay
            itinerary={itinerary}
            preferences={preferences}
            onStartOver={handleStartOver}
          />
        ) : (
          <PreferenceForm onSubmit={handleGenerateItinerary} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
