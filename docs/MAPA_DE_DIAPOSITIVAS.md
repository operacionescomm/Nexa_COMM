# Mapa de diapositivas y datos — NEXA Cerro Lindo

## Alcance de la automatización

La plantilla tiene 25 diapositivas. El motor visual solo genera imágenes para las diapositivas **10–15 y 17–19**. Las diapositivas 1–9, 16 y 20–25 se conservan exactamente como están en la plantilla.

## Mapeo detallado

### Diapositiva 10 — Atenciones y horas diarias
- Fuente: `01_DIA_HORA!A5:C40`
- Columnas: fecha, cantidad de atenciones y horas.
- Visual: seis KPI, gráfico diario combinado y bloque de insights.
- Título dinámico: `ATENCIONES EN LA OPERACIÓN NEXA CERRO LINDO - [PERIODO]`.

### Diapositiva 11 — Atenciones por turno
- Fuente: `02_INC_REQ_TURNO!J6:M9`
- Columnas: periodo, turno Día, turno Noche y total.
- Visual: evolución mensual total, comparación Día/Noche, KPI y tabla resumen.
- Cambio frente a Yauricocha: se reemplazó la lógica Mina/Superficie por Día/Noche.

### Diapositiva 12 — Incidentes vs. requerimientos
- Fuente: `02_INC_REQ_TURNO!J38:K39`
- Filas: Requerimiento e Incidente.
- Visual: KPI, gráfico de participación y tabla resumen de Cerro Lindo.

### Diapositiva 13 — Evolución mensual de incidentes y requerimientos
- Fuente: `02_INC_REQ_TURNO!R54:T90`
- Columnas: periodo, incidentes y requerimientos.
- Visual: evolución mensual, participación acumulada y promedio mensual.

### Diapositiva 14 — Top requerimientos por causa raíz
- Detalle: `03_TOP_REQ_INC!A41:C50`
- Total: `03_TOP_REQ_INC!A36:D36`
- Columnas: causa raíz, cantidad y horas.
- Visual: Pareto, tabla Top y KPI.

### Diapositiva 15 — Top incidentes por causa raíz
- Detalle: `03_TOP_REQ_INC!A96:C105`
- Total: `03_TOP_REQ_INC!A91:D91`
- Columnas: causa raíz, cantidad y horas.
- Visual: Pareto, tabla Top y KPI.

### Diapositiva 16 — Título de Suministros
- No se genera imagen.
- Se conserva el título existente de la plantilla.

### Diapositiva 17 — Suministros general
- Detalle: `04_SUMINISTROS!A51:D60`
- Total: `04_SUMINISTROS!A46:C46`
- Columnas: suministro, cantidad, porcentaje y unidad.
- Visual: Pareto general, tabla Top y KPI.

### Diapositiva 18 — Suministros en requerimientos
- Detalle: `04_SUMINISTROS!A116:D125`
- Total: `04_SUMINISTROS!A111:C111`
- Columnas: suministro, cantidad, porcentaje y unidad.

### Diapositiva 19 — Suministros en incidentes
- Detalle: `04_SUMINISTROS!A181:D190`
- Total: `04_SUMINISTROS!A176:C176`
- Columnas: suministro, cantidad, porcentaje y unidad.

## Formato visual

Los archivos EJS y CSS conservan la misma composición del proyecto original: lienzo 16:9, encabezados, tamaños de letra, colores corporativos, tarjetas KPI, tablas, gráficos y bloques de insights. Solo se cambiaron los nombres, los datos de prueba y la semántica requerida por NEXA.
