"use client";

type Props = {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function StepNavigation({ current, total, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <button
        onClick={onPrev}
        disabled={current === 1}
        className="w-16 h-16 rounded-full bg-[#E3000B] text-white text-3xl font-black shadow-lg
          disabled:opacity-30 disabled:cursor-not-allowed
          active:scale-95 transition-transform flex items-center justify-center"
        aria-label="前へ"
      >
        ‹
      </button>

      {/* Step counter */}
      <div className="flex items-center gap-2">
        <span className="text-5xl font-black text-gray-900 tabular-nums leading-none">
          {String(current).padStart(2, "0")}
        </span>
        <span className="text-2xl font-black text-gray-400">/</span>
        <span className="text-2xl font-bold text-gray-400 tabular-nums">
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i + 1 === current
                ? "bg-[#FFD400] scale-125"
                : i + 1 < current
                ? "bg-gray-400"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={current === total}
        className="w-16 h-16 rounded-full bg-[#006DB7] text-white text-3xl font-black shadow-lg
          disabled:opacity-30 disabled:cursor-not-allowed
          active:scale-95 transition-transform flex items-center justify-center"
        aria-label="次へ"
      >
        ›
      </button>
    </div>
  );
}
