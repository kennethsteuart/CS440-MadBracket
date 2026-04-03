"use client";
import { useState, useEffect } from "react";


type Bracket = {
	id: number;
	name: string;
	data: string;
};

export default function StoredBracketsPage() {
	const [brackets, setBrackets] = useState<Bracket[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editName, setEditName] = useState("");
	const [editData, setEditData] = useState("");

	// Load from localStorage on mount
	useEffect(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("madbracket_brackets");
			if (stored) {
				setBrackets(JSON.parse(stored));
			}
		}
	}, []);

	// Delete
	const handleDelete = (id: number) => {
		setBrackets((prev) => {
			const updated = prev.filter((b) => b.id !== id);
			if (typeof window !== "undefined") {
				localStorage.setItem("madbracket_brackets", JSON.stringify(updated));
			}
			return updated;
		});
	};

	// Edit
	const startEdit = (bracket: Bracket) => {
		setEditingId(bracket.id);
		setEditName(bracket.name);
		setEditData(bracket.data);
	};
	const handleEditSave = () => {
		setBrackets((prev) => {
			const updated = prev.map((b) =>
				b.id === editingId ? { ...b, name: editName, data: editData } : b
			);
			if (typeof window !== "undefined") {
				localStorage.setItem("madbracket_brackets", JSON.stringify(updated));
			}
			return updated;
		});
		setEditingId(null);
		setEditName("");
		setEditData("");
	};
	const handleEditCancel = () => {
		setEditingId(null);
		setEditName("");
		setEditData("");
	};

	return (
		<main className="flex flex-col items-center min-h-screen p-8 bg-gray-50">
			<h1 className="text-2xl font-bold mb-6 text-blue-800">Stored Brackets</h1>
			<div className="w-full max-w-2xl">
				{brackets.length === 0 && (
					<div className="text-gray-500 text-center">No brackets stored yet.</div>
				)}
				{brackets.map((bracket) => (
					<div
						key={bracket.id}
						className="bg-white rounded shadow p-4 mb-4 flex flex-col gap-2"
					>
						{editingId === bracket.id ? (
							<>
								<input
									className="w-full mb-2 p-2 border rounded"
									value={editName}
									onChange={(e) => setEditName(e.target.value)}
								/>
								<textarea
									className="w-full mb-2 p-2 border rounded"
									value={editData}
									onChange={(e) => setEditData(e.target.value)}
								/>
								<div className="flex gap-2">
									<button
										className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
										onClick={handleEditSave}
									>
										Save
									</button>
									<button
										className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
										onClick={handleEditCancel}
									>
										Cancel
									</button>
								</div>
							</>
						) : (
							<>
								<div className="flex justify-between items-center">
									<div>
										<span className="font-semibold text-lg">{bracket.name}</span>
									</div>
									<div className="flex gap-2">
										<button
											className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
											onClick={() => startEdit(bracket)}
										>
											Edit
										</button>
										<button
											className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
											onClick={() => handleDelete(bracket.id)}
										>
											Delete
										</button>
									</div>
								</div>
								<div className="text-xs text-gray-600 break-all">
									{bracket.data}
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</main>
	);
}
										//</button>
