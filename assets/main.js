const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCkigD9ZyGK7tdlsd2DS78AQ&part=9&order=date&maxResults=50';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8f41f0d1c7msh21bccd0b78e2b5dp1a54e5jsn41e0890dca6c',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {

        const videos = await fetchData(API);
        
        let view = `
            ${videos.items.map(video => `
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnail.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            `).slice(0,4).join('')}
        `;

        content.innerHTML = view;

    } catch (error) {
        let view = `
            <div role="alert">
                <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Oops!
                </div>
                <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>I'm sorry, i couldn't get my videos from youtube</p>
                </div>
            </div>
        `;

        content.innerHTML = view;
    }
})();