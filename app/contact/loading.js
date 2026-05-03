export default function ContactLoading() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-28 pb-12">
      {/* Heading skeletons */}
      <div className="text-center space-y-3 mb-8">
        <div className="h-3 w-24 bg-surface-muted animate-pulse rounded-sm mx-auto" />
        <div className="h-9 w-64 bg-surface-muted animate-pulse rounded-sm mx-auto" />
      </div>

      {/* Form field skeletons */}
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="relative">
            <div className="h-14 w-full bg-surface-muted animate-pulse rounded-xl" />
          </div>
        ))}
        <div className="relative">
          <div className="h-32 w-full bg-surface-muted animate-pulse rounded-xl" />
        </div>
        <div className="h-14 w-full bg-surface-muted animate-pulse rounded-xl" />
      </div>
    </div>
  );
}
