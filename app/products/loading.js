export default function ProductsLoading() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16 min-h-[60vh]">
      {/* Title skeleton */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="h-10 w-64 bg-surface-muted animate-pulse rounded-sm mx-auto" />
        <div className="h-[2px] w-20 bg-surface-muted animate-pulse rounded-sm mx-auto" />
        <div className="h-4 w-80 bg-surface-muted/60 animate-pulse rounded-sm mx-auto" />
      </div>

      {/* Filter tab skeletons */}
      <div className="mb-10 flex gap-2">
        {[80, 100, 120, 90, 110].map((w, i) => (
          <div
            key={i}
            className="h-9 bg-surface-muted animate-pulse rounded-sm"
            style={{ width: w }}
          />
        ))}
      </div>

      {/* Product card skeletons */}
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
  );
}
