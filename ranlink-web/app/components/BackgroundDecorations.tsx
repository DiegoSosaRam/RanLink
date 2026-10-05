import { cn } from "@/lib/utils";

interface BackgroundDecorationsProps {
    className?: string;
    variant?: "primary" | "secondary" | "mixed";
}

export const BackgroundDecorations = ({ className, variant = "mixed" }: BackgroundDecorationsProps) => {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {(variant === "primary" || variant === "mixed") && (
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
            )}
            {(variant === "secondary" || variant === "mixed") && (
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            )}
            {variant === "mixed" && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            )}
        </div>
    );
};
