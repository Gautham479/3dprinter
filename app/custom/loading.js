export default function CustomLoading() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16 min-h-[60vh]">
      {/* Title skeleton */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="h-10 w-64 bg-surface-muted animate-pulse rounded-sm mx-auto" />
        <div className="h-[2px] w-20 bg-surface-muted animate-pulse rounded-sm mx-auto" />
        <div className="h-4 w-96 bg-surface-muted/60 animate-pulse rounded-sm mx-auto" />
      </div>

      {/* Two-column layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-8 lg:gap-10 items-start w-full">
        {/* Upload box skeleton */}
        <div className="w-full rounded-sm border border-surface-border bg-surface-card/80 p-8 space-y-4 min-h-[400px] flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-surface-muted animate-pulse rounded-sm" />
          <div className="h-5 w-48 bg-surface-muted animate-pulse rounded-sm" />
          <div className="h-4 w-64 bg-surface-muted/60 animate-pulse rounded-sm" />
          <div className="h-10 w-40 bg-surface-muted animate-pulse rounded-sm mt-2" />
        </div>

        {/* Config panel skeleton */}
        <div className="w-full rounded-sm border border-surface-border bg-surface-card/80 p-6 space-y-5">
          <div className="h-6 w-36 bg-surface-muted animate-pulse rounded-sm" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 bg-surface-muted/60 animate-pulse rounded-sm" />
              <div className="h-10 w-full bg-surface-muted animate-pulse rounded-sm" />
            </div>
          ))}
          <div className="h-12 w-full bg-surface-muted animate-pulse rounded-sm mt-2" />
        </div>
      </div>
    </div>
  );
}
