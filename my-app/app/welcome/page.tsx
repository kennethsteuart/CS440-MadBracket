"use client";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
	const router = useRouter();
	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-100 to-white">
			<h1 className="text-4xl font-bold mb-4 text-blue-800">Hello, MadBracket!</h1>
			<div className="text-lg max-w-xl text-center mb-8 text-gray-700">
				<p>
					Welcome to MadBracket, a web application for getting information on NCAA Division 1 Men's Basketball teams. Stay in the loop on the current contenders and personalize your own bracket for March Madness!
				</p>
				<br />
				<p>The conferences in this application consist of:</p>
				<ul className="list-disc list-inside mt-2 text-left">
					<li>Southeastern Conference</li>
					<li>Atlantic Coast Conference</li>
					<li>Big 10</li>
					<li>Big 12</li>
					<li>Big East</li>
				</ul>
			</div>
			<button
				className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
				onClick={() => router.push("/stats")}
			>
				Go to Stats
			</button>
		</main>
	);
}
