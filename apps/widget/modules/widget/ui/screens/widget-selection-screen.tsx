"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { useAtomValue, useSetAtom } from "jotai";
import { ChevronRightIcon, MessageSquareTextIcon, MicIcon, PhoneIcon } from "lucide-react";
import { contactSessionIdAtomFamily, conversationIdAtom, errorMessageAtom, hasVapiSecretsAtom, organizationIdAtom, screenAtom, widgetSettingsAtom } from "../../atoms/widget-atoms";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useState } from "react";
import { WidgetFooter } from "../components/widget-footer";

export const WidgetSelectionScreen = () => {
    const setScreen = useSetAtom(screenAtom);
    const setErrorMessage = useSetAtom(errorMessageAtom);
    const setConversationId = useSetAtom(conversationIdAtom);
    const widgetSettings = useAtomValue(widgetSettingsAtom);
    const hasVapiSecrets = useAtomValue(hasVapiSecretsAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const contactSessionId = useAtomValue(
        contactSessionIdAtomFamily(organizationId || ""),
    );

    const createConversation = useMutation(api.public.conversations.create);
    const [isPending, setIsPending] = useState(false);

    const handleNewConversation = async () => {
        if (!organizationId) {
            setScreen("error");
            setErrorMessage("Missing Organization ID");
            return;
        }

        if (!contactSessionId) {
            setScreen("auth");
            return;
        }
        setIsPending(true);
        try {
            const conversationId = await createConversation({
                contactSessionId,
                organizationId,
            });
            setConversationId(conversationId);
            setScreen("chat");
        } catch {
            setScreen("auth");
        } finally {
            setIsPending(false);
        }

    };


    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-1 px-1 py-5 font-semibold">
                    <p className="text-2xl font-bold">
                        Hi there! 👋
                    </p>
                    <p className="text-sm font-normal opacity-85">
                        How can we help you today?
                    </p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col gap-y-3 p-4 overflow-y-auto">
                <button
                    className="group flex w-full items-center gap-4 rounded-xl border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={handleNewConversation}
                    disabled={isPending}
                >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <MessageSquareTextIcon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold">Start chat</span>
                        <p className="text-xs text-muted-foreground mt-0.5">Chat with our AI assistant</p>
                    </div>
                    <ChevronRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </button>
                {hasVapiSecrets && widgetSettings?.vapiSettings?.assistantId && (
                    <button
                        className="group flex w-full items-center gap-4 rounded-xl border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => setScreen("voice")}
                        disabled={isPending}
                    >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600 transition-colors group-hover:bg-green-500 group-hover:text-white">
                            <MicIcon className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-sm font-semibold">Start voice call</span>
                            <p className="text-xs text-muted-foreground mt-0.5">Talk to us directly</p>
                        </div>
                        <ChevronRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </button>
                )}
                {hasVapiSecrets && widgetSettings?.vapiSettings?.phoneNumber && (
                    <button
                        className="group flex w-full items-center gap-4 rounded-xl border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => setScreen("contact")}
                        disabled={isPending}
                    >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                            <PhoneIcon className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-sm font-semibold">Call us</span>
                            <p className="text-xs text-muted-foreground mt-0.5">Reach us by phone</p>
                        </div>
                        <ChevronRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </button>
                )}
            </div>

            <WidgetFooter />
        </>
    );
}
