// const removeButton = document.querySelector(".remove-button");
// const editButton = document.querySelector(".edit-button");

// removeButton.addEventListener("click", (e) => {
//   const pw = e.target.dataset.pw;
//   console.log(pw);
//   const pwInput = prompt("Enter Password!");
//   if (pwInput !== pw) {
//     alert("Wrong Password!");
//     e.preventDefault();
//     return;
//   }
// });

const removeButton = document.querySelector(".remove-button");
const editButton = document.querySelector(".edit-button");

removeButton?.addEventListener("click", () => {
  const pwInput = prompt("Enter Password!");
  e.target.closest("form").querySelector("#password-input").value = pwInput;
});
