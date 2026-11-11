const convertProductsImages = (products) => {
  return products.map((product) => ({
    ...product,
    image: `data:image/webp;base64,${product.image.toString("base64")}`,
  }));
};

export { convertProductsImages };
