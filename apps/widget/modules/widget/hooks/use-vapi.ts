import Vapi from "@vapi-ai/web";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { vapiSecretsAtom, widgetSettingsAtom } from "../atoms/widget-atoms";

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
};

export const useVapi = () => {
    const vapiSecrets = useAtomValue(vapiSecretsAtom);
    const widgetSettings = useAtomValue(widgetSettingsAtom);
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
    const [isTransferring, setIsTransferring] = useState(false);

    useEffect(() => {
        if (!vapiSecrets) {
            return;
        }
        const vapiInstance = new Vapi(vapiSecrets.publicApiKey);
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        })
        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        })
        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        })
        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        })
        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI-ERROR");
            setIsConnecting(false);
        })
        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript,
                    }
                ]);

                // Keyword fallback for transfer - STRICTER checks to avoid premature transfer on "would you like to..."
                if (message.role === "assistant" && (
                    message.transcript.toLowerCase().includes("transferring you") ||
                    message.transcript.toLowerCase().includes("connecting you now") ||
                    message.transcript.toLowerCase().includes("please hold while i") ||
                    message.transcript.toLowerCase().includes("transfer you now") ||
                    message.transcript.toLowerCase().includes("i will transfer you") ||
                    message.transcript.toLowerCase().includes("transfer you to a human agent")
                )) {
                    console.log("Transfer triggered by keyword detection");
                    setIsTransferring(true);
                }
            }
            if (message.type === "function-call" && (
                message.functionCall.name === "transferCall" ||
                message.functionCall.name === "escalateToSupport" ||
                message.functionCall.name === "forwardCall"
            )) {
                console.log("Transfer triggered by function call:", message.functionCall.name);
                setIsTransferring(true);
            } else if (message.type === "function-call") {
                console.log("Unhandled function call:", message.functionCall);
            }
        });
        return () => {
            vapiInstance?.stop();
        }

    }, [])

    const startCall = () => {
        if (!vapiSecrets || !widgetSettings?.vapiSettings?.assistantId) {
            return;
        }
        setIsConnecting(true);
        if (vapi) {
            vapi.start(widgetSettings.vapiSettings.assistantId);
        }
    }
    const endCall = () => {
        if (vapi) {
            vapi.stop();
        }
    }
    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall,
        isTransferring,
    }
};
