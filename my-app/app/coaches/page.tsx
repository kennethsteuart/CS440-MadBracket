"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CoachRow = {
  conference: string;
  schoolName: string;   // matches school_name from DB
  teamName: string;     // matches team_name from DB  
  salary: string;       // VARCHAR in DB, comes back as string like "$3,500,000"
  firstName: string;
  lastName: string;
  hireDate: string;
};

export default function CoachesPage() {
  const router = useRouter();
  const [conference, setConference] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [coaches, setCoaches] = useState<CoachRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
	const controller = new AbortController();
	let didCancel = false;  // add this
  
	const loadCoaches = async () => {
	  setIsLoading(true);
	  setError("");
	  try {
		const res = await fetch("http://localhost:5001/coaches", {
		  signal: controller.signal,
		});
		if (!res.ok) {
		  const text = await res.text();
		  throw new Error(text || "Failed to load coaches");
		}
		const data = await res.json();
		
		if (!didCancel) {  // only set state if this fetch is still valid
		  setCoaches(
			data.map((row: any) => ({
			  conference: row.conference_name,
			  schoolName: row.school_name,
			  teamName: row.team_name,
			  salary: row.salary,
			  firstName: row.first_name,
			  lastName: row.last_name,
			  hireDate: row.hire_date,
			}))
		  );
		}
	  } catch (err: any) {
		if (err.name === "AbortError") return;
		if (!didCancel) setError(err.message || "Unable to load coaches right now.");
	  } finally {
		if (!didCancel) setIsLoading(false);
	  }
	};
  
	loadCoaches();
	return () => {
	  didCancel = true;  // mark as cancelled on cleanup
	  controller.abort();
	};
  }, []);

  const conferences = useMemo(
    () => Array.from(new Set(coaches.map((c) => c.conference))).sort(),
    [coaches]
  );

  // Deduplicated schools for the selected conference
  const schoolsForConference = useMemo(
    () =>
      conference
        ? Array.from(
            new Set(
              coaches
                .filter((c) => c.conference === conference)
                .map((c) => c.schoolName)
            )
          ).sort()
        : [],
    [coaches, conference]
  );

  const filteredCoaches = useMemo(
	() =>
	  // Don't show anything until both dropdowns are selected
	  conference && team
		? coaches.filter(
			(coach) =>
			  coach.conference === conference && coach.schoolName === team
		  )
		: [],
	[coaches, conference, team]
  );

  return (
    <main className="flex flex-col items-center min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-2 text-black">Coaches</h1>
      <p className="text-gray-600 mb-6 text-center max-w-xl">
        Head basketball coaches by conference and school.
      </p>

      <div className="w-full max-w-5xl mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-sm text-gray-600">Conference</label>
          <select
            className="w-full p-2 border rounded text-black bg-white"
            value={conference}
            onChange={(e) => {
              setConference(e.target.value);
              setTeam("");
            }}
          >
            <option value="">All conferences</option>
            {conferences.map((conf) => (
              <option key={conf} value={conf}>{conf}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-600">School</label>
          <select
            className="w-full p-2 border rounded text-black bg-white disabled:bg-gray-100 disabled:text-gray-400"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            disabled={!conference}
          >
            <option value="">
              {conference ? "All schools" : "Select a conference first"}
            </option>
            {schoolsForConference.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full max-w-5xl border rounded overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 gap-2 bg-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          <div>Conference</div>
          <div>School</div>
          <div>Mascot</div>
          <div>First name</div>
          <div>Last name</div>
          <div>Salary</div>
        </div>

        {isLoading ? (
          <div className="text-gray-500 px-4 py-6 text-center">Loading coaches...</div>
        ) : error ? (
          <div className="text-red-600 px-4 py-6 text-center">{error}</div>
      
		) : filteredCoaches.length === 0 ? (
			<div className="text-gray-500 px-4 py-6 text-center">
			  {!conference
				? "Select a conference to get started."
				: !team
				? "Select a school to see their coach."
				: "No coach found for this selection."}
			</div>
        ) : (
          filteredCoaches.map((coach, i) => (
            <div
              key={`${coach.conference}-${coach.schoolName}-${coach.firstName}-${coach.lastName}`}
              className={`grid grid-cols-6 gap-2 px-4 py-3 text-sm text-black border-t ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="text-gray-500">{coach.conference}</div>
              <div className="font-medium">{coach.schoolName}</div>
              <div className="text-gray-500">{coach.teamName}</div>
              <div>{coach.firstName}</div>
              <div>{coach.lastName}</div>
              <div>{coach.salary}</div>  {/* already formatted string from DB */}
            </div>
          ))
        )}
      </div>

      <p className="text-sm text-gray-400 mt-2 self-start w-full max-w-5xl">
        {!isLoading && !error &&
          `Showing ${filteredCoaches.length} coach${filteredCoaches.length !== 1 ? "es" : ""}`}
      </p>

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