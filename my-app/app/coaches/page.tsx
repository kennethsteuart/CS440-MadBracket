"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CoachRow = {
	conference: string;
	teamName: string;
	salary: string;
	firstName: string;
	lastName: string;
};

export default function CoachesPage() {
	const router = useRouter();
	const [conference, setConference] = useState<string>("");
	const [team, setTeam] = useState<string>("");
	const [coaches, setCoaches] = useState<CoachRow[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const loadCoaches = async () => {
			setIsLoading(true);
			setError("");
			try {
				const res = await fetch("http://localhost:5001/coaches");
				if (!res.ok) {
					const text = await res.text();
					throw new Error(text || "Failed to load coaches");
				}
				const data = await res.json();
				setCoaches(
					data.map((row: any) => ({
						conference: row.conference_name,
						teamName: row.school_name,
						salary: row.salary,
						firstName: row.first_name,
						lastName: row.last_name,
					}))
				);
			} catch (err: any) {
				setError(err.message || "Unable to load coaches right now.");
			} finally {
				setIsLoading(false);
			}
		};

		loadCoaches();
	}, []);

	const conferences = useMemo(
		() => Array.from(new Set(coaches.map((coach) => coach.conference))),
		[coaches]
	);

	const teamsForConference = conference
		? coaches
				.filter((coach) => coach.conference === conference)
				.map((coach) => coach.teamName)
		: [];

	const filteredCoaches = coaches.filter((coach) => {
		if (conference && coach.conference !== conference) return false;
		if (team && coach.teamName !== team) return false;
		return true;
	});

	return (
		<main className="flex flex-col items-center min-h-screen p-8 bg-white">
			<h1 className="text-3xl font-bold mb-4 text-black">Coaches</h1>
			<p className="text-gray-700 mb-6 text-center max-w-xl">
				Head basketball coaches by school.
			</p>

			<div className="w-full max-w-4xl mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
				<div>
					<label className="block mb-2 text-black">Select Conference:</label>
					<select
						className="w-full p-2 border rounded text-black bg-white"
						value={conference}
						onChange={(e) => {
							setConference(e.target.value);
							setTeam("");
						}}
					>
						<option value="">-- Choose Conference --</option>
						{conferences.map((conf) => (
							<option key={conf} value={conf}>{conf}</option>
						))}
					</select>
				</div>
				<div>
					<label className="block mb-2 text-black">Select Team:</label>
					<select
						className="w-full p-2 border rounded text-black bg-white"
						value={team}
						onChange={(e) => setTeam(e.target.value)}
						disabled={!conference}
					>
						<option value="">-- Choose Team --</option>
						{teamsForConference.map((teamName) => (
							<option key={teamName} value={teamName}>{teamName}</option>
						))}
					</select>
				</div>
			</div>

			<div className="w-full max-w-4xl border rounded bg-gray-50 p-4">
				<div className="grid grid-cols-4 gap-3 font-semibold text-black border-b pb-2 mb-2">
					<div>Team Name</div>
					<div>Salary</div>
					<div>First Name</div>
					<div>Last Name</div>
				</div>
				{isLoading ? (
					<div className="text-gray-600 py-2">Loading coaches...</div>
				) : error ? (
					<div className="text-red-600 py-2">{error}</div>
				) : filteredCoaches.length === 0 ? (
					<div className="text-gray-600 py-2">No coaches match this filter.</div>
				) : (
					filteredCoaches.map((coach) => (
						<div key={`${coach.conference}-${coach.teamName}`} className="grid grid-cols-4 gap-3 text-black py-2 border-b last:border-b-0">
							<div>{coach.teamName}</div>
							<div>{coach.salary}</div>
							<div>{coach.firstName}</div>
							<div>{coach.lastName}</div>
						</div>
					))
				)}
			</div>

			<div className="flex gap-3 mt-6">
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					onClick={() => router.push("/stats")}
				>
					Go to Stats
				</button>
				<button
					className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
					onClick={() => router.push("/bracket")}
				>
					Go to Bracket
				</button>
			</div>
		</main>
	);
}
