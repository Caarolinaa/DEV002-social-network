import { toNavigate } from "../main.js";
import { register } from "../components/register.js";
import {
	auth,
	currentUser,
	logout,
	userSignedIn,
	viewer,
	getDisplayName,
} from "../Firebase/firebase.js";
import {
	getFirestore,
	addPost,
	collection,
	db,
	onSnapshot,
	deletePost,
	onGetPosts,
	editPost,
	query,
	orderBy,
	giveLike,
	dislike,
	getPost,
	doc,
} from "../Firebase/firestore.js";
import { postPrint } from "../components/post.js";

export const feed = () => {
	//Creamos elementos del Feed
	const feedDiv = document.createElement("div");
	feedDiv.classList = "feedDiv";
	const headerContainer = document.createElement("div");

	const imgHeader = document.createElement("img");
	imgHeader.src = "../img/Logo VeganShip.png";
	imgHeader.classList = "imgHeader";

	const inputSearchHeader = document.createElement("input");
	inputSearchHeader.placeholder = "tu búsqueda";

	const buttonSignOut = document.createElement("button");
	buttonSignOut.textContent = "Cerrar Sesión";

	const formNewPostContainer = document.createElement("form");
	formNewPostContainer.classList = "newPostContainer";
	const inputNewPostLocation = document.createElement("input");
	inputNewPostLocation.placeholder = "ubicación";

	const inputNewPostTag = document.createElement("input");
	inputNewPostTag.placeholder = "etiquetas";

	const textAreaNewPost = document.createElement("textarea");
	textAreaNewPost.classList = "textAreaNewPost";
	const buttonNewPost = document.createElement("button");
	buttonNewPost.textContent = "publicar";
	const allPostsContainer = document.createElement("section");
	allPostsContainer.className = "post-feed";

	feedDiv.appendChild(headerContainer);
	headerContainer.appendChild(imgHeader);
	headerContainer.appendChild(inputSearchHeader);
	headerContainer.appendChild(buttonSignOut);
	feedDiv.appendChild(formNewPostContainer);
	formNewPostContainer.appendChild(inputNewPostLocation);
	formNewPostContainer.appendChild(inputNewPostTag);
	formNewPostContainer.appendChild(textAreaNewPost);
	formNewPostContainer.appendChild(buttonNewPost);
	feedDiv.appendChild(allPostsContainer);

	let id = "";

	window.addEventListener("DOMContentLoaded", async () => {
		const queryRef = query(
			collection(db, "documents"),
			orderBy("createdAt", "desc")
			//authCredentials(currentUser)
		);
		listenPublishButton();

		onSnapshot(queryRef, (querySnapshot) => {
			//console.log(currentUser.uid);
			allPostsContainer.innerHTML = "";
			querySnapshot.forEach((item) => {
				const postDiv = document.createElement("div");

				postDiv.className = "postDiv";
				const printedPost = postPrint(item);
				postDiv.innerHTML = printedPost;
				allPostsContainer.appendChild(postDiv);
				if (auth.currentUser.uid == item.data().uid) {
					const idPost = "idButtonsPosts" + item.id;
					const buttonsOwnPosts = document.getElementById(idPost);
					buttonsOwnPosts.style.display = "block";
				}

				listenEditButton(item);
				listenSaveEditionButton(item);
				listenDeleteButton(item);
				//listenLikeButton(item);
			});

			// const btnLike = allPostsContainer.querySelectorAll(".buttonLike");
			// btnLike.forEach((btn) => {
			// 	btn.addEventListener("click", async (e) => {
			// 		try {
			// 			const id = e.target.dataset.id;
			// 			const dataPost = await getPost(id);
			// 			const post = dataPost.data();
			// 			console.log(id, userSignedId);

			// 			const userWhoCurrentLike = post.likes.indexOf(userSignedId);
			// 			console.log("post: ", post, "post.likes: ", post.likes);
			// 			//console.log(userWhoCurrentLike)
			// 			//console.log("dbLikes.lenght", dbLikes.length, "dbLikes"+dbLikes, "userWhoCurrentLike", userWhoCurrentLike)

			// 			if (userWhoCurrentLike === -1) {
			// 				//console.log("like funct")
			// 				giveLike(id, userSignedId);
			// 				console.log("boton like", userWhoCurrentLike + " userWhoCurrentLike");
			// 			} else {
			// 				console.log("dislike funct");
			// 				dislike(id, userSignedId);
			// 				console.log("boton dislike", userWhoCurrentLike + "userWhoCurrentLike");
			// 			}
			// 		} catch (error) {
			// 			console.log("catch del error", error);
			// 		}
			// 	});
			// });
		});
	});

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

	return feedDiv;
};

const listenPublishButton = () => {
	const formNewPostContainer = document.querySelector(".newPostContainer");
	const newPostTextArea = document.querySelector(".textAreaNewPost");
	formNewPostContainer.addEventListener("submit", async (e) => {
		e.preventDefault();
		const newPostContent = newPostTextArea.value;
		await addPost(newPostContent);
		//console.log(newPostContent);
		formNewPostContainer.reset();
	});
};

const listenDeleteButton = (post) => {
	const deleteButton = document.getElementById("buttonDelete-" + post.id);
	deleteButton.addEventListener("click", async () => {
		await deletePost(post.id);
	});
};

const listenEditButton = (post) => {
	const editButton = document.getElementById("buttonEdit-" + post.id);
	const postArea = document.getElementById("postContainer-" + post.id);
	const editPostTextArea = document.getElementById("editTextArea-" + post.id);
	const formEditingArea = document.getElementById("formEditTextArea-" + post.id);

	editButton.addEventListener("click", () => {
		postArea.style.display = "none"; // to hide
		formEditingArea.style.display = "block"; // to show

		editPostTextArea.value = post.data().post;
	});
};

const listenSaveEditionButton = (post) => {
	const saveButton = document.getElementById("buttonSaveEdit-" + post.id);
	const postArea = document.getElementById("postContainer-" + post.id);
	const formEditingArea = document.getElementById("formEditTextArea-" + post.id);
	const editPostTextArea = document.getElementById("editTextArea-" + post.id);

	saveButton.addEventListener("click", async (e) => {
		e.preventDefault();
		const newPostContent = editPostTextArea.value;
		await editPost(post.id, { post: newPostContent });

		postArea.style.display = "block";
		formEditingArea.style.display = "none";
	});
};

// const listenLikeButton = (post) => {
// 	const likeButton = document.querySelectorAll(".buttonLike");
// 	//console.log(likeButton);
// 	likeButton.forEach((btn) => {
// 		btn.addEventListener("click", async (e) => {
// 			//const userWhoCurrentLike = post.data().uid; //id del usuario a quien le pertenece el post.
// 			const currentPostLiked = post.id; //id del post que fue likeado (id)
// 			const currentUser = auth.currentUser.uid; //id del usuario en linea
// 			//const dataPost = await getPost(currentPostLiked);
// 			//const posting = dataPost.data();
// 			// console.log(userWhoCurrentLike);
// 			// console.log(currentPostLiked);
// 			console.log(currentUser);
// 			// console.log(dataPost, posting);
// 			//const id = e.target.dataset.id;
// 			//const dataPost = await getPost(id);

// 			// 	console.log(id, userSignedId);

// 			//const queSoy = post.data().likes.indexOf(currentUser);
// 			//console.log(queSoy);
// 			// 	console.log("post: ", post, "post.likes: ", post.likes);
// 			// 	//console.log(userWhoCurrentLike)
// 			// 	//console.log("dbLikes.lenght", dbLikes.length, "dbLikes"+dbLikes, "userWhoCurrentLike", userWhoCurrentLike)

// 			// 	if (userWhoCurrentLike === -1) {
// 			// 		//console.log("like funct")
// 			// 		giveLike(id, userSignedId);
// 			// 		console.log("boton like", userWhoCurrentLike + " userWhoCurrentLike");
// 			// 	} else {
// 			// 		console.log("dislike funct");
// 			// 		dislike(id, userSignedId);
// 			// 		console.log("boton dislike", userWhoCurrentLike + "userWhoCurrentLike");
// 			// 	}
// 			// } catch (error) {
// 			// 	console.log("catch del error", error);
// 			// }
// 			if (currentPostLiked && currentUser) {
// 				//console.log("like funct")
// 				getPost(currentPostLiked)
// 				.then(item) => {
// 					const postData = item.data();
// 					if(!postData.arra){

// 					}
// 				}
// 				giveLike(currentPostLiked, userWhoCurrentLike);
// 				console.log("boton like", userWhoCurrentLike + " userWhoCurrentLike");
// 			} else {
// 				console.log("dislike funct");
// 				await dislike(id, post.uid);
// 				console.log("boton dislike", userWhoCurrentLike + "userWhoCurrentLike");
// 			}
// 		});
// 	});
// };
