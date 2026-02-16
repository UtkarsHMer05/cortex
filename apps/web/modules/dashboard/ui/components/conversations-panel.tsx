"use client";
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/country-utils";
import { api } from "@workspace/backend/_generated/api";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { usePaginatedQuery } from "convex/react";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon, CornerUpLeftIcon, InboxIcon, ListIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import { useAtomValue, useSetAtom } from "jotai/react";
import { statusFilterAtom } from "../../atoms";
import { Skeleton } from "@workspace/ui/components/skeleton";

export const ConversationsPanel = () => {
    const pathname = usePathname();
    const statusFilter = useAtomValue(statusFilterAtom);
    const setStatusFilter = useSetAtom(statusFilterAtom);

    const conversations = usePaginatedQuery(
        api.private.conversations.getMany,
        {
            status: statusFilter === "all" ? undefined : statusFilter,
        },
        {
            initialNumItems: 10,
        },
    )
    const {
        topElementRef,
        handleLoadMore,
        canLoadMore,
        isLoadingMore,
        isLoadingFirstPage,
    } = useInfiniteScroll({
        status: conversations.status,
        loadMore: conversations.loadMore,
        loadSize: 10,
    });

    return (
        <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold tracking-tight">Conversations</h2>
                    {!isLoadingFirstPage && conversations.results.length > 0 && (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {conversations.results.length}
                        </span>
                    )}
                </div>
                <Select
                    defaultValue="all"
                    onValueChange={(value) => setStatusFilter(value as "all" | "unresolved" | "escalated" | "resolved")}
                    value={statusFilter}
                >
                    <SelectTrigger
                        className="h-7 w-auto gap-1.5 border-none px-2 shadow-none ring-0 text-xs hover:bg-accent hover:text-accent-foreground focus-visible:ring-0"
                    >
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            <div className="flex items-center gap-2">
                                <ListIcon className="size-3.5" />
                                <span>All</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="unresolved">
                            <div className="flex items-center gap-2">
                                <ArrowRightIcon className="size-3.5" />
                                <span>Unresolved</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="escalated">
                            <div className="flex items-center gap-2">
                                <ArrowUpIcon className="size-3.5" />
                                <span>Escalated</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="resolved">
                            <div className="flex items-center gap-2">
                                <CheckIcon className="size-3.5" />
                                <span>Resolved</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {isLoadingFirstPage ? (
                <SkeletonConversations />
            ) : conversations.results.length === 0 ? (
                /* Empty state */
                <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                        <InboxIcon className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">No conversations</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {statusFilter === "all"
                                ? "Conversations will appear here when customers reach out."
                                : `No ${statusFilter} conversations found.`
                            }
                        </p>
                    </div>
                </div>
            ) : (
                <ScrollArea className="max-h-[calc(100vh-53px)]">
                    <div className="flex w-full flex-1 flex-col text-sm">
                        {conversations.results.map((conversation) => {
                            const isLastMessageFromOperator =
                                conversation.lastMessage?.message?.role !== "user";

                            const country = getCountryFromTimezone(
                                conversation.contactSession.metadata?.timezone
                            );

                            const countryFlagUrl = country?.code
                                ? getCountryFlagUrl(country.code)
                                : undefined;

                            const isActive = pathname === `/conversations/${conversation._id}`;

                            return (
                                <Link
                                    key={conversation._id}
                                    className={cn(
                                        "relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 text-sm leading-tight transition-colors duration-150 hover:bg-accent/70",
                                        isActive && "bg-accent text-accent-foreground"
                                    )}
                                    href={`/conversations/${conversation._id}`}
                                >
                                    <div className={cn(
                                        "-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-primary opacity-0 transition-all duration-200",
                                        isActive && "opacity-100"
                                    )} />

                                    <DicebearAvatar
                                        seed={conversation.contactSession._id}
                                        badgeImageUrl={countryFlagUrl}
                                        size={40}
                                        className="shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex w-full items-center gap-2">
                                            <span className="truncate font-semibold">
                                                {conversation.contactSession.name}
                                            </span>
                                            <span className="ml-auto shrink-0 text-muted-foreground text-xs">
                                                {formatDistanceToNow(conversation._creationTime)}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center justify-between gap-2">
                                            <div className="flex w-0 grow items-center gap-1">
                                                {isLastMessageFromOperator && (
                                                    <CornerUpLeftIcon className="size-3 shrink-0 text-muted-foreground" />
                                                )}
                                                <span
                                                    className={cn(
                                                        "line-clamp-1 text-muted-foreground text-xs",
                                                        !isLastMessageFromOperator && "font-semibold text-foreground"
                                                    )}
                                                >
                                                    {conversation.lastMessage?.text}
                                                </span>
                                            </div>
                                            <ConversationStatusIcon status={conversation.status} />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                        <InfiniteScrollTrigger
                            canLoadMore={canLoadMore}
                            isLoadingMore={isLoadingMore}
                            onLoadMore={handleLoadMore}
                            ref={topElementRef}
                        />
                    </div>
                </ScrollArea>
            )}
        </div>
    )
}

export const SkeletonConversations = () => {
    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
            <div className="relative flex w-full min-w-0 flex-col p-2">
                <div className="w-full space-y-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 rounded-lg p-4"
                        >
                            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                            <div className="min-w-0 flex-1">
                                <div className="flex w-full items-center gap-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="ml-auto h-3 w-12 shrink-0" />
                                </div>
                                <div className="mt-2">
                                    <Skeleton className="h-3 w-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}