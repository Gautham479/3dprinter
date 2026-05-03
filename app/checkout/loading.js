export default function CheckoutLoading() {
  return (
    <div className="min-h-screen py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="h-5 w-36 bg-surface-muted animate-pulse rounded-sm mb-8" />
        {/* Title */}
        <div className="h-9 w-48 bg-surface-muted animate-pulse rounded-sm mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* Form skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-sm border border-surface-border bg-surface-card/80 p-6 space-y-4">
                <div className="h-5 w-40 bg-surface-muted animate-pulse rounded-sm" />
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="space-y-1.5">
                    <div className="h-3 w-24 bg-surface-muted/60 animate-pulse rounded-sm" />
                    <div className="h-11 w-full bg-surface-muted animate-pulse rounded-sm" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Summary skeleton */}
          <div className="rounded-sm border border-surface-border bg-surface-card/90 p-6 space-y-4 sticky top-8">
            <div className="h-6 w-36 bg-surface-muted animate-pulse rounded-sm" />
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-20 w-full bg-surface-muted animate-pulse rounded-sm" />
              ))}
            </div>
            <div className="h-[1px] bg-surface-border" />
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-surface-muted animate-pulse rounded-sm" />
              <div className="h-4 w-20 bg-surface-muted animate-pulse rounded-sm" />
            </div>
            <div className="h-14 w-full bg-surface-muted animate-pulse rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
