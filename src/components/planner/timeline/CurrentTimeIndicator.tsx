interface CurrentTimeIndicatorProps {
  minuteOffset: number;
  rowHeightPx?: number;
}

export function CurrentTimeIndicator({
  minuteOffset,
  rowHeightPx = 72,
}: CurrentTimeIndicatorProps) {
  const topPx = (minuteOffset / 60) * rowHeightPx;

  return (
    <div
      className="absolute left-0 right-0 z-20 pointer-events-none"
      style={{ top: topPx }}
      aria-hidden="true"
    >
      <span className="absolute left-14 -top-3.5 text-[9px] font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded-md">
        Now
      </span>

      <div className="flex items-center ml-14">
        <div className="relative shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-40" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-rose-500/60 to-transparent" />
      </div>
    </div>
  );
}