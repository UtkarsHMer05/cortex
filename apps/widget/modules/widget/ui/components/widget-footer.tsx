import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { HomeIcon, InboxIcon } from "lucide-react"
import { useAtomValue, useSetAtom } from "jotai"
import { screenAtom } from "../../atoms/widget-atoms"

export const WidgetFooter = () => {
    const screen = useAtomValue(screenAtom);
    const setScreen = useSetAtom(screenAtom);

    const isHome = screen === "selection";
    const isInbox = screen === "inbox";

    return (
        <footer className="flex items-center justify-around border-t bg-background">
            <button
                className="flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors"
                onClick={() => { setScreen("selection") }}
            >
                <HomeIcon
                    className={cn("size-5 transition-colors", isHome ? "text-primary" : "text-muted-foreground")}
                />
                <span className={cn("text-[10px] font-medium transition-colors", isHome ? "text-primary" : "text-muted-foreground")}>
                    Home
                </span>
                <div className={cn(
                    "mt-0.5 h-1 w-1 rounded-full bg-primary transition-opacity",
                    isHome ? "opacity-100" : "opacity-0"
                )} />
            </button>
            <button
                className="flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors"
                onClick={() => { setScreen("inbox") }}
            >
                <InboxIcon
                    className={cn("size-5 transition-colors", isInbox ? "text-primary" : "text-muted-foreground")}
                />
                <span className={cn("text-[10px] font-medium transition-colors", isInbox ? "text-primary" : "text-muted-foreground")}>
                    Inbox
                </span>
                <div className={cn(
                    "mt-0.5 h-1 w-1 rounded-full bg-primary transition-opacity",
                    isInbox ? "opacity-100" : "opacity-0"
                )} />
            </button>
        </footer>
    );
};
