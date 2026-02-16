"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon, InboxIcon } from "lucide-react";
import { contactSessionIdAtomFamily, conversationIdAtom, errorMessageAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { WidgetFooter } from "../components/widget-footer";
import { Button } from "@workspace/ui/components/button";
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { cn } from "@workspace/ui/lib/utils";

export const WidgetInboxScreen = () => {
    const setScreen = useSetAtom(screenAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const contactSessionId = useAtomValue(
        contactSessionIdAtomFamily(organizationId || "")
    );
    const setConversationId = useSetAtom(conversationIdAtom);
    const conversations = usePaginatedQuery(
        api.public.conversations.getMany,
        contactSessionId
            ? {
                contactSessionId,
            }
            : "skip",
        {
            initialNumItems: 10,
        },
    );
    const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } = useInfiniteScroll({
        status: conversations.status,
        loadMore: conversations.loadMore,
        loadSize: 10,
    });
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
                    <p className="font-semibold">Inbox</p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col gap-y-2 overflow-y-auto p-4">
                {conversations?.results.length === 0 && (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                            <InboxIcon className="size-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">No conversations yet</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Start a chat to see your history here.
                            </p>
                        </div>
                    </div>
                )}
                {conversations?.results.length > 0 &&
                    conversations.results.map((conversation) => (
                        <button
                            className="group w-full rounded-xl border bg-background p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                            key={conversation._id}
                            onClick={() => {
                                setConversationId(conversation._id);
                                setScreen("chat");
                            }}
                        >
                            <div className="flex w-full flex-col gap-3 overflow-hidden">
                                <div className="flex w-full items-center justify-between gap-x-2">
                                    <p className="text-xs text-muted-foreground">Chat</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(conversation._creationTime))}
                                    </p>
                                </div>
                                <div className="flex w-full items-center justify-between gap-x-2">
                                    <p className={cn(
                                        "truncate text-sm",
                                        conversation.status === "unresolved" && "font-semibold"
                                    )}>
                                        {conversation.lastMessage?.text}
                                    </p>
                                    <ConversationStatusIcon status={conversation.status} className="shrink-0" />
                                </div>
                            </div>
                        </button>
                    ))
                }
                <InfiniteScrollTrigger
                    canLoadMore={canLoadMore}
                    isLoadingMore={isLoadingMore}
                    onLoadMore={handleLoadMore}
                    ref={topElementRef}
                />
            </div>
            <WidgetFooter />
        </>
    );
}
