console.log('hi there')

let apikey = '6336574d5a574601871f9cbe614e000c';

let newsAccordion = document.getElementById("newsAccordion");
/* create a get requst */
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`, true);

xhr.onload = function () {
	if (this.status === 200) {
		let json = JSON.parse(this.responseText);
		let articles = json.articles;
		console.log(json);
		let newsHtml = "";
		articles.forEach((element,index) => {
			let news = `
			<div class="accordion" id="accordionPanelsStayOpenExample">
			<div class="accordion-item">
			  <h2 class="accordion-header" id="heading${index}">
				<button class="accordion-button collapsed" style="color:#3873fd;" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}"><b class="mx-2">${index+1}. </b>
				  ${element["title"]}
				</button>
			  </h2>
			  <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}">
				<div class="accordion-body">${element["content"]}.<a class="text-decoration-none" href = "${element['url']}" target="_blank"> Read more</a>
				</div>
			  </div>
			</div>
		  </div>`;
			newsHtml += news;
		});
		newsAccordion.innerHTML = newsHtml;
	} else {
		console.log("some error occured")
	}
}

xhr.send();