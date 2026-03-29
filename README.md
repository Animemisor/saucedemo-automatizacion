# Sauce Demo - Automatización de Pruebas

## 📋 Descripción
Suite de pruebas automatizadas para la aplicación web **Sauce Demo** utilizando **Playwright** con **Cucumber**, implementando el patrón de diseño **Page Object Model (POM)**.

## 🎯 Historia de Usuario
Como cliente de Sauce Demo, quiero poder iniciar sesión, agregar productos al carrito y completar una compra para poder adquirir los productos que necesito.

## 🚀 Tecnologías Utilizadas
- **Playwright** - Automatización de navegadores
- **Cucumber** - Framework BDD
- **JavaScript/Node.js** - Lenguaje de programación
- **Page Object Model** - Patrón de diseño

## 📁 Estructura del Proyecto
saucedemo-automatizacion/
├── features/
│ ├── inicio-sesion.feature # Escenarios de login
│ └── flujo-compra.feature # Escenarios de compra
├── pages/
│ ├── PaginaBase.js # Clase base con métodos comunes
│ ├── PaginaInicioSesion.js # Page Object del login
│ ├── PaginaProductos.js # Page Object de productos
│ ├── PaginaCarrito.js # Page Object del carrito
│ └── PaginaPago.js # Page Object del pago
├── step_definitions/
│ └── pasos_comunes.js # Implementación de steps
├── reportes/ # Reportes generados
├── package.json
├── cucumber.js
└── README.md


## 🔧 Prerrequisitos
- Node.js (v14 o superior)
- npm (v6 o superior)

## 📦 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Animemisor/retoQaFront.git
cd retoQaFront

# 2. Instalar dependencias
npm install

# 3. Instalar navegadores de Playwright
npx playwright install


🏃‍♂️ Ejecutar las Pruebas
npm test

Ejecutar con navegador visible
# Windows
set HEADED=true && npx cucumber-js

# Mac/Linux
HEADED=true npx cucumber-js


Ejecutar pruebas específicas
# Solo pruebas de login
npx cucumber-js features/inicio-sesion.feature

# Solo pruebas de compra
npx cucumber-js features/flujo-compra.feature