"use client";

import { useEffect, useState } from "react";

type Bracket = {
	id: number;
	name: string;
	data: string;
	created_at?: string;
};

export default function StoredBracketsPage() {
	const [brackets, setBrackets] = useState<Bracket[]>([]);
	const [loading, setLoading] = useState(true);

	const [editingId, setEditingId] = useState<number | null>(null);
	const [editName, setEditName] = useState("");
	const [editData, setEditData] = useState("");

	const [newName, setNewName] = useState("");
	const [newData, setNewData] = useState("");

	const API = "http://localhost:5001";

	// ----------------------------
	// LOAD BRACKETS (READ)
	// ----------------------------
	const loadBrackets = async () => {
		try {
			setLoading(true);

			const res = await fetch(`${API}/stored_brackets`);
			const data = await res.json();

			const formatted = data.map((b: any) => ({
				id: b.bracket_id,
				name: b.name,
				data: b.data,
				created_at: b.created_at,
			}));

			setBrackets(formatted);
		} catch (err) {
			console.error("Failed to load brackets:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadBrackets();
	}, []);

	// ----------------------------
	// CREATE BRACKET
	// ----------------------------
	const createBracket = async () => {
		if (!newName || !newData) return;

		await fetch(`${API}/stored_brackets`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: newName,
				data: newData,
			}),
		});

		setNewName("");
		setNewData("");
		loadBrackets();
	};

	// ----------------------------
	// DELETE BRACKET
	// ----------------------------
	const deleteBracket = async (id: number) => {
		await fetch(`${API}/stored_brackets/${id}`, {
			method: "DELETE",
		});

		setBrackets((prev) => prev.filter((b) => b.id !== id));
	};

	// ----------------------------
	// START EDIT
	// ----------------------------
	const startEdit = (b: Bracket) => {
		setEditingId(b.id);
		setEditName(b.name);
		setEditData(b.data);
	};

	// ----------------------------
	// SAVE EDIT
	// ----------------------------
	const saveEdit = async () => {
		if (!editingId) return;

		await fetch(`${API}/stored_brackets/${editingId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: editName,
				data: editData,
			}),
		});

		setEditingId(null);
		setEditName("");
		setEditData("");
		loadBrackets();
	};

	return (
		<main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
			<h1 className="text-3xl font-bold text-blue-700 mb-6">
				Stored Brackets
			</h1>

			{/* ---------------- CREATE ---------------- */}
			<div className="text-blue-700 font-semibold mb-2">
				<h2 className="font-semibold mb-2">Create New Bracket</h2>

				<input
					className="w-full border p-2 mb-2"
					placeholder="Bracket Name"
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
				/>

				<textarea
					className="w-full border p-2 mb-2"
					placeholder="Bracket Data (JSON or text)"
					value={newData}
					onChange={(e) => setNewData(e.target.value)}
				/>

				<button
					onClick={createBracket}
					className="bg-blue-600 text-white px-4 py-2 rounded"
				>
					Save Bracket
				</button>
			</div>

			{/* ---------------- LIST ---------------- */}
			<div className="text-blue-700 font-semibold mb-2">
				{loading ? (
					<p>Loading...</p>
				) : brackets.length === 0 ? (
					<p className="text-gray-500">No brackets found</p>
				) : (
					brackets.map((b) => (
						<div key={b.id} className="bg-white p-4 mb-4 shadow rounded">
							{editingId === b.id ? (
								<>
									<input
										className="w-full border p-2 mb-2"
										value={editName}
										onChange={(e) => setEditName(e.target.value)}
									/>
									<textarea
										className="w-full border p-2 mb-2"
										value={editData}
										onChange={(e) => setEditData(e.target.value)}
									/>
									<div className="flex gap-2">
										<button
											onClick={saveEdit}
											className="bg-green-600 text-white px-3 py-1 rounded"
										>
											Save
										</button>
										<button
											onClick={() => setEditingId(null)}
											className="bg-gray-400 text-white px-3 py-1 rounded"
										>
											Cancel
										</button>
									</div>
								</>
							) : (
								<>
									<h3 className="font-bold text-lg">{b.name}</h3>
									<p className="text-sm text-gray-600 break-all">
										{b.data}
									</p>

									<div className="flex gap-2 mt-2">
										<button
											onClick={() => startEdit(b)}
											className="bg-yellow-500 text-white px-3 py-1 rounded"
										>
											Edit
										</button>

										<button
											onClick={() => deleteBracket(b.id)}
											className="bg-red-600 text-white px-3 py-1 rounded"
										>
											Delete
										</button>
									</div>
								</>
							)}
						</div>
					))
				)}
			</div>
		</main>
	);
}