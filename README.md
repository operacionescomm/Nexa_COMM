# Motor visual Cerro Lindo

Este repositorio adapta el motor visual usado en Yauricocha para generar las imágenes del informe de **NEXA – Unidad Minera Cerro Lindo**.

## Diapositivas que genera

| Diapositiva | Contenido | Fuente en Google Sheets |
|---|---|---|
| 10 | Atenciones y horas por día | `01_DIA_HORA!A5:C40` |
| 11 | Atenciones por turno Día/Noche y evolución mensual | `02_INC_REQ_TURNO!J6:M9` |
| 12 | Incidentes vs. requerimientos del periodo | `02_INC_REQ_TURNO!J38:K39` |
| 13 | Evolución mensual de incidentes y requerimientos | `02_INC_REQ_TURNO!R54:T90` |
| 14 | Top requerimientos por causa raíz | `03_TOP_REQ_INC!A41:C50` + total `A36:D36` |
| 15 | Top incidentes por causa raíz | `03_TOP_REQ_INC!A96:C105` + total `A91:D91` |
| 16 | No se modifica; es el título de Suministros | Plantilla de Slides |
| 17 | Top suministros general | `04_SUMINISTROS!A51:D60` + total `A46:C46` |
| 18 | Suministros usados en requerimientos | `04_SUMINISTROS!A116:D125` + total `A111:C111` |
| 19 | Suministros usados en incidentes | `04_SUMINISTROS!A181:D190` + total `A176:C176` |

Las diapositivas 1–9 y 20–25 tampoco se modifican.

## Rutas disponibles

- `GET /health`: confirma que el servicio está activo.
- `GET /test-slide10-png` … `GET /test-slide19-png`: muestra imágenes de prueba.
- `POST /render/slide10` … `POST /render/slide19`: recibe JSON y devuelve una imagen PNG.

No existen rutas para las diapositivas 16 ni 20–25 porque se conservan desde la plantilla.

## Despliegue recomendado

1. Crear un repositorio nuevo en GitHub, por ejemplo `nexa-visual-engine`.
2. Subir el contenido de esta carpeta al repositorio nuevo. No reemplazar el repositorio de Yauricocha.
3. En Render, crear un **Web Service** conectado al nuevo repositorio.
4. Configurar:
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Node: versión 20
5. Probar primero `/health` y luego `/test-slide10-png`.

## Resolución

Cada imagen se construye con un lienzo 16:9 de 1600 × 900 px. El servicio captura la imagen con alta resolución para insertarla a página completa en Google Slides.

## Paso posterior

El Apps Script del Google Sheet deberá:

1. Leer el periodo de `05_DASHBOARD_GENERAL!B2`.
2. Leer los rangos indicados en esta tabla.
3. Enviar los payloads a Render.
4. Copiar la plantilla `PLANTILLA_PARA_NEXA`.
5. Insertar cada PNG en las diapositivas 10–15 y 17–19.
6. Guardar la copia en la carpeta `INFORMES NEXA`.


## Versión visual corregida

La versión de prueba quedó configurada con:

- Slides mensuales 10, 12, 17, 18 y 19: abril de 2026.
- Slide 11: acumulado de diciembre de 2025 a abril de 2026.
- Slide 13: siete periodos, de diciembre de 2025 a junio de 2026.
- Slides 14 y 15: acumulado completo de diciembre de 2025 a junio de 2026.
- Títulos simplificados a “CERRO LINDO”.
- Íconos compatibles con Chromium/Render.
- Encabezados de detalle más cortos para evitar desbordes.
