// contexts/DrawerContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DrawerContextType {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const DrawerProvider: React.FC<Props> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
    {children}
    </DrawerContext.Provider>
);
};

export const useDrawer = (): DrawerContextType => {
    const context = useContext(DrawerContext);
    if (context === undefined) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};