import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
	const u = await request.text();

	cookies.set("session", u);

	return json({ Data: "Data" }, { status: 201 });
}

export async function DELETE({ request, cookies }) {
	cookies.delete("session")
    return json({ Data: "Data" }, { status: 201 });
}