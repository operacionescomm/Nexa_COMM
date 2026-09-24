const express = require('express');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/****************************************************
 * RUTAS GENERALES
 ****************************************************/

app.get('/', (req, res) => {
  res.redirect('/test-slide10-png');
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Motor visual Cerro Lindo activo'
  });
});

/****************************************************
 * REGISTRO DE RUTAS POR SLIDE
 ****************************************************/

registerSlide(10, getSampleSlide10, normalizeSlide10Data);
registerSlide(11, getSampleSlide11, normalizeSlide11Data);
registerSlide(12, getSampleSlide12, normalizeSlide12Data);
registerSlide(13, getSampleSlide13, normalizeSlide13Data);
registerSlide(14, getSampleSlide14, normalizeSlide14Data);
registerSlide(15, getSampleSlide15, normalizeSlide15Data);
registerSlide(17, getSampleSlide17, normalizeSlide17Data);
registerSlide(18, getSampleSlide18, normalizeSlide18Data);
registerSlide(19, getSampleSlide19, normalizeSlide19Data);

function registerSlide(slideNumber, getSampleData, normalizeData) {
  app.get(`/test-slide${slideNumber}`, async (req, res) => {
    try {
      const sample = getSampleData();
      res.render(`slide${slideNumber}`, sample);
    } catch (error) {
      console.error(`Error en /test-slide${slideNumber}:`, error);
      res.status(500).send(`Error en /test-slide${slideNumber}: ` + error);
    }
  });

  app.get(`/test-slide${slideNumber}-png`, async (req, res) => {
    try {
      const sample = getSampleData();
      const html = await renderEjsToString(`slide${slideNumber}`, sample);
      const imageBuffer = await htmlToPng(html);

      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Length', imageBuffer.length);
      res.end(imageBuffer);
    } catch (error) {
      console.error(`Error generando PNG slide ${slideNumber}:`, error);
      res.status(500).send(`Error generando PNG slide ${slideNumber}: ` + error);
    }
  });

  app.post(`/render/slide${slideNumber}`, async (req, res) => {
    try {
      const data = normalizeData(req.body || {});
      const html = await renderEjsToString(`slide${slideNumber}`, data);
      const imageBuffer = await htmlToPng(html);

      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Length', imageBuffer.length);
      res.end(imageBuffer);
    } catch (error) {
      console.error(`Error renderizando slide${slideNumber}:`, error);
      res.status(500).json({
        ok: false,
        error: String(error)
      });
    }
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 10
 ****************************************************/

function getSampleSlide10() {
  return normalizeSlide10Data({
  "titulo": "CERRO LINDO - ABRIL 2026 - ATENCIONES EN LA OPERACIÓN",
  "periodo": "Abril 2026",
  "logoText": "COMM",
  "diasPeriodo": 31,
  "totalAtenciones": 305,
  "totalHoras": 912,
  "promedioAtencionesDia": "9.8",
  "promedioHorasDia": "29.4",
  "horasPorAtencion": "2.99",
  "diasConAtencion": 31,
  "dias": [
    {
      "fecha": "22/03/2026",
      "dia": "22",
      "atenciones": 11,
      "horas": 33
    },
    {
      "fecha": "23/03/2026",
      "dia": "23",
      "atenciones": 14,
      "horas": 42
    },
    {
      "fecha": "24/03/2026",
      "dia": "24",
      "atenciones": 8,
      "horas": 24
    },
    {
      "fecha": "25/03/2026",
      "dia": "25",
      "atenciones": 14,
      "horas": 42
    },
    {
      "fecha": "26/03/2026",
      "dia": "26",
      "atenciones": 12,
      "horas": 36
    },
    {
      "fecha": "27/03/2026",
      "dia": "27",
      "atenciones": 14,
      "horas": 42
    },
    {
      "fecha": "28/03/2026",
      "dia": "28",
      "atenciones": 9,
      "horas": 27
    },
    {
      "fecha": "29/03/2026",
      "dia": "29",
      "atenciones": 10,
      "horas": 30
    },
    {
      "fecha": "30/03/2026",
      "dia": "30",
      "atenciones": 11,
      "horas": 33
    },
    {
      "fecha": "31/03/2026",
      "dia": "31",
      "atenciones": 8,
      "horas": 24
    },
    {
      "fecha": "01/04/2026",
      "dia": "01",
      "atenciones": 9,
      "horas": 27
    },
    {
      "fecha": "02/04/2026",
      "dia": "02",
      "atenciones": 12,
      "horas": 36
    },
    {
      "fecha": "03/04/2026",
      "dia": "03",
      "atenciones": 14,
      "horas": 42
    },
    {
      "fecha": "04/04/2026",
      "dia": "04",
      "atenciones": 9,
      "horas": 27
    },
    {
      "fecha": "05/04/2026",
      "dia": "05",
      "atenciones": 9,
      "horas": 27
    },
    {
      "fecha": "06/04/2026",
      "dia": "06",
      "atenciones": 11,
      "horas": 33
    },
    {
      "fecha": "07/04/2026",
      "dia": "07",
      "atenciones": 6,
      "horas": 18
    },
    {
      "fecha": "08/04/2026",
      "dia": "08",
      "atenciones": 5,
      "horas": 15
    },
    {
      "fecha": "09/04/2026",
      "dia": "09",
      "atenciones": 9,
      "horas": 27
    },
    {
      "fecha": "10/04/2026",
      "dia": "10",
      "atenciones": 9,
      "horas": 27
    },
    {
      "fecha": "11/04/2026",
      "dia": "11",
      "atenciones": 7,
      "horas": 21
    },
    {
      "fecha": "12/04/2026",
      "dia": "12",
      "atenciones": 7,
      "horas": 21
    },
    {
      "fecha": "13/04/2026",
      "dia": "13",
      "atenciones": 8,
      "horas": 24
    },
    {
      "fecha": "14/04/2026",
      "dia": "14",
      "atenciones": 12,
      "horas": 33
    },
    {
      "fecha": "15/04/2026",
      "dia": "15",
      "atenciones": 5,
      "horas": 15
    },
    {
      "fecha": "16/04/2026",
      "dia": "16",
      "atenciones": 13,
      "horas": 39
    },
    {
      "fecha": "17/04/2026",
      "dia": "17",
      "atenciones": 11,
      "horas": 33
    },
    {
      "fecha": "18/04/2026",
      "dia": "18",
      "atenciones": 8,
      "horas": 24
    },
    {
      "fecha": "19/04/2026",
      "dia": "19",
      "atenciones": 10,
      "horas": 30
    },
    {
      "fecha": "20/04/2026",
      "dia": "20",
      "atenciones": 12,
      "horas": 36
    },
    {
      "fecha": "21/04/2026",
      "dia": "21",
      "atenciones": 8,
      "horas": 24
    }
  ],
  "insight": "La distribución diaria permite identificar la carga operativa de abril y los principales picos de atención."
});
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 11
 ****************************************************/

function getSampleSlide11() {
  return normalizeSlide11Data({
  "titulo": "CERRO LINDO - DIC 2025 - ABR 2026 - ATENCIONES POR TURNO Y EVOLUCIÓN MENSUAL",
  "periodo": "DIC 2025 - ABR 2026",
  "logoText": "COMM",
  "meses": [
    {
      "mes": "Dic-25",
      "dia": 112,
      "noche": 106,
      "total": 218
    },
    {
      "mes": "Ene-26",
      "dia": 137,
      "noche": 94,
      "total": 231
    },
    {
      "mes": "Feb-26",
      "dia": 201,
      "noche": 151,
      "total": 352
    },
    {
      "mes": "Mar-26",
      "dia": 168,
      "noche": 114,
      "total": 282
    },
    {
      "mes": "Abr-26",
      "dia": 167,
      "noche": 137,
      "total": 304
    }
  ],
  "totalAtenciones": 1387,
  "totalDiaGlobal": 785,
  "totalNocheGlobal": 602,
  "totalMesActualValue": 304,
  "participacionDia": "56.6%",
  "participacionNoche": "43.4%",
  "insight": "El turno día concentra la mayor participación de las atenciones acumuladas entre diciembre de 2025 y abril de 2026."
});
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 12
 ****************************************************/

function getSampleSlide12() {
  return normalizeSlide12Data({
  "titulo": "CERRO LINDO - ABRIL 2026 - INCIDENTES VS REQUERIMIENTOS",
  "periodo": "Abril 2026",
  "logoText": "COMM",
  "totalAtenciones": 305,
  "incidentes": 77,
  "requerimientos": 228,
  "brecha": 151,
  "pctIncidentes": "25.25%",
  "pctRequerimientos": "74.75%",
  "tabla": {
    "up": "CERRO LINDO",
    "incidentes": 77,
    "requerimientos": 228,
    "total": 305,
    "pctIncidentes": "25.25%",
    "pctRequerimientos": "74.75%",
    "pctTotal": "100%"
  },
  "insight": "Los requerimientos representan la mayor proporción de atenciones de abril, por encima de los incidentes reportados."
});
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 13
 ****************************************************/

function getSampleSlide13() {
  return normalizeSlide13Data({
  "titulo": "CERRO LINDO - DIC 2025 - JUN 2026 - EVOLUCIÓN DE REQUERIMIENTOS E INCIDENTES",
  "periodo": "DIC 2025 - JUN 2026",
  "logoText": "COMM",
  "totalRequerimientos": 1291,
  "totalIncidentes": 595,
  "totalAtenciones": 1886,
  "participacionRequerimientos": "68.45%",
  "participacionIncidentes": "31.55%",
  "promedioMensualTotal": "269.4",
  "meses": [
    {
      "mes": "Dic-25",
      "incidentes": 103,
      "requerimientos": 115
    },
    {
      "mes": "Ene-26",
      "incidentes": 108,
      "requerimientos": 130
    },
    {
      "mes": "Feb-26",
      "incidentes": 136,
      "requerimientos": 216
    },
    {
      "mes": "Mar-26",
      "incidentes": 67,
      "requerimientos": 215
    },
    {
      "mes": "Abr-26",
      "incidentes": 77,
      "requerimientos": 228
    },
    {
      "mes": "May-26",
      "incidentes": 45,
      "requerimientos": 199
    },
    {
      "mes": "Jun-26",
      "incidentes": 59,
      "requerimientos": 188
    }
  ],
  "insight": "La evolución de los siete periodos muestra predominio de requerimientos y una reducción del volumen total después del pico registrado en febrero."
});
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 14
 ****************************************************/

function getSampleSlide14() {
  return normalizeSlide14Data({
  "titulo": "CERRO LINDO - DIC 2025 - JUN 2026 - REQUERIMIENTOS",
  "periodo": "DIC 2025 - JUN 2026",
  "logoText": "COMM",
  "totalRequerimientos": 1291,
  "totalTiempoHoras": 3721,
  "items": [
    {
      "nombre": "Mantenimiento Programado del sistema (leaky feeder)",
      "cantidad": 499,
      "tiempoHoras": 1472
    },
    {
      "nombre": "Instalación Nueva (leaky feeder)",
      "cantidad": 320,
      "tiempoHoras": 912
    },
    {
      "nombre": "Reubicacion de cable (leaky feeder)",
      "cantidad": 245,
      "tiempoHoras": 698
    },
    {
      "nombre": "Estandarización de Cable (leaky feeder)",
      "cantidad": 71,
      "tiempoHoras": 199
    },
    {
      "nombre": "Instalación Nueva (FIBRA OPTICA)",
      "cantidad": 50,
      "tiempoHoras": 150
    },
    {
      "nombre": "INSTALACION NUEVA (ENERGIA)",
      "cantidad": 31,
      "tiempoHoras": 84
    },
    {
      "nombre": "Mantenimiento Programado (camaras)",
      "cantidad": 18,
      "tiempoHoras": 46
    },
    {
      "nombre": "MANTENIMIENTO PROGRAMADO (GABINETE)",
      "cantidad": 17,
      "tiempoHoras": 46
    },
    {
      "nombre": "Instalación Nueva (RAD)",
      "cantidad": 10,
      "tiempoHoras": 30
    },
    {
      "nombre": "Instalación Nueva (Fibra Optica)",
      "cantidad": 8,
      "tiempoHoras": 24
    }
  ],
  "insight": "La principal causa raíz acumulada corresponde al mantenimiento programado del sistema leaky feeder."
});
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 15
 ****************************************************/

function getSampleSlide15() {
  return normalizeSlide15Data({
  "titulo": "CERRO LINDO - DIC 2025 - JUN 2026 - INCIDENTES",
  "periodo": "DIC 2025 - JUN 2026",
  "logoText": "COMM",
  "totalIncidentes": 595,
  "totalTiempoHoras": 1674,
  "items": [
    {
      "nombre": "Falla de equipos de comunicación (amplificador, spl, sp2,sp3)",
      "cantidad": 192,
      "tiempoHoras": 538
    },
    {
      "nombre": "Daño de cable en trabajos de rehabilitacion(leaky feeder)",
      "cantidad": 175,
      "tiempoHoras": 484
    },
    {
      "nombre": "Daño de cable electrico de fuente",
      "cantidad": 102,
      "tiempoHoras": 292
    },
    {
      "nombre": "Daño de cable por equipo(Jumbo, Scoop, Volquete)",
      "cantidad": 78,
      "tiempoHoras": 231
    },
    {
      "nombre": "Puntos de conexión sulfatados",
      "cantidad": 16,
      "tiempoHoras": 40
    },
    {
      "nombre": "Daño de cable de fibra optica",
      "cantidad": 15,
      "tiempoHoras": 39
    },
    {
      "nombre": "Daño de cable UTP (Camara)",
      "cantidad": 7,
      "tiempoHoras": 20
    },
    {
      "nombre": "Cable Roto por Vehículo (Leaky Feeder)",
      "cantidad": 4,
      "tiempoHoras": 12
    },
    {
      "nombre": "Conectores en mal estado (Leaky Feeder)",
      "cantidad": 3,
      "tiempoHoras": 9
    },
    {
      "nombre": "falla de equipos de comunicación (amplificador, spl, sp2,sp3)",
      "cantidad": 2,
      "tiempoHoras": 6
    }
  ],
  "insight": "La principal causa raíz acumulada corresponde a fallas de equipos de comunicación del sistema leaky feeder."
});
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 17
 ****************************************************/

function getSampleSlide17() {
  return normalizeSlide17Data({
  "titulo": "CERRO LINDO - ABRIL 2026 - SUMINISTROS GENERALES",
  "periodo": "Abril 2026",
  "logoText": "COMM",
  "totalSuministros": 12995,
  "items": [
    {
      "nombre": "ALIMENTADOR REF RNG-500 BECKER",
      "cantidad": 6615,
      "porcentaje": "50.90%",
      "unidad": "MT"
    },
    {
      "nombre": "1010662 CINTILLO AMARRACABLE 550 X 9 MM",
      "cantidad": 2920,
      "porcentaje": "22.47%",
      "unidad": "UN"
    },
    {
      "nombre": "ALCAYATA BARRA CORRUGADA 3/8 DE 1/2*3\"",
      "cantidad": 1714,
      "porcentaje": "13.19%",
      "unidad": "UN"
    },
    {
      "nombre": "Cable Radiante de 7/8 Pulgadas, 50 ohms",
      "cantidad": 1500,
      "porcentaje": "11.54%",
      "unidad": "MT"
    },
    {
      "nombre": "VHF TERMINATION UNIT RNG-TER",
      "cantidad": 52,
      "porcentaje": "0.40%",
      "unidad": "UN"
    },
    {
      "nombre": "BIFURCADOR BECKER V3SP100 3WAY RNG-SP2",
      "cantidad": 44,
      "porcentaje": "0.34%",
      "unidad": "UN"
    },
    {
      "nombre": "Cinta Aislante Vinilica TEMFLEX 1600 3/4¨X 18MTS Negro",
      "cantidad": 36,
      "porcentaje": "0.28%",
      "unidad": "MT"
    },
    {
      "nombre": "TRAPO INDUSTRIAL",
      "cantidad": 34,
      "porcentaje": "0.26%",
      "unidad": "UN"
    },
    {
      "nombre": "EMPALME RNG-SPL VARIS",
      "cantidad": 32,
      "porcentaje": "0.25%",
      "unidad": "UN"
    },
    {
      "nombre": "AMPLIFICADOR RNG- AMP. VARIS RNG-AMP",
      "cantidad": 23,
      "porcentaje": "0.18%",
      "unidad": "UN"
    }
  ],
  "insight": "El alimentador RNG-500 Becker concentra la mayor cantidad de suministros utilizados durante abril."
});
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 18
 ****************************************************/

function getSampleSlide18() {
  return normalizeSlide18Data({
  "titulo": "CERRO LINDO - ABRIL 2026 - SUMINISTROS EN REQUERIMIENTOS",
  "periodo": "Abril 2026",
  "logoText": "COMM",
  "totalSuministrosRequerimientos": 11195,
  "items": [
    {
      "nombre": "ALIMENTADOR REF RNG-500 BECKER",
      "cantidad": 5700,
      "porcentaje": "50.92%",
      "unidad": "MT"
    },
    {
      "nombre": "1010662 CINTILLO AMARRACABLE 550 X 9 MM",
      "cantidad": 2201,
      "porcentaje": "19.66%",
      "unidad": "UN"
    },
    {
      "nombre": "ALCAYATA BARRA CORRUGADA 3/8 DE 1/2*3\"",
      "cantidad": 1642,
      "porcentaje": "14.67%",
      "unidad": "UN"
    },
    {
      "nombre": "Cable Radiante de 7/8 Pulgadas, 50 ohms",
      "cantidad": 1500,
      "porcentaje": "13.40%",
      "unidad": "MT"
    },
    {
      "nombre": "VHF TERMINATION UNIT RNG-TER",
      "cantidad": 44,
      "porcentaje": "0.39%",
      "unidad": "UN"
    },
    {
      "nombre": "TRAPO INDUSTRIAL",
      "cantidad": 34,
      "porcentaje": "0.30%",
      "unidad": "UN"
    },
    {
      "nombre": "BIFURCADOR BECKER V3SP100 3WAY RNG-SP2",
      "cantidad": 22,
      "porcentaje": "0.20%",
      "unidad": "UN"
    },
    {
      "nombre": "AMPLIFICADOR RNG- AMP. VARIS RNG-AMP",
      "cantidad": 19,
      "porcentaje": "0.17%",
      "unidad": "UN"
    },
    {
      "nombre": "EMPALME RNG-SPL VARIS",
      "cantidad": 17,
      "porcentaje": "0.15%",
      "unidad": "UN"
    },
    {
      "nombre": "Alcohol Isopropílico frasco de 1L",
      "cantidad": 9,
      "porcentaje": "0.08%",
      "unidad": "UN"
    }
  ],
  "insight": "El alimentador RNG-500 Becker representa el principal suministro utilizado para atender requerimientos durante abril."
});
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 19
 ****************************************************/

function getSampleSlide19() {
  return normalizeSlide19Data({
  "titulo": "CERRO LINDO - ABRIL 2026 - SUMINISTROS EN INCIDENTES",
  "periodo": "Abril 2026",
  "logoText": "COMM",
  "totalSuministrosIncidentes": 1800,
  "items": [
    {
      "nombre": "ALIMENTADOR REF RNG-500 BECKER",
      "cantidad": 915,
      "porcentaje": "50.83%",
      "unidad": "MT"
    },
    {
      "nombre": "1010662 CINTILLO AMARRACABLE 550 X 9 MM",
      "cantidad": 719,
      "porcentaje": "39.94%",
      "unidad": "UN"
    },
    {
      "nombre": "ALCAYATA BARRA CORRUGADA 3/8 DE 1/2*3\"",
      "cantidad": 72,
      "porcentaje": "4.00%",
      "unidad": "UN"
    },
    {
      "nombre": "Cinta Aislante Vinilica TEMFLEX 1600 3/4¨X 18MTS Negro",
      "cantidad": 34,
      "porcentaje": "1.89%",
      "unidad": "MT"
    },
    {
      "nombre": "BIFURCADOR BECKER V3SP100 3WAY RNG-SP2",
      "cantidad": 22,
      "porcentaje": "1.22%",
      "unidad": "UN"
    },
    {
      "nombre": "EMPALME RNG-SPL VARIS",
      "cantidad": 15,
      "porcentaje": "0.83%",
      "unidad": "UN"
    },
    {
      "nombre": "VHF TERMINATION UNIT RNG-TER",
      "cantidad": 8,
      "porcentaje": "0.44%",
      "unidad": "UN"
    },
    {
      "nombre": "LIMPIADOR DE CONTACTO 3 EN 1",
      "cantidad": 6,
      "porcentaje": "0.33%",
      "unidad": "UN"
    },
    {
      "nombre": "AMPLIFICADOR RNG- AMP. VARIS RNG-AMP",
      "cantidad": 4,
      "porcentaje": "0.22%",
      "unidad": "UN"
    },
    {
      "nombre": "Alcohol Isopropílico frasco de 1L",
      "cantidad": 3,
      "porcentaje": "0.17%",
      "unidad": "UN"
    }
  ],
  "insight": "El alimentador RNG-500 Becker y los cintillos amarrables concentran el mayor consumo asociado a incidentes durante abril."
});
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 10
 ****************************************************/

function normalizeSlide10Data(body) {
  const dias = Array.isArray(body.dias) ? body.dias : [];

  const cleanedDias = dias
    .filter(d => d && (d.fecha !== undefined || d.dia !== undefined))
    .map(d => ({
      fecha: String(d.fecha || d.dia || '').trim(),
      dia: String(d.dia || d.fecha || '').trim(),
      atenciones: toNumber(d.atenciones),
      horas: toNumber(d.horas)
    }));

  const totalAtenciones =
    toNumber(body.totalAtenciones) ||
    cleanedDias.reduce((acc, d) => acc + d.atenciones, 0);

  const totalHoras =
    toNumber(body.totalHoras) ||
    cleanedDias.reduce((acc, d) => acc + d.horas, 0);

  const diasConAtencion =
    toNumber(body.diasConAtencion || body.diasPeriodo) ||
    cleanedDias.filter(d => d.atenciones > 0 || d.horas > 0).length;

  const promedioAtencionesDia =
    body.promedioAtencionesDia ||
    (diasConAtencion ? (totalAtenciones / diasConAtencion).toFixed(1) : '0.0');

  const promedioHorasDia =
    body.promedioHorasDia ||
    (diasConAtencion ? (totalHoras / diasConAtencion).toFixed(1) : '0.0');

  const horasPorAtencion =
    body.horasPorAtencion ||
    (totalAtenciones ? (totalHoras / totalAtenciones).toFixed(2) : '0.00');

  const insightPrincipal =
    body.insight ||
    'La distribución diaria evidencia estabilidad operativa y picos controlados de demanda durante el periodo evaluado.';

  const insights =
    Array.isArray(body.insights) && body.insights.length
      ? body.insights
      : [
          insightPrincipal,
          'El volumen de atenciones se mantiene dentro de un comportamiento operativo controlado.',
          'El seguimiento diario permite identificar picos de demanda y mejorar la planificación de recursos.'
        ];

  return {
    titulo:
      body.titulo ||
      `CERRO LINDO - ${body.periodo || 'PERIODO'} - ATENCIONES EN LA OPERACIÓN`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    diasPeriodo: toNumber(body.diasPeriodo) || diasConAtencion,
    totalAtenciones,
    totalHoras,
    promedioAtencionesDia,
    promedioHorasDia,
    horasPorAtencion,
    diasConAtencion,

    dias: cleanedDias,

    insight: insightPrincipal,
    insights: insights
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 11
 ****************************************************/

function normalizeSlide11Data(body) {
  const rawMeses = Array.isArray(body.meses)
    ? body.meses
    : Array.isArray(body.mensualItems)
      ? body.mensualItems
      : [];

  let meses = rawMeses
    .filter(item => item && (item.mes || item.periodo || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        const dia = toNumber(item[1]);
        const noche = toNumber(item[2]);
        const total = toNumber(item[3]) || dia + noche;

        return {
          mes: String(item[0] || '').trim(),
          dia,
          noche,
          total
        };
      }

      // Se aceptan también los nombres antiguos mina/superficie
      // para facilitar pruebas con payloads del proyecto original.
      const dia = toNumber(
        item.dia ??
        item.turnoDia ??
        item.atencionesDia ??
        item.mina ??
        item.im ??
        0
      );

      const noche = toNumber(
        item.noche ??
        item.turnoNoche ??
        item.atencionesNoche ??
        item.superficie ??
        item.sup ??
        0
      );

      const total = toNumber(
        item.total ??
        item.atenciones ??
        item.cantidad ??
        0
      ) || dia + noche;

      return {
        mes: String(item.mes || item.periodo || '').trim(),
        dia,
        noche,
        total
      };
    })
    .filter(item => item.mes);

  if (!meses.length) {
    meses = [
      { mes: 'Dic-25', dia: 112, noche: 106, total: 218 },
      { mes: 'Ene-26', dia: 137, noche: 94, total: 231 },
      { mes: 'Feb-26', dia: 201, noche: 151, total: 352 }
    ];
  }

  const totalDiaGlobal =
    toNumber(
      body.totalDiaGlobal ??
      body.diaAtenciones ??
      body.totalDia ??
      body.totalMinaGlobal ??
      body.minaAtenciones ??
      0
    ) || meses.reduce((acc, item) => acc + item.dia, 0);

  const totalNocheGlobal =
    toNumber(
      body.totalNocheGlobal ??
      body.nocheAtenciones ??
      body.totalNoche ??
      body.totalSuperficieGlobal ??
      body.superficieAtenciones ??
      0
    ) || meses.reduce((acc, item) => acc + item.noche, 0);

  const totalAtenciones =
    toNumber(body.totalAtenciones ?? body.totalGeneral ?? 0) ||
    meses.reduce((acc, item) => acc + item.total, 0) ||
    totalDiaGlobal + totalNocheGlobal;

  const mesActual = meses[meses.length - 1] || {
    mes: '-',
    dia: 0,
    noche: 0,
    total: 0
  };

  const totalMesActualValue =
    toNumber(body.totalMesActualValue ?? body.totalMesActual ?? body.totalPeriodo ?? 0) ||
    mesActual.total;

  const participacionDia =
    body.participacionDia ||
    body.participacionMina ||
    calcPctOneDecimal(totalDiaGlobal, totalAtenciones);

  const participacionNoche =
    body.participacionNoche ||
    body.participacionSuperficie ||
    calcPctOneDecimal(totalNocheGlobal, totalAtenciones);

  return {
    titulo:
      body.titulo ||
      `CERRO LINDO - ${body.periodo || 'Periodo'} - ATENCIONES POR TURNO Y EVOLUCIÓN MENSUAL`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    meses,
    mensualItems: meses,

    totalAtenciones,
    totalDiaGlobal,
    totalNocheGlobal,

    diaAtenciones: totalDiaGlobal,
    nocheAtenciones: totalNocheGlobal,

    participacionDia,
    participacionNoche,

    totalMesActualValue,

    insight:
      body.insight ||
      `El turno día concentra ${participacionDia} de las atenciones acumuladas, mientras el turno noche representa ${participacionNoche}.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 12
 ****************************************************/

function normalizeSlide12Data(body) {
  const kpis = body.kpis || {};

  const totalAtenciones = toNumber(
    body.totalAtenciones ??
    kpis.totalAtenciones ??
    0
  );

  const incidentes = toNumber(
    body.incidentes ??
    kpis.incidentes ??
    0
  );

  const requerimientos = toNumber(
    body.requerimientos ??
    kpis.requerimientos ??
    0
  );

  const total = totalAtenciones || incidentes + requerimientos;

  const pctIncidentes =
    body.pctIncidentes ??
    kpis.pctIncidentes ??
    calcPct(incidentes, total);

  const pctRequerimientos =
    body.pctRequerimientos ??
    kpis.pctRequerimientos ??
    calcPct(requerimientos, total);

  const brecha = toNumber(
    body.brecha ??
    kpis.brecha ??
    requerimientos - incidentes
  );

  const tabla = normalizeTablaSlide12(body.tabla, {
    incidentes,
    requerimientos,
    total,
    pctIncidentes,
    pctRequerimientos
  });

  return {
    titulo:
      body.titulo ||
      `CERRO LINDO - ${body.periodo || 'Periodo'} - INCIDENTES VS REQUERIMIENTOS`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalAtenciones: total,
    incidentes,
    requerimientos,
    brecha,

    pctIncidentes,
    pctRequerimientos,

    donutIncidentes: incidentes,
    donutRequerimientos: requerimientos,

    tabla,

    insight:
      body.insight ||
      'La mayoría de las atenciones corresponden a requerimientos, evidenciando prioridad de gestión en actividades planificadas frente a incidencias.'
  };
}

function normalizeTablaSlide12(tabla, base) {
  if (tabla && !Array.isArray(tabla)) {
    return {
      up: tabla.up || 'TOTAL',
      incidentes: tabla.incidentes ?? base.incidentes,
      requerimientos: tabla.requerimientos ?? base.requerimientos,
      total: tabla.total ?? base.total,
      pctIncidentes: tabla.pctIncidentes ?? base.pctIncidentes,
      pctRequerimientos: tabla.pctRequerimientos ?? base.pctRequerimientos,
      pctTotal: tabla.pctTotal || '100%'
    };
  }

  if (Array.isArray(tabla) && tabla.length >= 3) {
    return {
      up: tabla[1][0] || 'TOTAL',
      incidentes: tabla[1][1],
      requerimientos: tabla[1][2],
      total: tabla[1][3],
      pctIncidentes: tabla[2][1],
      pctRequerimientos: tabla[2][2],
      pctTotal: tabla[2][3] || '100%'
    };
  }

  return {
    up: 'TOTAL',
    incidentes: base.incidentes,
    requerimientos: base.requerimientos,
    total: base.total,
    pctIncidentes: base.pctIncidentes,
    pctRequerimientos: base.pctRequerimientos,
    pctTotal: '100%'
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 13
 ****************************************************/

function normalizeSlide13Data(body) {
  const rawMeses = Array.isArray(body.meses)
    ? body.meses
    : Array.isArray(body.mensualItems)
      ? body.mensualItems
      : [];

  let meses = rawMeses
    .filter(item => item && (item.mes || item.periodo || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        return {
          mes: String(item[0] || '').trim(),
          incidentes: toNumber(item[1]),
          requerimientos: toNumber(item[2])
        };
      }

      return {
        mes: String(item.mes || item.periodo || '').trim(),
        incidentes: toNumber(
          item.incidentes ??
          item.incidente ??
          item.inc ??
          0
        ),
        requerimientos: toNumber(
          item.requerimientos ??
          item.requerimiento ??
          item.req ??
          0
        )
      };
    })
    .filter(item => item.mes);

  if (!meses.length) {
    meses = [
      { mes: 'Jul-25', incidentes: 81, requerimientos: 176 },
      { mes: 'Ago-25', incidentes: 77, requerimientos: 180 },
      { mes: 'Set-25', incidentes: 81, requerimientos: 190 },
      { mes: 'Oct-25', incidentes: 100, requerimientos: 178 },
      { mes: 'Nov-25', incidentes: 90, requerimientos: 224 },
      { mes: 'Dic-25', incidentes: 73, requerimientos: 216 },
      { mes: 'Ene-26', incidentes: 47, requerimientos: 82 },
      { mes: 'Feb-26', incidentes: 50, requerimientos: 90 },
      { mes: 'Mar-26', incidentes: 53, requerimientos: 113 },
      { mes: 'Abr-26', incidentes: 39, requerimientos: 120 }
    ];
  }

  const totalRequerimientos =
    toNumber(body.totalRequerimientos ?? body.requerimientos ?? 0) ||
    meses.reduce((acc, item) => acc + item.requerimientos, 0);

  const totalIncidentes =
    toNumber(body.totalIncidentes ?? body.incidentes ?? 0) ||
    meses.reduce((acc, item) => acc + item.incidentes, 0);

  const totalAtenciones =
    toNumber(body.totalAtenciones ?? body.total ?? 0) ||
    totalRequerimientos + totalIncidentes;

  const participacionRequerimientos =
    body.participacionRequerimientos ||
    calcPctNoDecimal(totalRequerimientos, totalAtenciones);

  const participacionIncidentes =
    body.participacionIncidentes ||
    calcPctNoDecimal(totalIncidentes, totalAtenciones);

  const promedioMensualTotal =
    body.promedioMensualTotal ||
    (meses.length ? (totalAtenciones / meses.length).toFixed(1) : '0.0');

  return {
    titulo:
      body.titulo ||
      `CERRO LINDO - ${body.periodo || 'Periodo'} - EVOLUCIÓN DE REQUERIMIENTOS E INCIDENTES`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    meses,
    mensualItems: meses,

    totalRequerimientos,
    totalIncidentes,
    totalAtenciones,

    participacionRequerimientos,
    participacionIncidentes,
    promedioMensualTotal,

    insight:
      body.insight ||
      `La gestión operativa se mantiene eficiente, con una alta participación de requerimientos (${participacionRequerimientos}) frente a incidentes (${participacionIncidentes}), lo que evidencia un entorno controlado y predecible.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 14
 ****************************************************/

function normalizeSlide14Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topRequerimientos)
      ? body.topRequerimientos
      : [];

  let items = normalizeParetoItems(rawItems, 'requerimiento');

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalTiempoHoras =
    toNumber(body.totalTiempoHoras ?? body.tiempoTotalHoras ?? body.totalHoras ?? 0) ||
    items.reduce((acc, item) => acc + item.tiempoHoras, 0);

  const totalRequerimientos =
    toNumber(body.totalRequerimientos ?? body.total ?? body.requerimientos ?? 0) ||
    totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalRequerimientos)
  }));

  const top1 = items[0] || {
    nombre: '-',
    cantidad: 0,
    tiempoHoras: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `CERRO LINDO - ${body.periodo || 'Periodo'} - REQUERIMIENTOS`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalRequerimientos,
    totalTop10,
    totalTiempoHoras,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalRequerimientos),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalRequerimientos),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalRequerimientos),

    items,

    insight:
      body.insight ||
      `La mayor incidencia se concentra en ${top1.nombre}.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 15
 ****************************************************/

function normalizeSlide15Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topIncidentes)
      ? body.topIncidentes
      : [];

  let items = normalizeParetoItems(rawItems, 'incidente');

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalTiempoHoras =
    toNumber(body.totalTiempoHoras ?? body.tiempoTotalHoras ?? body.totalHoras ?? 0) ||
    items.reduce((acc, item) => acc + item.tiempoHoras, 0);

  const totalIncidentes =
    toNumber(body.totalIncidentes ?? body.total ?? body.incidentes ?? 0) ||
    totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalIncidentes)
  }));

  const top1 = items[0] || {
    nombre: '-',
    cantidad: 0,
    tiempoHoras: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `CERRO LINDO - ${body.periodo || 'Periodo'} - INCIDENTES`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalIncidentes,
    totalTop10,
    totalTiempoHoras,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalIncidentes),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalIncidentes),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalIncidentes),

    items,

    insight:
      body.insight ||
      `La mayor incidencia se concentra en ${top1.nombre}.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 17
 ****************************************************/

function normalizeSlide17Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topSuministros)
      ? body.topSuministros
      : [];

  let items = normalizeSuministroItems(rawItems);

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalSuministros =
    toNumber(body.totalSuministros ?? body.total ?? body.suministros ?? 0) ||
    totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalSuministros)
  }));

  const top1 = items[0] || {
    nombre: '-',
    unidad: '-',
    requerimientos: 0,
    incidentes: 0,
    cantidad: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `CERRO LINDO - ${body.periodo || 'Periodo'} - SUMINISTROS GENERALES`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalSuministros,
    totalTop10,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalSuministros),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalSuministros),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalSuministros),

    items,

    insight:
      body.insight ||
      `El suministro de mayor uso corresponde a ${top1.nombre}.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 18
 ****************************************************/

function normalizeSlide18Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topSuministrosRequerimientos)
      ? body.topSuministrosRequerimientos
      : [];

  let items = normalizeSuministroSimpleItems(rawItems);

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalSuministrosRequerimientos =
    toNumber(
      body.totalSuministrosRequerimientos ??
      body.totalSuministros ??
      body.total ??
      0
    ) || totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalSuministrosRequerimientos)
  }));

  const top1 = items[0] || {
    nombre: '-',
    unidad: '-',
    cantidad: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `CERRO LINDO - ${body.periodo || 'Periodo'} - SUMINISTROS EN REQUERIMIENTOS`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalSuministrosRequerimientos,
    totalSuministros: totalSuministrosRequerimientos,
    totalTop10,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalSuministrosRequerimientos),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalSuministrosRequerimientos),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalSuministrosRequerimientos),

    items,

    insight:
      body.insight ||
      `El suministro de mayor uso en requerimientos corresponde a ${top1.nombre}.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 19
 ****************************************************/

function normalizeSlide19Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topSuministrosIncidentes)
      ? body.topSuministrosIncidentes
      : [];

  let items = normalizeSuministroSimpleItems(rawItems);

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalSuministrosIncidentes =
    toNumber(
      body.totalSuministrosIncidentes ??
      body.totalSuministros ??
      body.total ??
      0
    ) || totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalSuministrosIncidentes)
  }));

  const top1 = items[0] || {
    nombre: '-',
    unidad: '-',
    cantidad: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `CERRO LINDO - ${body.periodo || 'Periodo'} - SUMINISTROS EN INCIDENTES`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalSuministrosIncidentes,
    totalSuministros: totalSuministrosIncidentes,
    totalTop10,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalSuministrosIncidentes),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalSuministrosIncidentes),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalSuministrosIncidentes),

    items,

    insight:
      body.insight ||
      `El suministro de mayor uso en incidentes corresponde a ${top1.nombre}.`
  };
}

/****************************************************
 * HELPERS GENERALES
 ****************************************************/

function normalizeParetoItems(rawItems, type) {
  return rawItems
    .filter(item => item && (item.nombre || item.descripcion || item[type] || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        return {
          nombre: String(item[0] || '').trim(),
          cantidad: toNumber(item[1]),
          tiempoHoras: toNumber(item[2])
        };
      }

      return {
        nombre: String(
          item.nombre ||
          item.descripcion ||
          item[type] ||
          item.requerimiento ||
          item.incidente ||
          ''
        ).trim(),

        cantidad: toNumber(item.cantidad ?? item.total ?? item.valor ?? 0),

        tiempoHoras: toNumber(
          item.tiempoHoras ??
          item.tiempo ??
          item.horas ??
          item.totalHoras ??
          0
        )
      };
    })
    .filter(item => item.nombre && item.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10);
}

function normalizeSuministroItems(rawItems) {
  return rawItems
    .filter(item => item && (item.nombre || item.descripcion || item.suministro || item.material || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        return {
          nombre: String(item[0] || '').trim(),
          cantidad: toNumber(item[1]),
          porcentaje: formatPercentage(item[2]),
          unidad: String(item[3] || '-').trim()
        };
      }

      return {
        nombre: String(
          item.nombre ||
          item.descripcion ||
          item.suministro ||
          item.material ||
          ''
        ).trim(),

        cantidad: toNumber(item.cantidad ?? item.total ?? item.valor ?? 0),
        porcentaje: formatPercentage(item.porcentaje ?? item.participacion ?? item.pct),

        unidad: String(
          item.unidad ||
          item.um ||
          item.medida ||
          '-'
        ).trim()
      };
    })
    .filter(item => item.nombre && item.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10);
}

function normalizeSuministroSimpleItems(rawItems) {
  return normalizeSuministroItems(rawItems);
}

function toNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

  let txt = String(value ?? '').trim();
  if (!txt) return 0;

  txt = txt.replace(/\s/g, '').replace(/[^\d,.-]/g, '');
  txt = txt.replace(/,+$/, '');

  const lastComma = txt.lastIndexOf(',');
  const lastDot = txt.lastIndexOf('.');

  if (lastComma >= 0 && lastDot >= 0) {
    if (lastComma > lastDot) {
      txt = txt.replace(/\./g, '').replace(',', '.');
    } else {
      txt = txt.replace(/,/g, '');
    }
  } else if (lastComma >= 0) {
    txt = txt.replace(',', '.');
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(txt)) {
    txt = txt.replace(/\./g, '');
  }

  const parsed = Number(txt);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPercentage(value) {
  if (value === undefined || value === null || value === '') return '';

  if (typeof value === 'string' && value.includes('%')) {
    const numeric = toNumber(value);
    return numeric.toFixed(2) + '%';
  }

  const numeric = toNumber(value);
  const pct = Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
  return pct.toFixed(2) + '%';
}

function calcPct(value, total) {
  if (!total) return '0.00%';
  return ((Number(value) / Number(total)) * 100).toFixed(2) + '%';
}

function calcPctOneDecimal(value, total) {
  if (!total) return '0.0%';
  return ((Number(value) / Number(total)) * 100).toFixed(1) + '%';
}

function calcPctNoDecimal(value, total) {
  if (!total) return '0%';
  return Math.round((Number(value) / Number(total)) * 100) + '%';
}

function renderEjsToString(viewName, data) {
  return new Promise((resolve, reject) => {
    app.render(viewName, data, (err, html) => {
      if (err) return reject(err);
      resolve(html);
    });
  });
}

/****************************************************
 * CONVERTIR HTML A PNG
 ****************************************************/

async function htmlToPng(html) {
  let browser;

  try {
    const launchOptions = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    };

    const localChromePath = getLocalChromePath();

    if (localChromePath) {
      launchOptions.executablePath = localChromePath;
    }

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();

    await page.setViewport({
      width: 1600,
      height: 900,
      deviceScaleFactor: 2
    });

    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    const stylePath = path.join(__dirname, 'public', 'styles.css');

    if (fs.existsSync(stylePath)) {
      await page.addStyleTag({
        path: stylePath
      });
    }

    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });

    return Buffer.from(screenshot);

  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/****************************************************
 * BUSCAR CHROME / EDGE LOCAL
 ****************************************************/

function getLocalChromePath() {
  const possiblePaths = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ].filter(Boolean);

  return possiblePaths.find(p => fs.existsSync(p)) || null;
}

/****************************************************
 * INICIAR SERVIDOR
 ****************************************************/

app.listen(PORT, () => {
  console.log(`Motor visual NEXA corriendo en http://localhost:${PORT}`);
});
