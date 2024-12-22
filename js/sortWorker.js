self.onmessage = function(event) {
    const { products, criteria } = event.data;
    const sortedProducts = [...products].sort((a, b) => a[criteria] - b[criteria]);
    self.postMessage(sortedProducts);
  };