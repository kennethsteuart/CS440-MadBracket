"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Region = {
  name: string;
  teams: string[];
};

const regionNames = ["East", "West", "South", "Midwest"];
const teamsPerRegion = 16;

// Helper to initialize bracket state for each region and round
function getInitialBracket() {
  // 4 regions, 4 rounds (16, 8, 4, 2, 1)
  return regionNames.map((region) => [
    Array.from({ length: teamsPerRegion }, (_, j) => `${region} Team ${j + 1}`), // Round 1
    Array(8).fill("") as string[], // Round 2
    Array(4).fill("") as string[], // Round 3
    Array(2).fill("") as string[], // Round 4
    Array(1).fill("") as string[], // Region winner
  ]);
}

export default function BracketPage() {
  const router = useRouter();
  // bracket[regionIdx][round][slot]
  const [bracket, setBracket] = useState<string[][][]>(getInitialBracket());

  // Advance a team to the next round
  const handleAdvance = (regionIdx: number, round: number, slot: number) => {
    // Only allow advancing from rounds 0-3
    if (round >= bracket[regionIdx].length - 1) return;
    // Place in next round, slot = Math.floor(slot/2)
    setBracket((prev) => {
      const updated = prev.map((region, rIdx) =>
        rIdx === regionIdx
          ? region.map((roundArr, roundIdx) => [...roundArr])
          : region
      );
      const team = updated[regionIdx][round][slot];
      if (!team) return prev;
      const nextSlot = Math.floor(slot / 2);
      updated[regionIdx][round + 1][nextSlot] = team;
      return updated;
    });
  };

  // Render a single region's bracket
  const renderRegion = (regionIdx: number) => {
    const region = bracket[regionIdx];
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-base font-bold mb-1 text-purple-700">{regionNames[regionIdx]} Region</h2>
        <div className="flex flex-row gap-2">
          {region.map((round, roundIdx) => (
            <div key={roundIdx} className="flex flex-col items-center">
              {round.map((team, slotIdx) => (
                <div
                  key={slotIdx}
                  className={`w-24 px-1 py-0.5 mb-1 bg-white border rounded text-gray-700 text-xs shadow-sm cursor-pointer transition hover:bg-purple-100 ${!team ? 'opacity-40 cursor-default' : ''}`}
                  style={{ minHeight: '1.25rem' }}
                  onClick={() => team && handleAdvance(regionIdx, roundIdx, slotIdx)}
                >
                  {team || <span>&nbsp;</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Save bracket to localStorage
  const handleSaveBracket = () => {
    const bracketName = prompt("Enter a name for your bracket:");
    if (!bracketName) return;
    const stored = JSON.parse(localStorage.getItem("madbracket_brackets") || "[]");
    stored.push({
      id: Date.now(),
      name: bracketName,
      data: JSON.stringify(bracket),
    });
    localStorage.setItem("madbracket_brackets", JSON.stringify(stored));
    alert("Bracket saved!");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-purple-100 to-white">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">March Madness Bracket</h1>
      <div className="mt-8 text-gray-500 text-xs">Click a team to advance it to the next round!</div>

      <div className="flex flex-row w-full max-w-5xl justify-between gap-4">
        {/* Left side: East and South */}
        <div className="flex flex-col gap-6 w-1/2">
          {renderRegion(0)}
          {renderRegion(2)}
        </div>
        {/* Right side: West and Midwest */}
        <div className="flex flex-col gap-6 w-1/2">
          {renderRegion(1)}
          {renderRegion(3)}
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleSaveBracket}
        >
          Save Bracket
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push("/stored_brackets")}
        >
          Go to Stored Brackets
        </button>
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={() => router.push("/stats")}
        >
          Go to Stats
        </button>
      </div>
    </main>
  );
}


