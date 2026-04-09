"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const conferences = [
	"SEC",
	"ACC",
	"Big 10",
	"Big 12",
	"Big East",
];

// Placeholder teams for UI
const teamsByConference: Record<string, string[]> = {
	"SEC": [
		"Alabama", "Georgia", "LSU", "Florida", "Auburn", "Mississippi State", "Ole Miss", "Tennessee", "Missouri", "Oklahoma", "Arkansas", "Vanderbilt", "Texas", "South Carolina", "Texas A&M", "Kentucky"
	],
	"ACC": [
		"Florida State", "Clemson", "Miami", "Virginia Tech", "North Carolina", "Duke", "NC State", "Virginia", "Syracuse", "California", "Louisville", "Stanford", "SMU", "Notre Dame", "Wake Forest", "Pittsburgh", "Boston College", "Georgia Tech"
	],
	"Big 10": [
		"Ohio State", "Michigan", "Penn State", "Wisconsin", "Minnesota", "Iowa", "Illinois", "Oregon", "Nebraska", "Michigan State", "UCLA", "Purdue", "USC", "Rutgers", "Washington", "Indiana", "Northwestern", "Maryland"
	],
	"Big 12": [
		"Arizona State", "Utah", "Kansas", "BYU", "West Virginia", "Houston", "Baylor", "Colorado", "Kansas State", "Texas Tech", "Iowa State", "Arizona", "TCU", "Cincinnati", "Oklahoma State", "UCF"
	],
	"Big East": [
		"Villanova", "Georgetown", "Providence", "Creighton", "DePaul", "Marquette", "UConn", "Seton Hall", "St. Johns", "Butler", "Xavier"
	]
};

export default function StatsPage() {
	const [conference, setConference] = useState<string>("");
	const [team, setTeam] = useState<string>("");
	const [stats, setStats] = useState<any>(null); 
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
				onClick={async () => {
					try {
						const res = await fetch(`http://localhost:5001/stats?team=${team}`);
						if (!res.ok) {
							const text = await res.text();
							console.error("Server returned error:", text);
							return;
						}
						const data = await res.json();
						setStats(data); 
					} catch (err) {
						console.error(err);
					}
				}}
			>
			{stats && (
				// This is the section for the stats display. This def needs some work i just added it in to see the stats
						<div className="mt-6 p-4 border rounded w-full max-w-xs bg-gray-50 text-black">
							<h2 className="text-xl font-semibold mb-2">{team} Stats</h2>
							<p>Rank: {stats.team_rank}</p>
							<p>Total Wins: {stats.wins}</p>
							<p>Total Losses: {stats.losses}</p>
							<p>Conference Wins: {stats.conference_wins}</p>
							<p>Conference Losses: {stats.conference_losses}</p>
						</div>
			)}
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
