class PaginaBase {
  constructor(page) {
    this.page = page;
  }

  async navegar(url) {
    await this.page.goto(url);
  }

  async esperarElemento(selector, tiempoLimite = 30000) {
    await this.page.waitForSelector(selector, { timeout: tiempoLimite });
  }

  async hacerClic(selector) {
    await this.page.click(selector);
  }

  async llenarCampo(selector, texto) {
    await this.page.fill(selector, texto);
  }

  async obtenerTexto(selector) {
    return await this.page.textContent(selector);
  }

  async esVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async obtenerUrlActual() {
    return this.page.url();
  }
}

module.exports = PaginaBase;