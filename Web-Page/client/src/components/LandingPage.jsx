
import React from "react";
import { Button } from "./ui/button";

const cards = [
	{
		img: "https://source.unsplash.com/600x400/?health,doctor",
		title: "Accessible Healthcare",
		desc: "Bringing quality healthcare to your fingertips, anytime, anywhere.",
	},
	{
		img: "https://source.unsplash.com/600x400/?medicine,pharmacy",
		title: "Trusted Medicines",
		desc: "Get reliable information and reminders for your medications.",
	},
	{
		img: "https://source.unsplash.com/600x400/?consultation,online",
		title: "Expert Consultation",
		desc: "Connect with certified professionals for your health queries.",
	},
	{
		img: "https://source.unsplash.com/600x400/?wellness,fitness",
		title: "Wellness Guidance",
		desc: "Personalized tips for a healthier, happier you.",
	},
	{
		img: "https://source.unsplash.com/600x400/?emergency,ambulance",
		title: "Emergency Support",
		desc: "Quick help and resources in times of need.",
	},
	{
		img: "https://source.unsplash.com/600x400/?community,care",
		title: "Community Care",
		desc: "Join a supportive community focused on well-being.",
	},
];

const LandingPage = ({ onStartChat }) => {
	return (
		<div className="w-full min-h-screen bg-[url(/resources/odisha.jpg)]">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
				<h1 className="text-6xl md:text-7xl font-extrabold text-blue-700 dark:text-blue-300 mb-6 drop-shadow-lg">संजीवनी</h1>
				<p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 font-medium italic">
					"Empowering health, enriching lives."
				</p>
				{onStartChat && (
					<Button size="lg" className="mt-2 px-8 py-4 text-lg font-semibold" onClick={onStartChat}>
						Open Chat
					</Button>
				)}
			</section>

			{/* Cards Section */}
			<section className="max-w-4xl mx-auto py-12 flex flex-col gap-10">
				{cards.map((card, idx) => (
					<div
						key={idx}
						className={`flex flex-col md:flex-row items-center rounded-3xl shadow-lg bg-white dark:bg-gray-900 overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 ${
							idx % 2 === 1 ? "md:flex-row-reverse" : ""
						}`}
					>
						<img
							src={card.img}
							alt={card.title}
							className="w-full md:w-2/5 h-56 md:h-64 object-cover"
							loading="lazy"
						/>
						<div className="flex-1 p-8 flex flex-col items-start justify-center">
							<h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">{card.title}</h2>
							<p className="text-gray-600 dark:text-gray-300 text-lg">{card.desc}</p>
						</div>
					</div>
				))}
			</section>
		</div>
	);
};

export default LandingPage;
