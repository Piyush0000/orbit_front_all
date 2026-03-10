"use client";

import { createContext, useContext, ReactNode } from "react";
import { useStore } from "@/lib/api";

interface StoreCustomization {
    primaryColor?: string;
    secondaryColor?: string;
    logo?: string;
    banner?: string;
    [key: string]: any;
}

interface StoreContextType {
    customization: StoreCustomization | null;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
    const storeData = useStore();

    return (
        <StoreContext.Provider value={storeData}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStoreContext() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStoreContext must be used within a StoreProvider");
    }
    return context;
}
