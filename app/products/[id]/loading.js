import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetailLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-bg">
      <Navbar />

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button skeleton */}
        <div className="h-5 w-36 bg-surface-muted animate-pulse rounded-sm mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: image skeletons */}
          <div className="flex flex-col gap-4">
            <div className="w-full max-w-xl aspect-[4/3] bg-surface-muted animate-pulse rounded-sm border border-surface-border" />
            <div className="flex gap-2 justify-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-16 h-16 bg-surface-muted animate-pulse rounded-sm border border-surface-border" />
              ))}
            </div>
          </div>

          {/* Right: details skeletons */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="h-7 w-24 bg-surface-muted animate-pulse rounded-sm" />
            {/* Title */}
            <div className="h-10 w-3/4 bg-surface-muted animate-pulse rounded-sm" />
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-surface-muted/70 animate-pulse rounded-sm" />
              <div className="h-4 w-5/6 bg-surface-muted/70 animate-pulse rounded-sm" />
              <div className="h-4 w-4/6 bg-surface-muted/70 animate-pulse rounded-sm" />
            </div>

            {/* Specs card */}
            <div className="rounded-sm border border-surface-border bg-surface-card/80 p-6">
              <div className="h-4 w-28 bg-surface-muted animate-pulse rounded-sm mb-4" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-surface-muted animate-pulse rounded-sm flex-shrink-0" />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <div className="h-3 w-16 bg-surface-muted animate-pulse rounded-sm" />
                      <div className="h-4 w-20 bg-surface-muted/70 animate-pulse rounded-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="rounded-sm border border-surface-border bg-surface-card/80 p-6">
              <div className="flex items-end justify-between mb-5">
                <div className="h-12 w-28 bg-surface-muted animate-pulse rounded-sm" />
                <div className="h-7 w-20 bg-surface-muted animate-pulse rounded-sm" />
              </div>
              <div className="h-14 w-full bg-surface-muted animate-pulse rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
