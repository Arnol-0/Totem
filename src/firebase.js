import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove, onValue, runTransaction } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDhyS2VRfJ0Bq8xWeee9Pec1ZufZdCc_CE",
  authDomain: "servicio-totem.firebaseapp.com",
  databaseURL: "https://servicio-totem-default-rtdb.firebaseio.com",
  projectId: "servicio-totem",
  storageBucket: "servicio-totem.firebasestorage.app",
  messagingSenderId: "294955699605",
  appId: "1:294955699605:web:f10f5480b8dc583e7f3a9c",
  measurementId: "G-VTMLWS8QPZ"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// ─── Helpers de fecha ────────────────────────────────────────────────────────

export const fechaHoy = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// ─── Estructura en Firebase RTDB ─────────────────────────────────────────────
//
//  cola/                          ← tickets ACTIVOS del día (se borra a medianoche)
//    cft/
//      contador: 5
//      tickets/
//        1: { numero, rut, letra, ticketCompleto, servicio, hora, timestamp, estado }
//    ip/ ...
//    tens/ ...
//
//  historial/                     ← archivo permanente por fecha (nunca se borra)
//    2026-03-06/
//      cft/
//        tickets/
//          1: { ... }
//    2026-03-07/
//      ...

// ─── Obtener número de ticket (atómico) ──────────────────────────────────────

export const obtenerYIncrementarContador = (servicio) => {
  return new Promise((resolve, reject) => {
    const contadorRef = ref(db, `cola/${servicio}/contador`);
    runTransaction(contadorRef, (actual) => {
      return (actual ?? 0) + 1;
    }).then(({ committed, snapshot }) => {
      if (committed) resolve(snapshot.val());
      else reject(new Error('Transacción no confirmada'));
    }).catch(reject);
  });
};

// ─── Registrar ticket en cola activa Y en historial ──────────────────────────

export const registrarTicket = async (servicio, numero, letra, rut, servicioNombre) => {
  const fecha = fechaHoy();
  const ticketCompleto = `${letra}-${numero}`;

  const datos = {
    numero,
    letra,
    ticketCompleto,   // ej: "C-3"  ← lo que muestra la app de atención
    rut,
    servicio: servicioNombre,
    codigoServicio: servicio,
    fecha,
    hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
    timestamp: Date.now(),
    estado: 'esperando',  // esperando | llamado | atendido | ausente
  };

  // 1. Escribir en cola activa (la lee la app de atención)
  await set(ref(db, `cola/${servicio}/tickets/${numero}`), datos);

  // 2. Escribir en historial permanente (para estadísticas)
  await set(ref(db, `historial/${fecha}/${servicio}/tickets/${numero}`), datos);
};

// ─── Archivar y limpiar cola a medianoche ────────────────────────────────────

export const resetearColaMedianoche = async () => {
  // Simplemente borra la cola activa.
  // El historial ya fue escrito ticket a ticket, no se toca.
  try {
    await remove(ref(db, 'cola'));
    console.log('[Tótem] Cola reseteada a medianoche ✓');
  } catch (err) {
    console.error('[Tótem] Error al resetear cola:', err);
  }
};

export { ref, get, set, remove, onValue, runTransaction };
