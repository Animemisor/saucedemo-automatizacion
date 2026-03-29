# language: es
Característica: Funcionalidad de Inicio de Sesión

  Como cliente de Sauce Demo
  Quiero iniciar sesión en la aplicación
  Para poder acceder a mi cuenta y realizar compras

  Antecedentes:
    Dado que navego a la página de inicio de sesión de Sauce Demo

  @positivo
  Escenario: Inicio de sesión exitoso con credenciales válidas
    Cuando ingreso el nombre de usuario "standard_user"
    Y ingreso la contraseña "secret_sauce"
    Y hago clic en el botón de iniciar sesión
    Entonces debería ser redirigido a la página de productos
    Y debería ver el inventario de productos

  @negativo
  Escenario: Inicio de sesión fallido con credenciales inválidas
    Cuando ingreso el nombre de usuario "usuario_invalido"
    Y ingreso la contraseña "clave_invalida"
    Y hago clic en el botón de iniciar sesión
    Entonces debería ver un mensaje de error "Username and password do not match any user in this service"

  @bloqueado
  Escenario: Inicio de sesión con usuario bloqueado
    Cuando ingreso el nombre de usuario "locked_out_user"
    Y ingreso la contraseña "secret_sauce"
    Y hago clic en el botón de iniciar sesión
    Entonces debería ver un mensaje de error "Sorry, this user has been locked out."