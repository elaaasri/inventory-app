const removeButton = document.querySelector("#remove-button");
const editSaveButton = document.querySelector("#edit-save-button");

// editSaveButton?.addEventListener("click", (e) => {
//   const pwInput = prompt("Enter Password!");
//   if (!pwInput) return e.preventDefault();
//   e.target.closest("form").querySelector("#password-input").value = pwInput;
// });

removeButton?.addEventListener("click", (e) => {
  const pwInput = prompt("Enter Password!");
  if (!pwInput) return e.preventDefault();
  e.target.closest("form").querySelector("#password-input").value = pwInput;
});
