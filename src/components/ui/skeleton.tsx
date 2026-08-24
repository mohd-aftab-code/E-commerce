import { cn } from "@/lib/utils";

/**
 * Skeleton loader component
 * Displays a subtle pulsating placeholder while content is loading.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  );
}
