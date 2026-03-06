import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, onValue, runTransaction } from 'firebase/database';

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

// Helpers ─────────────────────────────────────────────────────────────────────

/** Devuelve la fecha de hoy como "YYYY-MM-DD" */
export const fechaHoy = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Obtiene y luego incrementa atómicamente el contador del servicio.
 * Retorna el número de ticket que le corresponde a este cliente.
 *
 * Estructura en RTDB:
 * turnos/
 *   YYYY-MM-DD/
 *     cft/
 *       contador: 5          ← próximo número a emitir
 *       tickets/
 *         1: { rut, hora, estado: "esperando" }
 *         2: { rut, hora, estado: "atendido" }
 *     ip/  ...
 */
export const obtenerYIncrementarContador = async (servicio) => {
  const fecha = fechaHoy();
  const contadorRef = ref(db, `turnos/${fecha}/${servicio}/contador`);

  let numeroAsignado = 1;
  await runTransaction(contadorRef, (actual) => {
    numeroAsignado = (actual ?? 0) + 1;
    return numeroAsignado;
  });
  return numeroAsignado;
};

/**
 * Registra el ticket en Firebase.
 * estado puede ser: "esperando" | "llamado" | "atendido" | "ausente"
 */
export const registrarTicket = async (servicio, numero, rut, servicioNombre) => {
  const fecha = fechaHoy();
  const ticketRef = ref(db, `turnos/${fecha}/${servicio}/tickets/${numero}`);
  await set(ticketRef, {
    numero,
    rut,
    servicio: servicioNombre,
    hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
    timestamp: Date.now(),
    estado: 'esperando',
  });
};

export { ref, get, set, onValue, runTransaction };
