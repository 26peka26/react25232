export const ProductFormUI = ({
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>Agregar producto</h2>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            required
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        
        {/* === CAMPO NUEVO DE STOCK === */}
        <div>
          <label>Stock Disponible:</label>
          <input
            type="number"
            name="stock"
            value={product.stock} // Se enlaza con el estado product.stock
            onChange={onChange} // Usa el handler general
             min="0" // Asegura que no se puedan ingresar números negativos fácilmente
            required
          />
          {errors.stock && <p className="error">{errors.stock}</p>} {/* Muestra el error de stock */}
        </div>
        {/* ============================ */}
        
        <div>
          <label>Categoria</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
            required
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>
        <div>
          <label>Descripcion:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
            required
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
};
