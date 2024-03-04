let rPosts = {};

const loadPost = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const post = await res.json();
    const posts = post.posts;
    rPosts = post.posts;
    displayPost(posts);

}

const displayPost = posts => {

    // console.log('post');

    const postContainer = document.getElementById('post-container');

    //clear post container before add new data

    postContainer.textContent = '';

    // displayPost first to 06

    posts = posts.slice(0, 6);

    posts.forEach(post => {
        console.log(post);
        //1 create a div 
        const postCard = document.createElement('div')

        postCard.classList = `flex gap-4 lg:w-[750px] bg-base-100 rounded-2xl p-4`;

        //2 set inner html
        postCard.innerHTML = `<div class="flex justify-center">
        <div class="flex items-stretch h-20 w-20 indicator">
        <span class="indicator-item badge badge-success"></span>
        <img src="${post.image}" class="rounded-2xl" alt=""></div>
    </div>
    <div class="flex flex-col gap-3">
        <div class="flex flex-col lg:flex-row justify-between p-2">
            <p>#${post.category}</p>
            <p>Author: ${post.author.name}</p>
        </div>
        <p class="font-extrabold lg:text-xl lg:ml-0 -ml-20">${post.title}</p>
        <p class="text-slate-600 lg:w-[600px] lg:ml-0 -ml-20">${post.description}
        </p>
        
        <div class="flex justify-between lg:ml-0 -ml-20">
            <div class="flex gap-4">
                <p><i class="fa-regular fa-message"></i> <span>${post.comment_count}</span></p>
                <p><i class="fa-regular fa-eye"></i> <span>${post.view_count}</span></p>
                <p><i class="fa-regular fa-clock"></i> <span>${post.posted_time}</span></p>
            </div>
            <div>
                <button onclick="postRead()" class="btn btn-circle text-green-500 text-xl">
                    <i class="fa-solid fa-envelope-open"></i>
                </button>
            </div>
        </div>
    </div>
    `
        //3 append child

        postContainer.appendChild(postCard);

    });
    //hide loading spinner 
    toggleLoadingSpinner(false);

}

// displayPost()

//handel search button

const handelSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPost(searchText)
}


//loader 
const toggleLoadingSpinner = (isLodding) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLodding) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }

}

// const id = document.getElementById(`${rPosts.id}`)
// post cart show right side

let postReadCount = 0;
const postRead = () => {

    postReadCount++;

    setInnerText();

    const postReadContainer = document.getElementById('read-massage-container');

    //1 create a div 
    rPosts = rPosts.slice(0, 1);
    for (post of rPosts) {


        const addPostRead = document.createElement('div')

        addPostRead.classList = `flex items-center justify-evenly w-[360px] h-24 shadow-2xl rounded-2xl bg-base-100`;

        //2 set inner html
        addPostRead.innerHTML = `<h1 class="font-bold w-52
                        ">${post.title}</h1>
                        <p><i class="fa-regular fa-eye"></i></p>
                        <p class="text-xl">${post.view_count}</p>`;
        postReadContainer.appendChild(addPostRead);
    }

}



const loadLatestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts?`);
    const latestPosts = await res.json();
    // const latestPosts = latestPost[1];
    displayLatestPost(latestPosts);
}

const displayLatestPost = latestPosts => {


    // console.log('post');

    const latestPostContainer = document.getElementById('card-container');
    latestPosts = latestPosts.slice(0, 3);
    for (latestPost of latestPosts) {
        console.log(latestPosts);
        //1 create a div 
        const postCard = document.createElement('div')

        postCard.classList = `card w-[72] lg:w-96 bg-base-100 shadow-xl`;

        //2 set inner html
        postCard.innerHTML = `<figure class="px-10 pt-10">
            <img src="${latestPost.cover_image}" alt="Shoes"
                class="rounded-xl" />
        </figure>
        <div class="card-body items-start">
            <div class="flex items-start gap-2">
                <p><i class="fa-solid fa-calendar-days"></i></p>
                <p>${latestPost.author?.posted_date || 'Just Now'}</p>
            </div>
            <h2 class="card-title">${latestPost.title}</h2>
            <p>${latestPost.description}</p>
            <div class="card-actions flex items-start gap-4 pt-2">
                <button class="btn btn-circle btn-outline">
                    <img src="${latestPost.profile_image}" alt="">
                </button>
                <div class="flex flex-col">
                    <h2 class="text-xl font-bold">${latestPost.author.name}</h2>
                    <p>${latestPost.author?.designation || 'Unknown'}</p>
                </div>
            </div>
        </div>`
        //3 append child

        latestPostContainer.appendChild(postCard);

    };
    //hide loading spinner 
    toggleLoadingSpinner(false);

}

loadLatestPost();












//set inner text of read massage
function setInnerText() {
    document.getElementById('read-count').innerText = postReadCount;
}