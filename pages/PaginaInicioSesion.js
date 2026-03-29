const PaginaBase = require('./PaginaBase');

class PaginaInicioSesion extends PaginaBase {
  constructor(page) {
    super(page);
    this.campoUsuario = '#user-name';
    this.campoContrasena = '#password';
    this.botonIniciarSesion = '#login-button';
    this.mensajeError = '[data-test="error"]';
    this.urlBase = 'https://www.saucedemo.com/';
  }

  async navegarALogin() {
    await this.navegar(this.urlBase);
  }

  async iniciarSesion(usuario, contrasena) {
    await this.llenarCampo(this.campoUsuario, usuario);
    await this.llenarCampo(this.campoContrasena, contrasena);
    await this.hacerClic(this.botonIniciarSesion);
  }

  async obtenerMensajeError() {
    return await this.obtenerTexto(this.mensajeError);
  }

  async esVisibleMensajeError() {
    return await this.esVisible(this.mensajeError);
  }
}

module.exports = PaginaInicioSesion;