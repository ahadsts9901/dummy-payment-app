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
var auth = firebase.auth();
var db = firebase.firestore();
const storage = firebase.storage();

db.collection("users")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let data = doc.data()
            let user = firebase.auth().currentUser.email
            if (user === data.email) {
                document.querySelector(".profName").innerText = `${data.firstName} ${data.lastName}`
                document.querySelector(".changeName").innerText = `${data.firstName} ${data.lastName}`
                document.querySelector(".mainImg").src = data.photo
                document.querySelector(".image").src = data.photo
            }
        })
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

// password update

const resetButton = document.getElementById("rbtn");

resetButton.addEventListener("click", async () => {
    const oldPassword = document.getElementById("oldPass").value;
    const newPassword = document.getElementById("newPass").value;
    const confirmPassword = document.getElementById("repPass").value;
    const user = auth.currentUser;

    if (user) {
        if (newPassword === confirmPassword) {
            const credentials = firebase.auth.EmailAuthProvider.credential(
                user.email,
                oldPassword
            );

            try {
                await user.reauthenticateWithCredential(credentials);
                await user.updatePassword(newPassword);
                Swal.fire({
                    icon: 'success',
                    title: `Password updated successfully`,
                    showConfirmButton: false,
                    timer: 1500 // Show success message for 1.5 seconds
                });
                clearPasswordFields();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `Incorrect password`,
                    showConfirmButton: false,
                    timer: 1500 // Show success message for 1.5 seconds
                });
                console.error("Error updating password:", error);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: `Passwords do not match`,
                showConfirmButton: false,
                timer: 1500 // Show success message for 1.5 seconds
            });
        }
    }
});

function clearPasswordFields() {
    document.getElementById("oldPass").value = "";
    document.getElementById("newPass").value = "";
    document.getElementById("repPass").value = "";
}

function editName() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            username = user.email;

            {
                db.collection("users")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach(function (doc) {
                            var data = doc.data();

                            if (data.email === username) {
                                // Display SweetAlert input for editing FirstName and LastName
                                Swal.fire({
                                    title: 'Edit Profile',
                                    html: `<input id="swal-input-firstname" class="swal2-input" placeholder="First Name" value="${data.firstName || ''}">
                           <input id="swal-input-lastname" class="swal2-input" placeholder="Last Name" value="${data.lastName || ''}">`,
                                    focusConfirm: false,
                                    showCancelButton: true,
                                    cancelButtonColor: "#212121",
                                    confirmButtonColor: "#212121",
                                    preConfirm: () => {
                                        const newFirstName = document.getElementById('swal-input-firstname').value;
                                        const newLastName = document.getElementById('swal-input-lastname').value;

                                        // Validate if inputs are not empty
                                        if (!newFirstName.trim() || !newLastName.trim()) {
                                            Swal.showValidationMessage('Please fill in both First Name and Last Name.');
                                        } else {
                                            // Update the values on the front end
                                            data.firstName = newFirstName;
                                            data.lastName = newLastName;
                                        }
                                    }
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // Update the Firestore document after confirming
                                        db.collection("users").doc(doc.id).update({
                                            firstName: data.firstName,
                                            lastName: data.lastName
                                        }).then(() => {
                                            // console.log("Profile updated successfully!");
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Profile Updated',
                                                showConfirmButton: false,
                                                timer: 1500 // Show success message for 1.5 seconds
                                            });
                                            setTimeout(() => {
                                                window.location.reload()
                                            }, 0)
                                        }).catch((error) => {
                                            console.error("Error updating profile: ", error);
                                            Swal.fire({
                                                icon: 'error',
                                                title: `Can't update`,
                                                showConfirmButton: false,
                                                timer: 1500 // Show success message for 1.5 seconds
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    })
                    .catch((error) => {
                        console.error("Error getting posts: ", error);
                    });


            }

        } else {
            window.location.href = "../login/index.html";
        }
    });

}

function file(event) {
    // console.log(event.target.files[0])
    let uid = firebase.auth().currentUser.uid
    // console.log(uid)
    let fileref = firebase.storage().ref().child(`/users/${uid}/profile`)
    let uploadTask = fileref.put(event.target.files[0])

    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            if (progress == 100) {
                Swal.fire({
                    icon: 'success',
                    title: 'Uploaded',
                    showConfirmButton: false,
                    timer: 1000 // Show success message for 1.5 seconds
                });
            }
        },
        (error) => {
            console.log(error)
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // console.log('File available at', downloadURL);

                // Update the photo field in the user's document in Firestore
                db.collection("users").where("email", "==", firebase.auth().currentUser.email)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            db.collection("users").doc(doc.id).update({
                                photo: downloadURL
                            }).then(() => {
                                // console.log("Photo URL updated in Firestore.");
                                setTimeout(() => {
                                    window.location.reload()
                                })
                            }).catch((error) => {
                                console.error("Error updating photo URL:", error);
                            });
                        });
                    })
                    .catch((error) => {
                        console.error("Error querying Firestore:", error);
                    });

                firebase.auth().currentUser.updateProfile({
                    photoURL: downloadURL
                })
            });
        }
    );

}