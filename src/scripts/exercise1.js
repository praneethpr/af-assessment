import '../styles/exercise1.scss';
const myTemplate = require("./exercise1.hbs");

async function getUsers() {
	const response = await fetch('https://5dc588200bbd050014fb8ae1.mockapi.io/assessment');
	const data = {'data' : await response.json()};
	let peopleContainer = await document.getElementById("people-container");
	peopleContainer.innerHTML = await myTemplate(data);
	return data;
}

getUsers();
