const firebaseConfig = {
    apiKey: "AIzaSyCtn1vByh5Icc1u7SfpdUanh_M18V77GMg",
    authDomain: "resume-sts-17a3d.firebaseapp.com",
    projectId: "resume-sts-17a3d",
    storageBucket: "resume-sts-17a3d.appspot.com",
    messagingSenderId: "1084591198105",
    appId: "1:1084591198105:web:294ea8b0f70d8bce388d08",
    measurementId: "G-QPMRCNPQV5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// function create(event) {
//     event.preventDefault()
//     let title = document.querySelector("#title").value
//     let text = document.querySelector("#text").value
//     let timestamp = firebase.firestore.FieldValue.serverTimestamp()

//     db.collection("posts")
//         .add({
//             title: title,
//             text: text,
//             timestamp: timestamp
//         })
//         .then(function (docRef) {
//             console.log("added")
//             render();
//         })
//         .catch(function (error) {
//             console.error("Error adding document: ", error);
//         });

//     document.querySelector("#title").value = ""
//     document.querySelector("#text").value = ""

// }

// function render() {
//     var container = document.querySelector(".result");
//     container.innerHTML = "";

//     db.collection("posts")
//         .orderBy("timestamp", "desc") //sort by time
//         .get()
//         .then(function (querySnapshot) {
//             if (querySnapshot.size === 0) {
//                 container.innerHTML = "<div class='blue'>No Users found</div>";
//             } else {
//                 querySnapshot.forEach(function (doc) {
//                     var data = doc.data();

//                     var card = document.createElement("div");
//                     card.className = "w-[10em] h-[10em] p-[1em] flex flex-col justify-right items-start gap-[1em] border border-[2px] border-[white] bg-[#15182b]";
//                     container.appendChild(card);

//                     var heading = document.createElement("h3");
//                     heading.className = "text-[1.5em] text-[white] w-[100%]";
//                     heading.textContent = data.title;
//                     card.appendChild(heading);

//                     var text = document.createElement("p");
//                     text.className = "text-[1em] text-[white] w-[100%]";
//                     text.textContent = data.text;
//                     card.appendChild(text);

//                     var para = document.createElement("div");
//                     para.className = "flex justify-right items-center text-[0.8em] text-[white] gap-[1em]";
//                     card.appendChild(para);

//                     var del = document.createElement("i");
//                     del.className += " bi bi-trash-fill buttons";
//                     del.addEventListener("click", delDoc);
//                     para.appendChild(del);

//                     var edit = document.createElement("i");
//                     edit.className += " bi bi-pencil-fill buttons";
//                     edit.addEventListener("click", editDoc);
//                     para.appendChild(edit);

//                     // ...................................................................................................................

//                     //delete function

//                     function delDoc(event) {
//                         event.preventDefault();
//                         let docId = doc.id;
//                         db.collection("posts").doc(docId).delete();

//                         setTimeout(() => {
//                             render();
//                         }, 1000)
//                     }

//                     async function editDoc(event) {
//                         event.preventDefault();
//                         let password = "123"
//                         if (password === "123") {
//                             let title = data.title;
//                             let text = data.text;

//                             const { value: formValues } = await Swal.fire({
//                                 title: "Edit",
//                                 html: `<input value="${title}" type="text" id="swal-input1" class="swal2-input nameSwal" placeholder="Title...">` +
//                                     `<input value="${text}" type="text" id="swal-input2" class="swal2-input fatherSwal" placeholder="Text...">`,
//                                 confirmButtonColor: "#0d86ff",
//                                 confirmButtonText: "Edit",
//                                 focusConfirm: false,
//                                 preConfirm: () => {
//                                     const titleValue =
//                                         document.getElementById("swal-input1").value;
//                                     const textValue =
//                                         document.getElementById("swal-input2").value;

//                                     if (
//                                         titleValue.trim() === "" ||
//                                         textValue.trim() === ""

//                                     ) {
//                                         Swal.showValidationMessage(
//                                             "Please enter a value for each field"
//                                         );
//                                         return false;
//                                     }

//                                     return [titleValue, textValue];
//                                 },
//                             });

//                             if (formValues) {
//                                 let docId = doc.id;
//                                 db.collection("posts")
//                                     .doc(docId)
//                                     .update({
//                                         title: formValues[0],
//                                         text: formValues[1],
//                                     })
//                                     .then(() => {
//                                         render();
//                                         Swal.fire({
//                                             icon: "success",
//                                             title: "Edited",
//                                             confirmButtonText: "OK",
//                                             confirmButtonColor: "#0d86ff",
//                                         });
//                                     })
//                                     .catch((error) => {
//                                         console.error("Error updating document: ", error);
//                                     });
//                             }
//                         } else {
//                             Swal.fire({
//                                 icon: "error",
//                                 title: "Access Denied",
//                                 confirmButtonText: "OK",
//                                 confirmButtonColor: "#0d86ff",
//                             });
//                         }
//                     }

//                 })
//             }
//         })
// }
// function logOut() {
//     firebase
//         .auth()
//         .signOut()
//         .then(() => {
//             console.log("Sign out successful");
//             // Redirect to the sign-in page or any other desired destination
//             window.location.href = "./login/index.html";
//         })
//         .catch((error) => {
//             console.log("Sign out error:", error);
//         });
// }

// firebase.auth().onAuthStateChanged(function (user) {
//     if (!user) {
//         window.location.href = "./login/index.html"
//         console.log("not signed in");
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     render();
// });

let increaseBal = 0

document.querySelector(".increase").addEventListener("click", () => {
    increaseBal++
    if (increaseBal > 0) {
        document.querySelector(".element").classList.remove("hidden")
    }
    document.querySelector("#currentAmount").innerText = increaseBal
})

document.querySelector(".decrease").addEventListener("click", () => {
    increaseBal--
    if (increaseBal > 0) {
        document.querySelector(".element").classList.remove("hidden")
    } else {
        document.querySelector(".element").classList.add("hidden")
    }
    document.querySelector("#currentAmount").innerText = increaseBal
})

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // document.getElementById("createName").innerText = user.email.slice(0, -10);
        //console.log(user.email.slice(0, -10));
    } else {
        window.location.href = "./login/index.html";
        //console.log("not signed in");
    }
});

document.querySelector(".addToWallet").addEventListener("click", () => {
    // console.log("Add")
    let newBalance = document.querySelector("#currentAmount").innerText
    let user = firebase.auth().currentUser.email
    // console.log(user)

    db.collection("users")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                if (data.email === user) {
                    console.log("1")
                    let balance = Number(data.balance) + Number(newBalance)
                    console.log(balance)
                }
            })
        }
        ).catch((error) => {
            console.error("Error updating document: ", error);
        });

})

function logout() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            //console.log("Sign out successful");
            // Redirect to the sign-in page or any other desired destination
            window.location.href = "./login/index.html";
        })
        .catch((error) => {
            //console.log("Sign out error:", error);
        });
}