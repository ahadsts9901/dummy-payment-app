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

let increaseBal = 0
document.querySelector(".message").classList.add("hidden")

db.collection("users")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let data = doc.data()
            let user = firebase.auth().currentUser.email
            if (user === data.email) {
                document.querySelector(".liveBalance").innerText = data.balance
                document.querySelector("#name").innerText = `${data.firstName} ${data.lastName}`
                document.querySelector(".image").src = data.photo
            }
        })
    })

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

document.querySelector(".addToWallet").addEventListener("click", (event) => {
    let newBalance = Number(document.querySelector("#currentAmount").innerText);
    let user = firebase.auth().currentUser.email;

    // Reference to the Firestore collection
    let usersCollection = db.collection("users");

    // Query the document that matches the current user's email
    usersCollection.where("email", "==", user)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // Get the document ID and data
                var docID = doc.id;
                var data = doc.data();

                // Calculate the new balance
                let balance = Number(data.balance) + newBalance;

                // Update the balance in the same document
                usersCollection.doc(docID).update({
                    balance: balance
                }).then(() => {
                    // console.log("Balance updated successfully");

                    window.location.reload()
                }).catch((error) => {
                    console.error("Error updating balance: ", error);
                });
            });
        })
        .catch((error) => {
            console.error("Error querying document: ", error);
        });
});

document.querySelector("#form").addEventListener("submit", (event) => {
    event.preventDefault()

    let newAmount = document.querySelector(".newAmount").value
    let usersCollection = db.collection("users");

    // Query the document that matches the current user's email
    let user = firebase.auth().currentUser.email;
    usersCollection.where("email", "==", user)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // Get the document ID and data
                var docID = doc.id;
                var data = doc.data();

                // Calculate the new balance
                let balance = Number(data.balance) - newAmount;
                if (balance < 0) {
                    document.querySelector(".message").classList.remove("hidden")
                    return
                }

                // Update the balance in the same document
                usersCollection.doc(docID).update({
                    balance: balance
                }).then(() => {
                    // console.log("Balance updated successfully");
                    window.location.reload()
                }).catch((error) => {
                    console.error("Error updating balance: ", error);
                });
            });
        })
        .catch((error) => {
            console.error("Error querying document: ", error);
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