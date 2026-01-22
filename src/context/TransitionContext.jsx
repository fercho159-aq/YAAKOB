import React, { createContext, useState, useContext } from 'react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [navigateCallback, setNavigateCallback] = useState(null);

    const startTransition = (callback) => {
        setIsTransitioning(true);
        setNavigateCallback(() => callback);
    };

    const completeTransition = () => {
        setIsTransitioning(false);
        if (navigateCallback) {
            navigateCallback();
            setNavigateCallback(null);
        }
    };

    return (
        <TransitionContext.Provider value={{ isTransitioning, startTransition, completeTransition }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => useContext(TransitionContext);
