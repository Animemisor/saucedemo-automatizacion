const PaginaBase = require('./PaginaBase');

class PaginaPago extends PaginaBase {
  constructor(page) {
    super(page);
    this.campoNombre = '#first-name';
    this.campoApellido = '#last-name';
    this.campoCodigoPostal = '#postal-code';
    this.botonContinuar = '#continue';
    this.botonTerminar = '#finish';
    this.encabezadoCompletado = '.complete-header';
  }

  async llenarInformacionPago(nombre, apellido, codigoPostal) {
    await this.llenarCampo(this.campoNombre, nombre);
    await this.llenarCampo(this.campoApellido, apellido);
    await this.llenarCampo(this.campoCodigoPostal, codigoPostal);
  }

  async continuarPago() {
    await this.hacerClic(this.botonContinuar);
  }

  async terminarCompra() {
    await this.hacerClic(this.botonTerminar);
  }

  async obtenerMensajeConfirmacion() {
    return await this.obtenerTexto(this.encabezadoCompletado);
  }
}

module.exports = PaginaPago;