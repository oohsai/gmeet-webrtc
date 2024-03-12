const createUserBtn = document.getElementById("create-user");
const username = document.getElementById("username");
const allUsersHTML = document.getElementById("allusers");
const socket = io();

//handle browser events
createUserBtn.addEventListener("click", (e) => {
  if (username.value !== "") {
    const usernameCont = document.getElementById(".username-input");
    socket.emit("join-user", username.value);
    usernameCont.style.display = null;
  }
});

//handle socket events
socket.on("joined", (allUsers) => {
  console.log({ allUsers });

  const createUsersHTML = () => {
    allUsersHTML.innerHTML = "";
    for (const user in allUsers) {
      const li = document.createElement("li");
      li.textContent = `${user} ${user === username.value ? "(You)" : ""}`;

      if (user !== username.value) {
        const button = document.createElement("button");
        button.classList.add("call-btn");
        button.addEventListener("click", (e) => {
          startCall(user);
        });
        const img = document.createElement("img");
        img.setAttribute("src", "/images/phone.png");

        button.appendChild(img);
        li.appendChild(button);
      }
      allUsersHTML.appendChild(li);
    }
  };

  createUsersHTML();
});

const startCall = (user) => {
  console.log(user);
};
