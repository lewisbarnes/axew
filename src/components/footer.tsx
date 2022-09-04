import Link from "next/link";

const Footer: React.FC = () => {
	return (
		<div className="footer">
			<Link href="/">home</Link>
			<Link href="/paste">paste</Link>
		</div>
	);
};

export default Footer;
