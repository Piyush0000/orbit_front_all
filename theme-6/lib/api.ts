import { useState, useEffect } from "react";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api/storefront/public";

class StorefrontAPI {

    static get subdomain() {
        if (typeof window !== "undefined") {
            const hostname = window.location.hostname;
            const parts = hostname.split(".");

            if (hostname.includes("localhost") && parts.length >= 2 && parts[0] !== "localhost") {
                return parts[0];
            } else if (parts.length > 2) {
                return parts[0];
            }
        }

        return process.env.NEXT_PUBLIC_SUBDOMAIN || "preview";
    }

    static async getStoreCustomization() {
        try {
            const res = await fetch(
                `${API_BASE_URL}/${this.subdomain}/customization`
            );

            const data = await res.json();

            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }
}

export function useStore() {
    const [customization, setCustomization] = useState(null);

    useEffect(() => {
        StorefrontAPI.getStoreCustomization().then(data => {
            if (data) setCustomization(data);
        });
    }, []);

    return { customization };
}