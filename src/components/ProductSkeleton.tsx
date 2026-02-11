import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
    return (
        <div className="space-y-3">
            <Skeleton className="aspect-square rounded-xl w-full" />
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-3 w-1/2" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-12" />
                </div>
            </div>
        </div>
    );
}
