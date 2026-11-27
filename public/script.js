const removeButton = document.querySelector("#remove-button");
const editSaveButton = document.querySelector("#edit-save-button");

editSaveButton?.addEventListener("click", (e) => {
  const enteredPassword = prompt("Enter Password!");

  if (!enteredPassword) {
    e.preventDefault();
    alert("Required Password!");
    return;
  }

  const editForm = document.querySelector("#edit-form");
  const hiddenPasswordInput = editForm.querySelector("#edit-password-input");

  hiddenPasswordInput.value = enteredPassword;
});

removeButton?.addEventListener("click", (e) => {
  const enteredPassword = prompt("Enter Password!");

  if (!enteredPassword) {
    e.preventDefault();
    alert("Required Password!");
    return;
  }

  const removeForm = document.querySelector("#remove-form");
  const hiddenPasswordInput = removeForm.querySelector(
    "#remove-password-input",
  );

  hiddenPasswordInput.value = enteredPassword;
});
