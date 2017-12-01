import axios from "axios";

export function getEthUsdRate(){
	return axios.get("https://api.coinmarketcap.com/v1/ticker/ethereum/").then(response => {
		if(!response || !response.data || !response.data.length || !response.data[0].price_usd) throw new Error("Unable to load the current rates");
		return response.data[0].price_usd;
	})
}
