export default function SteamEffect() {
  return (
    <div
      className="pointer-events-none absolute bottom-[32%] left-[42%] z-[5] hidden md:block"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="animate-steam absolute h-12 w-2 rounded-full bg-white/20 blur-sm"
          style={{
            left: `${i * 12}px`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${2.5 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
