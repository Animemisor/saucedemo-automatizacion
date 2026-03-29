module.exports = {
  default: {
    require: ['step_definitions/*.js'],
    format: ['progress', 'json:reportes/reporte-cucumber.json'],
    paths: ['features/'],
    publishQuiet: true,
    timeout: 60000  // 60 segundos de timeout para cada step
  }
};