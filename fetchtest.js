// fetch("http://cs361projectapi.herokuapp.com/")
// .then(data => {
// 	//return data.json();
// 	response = data.json();
// 	word = Object.keys(response);
// 	console.log(word);
// })

// .then(post => {
// 	console.log(post.title);
// })


// var word;
// var url = "http://flip3.engr.oregonstate.edu:3480/search/";

// const getImage = async () => {
// 	const request = await fetch("http://cs361projectapi.herokuapp.com/");
// 	const data = await request.json();
// 	return data;
// };

// const getAnagram = async (anagramURL) => {
// 	const request = await fetch(anagramURL);
// 	const data = await request.json();
// 	console.log(data);
// 	return data;
// }


// getImage().then(image => {
// 	console.log("image: ", image);
// 	word = Object.keys(image)[0];
// 	console.log("word : ", word);
// 	anaURL = url + word;
// 	console.log(anaURL);


// });



// GET TEXT FROM FETCH
/*
fetch("http://flip3.engr.oregonstate.edu:3480/search/street").then(response => response.text()).then((response) => {
	console.log(response);
})
*/


function testfunc() {
	const getImage = async () => {
		const request = await fetch("http://cs361projectapi.herokuapp.com/");
		const data = await request.json();
		return data;
	};

	const getAnagram = async (url) => {
		const request = await fetch(url);
		const data = await request.text();
		return data;
	};

	getImage().then(imageData => {
		console.log("image data: ", imageData);
		word = Object.keys(imageData)[0];
		console.log("word: ", word);
		imageurl = imageData[word];
		console.log("image url: ", imageurl);
		anagramURL = "http://flip3.engr.oregonstate.edu:3480/search/" + word;

		getAnagram(anagramURL).then(anagram => {
			console.log(anagram);
		})
	})
}
testfunc();
// getAnagram(anagramUrL).then(anagram => {
// 	console.log(anagram);
// });