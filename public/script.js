// const removeButton = document.querySelector(".remove-button");
// console.log(removeButton);

// removeButton?.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const id = e.target.dataset.id;
//   const response = await fetch(`/products/${id}/delete`, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//     },
//   });

//   if (!response.ok) {
//     const result = await response.json();
//     console.log(result);
//     return;
//   }

//   window.location.replace("/products");
// });
