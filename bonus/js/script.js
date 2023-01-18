/*
    STEPS:
        Milestone 1
            1. Creare un array di oggetti dove ogni oggetto rappresenta un post.
            2. Popolare ogni oggetto con gli attributi che serviranno a stampare la card del post in questione
                2A. - id del post, numero progressivo da 1 a n
                    - nome autore,
                    - foto autore,
                    - data in formato americano (yyyy-mm-dd),
                    - testo del post,
                    - immagine (non tutti i post devono avere una immagine),
                    - numero di likes.
        Milestone 2
            1. Creare la struttura html per stampare i post nemma pagina, usando come riferimento il file fornito
        Milestone 3
            1. Creare un secondo array dove salvare i post che hanno ricevuto un like
            2. Creare un evento di click sul pulsante del like
                2A. Il colore del testo del bottone cambia
                2B. Il conteggio dei like relativo a quel post si incrementa
                2C. Il post che ha ricevuto like viene pushato in un array dedicato
        Bonus 1.
            1. Usare split per creare un array delle date per riformattarle con il formato italiano
        Bonus 2
            1. Creare e stilizzare un elemento placeholder per la foto profilo null
            2. Salvare questo elemento in una variabile.
            3. Inserire quella variabile in alt:"" del tag img del profilo
        Bonus 3
            1. Aggiungere un if all'evento del pulsante like per quando è già cliccato
                1A. togliere la classe "liked"
                1B. Decrementare il valore dei like
                1C. Togliere il post in questione dall'array dei post piaciuti
*/
console.log("Collegamento javascript ok");

// Array post
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
console.log("Array post", posts);

// Riformattazione data
for (let i = 0; i < posts.length; i++) {
    let dateSplit = posts[i].created.split("-");
    dateSplit.reverse();
    let itaDate = dateSplit.join("/");
    console.log("data italiana", itaDate, typeof itaDate);
    posts[i].created = itaDate;
}

// Immagine di profile fallback
const profilePic = document.createElement('div');
profilePic.classList.add("profile-pic-default");
const profileInitials = document.createElement('span');
profileInitials.innerHTML = "LF";
profilePic.append(profileInitials);

// Creazione post
const postContainer = document.getElementById("container");

let i = 0;
while (i < posts.length) {
    postContainer.innerHTML += `<div class="post">
                                    <div class="post__header">
                                        <div class="post-meta">                    
                                            <div class="post-meta__icon">
                                                <img class="profile-pic" src="${posts[i].author.image}" alt="${profilePic}">                    
                                            </div>
                                            <div class="post-meta__data">
                                                <div class="post-meta__author">${posts[i].author.name}</div>
                                                <div class="post-meta__time">${posts[i].created}</div>
                                            </div>                    
                                        </div>
                                    </div>
                                    <div class="post__text">${posts[i].content}</div>
                                    <div class="post__image">
                                        <img src="${posts[i].media}" alt="">
                                    </div>
                                    <div class="post__footer">
                                        <div class="likes js-likes">
                                            <div class="likes__cta">
                                                <a class="like-button  js-like-button" data-postid="${posts[i].id}">
                                                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                                    <span class="like-button__label">Mi Piace</span>
                                                </a>
                                            </div>
                                            <div class="likes__counter">
                                                Piace a <b id="like-counter-1" class="js-likes-counter">${posts[i].likes}</b> persone
                                            </div>
                                        </div> 
                                    </div>            
                                </div>`;
    i++;
}

// Operazioni sui likes (pulsante/numero likes)
const likeBtnGroup = document.querySelectorAll(".like-button");
console.log("like button array", likeBtnGroup);

const likedPosts = [];

for (let i = 0; i < likeBtnGroup.length; i++) {
    likeBtnGroup[i].addEventListener('click', 
        function () {
            const likeBtn = document.querySelectorAll(".like-button");
            let likesCounter = document.querySelectorAll(".js-likes-counter");

            if (likeBtn[i].classList.contains("like-button--liked")) {
                likeBtn[i].classList.remove("like-button--liked");
                posts[i].likes--;
                likesCounter[i].innerHTML--;
                console.log("likes", posts[i].likes);
                
                likedPosts.splice(posts[i].id);
            }
            else {
                likeBtn[i].classList.add("like-button--liked");
                posts[i].likes++;
                likesCounter[i].innerHTML++;
                console.log("likes", posts[i].likes);
                
                likedPosts.push(posts[i].id);
            }
            console.log("liked posts", likedPosts);
        }       
    );
}
