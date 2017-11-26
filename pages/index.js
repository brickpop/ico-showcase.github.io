import Head from 'next/head';
import TopHeader from "../components/top-status";

export default () => <div>
	<Head>
		<title>Token Sale Demo by @ledfusion</title>
		<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous" />
	</Head>

	<style global jsx>{`
		body {}
	`}</style>

	<TopHeader />
</div>
