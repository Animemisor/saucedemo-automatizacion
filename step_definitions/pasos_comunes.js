const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('expect');
const { chromium } = require('playwright');

// Configurar timeout global de 60 segundos
setDefaultTimeout(60 * 1000);

let navegador, pagina;
let paginaInicioSesion, paginaProductos, paginaCarrito, paginaPago;

// Función para pausar y ver la ejecución
async function pausar(ms = 500) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

// Función para lanzar navegador con opciones lentas
async function lanzarNavegador() {
  console.log('🚀 Abriendo navegador...');
  const navegador = await chromium.launch({ 
    headless: false,  // Navegador visible
    slowMo: 300      // Ralentiza cada acción en 300ms
  });
  return navegador;
}

// ============ GIVEN ============

Given('que navego a la página de inicio de sesión de Sauce Demo', async function () {
  console.log('\n📌 Navegando a Sauce Demo...');
  navegador = await lanzarNavegador();
  pagina = await navegador.newPage();
  
  const PaginaInicioSesion = require('../pages/PaginaInicioSesion');
  const PaginaProductos = require('../pages/PaginaProductos');
  const PaginaCarrito = require('../pages/PaginaCarrito');
  const PaginaPago = require('../pages/PaginaPago');
  
  paginaInicioSesion = new PaginaInicioSesion(pagina);
  paginaProductos = new PaginaProductos(pagina);
  paginaCarrito = new PaginaCarrito(pagina);
  paginaPago = new PaginaPago(pagina);
  
  await paginaInicioSesion.navegarALogin();
  await pausar(1000);
});

Given('que he iniciado sesión como {string}', async function (usuario) {
  console.log(`\n📌 Iniciando sesión como: ${usuario}`);
  navegador = await lanzarNavegador();
  pagina = await navegador.newPage();
  
  const PaginaInicioSesion = require('../pages/PaginaInicioSesion');
  const PaginaProductos = require('../pages/PaginaProductos');
  const PaginaCarrito = require('../pages/PaginaCarrito');
  const PaginaPago = require('../pages/PaginaPago');
  
  paginaInicioSesion = new PaginaInicioSesion(pagina);
  paginaProductos = new PaginaProductos(pagina);
  paginaCarrito = new PaginaCarrito(pagina);
  paginaPago = new PaginaPago(pagina);
  
  console.log('📍 Navegando a la página de login...');
  await paginaInicioSesion.navegarALogin();
  await pausar(500);
  
  console.log(`📍 Ingresando credenciales...`);
  await paginaInicioSesion.iniciarSesion(usuario, 'secret_sauce');
  console.log('✅ Login completado');
  await pausar(1000);
});

Given('estoy en la página de productos', async function () {
  console.log('📍 Verificando página de productos...');
  const resultado = await paginaProductos.estaEnPaginaProductos();
  expect(resultado).toBeTruthy();
  console.log('✅ Página de productos verificada');
});

// ============ WHEN ============

When('ingreso el nombre de usuario {string}', async function (usuario) {
  console.log(`📝 Ingresando usuario: ${usuario}`);
  await paginaInicioSesion.llenarCampo(paginaInicioSesion.campoUsuario, usuario);
  await pausar(300);
});

When('ingreso la contraseña {string}', async function (contrasena) {
  console.log(`🔐 Ingresando contraseña`);
  await paginaInicioSesion.llenarCampo(paginaInicioSesion.campoContrasena, contrasena);
  await pausar(300);
});

When('hago clic en el botón de iniciar sesión', async function () {
  console.log('🖱️ Click en botón login...');
  await paginaInicioSesion.hacerClic(paginaInicioSesion.botonIniciarSesion);
  await pausar(1500);
});

When('agrego un producto al carrito', async function () {
  console.log('🛒 Agregando producto al carrito...');
  await paginaProductos.agregarPrimerProductoAlCarrito();
  await pausar(1000);
  const cantidad = await paginaProductos.obtenerCantidadCarrito();
  console.log(`✅ Producto agregado. Carrito: ${cantidad} item(s)`);
});

When('agrego múltiples productos al carrito', async function () {
  console.log('🛒🛒 Agregando 2 productos al carrito...');
  await paginaProductos.agregarMultiplesProductosAlCarrito(2);
  await pausar(1500);
  const cantidad = await paginaProductos.obtenerCantidadCarrito();
  console.log(`✅ Productos agregados. Carrito: ${cantidad} item(s)`);
});

When('navego al carrito de compras', async function () {
  console.log('🛍️ Navegando al carrito...');
  await paginaProductos.irAlCarrito();
  await pausar(1000);
});

When('procedo al pago', async function () {
  console.log('💰 Procediendo al pago...');
  await paginaCarrito.procederAlPago();
  await pausar(500);
});

When('ingreso mi información de pago con:', async function (tablaDatos) {
  const datos = tablaDatos.rowsHash();
  console.log(`📋 Información de pago: ${datos.nombre} ${datos.apellido}, CP: ${datos.codigoPostal}`);
  
  await paginaPago.llenarInformacionPago(datos.nombre, datos.apellido, datos.codigoPostal);
  await pausar(500);
  
  console.log('▶️ Continuando...');
  await paginaPago.continuarPago();
  await pausar(500);
});

When('completo el proceso de compra', async function () {
  console.log('✅ Finalizando compra...');
  await paginaPago.terminarCompra();
  await pausar(1500);
});

// ============ THEN ============

Then('debería ser redirigido a la página de productos', async function () {
  console.log('🔍 Verificando redirección...');
  const resultado = await paginaProductos.estaEnPaginaProductos();
  expect(resultado).toBeTruthy();
  console.log('✅ Redirección exitosa');
});

Then('debería ver el inventario de productos', async function () {
  console.log('🔍 Verificando inventario...');
  const resultado = await paginaProductos.estaEnPaginaProductos();
  expect(resultado).toBeTruthy();
  console.log('✅ Inventario visible');
});

Then('debería ver un mensaje de error {string}', async function (mensajeEsperado) {
  console.log(`🔍 Verificando mensaje de error...`);
  const mensajeError = await paginaInicioSesion.obtenerMensajeError();
  console.log(`📢 Mensaje: "${mensajeError}"`);
  expect(mensajeError).toContain(mensajeEsperado);
  console.log('✅ Error verificado');
  await pausar(1000);
});

Then('debería ver el indicador del carrito actualizado a {string}', async function (cantidad) {
  console.log(`🔍 Verificando carrito: ${cantidad} item(s)...`);
  const cantidadCarrito = await paginaProductos.obtenerCantidadCarrito();
  console.log(`📊 Carrito actual: ${cantidadCarrito}`);
  expect(cantidadCarrito).toBe(cantidad);
  console.log('✅ Cantidad verificada');
});

Then('debería ver el producto en mi carrito', async function () {
  console.log('🔍 Verificando productos en carrito...');
  const cantidad = await paginaCarrito.obtenerCantidadItemsCarrito();
  console.log(`📦 Productos: ${cantidad}`);
  expect(cantidad).toBeGreaterThan(0);
  console.log('✅ Productos verificados');
});

Then('debería ver el indicador del carrito actualizado correctamente', async function () {
  console.log('🔍 Verificando indicador del carrito...');
  const cantidadCarrito = await paginaProductos.obtenerCantidadCarrito();
  console.log(`📊 Indicador: ${cantidadCarrito}`);
  expect(parseInt(cantidadCarrito)).toBeGreaterThan(0);
  console.log('✅ Indicador verificado');
});

Then('debería ver todos los productos agregados en mi carrito', async function () {
  console.log('🔍 Verificando todos los productos...');
  const cantidad = await paginaCarrito.obtenerCantidadItemsCarrito();
  console.log(`📦 Total productos: ${cantidad}`);
  expect(cantidad).toBe(2);
  console.log('✅ Todos los productos verificados');
});

Then('debería ver la confirmación del pedido', async function () {
  console.log('🔍 Verificando confirmación...');
  const mensaje = await paginaPago.obtenerMensajeConfirmacion();
  console.log(`📢 Mensaje: "${mensaje}"`);
  expect(mensaje).toBeTruthy();
  console.log('✅ Confirmación verificada');
});

Then('la confirmación del pedido debería mostrar {string}', async function (mensajeEsperado) {
  console.log(`🔍 Verificando mensaje: "${mensajeEsperado}"`);
  const mensaje = await paginaPago.obtenerMensajeConfirmacion();
  console.log(`📢 Mensaje recibido: "${mensaje}"`);
  expect(mensaje).toBe(mensajeEsperado);
  console.log('✅ Mensaje verificado');
  await pausar(1500);
});

// ============ AFTER ============

After(async function () {
  console.log('\n🔚 Cerrando navegador en 2 segundos...');
  await pausar(2000);
  if (navegador) {
    await navegador.close();
    console.log('✅ Navegador cerrado\n');
  }
});