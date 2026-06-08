"use client";

type Props = {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

function StudButton({
  onClick, disabled, label, color, children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="relative w-16 h-16 rounded-full flex items-center justify-center
        disabled:opacity-30 disabled:cursor-not-allowed active:translate-y-0.5
        transition-transform select-none"
      style={{
        background: disabled ? "#ccc" : color,
        boxShadow: disabled
          ? "none"
          : `0 6px 0 color-mix(in srgb, ${color} 60%, black)`,
      }}
    >
      {/* Stud ring */}
      <div className="absolute inset-1.5 rounded-full border-[3px] border-white/30 pointer-events-none" />
      <span className="text-white text-3xl font-black leading-none">{children}</span>
    </button>
  );
}

export default function StepNavigation({ current, total, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <StudButton onClick={onPrev} disabled={current === 1} label="前へ" color="#E3000B">
        ‹
      </StudButton>

      {/* Step counter + dots */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-5xl font-black text-gray-900 tabular-nums leading-none">
            {String(current).padStart(2, "0")}
          </span>
          <span className="text-xl font-black text-gray-300">/</span>
          <span className="text-xl font-bold text-gray-400 tabular-nums">
            {String(total).padStart(2, "0")}
          </span>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i + 1 === current
                  ? "w-5 h-3 bg-[#FFD400]"
                  : i + 1 < current
                  ? "w-3 h-3 bg-gray-400"
                  : "w-3 h-3 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <StudButton onClick={onNext} disabled={current === total} label="次へ" color="#006DB7">
        ›
      </StudButton>
    </div>
  );
}
