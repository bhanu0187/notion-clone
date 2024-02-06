"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/spinner";

const Heading = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	return (
		<div className='max-w-3xl space-y-4'>
			<h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
				Your ideas, Documents, & Plans. Unified. Welcome to{" "}
				<span className='underline'>JotSpace</span>
			</h1>
			<h3 className='text-base sm:text-xl md:text-2xl font-medium'>
				JotSpace is the connected workspace where better, faster work happens.
			</h3>
			{isLoading && (
				<div className='w-full flex items-center justify-center'>
					<Spinner size='lg' />
				</div>
			)}
			{isAuthenticated && !isLoading && (
				<Button asChild>
					<Link href='/documents'>
						Enter JotSpace
						<ArrowRight className='h-4 w-4 ml2' />
					</Link>
				</Button>
			)}
			{!isAuthenticated && !isLoading && (
				<SignInButton mode='modal'>
					<Button>
						Get JotSpace Free
						<ArrowRight className='h-4 w-4 ml2' />
					</Button>
				</SignInButton>
			)}
		</div>
	);
};

export default Heading;
