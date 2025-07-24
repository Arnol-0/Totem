import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const Inicio = () => {
  const [rut, setRut] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [counters, setCounters] = useState({
    cft: 1,
    ip: 1,
    consulta: 1,
    esperas: 1,
    tens: 1,
    salud: 1,
    
  });

  const formatRut = (value) => {
    const cleanValue = value.replace(/[^0-9kK]/g, '').toUpperCase();
    if (cleanValue.length === 0) return '';
    const numbers = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1);
    let formatted = '';
    let i = 0;
    for (let j = numbers.length - 1; j >= 0; j--) {
      formatted = numbers[j] + formatted;
      i++;
      if (i % 3 === 0 && j !== 0) {
        formatted = '.' + formatted;
      }
    }
    return numbers.length > 0 ? `${formatted}-${dv}` : dv;
  };

  const validateRut = (rutString) => {
    if (!rutString) return false;
    const cleanRut = rutString.replace(/[.-]/g, '');
    if (cleanRut.length < 8 || cleanRut.length > 9) return false;
    const lastChar = cleanRut.slice(-1).toLowerCase();
    return /[0-9k]/.test(lastChar);
  };

  const handleRutSubmit = () => {
    if (validateRut(rut)) {
      setCurrentUser(rut);
    } else {
      alert('Por favor ingresa un RUT válido');
    }
  };

  const generarBoletoPDF = (ticketNumber, rut, servicioNombre) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 100],
    });

    doc.setFontSize(14);
    doc.text('Tótem de Atención', 40, 10, { align: 'center' });

    doc.setFontSize(36);
    doc.text(ticketNumber, 40, 40, { align: 'center' });

    doc.setDrawColor(0);
    doc.line(10, 45, 70, 45);

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Servicio: ${servicioNombre}`, 10, 55);
    doc.text(`RUT: ${rut}`, 10, 63);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 71);
    doc.text(`Hora: ${new Date().toLocaleTimeString()}`, 10, 79);

    doc.setFontSize(10);
    doc.text('Por favor espere su turno.', 40, 90, { align: 'center' });

    doc.autoPrint();
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank');
  };

  const generarTurno = (service, subServicio) => {
    const serviceNames = {
      cft: 'Centro de Formación Técnica',
      esperas: 'Lista de Espera',
      consulta: 'Consultas',
      tens: 'Técnico en Enfermería',
      salud: 'Área de Salud',
      ip: 'Instituto Profesional',
      
    };

    const letters = { tens: 'A', salud: 'B', cft: 'C' ,ip: 'D',consulta: 'E',esperas: 'F'};
    const currentNumber = counters[service];
    const ticketNumber = `${letters[service]}-${currentNumber}`;
    const servicioFinal = subServicio || serviceNames[service];

    generarBoletoPDF(ticketNumber, currentUser, servicioFinal);

    setCounters(prev => ({
      ...prev,
      [service]: prev[service] + 1
    }));

    setTimeout(() => {
      setCurrentUser(null);
      setRut('');
      setSelectedService(null);
    }, 3000);
  };

  const handleServiceSelect = (service) => {
    if (service === 'cft') {
      setSelectedService('cft');
    } else {
      generarTurno(service, null);
    }
  };

  const resetSystem = () => {
    setCurrentUser(null);
    setRut('');
    setSelectedService(null);
  };

  const tecladoNumerico = (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'K', 0, '←'].map((key) => {
        const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
        return (
          <button
            key={key}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-5xl font-bold py-4 px-6 rounded-xl shadow-lg h-32 flex items-center justify-center"

            onClick={() => {
              if (key === '←') {
                const newCleanRut = cleanRut.slice(0, -1);
                setRut(formatRut(newCleanRut));
              } else {
                if (cleanRut.length < 9) {
                  const newCleanRut = cleanRut + key.toString().toUpperCase();
                  setRut(formatRut(newCleanRut));
                }
              }
            }}
          >
            {key}
          </button>
        );
      })}
    </div>
  );

  if (!currentUser) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Tótem de Ayuda</h1>
            <p className="text-sm text-gray-600">Sistema de Turnos Digital</p>
          </div>
          <label htmlFor="rut" className="block text-sm font-medium text-gray-700 mb-2">Ingresa tu RUT</label>
          <input
            type="text"
            id="rut"
            value={rut}
            readOnly
            placeholder="12.345.678-9"
            className="w-full px-3 py-2 border border-gray-700 text-gray-900 rounded-xl bg-white text-lg text-center font-mono mb-4 shadow"
            maxLength="12"
          />
          {tecladoNumerico}
          <button
            onClick={handleRutSubmit}
            disabled={!rut}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de subcategorías CFT
  if (selectedService === 'cft') {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-xl w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Selecciona un área de CFT</h2>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => generarTurno('tens', 'Técnico en Enfermería')}
              className="bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl shadow text-lg font-semibold"
            >
              Técnico en Enfermería
            </button>
            <button
              onClick={() => generarTurno('salud', 'Área de Salud')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl shadow text-lg font-semibold"
            >
              Área de Salud
            </button>
            <button
              onClick={() => generarTurno('cft', 'Carreras CFT')}
              className="bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl shadow text-lg font-semibold"
            >
              Carreras
            </button>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setSelectedService(null)}
              className="text-sm text-gray-100 underline hover:text-gray-300"
            >
              ← Volver atrás
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de selección de servicio
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-4xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Selecciona tu Servicio</h1>
          <p className="text-sm text-gray-600">RUT: {currentUser}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => handleServiceSelect('cft')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg h-32 flex items-center justify-center text-xl"

          >
            <div className="text-center">
              <div className="text-xl font-bold">CFT</div>
            </div>
          </button>
          <button
            onClick={() => handleServiceSelect('ip')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg h-32 flex items-center justify-center text-xl"

          >
            <div className="text-center">
              <div className="text-xl font-bold">IP</div>
            </div>
          </button>
          <button
            onClick={() => handleServiceSelect('consulta')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg h-32 flex items-center justify-center text-xl"

          >
            <div className="text-center">
              <div className="text-xl font-bold">CONSULTAS</div>
            </div>
          </button>
          <button
            onClick={() => handleServiceSelect('esperas')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg h-32 flex items-center justify-center text-xl"

          >
            <div className="text-center">
              <div className="text-xl font-bold">LISTA DE ESPERA</div>
            </div>
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={resetSystem}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md text-sm"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;