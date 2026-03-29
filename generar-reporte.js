const fs = require('fs');

async function generarReporte() {
  try {
    const reporteData = JSON.parse(fs.readFileSync('reportes/reporte-cucumber.json', 'utf-8'));
    console.log('\n========================================');
    console.log('        REPORTE DE PRUEBAS');
    console.log('========================================\n');
    
    let pasaron = 0;
    let fallaron = 0;
    
    if (reporteData && reporteData.length > 0) {
      reporteData.forEach(escenario => {
        if (escenario.result && escenario.result.status === 'passed') {
          pasaron++;
        } else if (escenario.result && escenario.result.status === 'failed') {
          fallaron++;
        }
      });
    }
    
    console.log(`📊 Resumen de Ejecución:`);
    console.log(`   ✅ Pruebas exitosas: ${pasaron}`);
    console.log(`   ❌ Pruebas fallidas: ${fallaron}`);
    console.log(`   📈 Total de pruebas: ${pasaron + fallaron}\n`);
    
    if (fallaron > 0) {
      console.log('⚠️  Algunas pruebas fallaron. Revisar los detalles en el reporte.\n');
    } else {
      console.log('🎉 ¡Todas las pruebas pasaron exitosamente!\n');
    }
    
  } catch (error) {
    console.log('⚠️  No se encontró el archivo de reporte. Ejecuta las pruebas primero.');
  }
}

generarReporte();