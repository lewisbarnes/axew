import Link from "next/link";

const Footer: React.FC = () => {
	return (
		<div className="bg-[#404040] text-white p-2 flex gap-3 -m-3 mt-8">
			<Link href="/">home</Link>
			<Link href="/paste">paste</Link>
		</div>
	);
};

export default Footer;
