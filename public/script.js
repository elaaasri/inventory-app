const removeButtons = document.querySelectorAll(".remove-button");

[...removeButtons].forEach((button) => {
  button.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    const response = await fetch(`/products/${id}`, { method: "DELETE" });

    if (response.ok) {
      window.location.href = "/products";
    }
  });
});
