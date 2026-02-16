import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import {
    AIConversation,
    AIConversationContent,
    AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
    AIMessage,
    AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon, Loader2, MicIcon, MicOffIcon } from "lucide-react";
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "../../atoms/widget-atoms";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export const WidgetVoiceScreen = () => {
    const setScreen = useSetAtom(screenAtom);
    const {
        isConnected,
        isSpeaking,
        transcript,
        startCall,
        endCall,
        isConnecting,
        isTransferring,
    } = useVapi();

    const organizationId = useAtomValue(organizationIdAtom);
    const contactSessionId = useAtomValue(
        contactSessionIdAtomFamily(organizationId || "")
    );
    const setConversationId = useSetAtom(conversationIdAtom);
    const createEscalated = useMutation(api.public.conversations.createEscalated);

    const [isProcessingTransfer, setIsProcessingTransfer] = useState(false);

    useEffect(() => {
        if (isTransferring && !isProcessingTransfer) {
            const handleTransfer = async () => {
                if (!organizationId || !contactSessionId) return;

                setIsProcessingTransfer(true);
                endCall();

                try {
                    const conversationId = await createEscalated({
                        organizationId,
                        contactSessionId,
                        voiceTranscript: transcript,
                    });
                    setConversationId(conversationId);
                    setScreen("chat");
                } catch (error) {
                    console.error("Failed to escalate conversation:", error);
                    setIsProcessingTransfer(false);
                }
            };

            handleTransfer();
        }
    }, [isTransferring, isProcessingTransfer, organizationId, contactSessionId, transcript, endCall, createEscalated, setConversationId, setScreen]);

    if (isProcessingTransfer) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-background p-6 text-center">
                <Loader2 className="size-10 animate-spin text-primary" />
                <div>
                    <h3 className="text-lg font-semibold">Transferring to agent...</h3>
                    <p className="text-sm text-muted-foreground">Please wait while we connect you to a human agent.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <WidgetHeader>
                <div className="flex items-center gap-x-2">
                    <Button
                        variant="transparent"
                        size="icon"
                        onClick={() => setScreen("selection")}
                    >
                        <ArrowLeftIcon />
                    </Button>
                    <p>Voice Chat</p>
                </div>
            </WidgetHeader>
            {transcript.length > 0 ? (
                <AIConversation className="h-full">
                    <AIConversationContent>
                        {transcript.map((message, index) => (
                            <AIMessage
                                from={message.role}
                                key={`${message.role}-${index}-${message.text}`}
                            >
                                <AIMessageContent>{message.text}</AIMessageContent>
                            </AIMessage>
                        ))}
                    </AIConversationContent>
                    <AIConversationScrollButton />

                </AIConversation>
            ) : (
                <div className="flex flex-1 h-full flex-col items-center justify-center gap-y-4">
                    <div className="flex items-center justify-center rounded-full border bg-white p-3">
                        <MicIcon className="size-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Transcript will appear here</p>
                </div>
            )}
            <div className="border-t bg-background p-4">
                <div className="flex flex-col items-center gap-y-4">
                    {isConnected && (
                        <div className="flex items-center gap-x-2">
                            <div className={cn(
                                "size-4 rounded-full",
                                isSpeaking ? "animate-pulse bg-red-500" : "bg-green-500"
                            )} />
                            <span className="text-muted-foreground text-sm">
                                {isSpeaking ? "Assistant Speaking..." : "Listening..."}
                            </span>
                        </div>
                    )}
                    <div className="flex w-full justify-center">
                        {isConnected ? (
                            <Button
                                className="w-full"
                                size="lg"
                                variant="destructive"
                                onClick={() => endCall()}
                            >
                                <MicOffIcon />
                                End call
                            </Button>
                        ) : (
                            <Button
                                className="w-full"
                                disabled={isConnecting}
                                size="lg"
                                onClick={() => startCall()}
                            >
                                <MicIcon />
                                Start call
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}