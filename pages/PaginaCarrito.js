const PaginaBase = require('./PaginaBase');

class PaginaCarrito extends PaginaBase {
  constructor(page) {
    super(page);
    this.itemsCarrito = '.cart_item';
    this.botonPagar = '#checkout';
    this.nombreItemCarrito = '.inventory_item_name';
  }

  async obtenerCantidadItemsCarrito() {
    const items = await this.page.$$(this.itemsCarrito);
    return items.length;
  }

  async procederAlPago() {
    await this.hacerClic(this.botonPagar);
  }
}

module.exports = PaginaCarrito;