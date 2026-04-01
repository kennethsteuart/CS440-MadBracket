"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const conferences = [
	"SEC (Southeastern Conference)",
	"ACC",
	"Big 10",
	"Big 12",
	"Big East",
];

// Placeholder teams for UI
const teamsByConference: Record<string, string[]> = {
	"SEC (Southeastern Conference)": ["Alabama", "Tennessee", "Kentucky"],
	ACC: ["Duke", "UNC", "Virginia"],
	"Big 10": ["Purdue", "Michigan State", "Illinois"],
	"Big 12": ["Kansas", "Baylor", "Texas"],
	"Big East": ["UConn", "Marquette", "Creighton"],
};

export default function StatsPage() {
	const [conference, setConference] = useState<string>("");
	const [team, setTeam] = useState<string>("");
	const router = useRouter();

	const handleConferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setConference(e.target.value);
		setTeam("");
	};

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
			<h1 className="text-3xl font-bold mb-6 text-black">Stats</h1>
			<div className="mb-4 w-full max-w-xs">
				<label className="block mb-2 text-black">Select Conference:</label>
				<select
					className="w-full p-2 border rounded text-black"
					value={conference}
					onChange={handleConferenceChange}
				>
					<option value="">-- Choose Conference --</option>
					{conferences.map((conf) => (
						<option key={conf} value={conf}>{conf}</option>
					))}
				</select>
			</div>
			{conference && (
				<div className="mb-4 w-full max-w-xs">
					<label className="block mb-2 text-black">Select Team:</label>
					<select
						className="w-full p-2 border rounded text-black"
						value={team}
						onChange={(e) => setTeam(e.target.value)}
					>
						<option value="">-- Choose Team --</option>
						{teamsByConference[conference].map((t) => (
							<option key={t} value={t}>{t}</option>
						))}
					</select>
				</div>
			)}
			<button
				className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition mb-6"
				disabled={!team}
				onClick={() => alert("Show stats placeholder. Backend coming soon!")}
			>
				Show Stats
			</button>
			<button
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				onClick={() => router.push("/bracket")}
			>
				Go to Bracket
			</button>
		</main>
	);
}
