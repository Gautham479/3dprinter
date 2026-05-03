export default function CategoryLoading() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero skeleton */}
      <div className="relative w-full h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden mt-16 bg-surface-muted animate-pulse">
        <div className="text-center px-4 max-w-3xl mx-auto space-y-4">
          <div className="h-16 w-64 bg-surface-border/40 animate-pulse rounded-sm mx-auto" />
          <div className="h-1 w-24 bg-surface-border/40 animate-pulse rounded-sm mx-auto" />
          <div className="h-4 w-80 bg-surface-border/40 animate-pulse rounded-sm mx-auto" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[50vh]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="w-full aspect-[4/3] bg-surface-muted animate-pulse rounded-sm border border-surface-border/40" />
              <div className="h-4 bg-surface-muted animate-pulse rounded-sm w-3/4" />
              <div className="h-3 bg-surface-muted/60 animate-pulse rounded-sm w-full" />
              <div className="h-3 bg-surface-muted/60 animate-pulse rounded-sm w-4/5" />
              <div className="h-8 bg-surface-muted animate-pulse rounded-sm mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
