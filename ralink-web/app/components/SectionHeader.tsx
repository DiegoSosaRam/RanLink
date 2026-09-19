import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    highlightedText?: string;
    description?: string;
    className?: string;
    center?: boolean;
    children?: React.ReactNode;
}

export const SectionHeader = ({
    title,
    highlightedText,
    description,
    className,
    center = true,
    children,
}: SectionHeaderProps) => {
    return (
        <div className={cn("mb-16", center ? "text-center" : "text-left", className)}>
            {children}
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">{title} </span>
                {highlightedText && <span className="gradient-text">{highlightedText}</span>}
            </h2>
            {description && (
                <p className={cn("text-muted-foreground text-lg max-w-2xl", center ? "mx-auto" : "mx-0")}>
                    {description}
                </p>
            )}
        </div>
    );
};
