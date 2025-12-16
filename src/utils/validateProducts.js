export const validateProduct = (product, fileRequired = true) => {
  const errors = {};

  if (!product.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  // Validación de Precio
  if (!product.price || Number(product.price) <= 0) {
    errors.price = "El precio debe ser mayor a cero";
  }
  
  // ===========================================
  // === NUEVA VALIDACIÓN PARA STOCK ===
  // ===========================================
  if (!product.stock || Number(product.stock) <= 0) {
    errors.stock = "El stock debe ser un número mayor a cero";
  }
  // ===========================================

  if (!product.description.trim()) {
    errors.description = "La descripción es obligatoria";
  }

  if (!product.category.trim()) {
    errors.category = "La categoria es obligatoria";
  }

  // Aseguramos que la validación del archivo incluya el 'file' que viene de ProductFormContainer
  if (fileRequired && !product.file) {
    errors.file = "Debes seleccionar una imagen";
  }

  return errors;
};

  return errors;
};
