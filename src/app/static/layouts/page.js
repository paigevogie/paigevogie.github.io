import PropTypes from 'prop-types';
import React from 'react';
import Router from '../../Router';
import Footer from '../../Footer';
import { StaticRouter } from 'react-router-dom';

const Page = ({ title, stylesheet, header, main, footer, script, _relativeURL, _ID }) => (
	<html>
	<head>
		<meta charSet="utf-8"/>
        <meta name="language" content="english"/>
        <meta httpEquiv="content-type" content="text/html"/>
        <meta name="author" content="Paige Vogenthaler"/>
        <meta name="designer" content="Paige Vogenthaler"/>
        <meta name="publisher" content="Paige Vogenthaler"/>
        <meta name="no-email-collection" content="http://www.unspam.com/noemailcollection/"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="The portfolio of Paige Vogenthaler"/>
        <meta name="subject" content="The portfolio of Paige Vogenthaler"/>
        <meta name="abstract" content="The portfolio of Paige Vogenthaler"/>
        <meta name="topic" content="The portfolio of Paige Vogenthaler"/>
        <meta name="keywords" content="Software Engineer"/>
        <meta name="robots" content="index,follow"/>
        <meta name="googlebot" content="index,follow"/>
        <meta name="distribution" content="web"/>
        <meta httpEquiv="refresh" content="30"/>
        <meta name="HandheldFriendly" content="true"/>
        <title>{title} | Paige Vogenthaler</title>
        <link rel="icon" href="/assets/favicon.png" type="image/png"></link>
		<link rel="stylesheet" href={ _relativeURL( `/assets/css/site.css`, _ID ) } />
		{
			stylesheet != undefined
				? ( <link rel="stylesheet" href={ _relativeURL( `/assets/css/${ stylesheet }.css`, _ID ) } /> )
				: null
		}
	</head>
	<body id="root">
		<StaticRouter>
			<Router isBlog={true} />
		</StaticRouter>
		<div className="main">
			<h2>{ header }</h2>
			{ main }
		</div>
		<Footer />
		{
			script != undefined
				? ( <script src={ _relativeURL( `/assets/js/${ script }.js`, _ID ) } /> )
				: null
		}
	</body>
	</html>
);

Page.propTypes = {
	title: PropTypes.string.isRequired,
	main: PropTypes.node.isRequired,
	footer: PropTypes.node.isRequired,
};

Page.defaultProps = {};

export default Page;
