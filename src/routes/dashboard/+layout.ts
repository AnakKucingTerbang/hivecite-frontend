import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types'; // Changed PageLoad to LayoutLoad for +layout.ts
import Database from "@tauri-apps/plugin-sql";

// Define the shape of a research item
interface ResearchItem {
	id: string;
	name: string;
	created_at: string; // Assuming created_at is stored as an ISO string or similar
}

export const load: LayoutLoad = async ({ params }) => {
	try {
		const db = await Database.load("sqlite:hivecite.db");
		// Ensure the table and columns exist as expected.
		// Adjust the query if your table/column names are different.
		const researchItems = await db.select<ResearchItem[]>("SELECT id, name, created_at FROM research WHERE deleted_at is NULL ORDER BY created_at DESC");
		
		return {
			research: researchItems
		};
	} catch (e) {
		console.error("Failed to load research data:", e);
		// Optionally, re-throw the error or return a specific error state
		throw error(500, 'Failed to load research data');
	}
};
