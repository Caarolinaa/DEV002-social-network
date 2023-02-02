import { toNavigate } from "../main.js";
<<<<<<< HEAD
import { auth, logout } from "../Firebase/firebase.js";
import {
	savePost,
	onGetPosts,
	deletePost,
	updatePost,
	getPost,
} from "../Firebase/firestore.js";

export const feed = () => {
	const feedDiv = document.createElement("div");
	const containerNewPost = document.createElement("div");
	const postForm = document.createElement("form");
	const textAreaNewPost = document.createElement("textarea");
	const inputLocation = document.createElement("input");
	const buttonPost = document.createElement("button");
	const buttonSignOut = document.createElement("button");
	const containerTimeLine = document.createElement("div");
=======
import { register } from "../components/register.js"
import { auth, logout, viewer } from "../Firebase/firebase.js";
import { addPost, onGetPosts, postCollection, userCollection, getPosts, collection, db, onSnapshot, deletePost } from "../Firebase/firestore.js";
import { postPrint } from "./post.js";

export const feed = () => {

    //Creamos elementos del Feed
    const feedDiv = document.createElement("div");
    feedDiv.classList = "feedDiv"
    const header = document.createElement("div");
>>>>>>> 370c5bf6ddc0e4e7e940b225fdb7c64bee84117d

	feedDiv.className = "div-container-feed";
	containerNewPost.className = "div-container-newpost";
	postForm.className = "form-newpost";
	textAreaNewPost.className = "text-area-write-post";
	inputLocation.className = "input-post-location";
	buttonPost.className = "button-post";
	buttonSignOut.className = "button-signOut";
	containerTimeLine.className = "div-container-timeline";

	buttonPost.textContent = "Publicar";
	buttonSignOut.textContent = "Cerrar Sesión";

	feedDiv.appendChild(containerNewPost);
	feedDiv.appendChild(containerTimeLine);
	feedDiv.appendChild(buttonSignOut);
	containerNewPost.appendChild(postForm);
	postForm.appendChild(textAreaNewPost);
	postForm.appendChild(inputLocation);
	postForm.appendChild(buttonPost);

	let editPostStatus = false;
	let id = "";
	buttonSignOut.addEventListener("click", () => toNavigate("/"));
	buttonSignOut.addEventListener("click", async (e) => {
		e.preventDefault(); //cancela comportamiento por defecto de refrescar la pagina
		try {
			await logout(auth);
			toNavigate("/");
		} catch (error) {
			console.log(error);
		}
	});

	postForm.addEventListener("submit", (e) => {
		e.preventDefault();
		// console.log("publicando en Firestore");
		if (editPostStatus) {
			updatePost(id, {
				postContent: textAreaNewPost.value,
				location: inputLocation.value,
			});
		} else {
			savePost(textAreaNewPost.value, inputLocation.value);
		}
		postForm.reset();
	});

<<<<<<< HEAD
	window.addEventListener("DOMContentLoaded", async () => {
		// const querySnapshot = await getPost(); //Trae los datos que existen en ese momento.
		// onSnapshot(postCollection, (querySnapshot) => {
		onGetPosts((querySnapshot) => {
			let html = "";
			querySnapshot.forEach((doc) => {
				const post = doc.data();
				html += `
			<div>
				<h3>${post.location} </h3>
				<p>${post.postContent} </p>
				<button class = "button-trash" data-id="${doc.id}">Trash</button>
				<button class = "button-edit" data-id="${doc.id}">Edit</button>
			</div>`;
			});
			containerTimeLine.innerHTML = html;

			const buttonsTrashPost = containerTimeLine.querySelectorAll(".button-trash");
			buttonsTrashPost.forEach((buttonTrash) => {
				buttonTrash.addEventListener("click", (e) => {
					const postId = e.target.dataset;
					deletePost(postId.id);
				});
			});

			const buttonsEditPost = containerTimeLine.querySelectorAll(".button-edit");
			buttonsEditPost.forEach((buttonEdit) => {
				console.log(buttonEdit);
				buttonEdit.addEventListener("click", async (e) => {
					const doc = await getPost(e.target.dataset.id);
					const postData = doc.data();

					textAreaNewPost.value = postData.postContent;
					inputLocation.value = postData.location;

					editPostStatus = true;
					id = e.target.dataset.id;

					buttonPost.textContent = "Guardar";
				});
			});
		});
	});
	return feedDiv;
};
=======
    const newPostInput = document.createElement("textarea");
    newPostInput.classList = "newPostContent"
    const newPostButton = document.createElement("button");
    newPostButton.textContent = "publicar";
    const postFeed = document.createElement("section");
    postFeed.className = "post-feed";

    feedDiv.appendChild(header);
    header.appendChild(imgHeader);
    header.appendChild(inputSearchHeader);
    header.appendChild(buttonSignOut);
    feedDiv.appendChild(newPostContainer);
    newPostContainer.appendChild(newPostLocation);
    newPostContainer.appendChild(newPostTag);
    newPostContainer.appendChild(newPostInput);
    newPostContainer.appendChild(newPostButton);
    feedDiv.appendChild(postFeed);

    window.addEventListener('DOMContentLoaded', async () => {


        onGetPosts((querySnapshot) => {
            postFeed.innerHTML = ''
            querySnapshot.forEach(doc => {
                const postDiv = document.createElement('div')
                //console.log(doc.data())
                postDiv.className = "postDiv"
                const printedPost = postPrint(doc)
                postDiv.innerHTML = printedPost
                postFeed.appendChild(postDiv)
                //postDiv.innerHTML += `
                //<div class = post"> ${doc.data().post}</div>
                //`              
            });

            const btnDelete = postFeed.querySelectorAll('.buttonDelete')
            btnDelete.forEach(btn => {
                btn.addEventListener("click", async ({target: {dataset}}) => {
                    try{
                        await deletePost(dataset.id);
                    }
                    catch (error) {
                        console.log(error)
                    }
                })
                
            });
        });

    })




    buttonSignOut.addEventListener("click", () => toNavigate("/"));
    buttonSignOut.addEventListener("click", async (e) => {
        e.preventDefault() //cancela comportamiento por defecto de refrescar la pagina
        try {
            await logout(auth)
            toNavigate("/");
        } catch (error) {
            console.log(error)
        }

    })

    newPostButton.addEventListener("click", async (e) => {
        e.preventDefault()
        try {
            const postContent = newPostInput.value;
            const contenidoPost = await addPost(postContent)
            //console.log(postContent);
            //console.log(contenidoPost)
            newPostContainer.reset();

        } catch (error) {
            console.log(error)
        }
    })


    return feedDiv;
}
>>>>>>> 370c5bf6ddc0e4e7e940b225fdb7c64bee84117d
