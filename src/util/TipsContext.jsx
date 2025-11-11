
import { createContext, useState } from "react";

export const TipsContext = createContext();

export const TipsProvider = ({ children }) => {
    const [tips, setTips] = useState(() => {
        return parseInt(localStorage.getItem('tips')) || 0;
    });

    const updateTips = (newTips) => {
        localStorage.setItem('tips', newTips);
        setTips(newTips);
    };

    return (
        <TipsContext.Provider value={{ tips, updateTips }}>
            {children}
        </TipsContext.Provider>
    );
};
