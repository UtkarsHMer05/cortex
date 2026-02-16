import { cn } from "@workspace/ui/lib/utils";

export const WidgetHeader = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <header className={cn(
            "bg-gradient-to-br from-primary via-[#0b63f3] to-[#0052d4] p-5 text-primary-foreground shadow-sm",
            className,
        )}>
            {children}
        </header>
    );
};
