const CLOUDFLARE_WORDMARK =
  "https://cf-assets.www.cloudflare.com/zkvhlag99gkb/69RwBidpiEHCDZ9rFss24R/3c76e6eb130a8d1b875de1333edc425f/logo-cloudflare-dark.svg";

export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  return (
    <div className={`brand-lockup brand-lockup-${size}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CLOUDFLARE_WORDMARK}
        alt="Cloudflare"
        className="brand-wordmark"
      />
      <span className="brand-times" aria-hidden>
        ×
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/spacexai.svg" alt="SpaceXAI" className="brand-sxai" />
    </div>
  );
}
