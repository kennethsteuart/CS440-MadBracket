"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Region = {
  name: string;
  teams: string[];
};

const regionNames = ["East", "West", "South", "Midwest"];
const teamsPerRegion = 16;

const regionTeams: Record<string, string[]> = {
  East: [
    "UConn", "Marquette", "Illinois", "Auburn", "San Diego State", "BYU", "Florida Atlantic", "Iowa State", "Washington State", "Drake", "NC State", "Yale", "Duquesne", "Morehead State", "St. John's", "Colgate"
  ],
  West: [
    "North Carolina", "Arizona", "Baylor", "Alabama", "Clemson", "Saint Mary's", "Dayton", "Mississippi State", "Michigan State", "Grand Canyon", "New Mexico", "VCU", "Vermont", "Wagner", "Long Beach State", "South Dakota State"
  ],
  South: [
    "Houston", "Duke", "Kentucky", "Texas Tech", "Wisconsin", "Florida", "TCU", "Nebraska", "Texas A&M", "Boise State", "James Madison", "Oakland", "Western Kentucky", "Samford", "Colgate", "Stetson"
  ],
  Midwest: [
    "Purdue", "Tennessee", "Creighton", "Kansas", "Gonzaga", "South Carolina", "Texas", "Utah State", "Oregon", "NC State", "Colorado State", "McNeese State", "Akron", "Montana State", "Longwood", "Grambling State"
  ]
};

// Helper to initialize bracket state for each region and round
function getInitialBracket() {
  // 4 regions, 5 rounds (16, 8, 4, 2, 1), then Final Four, Championship, Winner
  const regions = regionNames.map((region) => [
    regionTeams[region], // Round 1
    Array(8).fill("") as string[],
    Array(4).fill("") as string[],
    Array(2).fill("") as string[],
    Array(1).fill("") as string[],
  ]);
  // Add Final Four, Championship, Winner
  // Final Four: 4 teams (region winners)
  // Championship: 2 teams
  // Winner: 1 team
  return [
    ...regions,
    [Array(4).fill("") as string[], Array(2).fill("") as string[], Array(1).fill("") as string[]],
  ];
}

// Helper to get region winners for Final Four
function getRegionWinners(bracket: string[][][]) {
  return regionNames.map((_, idx) => bracket[idx][4][0]);
}

// Helper to get national rounds (Final Four, Championship, Winner)
function getNationalRounds(bracket: string[][][]) {
  return bracket[4];
}

// Helper to calculate margin for centering bracket rounds
function getRoundMargin(roundIdx: number) {
  // Increase the multiplier for more vertical space
  return Math.pow(2, roundIdx) * 2; // was *1, now *2 for more spacing
}

export default function BracketPage() {
  const router = useRouter();
  const [bracket, setBracket] = useState<string[][][]>(getInitialBracket());

  // Advance a team to the next round (region or national)
  const handleAdvance = (regionIdx: number, round: number, slot: number) => {
    // National rounds (regionIdx === 4)
    if (regionIdx === 4) {
      setBracket((prev) => {
        const updated = prev.map((region, rIdx) =>
          region.map((roundArr) => [...roundArr])
        );
        const team = updated[regionIdx][round][slot];
        if (!team) return prev;
        const nextSlot = Math.floor(slot / 2);
        if (round < 2) {
          updated[regionIdx][round + 1][nextSlot] = team;
        }
        return updated;
      });
      return;
    }
    // Region rounds
    if (round >= bracket[regionIdx].length - 1) return;
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
        <h2 className="text-base font-bold mb-1 text-black">{regionNames[regionIdx]} Region</h2>
        <div className="flex flex-row gap-2">
          {region.map((round, roundIdx) => (
            <div key={roundIdx} className="flex flex-col items-center">
              {round.map((team, slotIdx) => (
                <div
                  key={slotIdx}
                  className={`w-24 px-1 py-0.5 mb-1 bg-white border rounded text-gray-700 text-xs shadow-sm cursor-pointer transition hover:bg-purple-100 ${!team ? 'opacity-40 cursor-default' : ''}`}
                  style={{
                    minHeight: '1.25rem',
                    marginTop: slotIdx % 2 === 0 ? getRoundMargin(roundIdx) * 4 : 0,
                    marginBottom: slotIdx % 2 === 1 ? getRoundMargin(roundIdx) * 4 : 0,
                  }}
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

  // Render national rounds (Final Four, Championship, Winner)
  const renderNationalRounds = () => {
    const national = getNationalRounds(bracket);
    const roundNames = ["Final Four", "Championship", "Winner"];
    return (
      <div className="flex flex-col items-center mt-8">
        <h2 className="text-base font-bold mb-1 text-black">National Championship</h2>
        <div className="flex flex-row gap-2">
          {national.map((round, roundIdx) => (
            <div key={roundIdx} className="flex flex-col items-center">
              <div className="font-semibold mb-1 text-black">{roundNames[roundIdx]}</div>
              {round.map((team, slotIdx) => (
                <div
                  key={slotIdx}
                  className={`w-32 px-1 py-0.5 mb-1 bg-yellow-50 border rounded text-gray-900 text-xs shadow-sm cursor-pointer transition hover:bg-yellow-200 ${!team ? 'opacity-40 cursor-default' : ''}`}
                  style={{
                    minHeight: '1.5rem',
                    marginTop: slotIdx % 2 === 0 ? getRoundMargin(roundIdx + 2) * 4 : 0,
                    marginBottom: slotIdx % 2 === 1 ? getRoundMargin(roundIdx + 2) * 4 : 0,
                  }}
                  onClick={() => team && handleAdvance(4, roundIdx, slotIdx)}
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

  // After region winners are decided, populate Final Four
  React.useEffect(() => {
    const regionWinners = getRegionWinners(bracket);
    setBracket((prev) => {
      const updated = prev.map((region, rIdx) =>
        region.map((roundArr) => [...roundArr])
      );
      // Only update if all region winners are set
      if (regionWinners.every((t) => t)) {
        updated[4][0] = regionWinners;
      }
      return updated;
    });
    // eslint-disable-next-line
  }, [bracket[0][4][0], bracket[1][4][0], bracket[2][4][0], bracket[3][4][0]]);

 
  // Save bracket to backend 
  const [bracketName, setBracketName] = useState<string>("");
  const handleSaveBracket = async () => {
    try {
      const res = await fetch(`http://localhost:5001/stored_brackets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bracketName,
          data: bracket,
        }),
      });
       const result = await res.json();

      if (!res.ok) {
        console.error("Error saving:", result);
        return;
      }
      console.log("Saved:", result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-purple-100 to-white">
      <h1 className="text-2xl font-bold mb-4 text-black">March Madness Bracket</h1>
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
      {/* National rounds */}
      {renderNationalRounds()}
      <div className="flex gap-4 mt-8">
      <input
      // button for the bracket name
        type="text"
        placeholder="Enter bracket name"
        value={bracketName}
        onChange={(e) => setBracketName(e.target.value)}
        className="border p-2 text-black rounded"
        />
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


