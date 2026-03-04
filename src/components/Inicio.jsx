import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import logoST from '../assets/logost.png';

/* ── SVG Icons ── */
const IconTicket = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-green-500" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 5H9a2 2 0 00-2 2v2a2 2 0 000 4v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 000-4V7a2 2 0 00-2-2z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v4M10 12h4"/>
  </svg>
);
const IconFingerprint = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-green-500" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.1.9-2 2-2s2 .9 2 2c0 2-2 3-2 5"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9a6 6 0 0112 0c0 5-3 8-3 11"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9a3 3 0 016 0c0 3.5-2.5 5.5-2.5 8.5"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 11a9 9 0 0118 0"/>
  </svg>
);
const IconShapes = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-green-500" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l3.5 6h-7L12 3z" fill="currentColor"/>
    <rect x="13" y="13" width="5" height="5" rx="1" fill="currentColor"/>
    <circle cx="8" cy="16" r="3" fill="currentColor"/>
  </svg>
);
const IconGraduate = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
  </svg>
);
const IconBank = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2L2 7v1h20V7L12 2zM4 10v7H2v2h20v-2h-2v-7h-2v7h-4v-7h-2v7H8v-7H4z"/>
  </svg>
);
const IconQuestion = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
  </svg>
);
const IconMedic = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm3-5h-2v2h-2v-2H9v-2h2V8h2v2h2v2zm-5-9h4v2h-4V3z"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm3 9h-2v2h-2v-2H9v-2h2V7h2v2h2v2z"/>
  </svg>
);
const IconIdCard = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm4-4h8v2h-8z"/>
  </svg>
);
const IconDelete = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: '#4b5563' }}>
    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
  </svg>
);
const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);
const IconBack = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" style={{ color: '#6b7280' }}>
    <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
  </svg>
);

/* ── Component ── */
const Inicio = () => {
  const [turneroIniciado, setTurneroIniciado] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [rut, setRut] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [counters, setCounters] = useState({ cft: 1, ip: 1, consulta: 1, esperas: 1, tens: 1, salud: 1 });
  const [fecha, setFecha] = useState(new Date());

  // Actualizar reloj cada segundo en pantalla de inicio
  useEffect(() => {
    const tick = setInterval(() => setFecha(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  // Reset automático a medianoche
  useEffect(() => {
    const ahora = new Date();
    const manana = new Date(ahora);
    manana.setDate(manana.getDate() + 1);
    manana.setHours(0, 0, 0, 0);
    const msHastaMedianoche = manana - ahora;
    const t = setTimeout(() => {
      setTurneroIniciado(false);
      setAnimating(false);
      setRut('');
      setCurrentUser(null);
      setSelectedService(null);
      setCounters({ cft: 1, ip: 1, consulta: 1, esperas: 1, tens: 1, salud: 1 });
    }, msHastaMedianoche);
    return () => clearTimeout(t);
  }, [turneroIniciado]);

  const handleIniciarTurnero = () => {
    setAnimating(true);
    setTimeout(() => {
      setTurneroIniciado(true);
      setAnimating(false);
    }, 700);
  };

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
      if (i % 3 === 0 && j !== 0) formatted = '.' + formatted;
    }
    return numbers.length > 0 ? `${formatted}-${dv}` : dv;
  };

  const validateRut = (rutString) => {
    if (!rutString) return false;
    const cleanRut = rutString.replace(/[.-]/g, '');
    if (cleanRut.length < 8 || cleanRut.length > 9) return false;
    return /[0-9k]/i.test(cleanRut.slice(-1));
  };

  const handleRutSubmit = () => {
    if (validateRut(rut)) setCurrentUser(rut);
    else alert('Por favor ingresa un RUT válido');
  };

  const generarBoletoPDF = (ticketNumber, rut, servicioNombre) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [80, 100] });
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
    window.open(doc.output('bloburl'), '_blank');
  };

  const generarTurno = (service, subServicio) => {
    const serviceNames = { cft: 'Centro de Formación Técnica', esperas: 'Lista de Espera', consulta: 'Consultas', tens: 'Técnico en Enfermería', salud: 'Área de Salud', ip: 'Instituto Profesional' };
    const letters = { tens: 'A', salud: 'B', cft: 'C', ip: 'D', consulta: 'E', esperas: 'F' };
    const ticketNumber = `${letters[service]}-${counters[service]}`;
    generarBoletoPDF(ticketNumber, currentUser, subServicio || serviceNames[service]);
    setCounters(prev => ({ ...prev, [service]: prev[service] + 1 }));
    setTimeout(() => { setCurrentUser(null); setRut(''); setSelectedService(null); }, 3000);
  };

  const handleServiceSelect = (service) => {
    if (service === 'cft') setSelectedService('cft');
    else generarTurno(service, null);
  };

  const resetSystem = () => { setCurrentUser(null); setRut(''); setSelectedService(null); };

  const diasSemana = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const fechaStr = `${diasSemana[fecha.getDay()]}, ${fecha.getDate()} de ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
  const horaStr = fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  /* ── SCREEN: Splash / Inicio del Turnero ── */
  if (!turneroIniciado) {
    return (
      <div
        className={animating ? 'anim-fade-slide-down' : 'anim-fade-slide-up'}
        style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <img src={logoST} alt="Logo Institución" style={{ height: '110px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.10))' }} />
        </div>

        {/* Título */}
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#14532d', marginBottom: '8px', textAlign: 'center', letterSpacing: '-0.5px' }}>
          Sistema de Turnos
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '48px', textAlign: 'center' }}>
          Tótem de Atención Digital
        </p>

        {/* Fecha y hora */}
        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '16px 32px', marginBottom: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {fechaStr}
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#111827', letterSpacing: '2px', fontVariantNumeric: 'tabular-nums' }}>
            {horaStr}
          </div>
        </div>

        {/* Botón Iniciar */}
        <button
          className="btn-iniciar"
          onClick={handleIniciarTurnero}
          style={{ background: '#22c55e', border: 'none', borderRadius: '20px', padding: '20px 56px', fontSize: '20px', fontWeight: '800', color: '#fff', cursor: 'pointer', letterSpacing: '0.3px' }}
        >
          ▶ Iniciar Turnero
        </button>

        <p style={{ marginTop: '24px', fontSize: '12px', color: '#d1d5db' }}>
          Se restablece automáticamente a las 00:00 h
        </p>
      </div>
    );
  }

  /* ── SCREEN: RUT Entry ── */
  if (!currentUser) {
    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'K', 0, 'DEL'];
    return (
      <div className="anim-fade-slide-up min-h-screen bg-white flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>
        {/* Header */}
        <div className="flex items-center px-5 py-4 border-b border-gray-100">
          <div className="w-8" />
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">Tótem de Ayuda</h1>
          <div className="w-8" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-4">
          {/* Logo */}
          <div className="flex items-center justify-center mb-5">
            <img src={logoST} alt="Logo Institución" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 text-center leading-tight mb-2">
            Sistema de Turnos<br />Digital
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            Por favor, identifícate para solicitar<br />tu atención.
          </p>

          {/* RUT label */}
          <div className="w-full max-w-sm mb-3">
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Ingresa tu RUT</span>
          </div>

          {/* RUT display */}
          <div className="w-full max-w-sm mb-5">
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4">
              <span className={`text-xl font-mono tracking-wider ${rut ? 'text-gray-800' : 'text-gray-300'}`}>
                {rut || '12.345.678-K'}
              </span>
              <IconIdCard />
            </div>
          </div>

          {/* Numeric keyboard */}
          <div className="w-full max-w-sm grid grid-cols-3 gap-3 mb-5">
            {keys.map((key, i) => (
              <button
                key={key}
                className="anim-key"
                style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '0', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: key === 'DEL' ? '14px' : '26px', fontWeight: '600', color: '#1f2937', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', cursor: 'pointer', animationDelay: `${i * 40}ms` }}
                onClick={() => {
                  if (key === 'DEL') {
                    setRut(formatRut(cleanRut.slice(0, -1)));
                  } else if (cleanRut.length < 9) {
                    setRut(formatRut(cleanRut + key.toString().toUpperCase()));
                  }
                }}
              >
                {key === 'DEL' ? <IconDelete /> : key}
              </button>
            ))}
          </div>

          {/* Continue button */}
          <div className="w-full max-w-sm">
            <button
              onClick={handleRutSubmit}
              disabled={!rut}
              style={{ width: '100%', background: '#22c55e', border: 'none', borderRadius: '18px', padding: '18px', fontSize: '18px', fontWeight: '700', color: '#fff', cursor: rut ? 'pointer' : 'not-allowed', opacity: rut ? 1 : 0.5 }}
            >
              Continuar →
            </button>
          </div>

          {/* Help text */}
          <div className="flex items-center gap-1.5 mt-4">
            <IconInfo />
            <span className="text-xs text-gray-400">¿Necesitas ayuda? Solicita asistencia al personal.</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── SCREEN: CFT Subcategories ── */
  if (selectedService === 'cft') {
    const cftItems = [
      { label: 'Técnico en Enfermería', service: 'tens', icon: <IconMedic /> },
      { label: 'Área de Salud', service: 'salud', icon: <IconShield /> },
      { label: 'Carreras', service: 'cft', icon: <IconGraduate /> },
    ];
    return (
      <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>
        {/* Header */}
        <div className="flex items-center px-5 py-4 border-b border-gray-100">
          <div className="w-8" />
          <h1 className="flex-1 text-center text-xs font-bold tracking-widest text-gray-400 uppercase">Kiosko Digital CFT</h1>
          <div className="w-8" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-6">
          <div className="flex items-center justify-center mb-5">
            <img src={logoST} alt="Logo Institución" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 text-center leading-tight mb-3">
            Selecciona un área de CFT
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            Por favor, elige la categoría para obtener tu<br />ticket de atención.
          </p>

          {/* List items */}
          <div className="w-full max-w-sm flex flex-col gap-3 mb-8">
            {cftItems.map((item) => (
              <button
                key={item.service}
                onClick={() => generarTurno(item.service, item.label)}
                style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', width: '100%' }}
              >
                <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <span style={{ flex: 1, textAlign: 'left', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  {item.label}
                </span>
                <IconChevron />
              </button>
            ))}
          </div>

          {/* Volver atrás */}
          <button
            onClick={() => setSelectedService(null)}
            style={{ background: '#f3f4f6', border: 'none', borderRadius: '18px', padding: '16px 32px', fontSize: '15px', fontWeight: '600', color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '384px', justifyContent: 'center' }}
          >
            <IconBack />
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  /* ── SCREEN: Service Selection ── */
  const services = [
    { key: 'cft', label: 'CFT', desc: 'Centro de Formación Técnica', icon: <IconGraduate /> },
    { key: 'ip', label: 'IP', desc: 'Instituto Profesional', icon: <IconBank /> },
    { key: 'consulta', label: 'CONSULTAS', desc: 'Información General', icon: <IconQuestion /> },
    { key: 'esperas', label: 'LISTA DE ESPERA', desc: 'Revisar Turnos Activos', icon: <IconClock /> },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center px-5 py-4 border-b border-gray-100">
        <button
          onClick={resetSystem}
          style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: '#374151' }}
        >
          <IconArrowLeft />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800">Selecciona tu Servicio</h1>
        <div className="w-8" />
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-6">
        {/* User identification */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center justify-center mb-3">
            <img src={logoST} alt="Logo Institución" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Usuario Identificado</span>
          <span className="text-3xl font-extrabold text-gray-900">RUT: {currentUser}</span>
        </div>

        {/* Service buttons */}
        <div className="w-full max-w-sm flex flex-col gap-3 mb-8">
          {services.map((svc) => (
            <button
              key={svc.key}
              onClick={() => handleServiceSelect(svc.key)}
              style={{ background: '#22c55e', border: 'none', borderRadius: '18px', padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', width: '100%', boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}
            >
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#14532d', marginBottom: '2px' }}>{svc.label}</div>
                <div style={{ fontSize: '13px', color: '#166534' }}>{svc.desc}</div>
              </div>
              <div style={{ color: '#14532d' }}>{svc.icon}</div>
            </button>
          ))}
        </div>

        {/* Volver al inicio */}
        <button
          onClick={resetSystem}
          style={{ background: '#f3f4f6', border: 'none', borderRadius: '18px', padding: '16px 32px', fontSize: '15px', fontWeight: '600', color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '384px', justifyContent: 'center' }}
        >
          <IconHome />
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Inicio;