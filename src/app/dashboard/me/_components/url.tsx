"use client";

import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

interface UrlPreviewProps {
	username: string | null;
}

export function UrlPreview({ username: slug }: UrlPreviewProps) {
	const [error, setError] = useState<null | string>(null);
	const [userName, setUsername] = useState(slug);

	async function submiteAction(formData: FormData) {
		const username = formData.get("username") as string;
		if (username === "") {
			return;
		}
		const response = await createUsername({ username });

		if (response.error) {
			setError(response.error);
			return;
		}

		if (response.data) {
			setUsername(response.data);
		}
	}

	if (userName) {
		return (
			<div className="flex items-center p-2 gap-4 text-gray-100 ">
				<h3 className="font-bold text-md">Sua URL :</h3>
				<div className=" flex-col md:flex-row md:items-center items-start">
					<Link
						href={`${process.env.NEXT_PUBLIC_HOST_URL}creator/${userName}`}
						target="_blank"
						className="hover:text-gray-400 transition-colors duration-100"
					>
						{process.env.NEXT_PUBLIC_HOST_URL}creator/{userName}
					</Link>
				</div>
				<Link
					href={`${process.env.NEXT_PUBLIC_HOST_URL}creator/${userName}`}
					target="_blank"
					className="bg-blue-500 px-4 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200"
				>
					<Link2 className="w-5 h-5 text-white" />
				</Link>
			</div>
		);
	}

	return (
		<div className="w-full ">
			<div className="flex items-center flex-1 p-2 text-gray-100">
				<form
					className="flex flex-1 flex-col md:flex-row gap-4 items-start md:items-center"
					action={submiteAction}
				>
					<p>{process.env.NEXT_PUBLIC_HOST_URL}creator/</p>
					<input
						type="text"
						className="flex-1 outline-none border h-9 text-black border-gray-300 bg-gray-50 rounded-md px-1"
						placeholder="Digite seu username..."
						name="username"
					/>
					<Button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 h-9 w-full md:w-auto text-white px-4 rounded-md cursor-pointer"
					>
						Salvar
					</Button>
				</form>
			</div>
			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
}
