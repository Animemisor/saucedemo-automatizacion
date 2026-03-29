const PaginaBase = require('./PaginaBase');

class PaginaProductos extends PaginaBase {
  constructor(page) {
    super(page);
    this.contenedorInventario = '.inventory_list';
    this.tituloProductos = '.title';
    this.botonAgregarCarrito = '[data-test^="add-to-cart"]';
    this.indicadorCarrito = '.shopping_cart_badge';
    this.iconoCarrito = '.shopping_cart_link';
    this.itemsProductos = '.inventory_item';
  }

  async estaEnPaginaProductos() {
    return await this.esVisible(this.contenedorInventario);
  }

  async agregarPrimerProductoAlCarrito() {
    const botonesAgregar = await this.page.$$(this.botonAgregarCarrito);
    if (botonesAgregar.length > 0) {
      await botonesAgregar[0].click();
    }
  }

  async agregarMultiplesProductosAlCarrito(cantidad = 2) {
    const botonesAgregar = await this.page.$$(this.botonAgregarCarrito);
    for (let i = 0; i < Math.min(cantidad, botonesAgregar.length); i++) {
      await botonesAgregar[i].click();
    }
  }

  async obtenerCantidadCarrito() {
    if (await this.esVisible(this.indicadorCarrito)) {
      return await this.obtenerTexto(this.indicadorCarrito);
    }
    return '0';
  }

  async irAlCarrito() {
    await this.hacerClic(this.iconoCarrito);
  }

  async obtenerCantidadProductos() {
    return (await this.page.$$(this.itemsProductos)).length;
  }
}

module.exports = PaginaProductos;