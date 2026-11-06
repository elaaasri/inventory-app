const removeButton = document.querySelector(".remove-button");
const editButton = document.querySelector(".edit-button");

removeButton?.addEventListener("click", async (e) => {
  e.preventDefault();
  const id = e.target.dataset.id;
  const response = await fetch(`/products/${id}/delete`, { method: "DELETE" });

  if (response.ok) {
    window.location.replace("/products");
  }
});
