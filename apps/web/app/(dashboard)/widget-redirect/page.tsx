"use client";

import { useOrganization } from "@clerk/nextjs";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const getWidgetBaseUrl = () => {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        return "http://localhost:3001";
    }
    return "https://cortex-widget-utk.vercel.app";
};

const WidgetRedirectPage = () => {
    const { organization, isLoaded } = useOrganization();

    useEffect(() => {
        if (!isLoaded) return;

        if (organization?.id) {
            window.location.href = `${getWidgetBaseUrl()}/?organizationId=${organization.id}`;
        }
    }, [isLoaded, organization]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm text-muted-foreground">
                Redirecting to widget...
            </p>
        </div>
    );
};

export default WidgetRedirectPage;
