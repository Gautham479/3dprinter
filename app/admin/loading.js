export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-surface-bg p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-9 w-56 bg-surface-muted animate-pulse rounded-sm" />
          <div className="h-4 w-48 bg-surface-muted/60 animate-pulse rounded-sm" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-32 bg-surface-muted animate-pulse rounded-sm" />
          <div className="h-9 w-24 bg-surface-muted animate-pulse rounded-sm" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-sm border border-surface-border bg-surface-card/60 p-5 space-y-2">
            <div className="h-3 w-24 bg-surface-muted animate-pulse rounded-sm" />
            <div className="h-8 w-16 bg-surface-muted animate-pulse rounded-sm" />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 w-fit">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 w-36 bg-surface-muted animate-pulse rounded-sm" />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-sm border border-surface-border bg-surface-card/60 p-6 space-y-3">
        <div className="h-6 w-40 bg-surface-muted animate-pulse rounded-sm mb-5" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full bg-surface-muted/60 animate-pulse rounded-sm border border-surface-border/40" />
        ))}
      </div>
    </div>
  );
}
