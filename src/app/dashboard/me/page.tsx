import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UrlPreview } from "./_components/url";

export default async function Me() {
	const session = await auth();

	if (!session?.user) {
		redirect("/");
	}

	const userData = {
		id: session.user.id,
		name: session.user.name || null,
		username: session.user?.username || null,
		bio: session.user?.bio || null,
		image: session.user?.image || null,
	};

	return (
		<main className="w-full h-full flex gap-4 flex-col items-center p-4">
			<section className="w-full flex lg:flex-row flex-col lg:items-center justify-center lg:justify-center mx-auto bg-zinc-900 rounded-md p-4 gap-2">
				<UrlPreview username={userData.username} />
			</section>
		</main>
	);
}
