"use client";

import { useState } from "react";
import { steps } from "../data/steps";
import PartsRequiredBox from "./PartsRequiredBox";
import MainBuildingStage from "./MainBuildingStage";
import StepNavigation from "./StepNavigation";

export default function LegoManualContainer() {
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const step = steps[stepIndex];
  const hasNew = step.blocks.some((b) => b.isNew);
  const isLast = stepIndex === steps.length - 1;

  const goTo = (next: number) => {
    setVisible(false);
    setTimeout(() => { setStepIndex(next); setVisible(true); }, 200);
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ fontFamily: "'Nunito', 'M PLUS Rounded 1c', sans-serif", minHeight: 580 }}
      >
        {/* Header bar */}
        <div className="bg-[#FFD400] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* LEGO stud */}
            <div className="w-8 h-8 rounded-full bg-[#FFD400] border-4 border-yellow-500 shadow-[0_3px_0_#b8960a] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-yellow-300 border border-yellow-500" />
            </div>
            <span className="font-black text-gray-900 text-lg tracking-[0.2em]">LEGO</span>
          </div>
          <span className="text-xs font-bold text-gray-800 bg-white/50 px-3 py-1 rounded-full">
            ひみつきち — vol.1
          </span>
        </div>

        {/* Main content */}
        <div
          className={`flex flex-col flex-1 p-4 gap-3 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {/* Top row: parts + new-block badge */}
          <div className="flex items-start gap-3">
            <PartsRequiredBox parts={step.parts} />
            {hasNew && (
              <div className="ml-auto flex flex-col items-center gap-1 bg-[#FFF8DC] border-2 border-[#FFD400] rounded-2xl px-4 py-3 shadow-sm">
                <span className="text-2xl leading-none">⬇</span>
                <span className="text-[11px] font-black text-gray-700 leading-tight text-center">
                  あたらしい<br />ブロック
                </span>
              </div>
            )}
          </div>

          {/* Stage */}
          <div className="flex-1 flex">
            <MainBuildingStage
              blocks={step.blocks}
              label={step.label}
              cameraOffset={step.cameraOffset}
            />
          </div>

          {/* Completion banner on last step */}
          {isLast && (
            <div className="bg-[#FFD400] rounded-2xl py-3 flex items-center justify-center gap-3 shadow">
              <span className="text-2xl">🎉</span>
              <span className="text-xl font-black text-gray-900">やった！かんせい！</span>
              <span className="text-2xl">🎉</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="border-t-2 border-gray-100">
          <StepNavigation
            current={step.stepNumber}
            total={step.totalSteps}
            onPrev={() => goTo(Math.max(0, stepIndex - 1))}
            onNext={() => goTo(Math.min(steps.length - 1, stepIndex + 1))}
          />
        </div>
      </div>
    </div>
  );
}
