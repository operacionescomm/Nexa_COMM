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
    message: 'Motor visual NEXA Cerro Lindo activo'
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
    titulo: 'ATENCIONES EN LA OPERACIÓN NEXA CERRO LINDO - FEBRERO 2026',
    periodo: 'Febrero 2026',
    logoText: 'COMM',
    diasPeriodo: 32,
    totalAtenciones: 352,
    totalHoras: 933,
    promedioAtencionesDia: '11.0',
    promedioHorasDia: '29.2',
    horasPorAtencion: '2.65',
    diasConAtencion: 32,

    dias: [
      { fecha: '21/01/2026', dia: '21', atenciones: 15, horas: 43 },
      { fecha: '22/01/2026', dia: '22', atenciones: 18, horas: 54 },
      { fecha: '23/01/2026', dia: '23', atenciones: 14, horas: 42 },
      { fecha: '24/01/2026', dia: '24', atenciones: 13, horas: 39 },
      { fecha: '25/01/2026', dia: '25', atenciones: 12, horas: 36 },
      { fecha: '26/01/2026', dia: '26', atenciones: 10, horas: 28 },
      { fecha: '27/01/2026', dia: '27', atenciones: 12, horas: 28 },
      { fecha: '28/01/2026', dia: '28', atenciones: 9, horas: 21 },
      { fecha: '29/01/2026', dia: '29', atenciones: 9, horas: 21 },
      { fecha: '30/01/2026', dia: '30', atenciones: 11, horas: 33 },
      { fecha: '31/01/2026', dia: '31', atenciones: 10, horas: 30 },
      { fecha: '01/02/2026', dia: '01', atenciones: 7, horas: 21 },
      { fecha: '02/02/2026', dia: '02', atenciones: 13, horas: 39 },
      { fecha: '03/02/2026', dia: '03', atenciones: 13, horas: 39 },
      { fecha: '04/02/2026', dia: '04', atenciones: 9, horas: 25 },
      { fecha: '05/02/2026', dia: '05', atenciones: 8, horas: 18 },
      { fecha: '06/02/2026', dia: '06', atenciones: 14, horas: 40 },
      { fecha: '07/02/2026', dia: '07', atenciones: 13, horas: 29 },
      { fecha: '08/02/2026', dia: '08', atenciones: 13, horas: 31 },
      { fecha: '09/02/2026', dia: '09', atenciones: 13, horas: 37 },
      { fecha: '10/02/2026', dia: '10', atenciones: 10, horas: 24 },
      { fecha: '11/02/2026', dia: '11', atenciones: 9, horas: 21 },
      { fecha: '12/02/2026', dia: '12', atenciones: 9, horas: 23 },
      { fecha: '13/02/2026', dia: '13', atenciones: 9, horas: 22 },
      { fecha: '14/02/2026', dia: '14', atenciones: 15, horas: 33 },
      { fecha: '15/02/2026', dia: '15', atenciones: 13, horas: 33 },
      { fecha: '16/02/2026', dia: '16', atenciones: 11, horas: 27 },
      { fecha: '17/02/2026', dia: '17', atenciones: 10, horas: 22 },
      { fecha: '18/02/2026', dia: '18', atenciones: 10, horas: 22 },
      { fecha: '19/02/2026', dia: '19', atenciones: 12, horas: 28 },
      { fecha: '20/02/2026', dia: '20', atenciones: 3, horas: 9 },
      { fecha: '21/02/2026', dia: '21', atenciones: 5, horas: 15 }
    ],

    insight:
      'La distribución diaria permite identificar la carga operativa del periodo y sus principales picos de atención.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 11
 ****************************************************/

function getSampleSlide11() {
  return normalizeSlide11Data({
    titulo: 'NEXA CERRO LINDO - FEBRERO 2026 - ATENCIONES POR TURNO Y EVOLUCIÓN MENSUAL',
    periodo: 'Febrero 2026',
    logoText: 'COMM',

    meses: [
      { mes: 'Dic-25', dia: 112, noche: 106, total: 218 },
      { mes: 'Ene-26', dia: 137, noche: 94, total: 231 },
      { mes: 'Feb-26', dia: 201, noche: 151, total: 352 }
    ],

    totalAtenciones: 801,
    totalDiaGlobal: 450,
    totalNocheGlobal: 351,
    totalMesActualValue: 352,

    insight:
      'El turno día concentra la mayor participación de atenciones del periodo acumulado, manteniéndose una carga relevante durante el turno noche.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 12
 ****************************************************/

function getSampleSlide12() {
  return normalizeSlide12Data({
    titulo: 'NEXA CERRO LINDO - FEBRERO 2026 - INCIDENTES VS REQUERIMIENTOS',
    periodo: 'Febrero 2026',
    logoText: 'COMM',

    totalAtenciones: 352,
    incidentes: 136,
    requerimientos: 216,
    brecha: 80,

    pctIncidentes: '38.64%',
    pctRequerimientos: '61.36%',

    tabla: {
      up: 'CERRO LINDO',
      incidentes: 136,
      requerimientos: 216,
      total: 352,
      pctIncidentes: '38.64%',
      pctRequerimientos: '61.36%',
      pctTotal: '100%'
    },

    insight:
      'Los requerimientos representan la mayor proporción de atenciones del periodo, por encima de los incidentes reportados.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 13
 ****************************************************/

function getSampleSlide13() {
  return normalizeSlide13Data({
    titulo: 'NEXA CERRO LINDO - FEBRERO 2026 - EVOLUCIÓN DE REQUERIMIENTOS E INCIDENTES',
    periodo: 'Febrero 2026',
    logoText: 'COMM',

    totalRequerimientos: 461,
    totalIncidentes: 347,
    totalAtenciones: 808,
    participacionRequerimientos: '57%',
    participacionIncidentes: '43%',
    promedioMensualTotal: '269.3',

    meses: [
      { mes: 'Dic-25', incidentes: 103, requerimientos: 115 },
      { mes: 'Ene-26', incidentes: 108, requerimientos: 130 },
      { mes: 'Feb-26', incidentes: 136, requerimientos: 216 }
    ],

    insight:
      'La evolución mensual muestra una mayor participación de requerimientos, con crecimiento del volumen total durante febrero.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 14
 ****************************************************/

function getSampleSlide14() {
  return normalizeSlide14Data({
    titulo: 'NEXA CERRO LINDO - FEBRERO 2026 - TOP REQUERIMIENTOS POR CAUSA RAÍZ',
    periodo: 'Febrero 2026',
    logoText: 'COMM',

    totalRequerimientos: 214,
    totalTiempoHoras: 565,

    items: [
      { nombre: 'Instalación Nueva (leaky feeder)', cantidad: 74, tiempoHoras: 194 },
      { nombre: 'Reubicación de cable (leaky feeder)', cantidad: 62, tiempoHoras: 163 },
      { nombre: 'Mantenimiento Programado del sistema (leaky feeder)', cantidad: 39, tiempoHoras: 112 },
      { nombre: 'Estandarización de Cable (leaky feeder)', cantidad: 23, tiempoHoras: 56 },
      { nombre: 'Instalación Nueva (energía)', cantidad: 7, tiempoHoras: 17 },
      { nombre: 'Mantenimiento Programado (cámaras)', cantidad: 4, tiempoHoras: 8 },
      { nombre: 'Instalación Nueva (fibra óptica)', cantidad: 3, tiempoHoras: 9 },
      { nombre: 'Mantenimiento Programado (gabinete)', cantidad: 2, tiempoHoras: 6 }
    ],

    insight:
      'La principal causa raíz de los requerimientos corresponde a Instalación Nueva del sistema leaky feeder.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 15
 ****************************************************/

function getSampleSlide15() {
  return normalizeSlide15Data({
    titulo: 'NEXA CERRO LINDO - FEBRERO 2026 - TOP INCIDENTES POR CAUSA RAÍZ',
    periodo: 'Febrero 2026',
    logoText: 'COMM',

    totalIncidentes: 136,
    totalTiempoHoras: 364,

    items: [
      { nombre: 'Daño de cable en trabajos de rehabilitación (leaky feeder)', cantidad: 66, tiempoHoras: 171 },
      { nombre: 'Falla de equipos de comunicación (amplificador, SPL, SP2, SP3)', cantidad: 40, tiempoHoras: 110 },
      { nombre: 'Daño de cable eléctrico de fuente', cantidad: 19, tiempoHoras: 52 },
      { nombre: 'Daño de cable de fibra óptica', cantidad: 6, tiempoHoras: 16 },
      { nombre: 'Daño de cable por equipo (Jumbo, Scoop, Volquete)', cantidad: 3, tiempoHoras: 9 },
      { nombre: 'Cable roto por vehículo (leaky feeder)', cantidad: 1, tiempoHoras: 3 },
      { nombre: 'Conectores en mal estado (leaky feeder)', cantidad: 1, tiempoHoras: 3 }
    ],

    insight:
      'La mayor concentración de incidentes se relaciona con daños del cable leaky feeder durante trabajos de rehabilitación.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 17
 ****************************************************/

function getSampleSlide17() {
  return normalizeSlide17Data({
    titulo: 'NEXA CERRO LINDO - FEBRERO 2026 - TOP SUMINISTROS GENERAL',
    periodo: 'Febrero 2026',
    logoText: 'COMM',

    totalSuministros: 16521,

    items: [
      { nombre: 'ALIMENTADOR REF RNG-500 BECKER', cantidad: 9520, porcentaje: '57.62%', unidad: 'MT' },
      { nombre: '1010662 CINTILLO AMARRACABLE 550 X 9 MM', cantidad: 4834, porcentaje: '29.26%', unidad: 'UN' },
      { nombre: 'ALCAYATA BARRA CORRUGADA 3/8 DE 1/2*3"', cantidad: 1617, porcentaje: '9.79%', unidad: 'UN' },
      { nombre: 'Cable TX6A 10GIG Shielded Copper Cable - F/UTP', cantidad: 160, porcentaje: '0.97%', unidad: 'MT' },
      { nombre: 'FUENTE DE ALIMENTACIÓN BECKER VARIS', cantidad: 90, porcentaje: '0.54%', unidad: 'UN' },
      { nombre: 'Perno tipo expansor 3/8x3x3/4', cantidad: 64, porcentaje: '0.39%', unidad: 'UN' },
      { nombre: 'EMPALME RNG-SPL VARIS', cantidad: 52, porcentaje: '0.31%', unidad: 'UN' },
      { nombre: 'BIFURCADOR BECKER V3SP100 3WAY RNG-SP2', cantidad: 47, porcentaje: '0.28%', unidad: 'UN' },
      { nombre: 'TRAPO INDUSTRIAL', cantidad: 45, porcentaje: '0.27%', unidad: 'UN' },
      { nombre: 'CINTA AISLANTE VINÍLICA TEMFLEX 1600', cantidad: 34, porcentaje: '0.21%', unidad: 'MT' }
    ],

    insight:
      'El alimentador RNG-500 Becker concentra la mayor cantidad de suministros utilizados en el periodo.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 18
 ****************************************************/

function getSampleSlide18() {
  return normalizeSlide18Data({
    titulo: 'NEXA CERRO LINDO - FEBRERO 2026 - SUMINISTROS EN REQUERIMIENTOS',
    periodo: 'Febrero 2026',
    logoText: 'COMM',

    totalSuministrosRequerimientos: 14017,

    items: [
      { nombre: 'ALIMENTADOR REF RNG-500 BECKER', cantidad: 8550, porcentaje: '61.00%', unidad: 'MT' },
      { nombre: '1010662 CINTILLO AMARRACABLE 550 X 9 MM', cantidad: 3593, porcentaje: '25.63%', unidad: 'UN' },
      { nombre: 'ALCAYATA BARRA CORRUGADA 3/8 DE 1/2*3"', cantidad: 1447, porcentaje: '10.32%', unidad: 'UN' },
      { nombre: 'Cable TX6A 10GIG Shielded Copper Cable - F/UTP', cantidad: 160, porcentaje: '1.14%', unidad: 'MT' },
      { nombre: 'FUENTE DE ALIMENTACIÓN BECKER VARIS', cantidad: 84, porcentaje: '0.60%', unidad: 'UN' },
      { nombre: 'Perno tipo expansor 3/8x3x3/4', cantidad: 56, porcentaje: '0.40%', unidad: 'UN' },
      { nombre: 'TRAPO INDUSTRIAL', cantidad: 29, porcentaje: '0.21%', unidad: 'UN' },
      { nombre: 'BIFURCADOR BECKER V3SP100 3WAY RNG-SP2', cantidad: 26, porcentaje: '0.19%', unidad: 'UN' },
      { nombre: 'EMPALME RNG-SPL VARIS', cantidad: 23, porcentaje: '0.16%', unidad: 'UN' },
      { nombre: 'CINTA AISLANTE VINÍLICA TEMFLEX 1600', cantidad: 16, porcentaje: '0.11%', unidad: 'MT' }
    ],

    insight:
      'El alimentador RNG-500 Becker representa el principal suministro utilizado para atender requerimientos.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 19
 ****************************************************/

function getSampleSlide19() {
  return normalizeSlide19Data({
    titulo: 'NEXA CERRO LINDO - FEBRERO 2026 - SUMINISTROS EN INCIDENTES',
    periodo: 'Febrero 2026',
    logoText: 'COMM',

    totalSuministrosIncidentes: 2504,

    items: [
      { nombre: '1010662 CINTILLO AMARRACABLE 550 X 9 MM', cantidad: 1241, porcentaje: '49.56%', unidad: 'UN' },
      { nombre: 'ALIMENTADOR REF RNG-500 BECKER', cantidad: 970, porcentaje: '38.74%', unidad: 'MT' },
      { nombre: 'ALCAYATA BARRA CORRUGADA 3/8 DE 1/2*3"', cantidad: 170, porcentaje: '6.79%', unidad: 'UN' },
      { nombre: 'EMPALME RNG-SPL VARIS', cantidad: 29, porcentaje: '1.16%', unidad: 'UN' },
      { nombre: 'BIFURCADOR BECKER V3SP100 3WAY RNG-SP2', cantidad: 21, porcentaje: '0.84%', unidad: 'UN' },
      { nombre: 'CINTA AISLANTE VINÍLICA TEMFLEX 1600', cantidad: 18, porcentaje: '0.72%', unidad: 'MT' },
      { nombre: 'TRAPO INDUSTRIAL', cantidad: 16, porcentaje: '0.64%', unidad: 'UN' },
      { nombre: 'AMPLIFICADOR RNG-AMP VARIS', cantidad: 12, porcentaje: '0.48%', unidad: 'UN' },
      { nombre: 'Perno tipo expansor 3/8x3x3/4', cantidad: 8, porcentaje: '0.32%', unidad: 'UN' },
      { nombre: 'FUENTE DE ALIMENTACIÓN BECKER VARIS', cantidad: 6, porcentaje: '0.24%', unidad: 'UN' }
    ],

    insight:
      'Los cintillos amarrables y el alimentador RNG-500 Becker concentran el mayor consumo asociado a incidentes.'
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
      `ATENCIONES EN LA OPERACIÓN NEXA CERRO LINDO - ${body.periodo || 'PERIODO'}`,

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
      `NEXA CERRO LINDO - ${body.periodo || 'Periodo'} - ATENCIONES POR TURNO Y EVOLUCIÓN MENSUAL`,

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
      `NEXA Cerro Lindo - ${body.periodo || 'Periodo'} - Incidentes vs Requerimientos`,

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
      `NEXA Cerro Lindo - ${body.periodo || 'Periodo'} - Evolución de Requerimientos e Incidentes`,

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
      `NEXA Cerro Lindo - ${body.periodo || 'Periodo'} - Top Requerimientos por Causa Raíz`,

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
      `NEXA Cerro Lindo - ${body.periodo || 'Periodo'} - Top Incidentes por Causa Raíz`,

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
      `NEXA Cerro Lindo - ${body.periodo || 'Periodo'} - Top Suministros General`,

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
      `NEXA Cerro Lindo - ${body.periodo || 'Periodo'} - Suministros en Requerimientos`,

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
      `NEXA Cerro Lindo - ${body.periodo || 'Periodo'} - Suministros en Incidentes`,

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
