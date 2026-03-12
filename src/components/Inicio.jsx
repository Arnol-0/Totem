import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import logoST from '../assets/logost.png';
import { obtenerYIncrementarContador, registrarTicket, resetearColaMedianoche } from '../firebase.js';

/* ── SVG Icons ── */
const IconGraduate = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
  </svg>
);
const IconBank = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
    <path d="M12 2L2 7v1h20V7L12 2zM4 10v7H2v2h20v-2h-2v-7h-2v7h-4v-7h-2v7H8v-7H4z"/>
  </svg>
);
const IconQuestion = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 md:w-6 md:h-6 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 md:w-7 md:h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
  </svg>
);
const IconMedic = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm3-5h-2v2h-2v-2H9v-2h2V8h2v2h2v2zm-5-9h4v2h-4V3z"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm3 9h-2v2h-2v-2H9v-2h2V7h2v2h2v2z"/>
  </svg>
);
const IconIdCard = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7 text-green-500">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm4-4h8v2h-8z"/>
  </svg>
);
const IconDelete = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#4b5563' }}>
    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
  </svg>
);
const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-gray-400">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);
const IconBack = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#6b7280' }}>
    <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
  </svg>
);

/* ── Component ── */
const Inicio = () => {
  const [turneroIniciado, setTurneroIniciado] = useState(false);
  const [animating, setAnimating]             = useState(false);
  const [rut, setRut]                         = useState('');
  const [currentUser, setCurrentUser]         = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [generando, setGenerando]             = useState(false);
  const [fecha, setFecha]                     = useState(new Date());

  // Reloj en vivo
  useEffect(() => {
    const t = setInterval(() => setFecha(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Reset automático a medianoche
  useEffect(() => {
    const ahora    = new Date();
    const manana   = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1, 0, 0, 5);
    const msHasta  = manana - ahora;
    const timer    = setTimeout(async () => {
      await resetearColaMedianoche();
      setTurneroIniciado(false);
      setAnimating(false);
      setCurrentUser(null);
      setRut('');
      setSelectedService(null);
    }, msHasta);
    return () => clearTimeout(timer);
  }, []);

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

  const generarTurno = async (service, subServicio) => {
    const serviceNames = { cft: 'Centro de Formación Técnica', esperas: 'Lista de Espera', consulta: 'Consultas', tens: 'Técnico en Enfermería', salud: 'Área de Salud', ip: 'Instituto Profesional' };
    const letters      = { tens: 'A', salud: 'B', cft: 'C', ip: 'D', consulta: 'E', esperas: 'F' };
    const servicioNombre = subServicio || serviceNames[service];
    const letra          = letters[service];

    setGenerando(true);
    try {
      const numero      = await obtenerYIncrementarContador(service);
      const ticketNumber = `${letra}-${numero}`;
      await registrarTicket(service, numero, letra, currentUser, servicioNombre);
      generarBoletoPDF(ticketNumber, currentUser, servicioNombre);
    } catch (err) {
      console.error('Error generando turno:', err);
      alert('Error al conectar con el servidor. Intenta nuevamente.');
    } finally {
      setGenerando(false);
    }
    setTimeout(() => { setCurrentUser(null); setRut(''); setSelectedService(null); }, 3000);
  };

  const handleServiceSelect = (service) => {
    if (service === 'cft') setSelectedService('cft');
    else generarTurno(service, null);
  };

  const resetSystem = () => { setCurrentUser(null); setRut(''); setSelectedService(null); };

  const handleIniciarTurnero = () => {
    setAnimating(true);
    setTimeout(() => { setTurneroIniciado(true); setAnimating(false); }, 700);
  };

  /* ─────────────────────────────────────────────
     SCREEN: Splash
  ───────────────────────────────────────────── */
  if (!turneroIniciado) {
    const hora    = fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const diaSem  = fecha.toLocaleDateString('es-CL', { weekday: 'long' });
    const diaFull = fecha.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
    return (
      <div
        className={animating ? 'anim-fade-slide-down' : 'anim-fade-slide-up'}
        style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}
      >
        {/* Logo */}
        <div className="anim-pop-in" style={{ animationDelay: '0.1s', marginBottom: '28px' }}>
          <img src={logoST} alt="Logo" className="h-24 md:h-40 w-auto object-contain" />
        </div>

        {/* Título */}
        <div className="anim-pop-in" style={{ animationDelay: '0.2s', textAlign: 'center', marginBottom: '36px' }}>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900" style={{ margin: 0, letterSpacing: '-0.5px' }}>
            Tótem de Turnos
          </h1>
          <p className="text-sm md:text-xl text-gray-500 mt-2 md:mt-3">
            Sistema de atención digital
          </p>
        </div>

        {/* Reloj */}
        <div className="anim-pop-in" style={{ animationDelay: '0.3s', textAlign: 'center', marginBottom: '48px' }}>
          <div className="font-bold text-gray-900" style={{ fontSize: 'clamp(52px, 10vw, 96px)', letterSpacing: '2px', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            {hora}
          </div>
          <div className="text-gray-500 mt-3 capitalize" style={{ fontSize: 'clamp(14px, 2.5vw, 22px)' }}>
            {diaSem}, {diaFull}
          </div>
        </div>

        {/* Botón iniciar */}
        <div className="anim-pop-in w-full" style={{ animationDelay: '0.4s', maxWidth: 'min(420px, 88vw)' }}>
          <button
            className="btn-iniciar w-full"
            onClick={handleIniciarTurnero}
            style={{ background: '#22c55e', border: 'none', borderRadius: '20px', padding: 'clamp(18px, 3vw, 28px)', fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: '800', color: '#fff', cursor: 'pointer', letterSpacing: '0.5px' }}
          >
            ▶ Iniciar Turnero
          </button>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     SCREEN: RUT Entry
  ───────────────────────────────────────────── */
  if (!currentUser) {
    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    const keys     = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'K', 0, 'DEL'];
    return (
      <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>
        {/* Header */}
        <div className="flex items-center px-5 md:px-10 py-4 md:py-6 border-b border-gray-100">
          <div className="w-8" />
          <h1 className="flex-1 text-center text-lg md:text-2xl font-semibold text-gray-800">Tótem de Ayuda</h1>
          <div className="w-8" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center px-6 md:px-16 pt-8 md:pt-12 pb-4">
          {/* Logo */}
          <img src={logoST} alt="Logo" className="h-20 md:h-32 w-auto object-contain mb-5 md:mb-8" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center leading-tight mb-2 md:mb-4">
            Sistema de Turnos<br />Digital
          </h2>
          <p className="text-gray-400 text-sm md:text-lg text-center mb-8 md:mb-10">
            Por favor, identifícate para solicitar tu atención.
          </p>

          {/* RUT label */}
          <div className="w-full mb-3" style={{ maxWidth: 'min(480px, 88vw)' }}>
            <span className="text-xs md:text-sm font-bold tracking-widest text-gray-500 uppercase">Ingresa tu RUT</span>
          </div>

          {/* RUT display */}
          <div className="w-full mb-5 md:mb-6" style={{ maxWidth: 'min(480px, 88vw)' }}>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-5 md:px-7 py-4 md:py-5">
              <span className={`font-mono tracking-wider text-xl md:text-3xl ${rut ? 'text-gray-800' : 'text-gray-300'}`}>
                {rut || '12.345.678-K'}
              </span>
              <IconIdCard />
            </div>
          </div>

          {/* Numeric keyboard */}
          <div className="w-full grid grid-cols-3 gap-3 md:gap-4 mb-5 md:mb-6" style={{ maxWidth: 'min(480px, 88vw)' }}>
            {keys.map((key, i) => (
              <button
                key={key}
                className="anim-key"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  height: 'clamp(68px, 10vw, 100px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: key === 'DEL' ? '14px' : 'clamp(24px, 4vw, 36px)',
                  fontWeight: '600',
                  color: '#1f2937',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  animationDelay: `${i * 40}ms`,
                }}
                onClick={() => {
                  if (key === 'DEL') setRut(formatRut(cleanRut.slice(0, -1)));
                  else if (cleanRut.length < 9) setRut(formatRut(cleanRut + key.toString().toUpperCase()));
                }}
              >
                {key === 'DEL' ? <IconDelete /> : key}
              </button>
            ))}
          </div>

          {/* Continue button */}
          <div className="w-full mb-3" style={{ maxWidth: 'min(480px, 88vw)' }}>
            <button
              onClick={handleRutSubmit}
              disabled={!rut}
              style={{
                width: '100%',
                background: '#22c55e',
                border: 'none',
                borderRadius: '18px',
                padding: 'clamp(16px, 2.5vw, 24px)',
                fontSize: 'clamp(16px, 2.5vw, 22px)',
                fontWeight: '700',
                color: '#fff',
                cursor: rut ? 'pointer' : 'not-allowed',
                opacity: rut ? 1 : 0.5,
              }}
            >
              Continuar →
            </button>
          </div>

          {/* Help text */}
          <div className="flex items-center gap-1.5 mt-2">
            <IconInfo />
            <span className="text-xs md:text-sm text-gray-400">¿Necesitas ayuda? Solicita asistencia al personal.</span>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     SCREEN: CFT Subcategories
  ───────────────────────────────────────────── */
  if (selectedService === 'cft') {
    const cftItems = [
      { label: 'Técnico en Enfermería', service: 'tens', icon: <IconMedic /> },
      { label: 'Área de Salud',         service: 'salud', icon: <IconShield /> },
      { label: 'Carreras',              service: 'cft',   icon: <IconGraduate /> },
    ];
    return (
      <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>
        {/* Header */}
        <div className="flex items-center px-5 md:px-10 py-4 md:py-6 border-b border-gray-100">
          <div className="w-8" />
          <h1 className="flex-1 text-center text-xs md:text-base font-bold tracking-widest text-gray-400 uppercase">Kiosko Digital CFT</h1>
          <div className="w-8" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center px-6 md:px-16 pt-8 md:pt-12 pb-6">
          <img src={logoST} alt="Logo" className="h-20 md:h-32 w-auto object-contain mb-5 md:mb-8" />

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center leading-tight mb-3 md:mb-5">
            Selecciona un área de CFT
          </h2>
          <p className="text-gray-400 text-sm md:text-lg text-center mb-8 md:mb-10">
            Elige la categoría para obtener tu ticket de atención.
          </p>

          {/* List items */}
          <div className="w-full flex flex-col gap-3 md:gap-4 mb-8" style={{ maxWidth: 'min(520px, 88vw)' }}>
            {cftItems.map((item) => (
              <button
                key={item.service}
                onClick={() => generarTurno(item.service, item.label)}
                disabled={generando}
                style={{
                  background: '#fff',
                  border: '1px solid #f3f4f6',
                  borderRadius: '16px',
                  padding: 'clamp(16px, 2.5vw, 26px) 20px',
                  display: 'flex', alignItems: 'center', gap: '14px',
                  cursor: generando ? 'not-allowed' : 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  width: '100%',
                  opacity: generando ? 0.6 : 1,
                }}
              >
                <div style={{ width: 'clamp(40px,6vw,56px)', height: 'clamp(40px,6vw,56px)', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <span style={{ flex: 1, textAlign: 'left', fontSize: 'clamp(15px, 2.5vw, 22px)', fontWeight: '600', color: '#1f2937' }}>
                  {item.label}
                </span>
                <IconChevron />
              </button>
            ))}
          </div>

          {/* Volver atrás */}
          <button
            onClick={() => setSelectedService(null)}
            style={{ background: '#f3f4f6', border: 'none', borderRadius: '18px', padding: 'clamp(14px,2vw,22px) 32px', fontSize: 'clamp(14px,2vw,20px)', fontWeight: '600', color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: 'min(520px, 88vw)', justifyContent: 'center' }}
          >
            <IconBack />
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     SCREEN: Service Selection
  ───────────────────────────────────────────── */
  const services = [
    { key: 'cft',      label: 'CFT',             desc: 'Centro de Formación Técnica', icon: <IconGraduate /> },
    { key: 'ip',       label: 'IP',              desc: 'Instituto Profesional',       icon: <IconBank /> },
    { key: 'consulta', label: 'CONSULTAS',       desc: 'Información General',         icon: <IconQuestion /> },
    { key: 'esperas',  label: 'LISTA DE ESPERA', desc: 'Revisar Turnos Activos',      icon: <IconClock /> },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center px-5 md:px-10 py-4 md:py-6 border-b border-gray-100">
        <button
          onClick={resetSystem}
          style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: '#374151' }}
        >
          <IconArrowLeft />
        </button>
        <h1 className="flex-1 text-center text-lg md:text-2xl font-bold text-gray-800">Selecciona tu Servicio</h1>
        <div className="w-8" />
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center px-6 md:px-16 pt-8 md:pt-12 pb-6">
        {/* User identification */}
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <img src={logoST} alt="Logo" className="h-20 md:h-32 w-auto object-contain mb-3 md:mb-5" />
          <span className="text-xs md:text-sm font-bold tracking-widest text-gray-400 uppercase mb-1">Usuario Identificado</span>
          <span className="text-3xl md:text-5xl font-extrabold text-gray-900">RUT: {currentUser}</span>
        </div>

        {/* Service buttons */}
        <div className="w-full flex flex-col gap-3 md:gap-4 mb-8" style={{ maxWidth: 'min(520px, 88vw)' }}>
          {services.map((svc) => (
            <button
              key={svc.key}
              onClick={() => handleServiceSelect(svc.key)}
              disabled={generando}
              style={{
                background: '#22c55e',
                border: 'none',
                borderRadius: '18px',
                padding: 'clamp(18px, 2.5vw, 28px) 22px',
                display: 'flex', alignItems: 'center', gap: '14px',
                cursor: generando ? 'not-allowed' : 'pointer',
                width: '100%',
                boxShadow: '0 4px 14px rgba(34,197,94,0.3)',
                opacity: generando ? 0.6 : 1,
              }}
            >
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 'clamp(15px, 2.5vw, 22px)', fontWeight: '800', color: '#14532d', marginBottom: '2px' }}>{svc.label}</div>
                <div style={{ fontSize: 'clamp(12px, 1.8vw, 18px)', color: '#166534' }}>{svc.desc}</div>
              </div>
              <div style={{ color: '#14532d' }}>{svc.icon}</div>
            </button>
          ))}
        </div>

        {/* Volver al inicio */}
        <button
          onClick={resetSystem}
          style={{ background: '#f3f4f6', border: 'none', borderRadius: '18px', padding: 'clamp(14px,2vw,22px) 32px', fontSize: 'clamp(14px,2vw,20px)', fontWeight: '600', color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: 'min(520px, 88vw)', justifyContent: 'center' }}
        >
          <IconHome />
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Inicio;