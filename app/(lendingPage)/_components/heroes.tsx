import Image from "next/image";

const Heroes = () => {
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='flex items-center'>
				<div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]'>
					<Image
						src='/documents.png'
						fill
						className=' object-contain dark:hidden'
						alt='Documents'
					/>
					<Image
						src='/documents-dark.png'
						fill
						className=' object-contain hidden dark:block'
						alt='Documents'
						sizes=''
					/>
				</div>
				<div className='relative w-[400px] h-[400px] hidden md:block'>
					<Image
						src='/reading.png'
						alt='Reading'
						className=' object-contain dark:hidden'
						fill
					/>
					<Image
						src='/reading-dark.png'
						alt='Reading'
						className=' object-contain hidden dark:block'
						fill
						sizes=''
					/>
				</div>
			</div>
		</div>
	);
};

export default Heroes;
