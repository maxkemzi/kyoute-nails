import LangDropdown from './LangDropdown';
import Navbar from './Navbar';
import ShoppingBag from './ShoppingBag';

const Header = async () => {
	return (
		<header className="shadow-border max-md:py-4">
			<div className="container container-lg">
				<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-lg:grid-cols-[1fr_auto]">
					<div className="max-lg:hidden" />
					<Navbar />
					<div className="justify-self-end flex items-center gap-4 max-md:gap-3">
						<LangDropdown />
						<ShoppingBag />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
