import Head from 'next/head';
import Header from "../components/header";
import SaleStatus from "../components/top-sale-status";
import Social from "../components/social";
import Press from "../components/press";
import ProjectInfo from "../components/project-info";
import ProjectFeatures from "../components/project-features";
import Roadmap from "../components/roadmap";
import Testimonials from "../components/testimonials";
import Specs from "../components/specs";
import Team from "../components/team";
import News from "../components/news";
import HireMe from "../components/hire-me";
import Footer from "../components/footer";

export default () => <div>
	<Head>
		<title>Token Sale Demo by @ledfusion</title>
		<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous" />
	</Head>

	<style global jsx>{`
		body {}
	`}</style>

	<Header/>
	<SaleStatus />
	<Social />
	<Press />
	<ProjectInfo />
	<ProjectFeatures />
	<Roadmap />
	<Testimonials />
	<Specs/>
	<Team/>
	<News/>
	<HireMe/>
	<Footer/>
</div>
