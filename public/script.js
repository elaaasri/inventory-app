const removeButton = document.querySelector("#remove-button");
const editSaveButton = document.querySelector("#edit-save-button");

// here
// testing the pwInput err message if its working
// check verifyadminpw
// understand the order in the route
// showing the err message on AppError

editSaveButton?.addEventListener("click", (e) => {
  const pwInput = prompt("Enter Password!");
  if (!pwInput) {
    e.preventDefault();
    alert("Required Password!");
    return;
  }
  e.target.closest("form").querySelector("#password-input").value = pwInput;
});

removeButton?.addEventListener("click", (e) => {
  const pwInput = prompt("Enter Password!");
  if (!pwInput) {
    e.preventDefault();
    alert("Required Password!");
    return;
  }
  e.target.closest("form").querySelector("#password-input").value = pwInput;
});
