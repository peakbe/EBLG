// public/js/runways.js

export const RUNWAYS = {
    "22": {
        id: "22",
        heading: 220,
        start: [50.64834, 5.46639],
        end:   [50.64186, 5.44028]
    },
    "04": {
        id: "04",
        heading: 40,
        start: [50.64186, 5.44028],
        end:   [50.64834, 5.46639]
    }
};

export function getRunwayFromWind(windDir) {
    if (windDir == null) return "22";
    const d22 = Math.abs(windDir - RUNWAYS["22"].heading);
    const d04 = Math.abs(windDir - RUNWAYS["04"].heading);
    const n22 = Math.min(d22, 360 - d22);
    const n04 = Math.min(d04, 360 - d04);
    return n22 < n04 ? "22" : "04";
}

export function drawRunway(runwayId, layer) {
    if (!layer || !window.L) return;
    layer.clearLayers();

    const rw = RUNWAYS[runwayId];
    if (!rw) return;

    window.L.polyline([rw.start, rw.end], {
        color: "#00ff9c",
        weight: 4
    }).addTo(layer);
}

export function drawCorridor(runwayId, layer) {
    if (!layer || !window.L) return;
    layer.clearLayers();

    const rw = RUNWAYS[runwayId];
    if (!rw) return;

    const offset = 0.01;
    const p1 = [rw.start[0] + offset, rw.start[1] - offset];
    const p2 = [rw.end[0] + offset, rw.end[1] - offset];
    const p3 = [rw.end[0] - offset, rw.end[1] + offset];
    const p4 = [rw.start[0] - offset, rw.start[1] + offset];

    window.L.polygon([p1, p2, p3, p4], {
        color: "#00ff9c",
        weight: 1,
        fillColor: "#00ff9c",
        fillOpacity: 0.1
    }).addTo(layer);
}

export function updateRunwayPanel(runway, windDir, windSpeed, crosswind = 0) {
    const el = document.getElementById("runway-active");
    if (!el) return;
    el.innerHTML = `
        <b>Piste active :</b> ${runway}<br>
        Vent : ${windDir ?? "—"}° / ${windSpeed ?? "—"} kt<br>
        Crosswind : ${crosswind.toFixed(1)} kt
    `;
}
