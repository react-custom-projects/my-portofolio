import React from 'react';
import { withRouter } from 'react-router-dom';
import NavigationItem from './NavigationItem';

const SideNav = ({ history }) => {
	const replaceUrl = (url) => {
		history.replace(url);
	};

	return (
		<nav className="quick-nav">
			<NavigationItem click={replaceUrl} link="/" icon="fa-home" title="Intro" exact={true} />
			<NavigationItem click={replaceUrl} link="/about-me" icon="fa-info" title="About Me" />
			<NavigationItem click={replaceUrl} link="/skills" icon="fa-cogs" title="Skills" />
			<NavigationItem
				click={replaceUrl}
				link="/my-portfolio"
				icon="fa-image"
				title="My Portfolio"
			/>
		</nav>
	);
};

export default withRouter(SideNav);
