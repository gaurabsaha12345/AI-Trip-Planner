
import React from 'react';

const LoadingSpinner: React.FC = () => {
    const messages = [
        "Crafting your perfect journey...",
        "Consulting the travel globes...",
        "Packing your virtual bags...",
        "Charting the best routes...",
        "Finding hidden gems..."
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(messages[Math.floor(Math.random() * messages.length)]);
        }, 3000);

        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-xl font-semibold text-gray-700 transition-opacity duration-500">{message}</p>
        </div>
    );
};

export default LoadingSpinner;
