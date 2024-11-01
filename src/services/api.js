export const fetchProducts = async () => {
  try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
          console.error('Failed to fetch products');
          return null; // or return [];
      }
      return await response.json();
  } catch (error) {
      console.error(error);
      return null; // or return [];
  }
};
