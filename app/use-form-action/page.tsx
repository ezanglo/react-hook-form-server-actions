import UseFormActionForm from "@/components/use-form-action-form";
import { unstable_noStore as noStore } from "next/cache";

export default function Home() {
	noStore()
	return (
		<main className="grid md:max-w-[30rem] md:mx-auto p-10">
			<UseFormActionForm/>
		</main>
	);
}
