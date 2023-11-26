import Heading from "@/app/(lendingPage)/_components/heading";
import Heroes from "./_components/heroes";

const LendingPage = () => {
	return (
		<div className='min-h-full flex flex-col'>
			<div className='flex flex-col justify-center items-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
				<Heading />
				<Heroes />
			</div>
		</div>
	);
};

export default LendingPage;
