console.log('script loaded');
let item = 0;
let isLoadingPosts = false;
history.scrollRestoration = 'manual';

let colors = ['red', 'green', 'yellow', 'pink', 'brown', 'grey', 'blue', 'orange', 'violet', 'indigo'];

posts();

function posts() {
	for(let j = 0; j < 10; j++) {
		let ele = document.createElement('div');
		ele.setAttribute('id', item);
		ele.setAttribute('class', 'post');
		ele.style.backgroundColor = colors[j];
		document.getElementById('scroll-pan').appendChild(ele);
		item++;
	}
}

function loadMorePosts() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			posts();
			//end the loading symbol
			document.getElementById('loading-symbol').style.display = 'none';
			isLoadingPosts = false;
			resolve(0);
		}, 1000)
	})
}

async function getPosts() {
	await loadMorePosts();
}

document.addEventListener('scroll', (e) => {
	console.log('scroll event called ', e);
	//document.documentElement.scrollHeight -> Is the total content loaded
	//document.documentElement.clientHeight -> Is the window height (whatever we are able to see on the screen)
	//document.documentElement.scrollTop -> Is the amount that the user has already scrolled
	console.log(document.documentElement.scrollHeight, document.documentElement.clientHeight, document.documentElement.scrollTop);
	if(document.documentElement.scrollHeight-300 <= (document.documentElement.clientHeight+document.documentElement.scrollTop)) {
		if(!isLoadingPosts) {
			//load more posts
			isLoadingPosts = true;
			//start the loading symbol
			document.getElementById('loading-symbol').style.display = 'block';
			getPosts();
		}
	}
})
