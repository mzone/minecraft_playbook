"use client";

import { useState } from "react";
import { steps } from "../data/steps";
import PartsRequiredBox from "./PartsRequiredBox";
import MainBuildingStage from "./MainBuildingStage";
import StepNavigation from "./StepNavigation";

export default function LegoManualContainer() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const hasNew = step.blocks.some((b) => b.isNew);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ fontFamily: "'Nunito', 'M PLUS Rounded 1c', sans-serif" }}
      >
        {/* Header bar */}
        <div className="bg-[#FFD400] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Lego stud icon */}
            <div className="w-7 h-7 rounded-full bg-white shadow-inner border-2 border-yellow-600 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#FFD400] border border-yellow-600" />
            </div>
            <span className="font-black text-gray-900 text-lg tracking-widest">LEGO</span>
          </div>
          <span className="text-xs font-bold text-gray-700 bg-white/60 px-2 py-0.5 rounded-full">
            ひみつきち vol.1
          </span>
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-1 p-4 gap-4">
          {/* Top row: parts box + new-block indicator */}
          <div className="flex items-start gap-3">
            <PartsRequiredBox parts={step.parts} />
            {hasNew && (
              <div className="ml-auto flex items-center gap-1.5 bg-[#FFD400]/20 border-2 border-[#FFD400] rounded-xl px-3 py-2">
                <span className="text-xl">⬇</span>
                <span className="text-xs font-black text-gray-700 leading-tight">
                  あたらしい<br />ブロック
                </span>
              </div>
            )}
          </div>

          {/* Stage */}
          <MainBuildingStage blocks={step.blocks} />
        </div>

        {/* Navigation */}
        <div className="border-t-2 border-gray-100">
          <StepNavigation
            current={step.stepNumber}
            total={step.totalSteps}
            onPrev={() => setStepIndex((i) => Math.max(0, i - 1))}
            onNext={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
          />
        </div>
      </div>
    </div>
  );
}
