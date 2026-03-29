# language: es
Característica: Flujo de Compra

  Como cliente de Sauce Demo
  Quiero agregar productos al carrito y completar una compra
  Para poder adquirir los productos que necesito

  Antecedentes:
    Dado que he iniciado sesión como "standard_user"
    Y estoy en la página de productos

  @happy-path
  Escenario: Completar compra exitosamente
    Cuando agrego un producto al carrito
    Entonces debería ver el indicador del carrito actualizado a "1"
    
    Cuando navego al carrito de compras
    Entonces debería ver el producto en mi carrito
    
    Cuando procedo al pago
    Y ingreso mi información de pago con:
      | nombre      | Juan |
      | apellido    | Pérez |
      | codigoPostal| 12345|
    Y completo el proceso de compra
    Entonces debería ver la confirmación del pedido
    Y la confirmación del pedido debería mostrar "Thank you for your order!"

  @multiples-productos
  Escenario: Agregar múltiples productos y comprar
    Cuando agrego múltiples productos al carrito
    Entonces debería ver el indicador del carrito actualizado correctamente
    
    Cuando navego al carrito de compras
    Entonces debería ver todos los productos agregados en mi carrito
    
    Cuando procedo al pago
    Y ingreso mi información de pago con:
      | nombre      | María |
      | apellido    | López |
      | codigoPostal| 67890 |
    Y completo el proceso de compra
    Entonces debería ver la confirmación del pedido