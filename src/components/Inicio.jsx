import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import logoST from '../assets/logost.png';
import { obtenerYIncrementarContador, registrarTicket, resetearColaMedianoche } from '../firebase.js';
/* 
   ICONOS SVG
 */
const IconGraduate = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
  </svg>
);
const IconBank = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
    <path d="M12 2L2 7v1h20V7L12 2zM4 10v7H2v2h20v-2h-2v-7h-2v7h-4v-7h-2v7H8v-7H4z"/>
  </svg>
);
const IconQuestion = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-400 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 md:w-6 md:h-6">
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
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm4-4h8v2h-8z"/>
  </svg>
);
const IconDelete = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7 text-gray-500">
    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
  </svg>
);
const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

/* 
   COMPONENTE PRINCIPAL
 */
const Inicio = () => {
  const [turneroIniciado, setTurneroIniciado] = useState(false);
  const [animating, setAnimating]             = useState(false);
  const [rut, setRut]                         = useState('');
  const [currentUser, setCurrentUser]         = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [generando, setGenerando]             = useState(false);
  const [fecha, setFecha]                     = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setFecha(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ahora   = new Date();
    const manana  = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1, 0, 0, 5);
    const msHasta = manana - ahora;
    const timer   = setTimeout(async () => {
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
    const clean = value.replace(/[^0-9kK]/g, '').toUpperCase();
    if (!clean.length) return '';
    const nums = clean.slice(0, -1);
    const dv   = clean.slice(-1);
    let fmt = '';
    let i   = 0;
    for (let j = nums.length - 1; j >= 0; j--) {
      fmt = nums[j] + fmt;
      i++;
      if (i % 3 === 0 && j !== 0) fmt = '.' + fmt;
    }
    return nums.length > 0 ? `${fmt}-${dv}` : dv;
  };

  const validateRut = (r) => {
    if (!r) return false;
    const clean = r.replace(/[.-]/g, '');
    return clean.length >= 8 && clean.length <= 9 && /[0-9k]/i.test(clean.slice(-1));
  };

  const handleRutSubmit = () => {
    if (validateRut(rut)) setCurrentUser(rut);
    else alert('Por favor ingresa un RUT valido');
  };

  const handleServiceSelect = (service) => {
    if (service === 'cft') setSelectedService('cft');
    else generarTurno(service, null);
  };

  const resetSystem = () => {
    setCurrentUser(null);
    setRut('');
    setSelectedService(null);
  };

  const handleIniciarTurnero = () => {
    setAnimating(true);
    setTimeout(() => { setTurneroIniciado(true); setAnimating(false); }, 700);
  };

  const generarBoletoPDF = (ticketNumber, rutUsuario, servicioNombre) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [80, 100] });
    doc.setFontSize(14);
    doc.text('Totem de Atencion', 40, 10, { align: 'center' });
    doc.setFontSize(36);
    doc.text(ticketNumber, 40, 40, { align: 'center' });
    doc.setDrawColor(0);
    doc.line(10, 45, 70, 45);
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Servicio: ${servicioNombre}`, 10, 55);
    doc.text(`RUT: ${rutUsuario}`, 10, 63);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CL')}`, 10, 71);
    doc.text(`Hora:  ${new Date().toLocaleTimeString('es-CL', { hour12: false })}`, 10, 79);
    doc.setFontSize(10);
    doc.text('Por favor espere su turno.', 40, 90, { align: 'center' });
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  };

  const generarTurno = async (service, subServicio) => {
    const serviceNames = {
      cft: 'Centro de Formacion Tecnica',
      esperas: 'Lista de Espera',
      consulta: 'Consultas',
      tens: 'Tecnico en Enfermeria',
      salud: 'Area de Salud',
      ip: 'Instituto Profesional',
    };
    const letters = { tens: 'A', salud: 'B', cft: 'C', ip: 'D', consulta: 'E', esperas: 'F' };
    const servicioNombre = subServicio || serviceNames[service];
    const letra          = letters[service];

    setGenerando(true);
    try {
      const numero       = await obtenerYIncrementarContador(service);
      const ticketNumber = `${letra}-${numero}`;
      await registrarTicket(service, numero, letra, currentUser, servicioNombre);
      generarBoletoPDF(ticketNumber, currentUser, servicioNombre);
    } catch (err) {
      console.error('Error generando turno:', err);
      alert('Error al conectar con el servidor. Intenta nuevamente.');
    } finally {
      setGenerando(false);
    }
    setTimeout(resetSystem, 3000);
  };

  /* PANTALLA: Splash */
  if (!turneroIniciado) {
    const hora    = fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const diaSem  = fecha.toLocaleDateString('es-CL', { weekday: 'long' });
    const diaFull = fecha.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
      <div
        className={animating ? 'anim-fade-down' : 'anim-fade-up'}
        style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 5vw, 48px) 24px' }}
      >
        <div className="anim-pop-in logo-float" style={{ animationDelay: '0.1s', marginBottom: 'clamp(20px, 4vw, 36px)' }}>
          <img src={logoST} alt="Logo ST" style={{ height: 'clamp(80px, 14vw, 140px)', width: 'auto', objectFit: 'contain' }} />
        </div>

        <div className="anim-pop-in" style={{ animationDelay: '0.2s', textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 44px)' }}>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', margin: 0 }}>
            Totem de Turnos
          </h1>
          <p style={{ fontSize: 'clamp(13px, 2vw, 20px)', color: '#9ca3af', marginTop: '8px' }}>
            Sistema de atencion digital
          </p>
        </div>

        <div className="anim-pop-in" style={{ animationDelay: '0.3s', textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 56px)' }}>
          <div style={{ fontSize: 'clamp(52px, 11vw, 100px)', fontWeight: 800, color: '#111827', letterSpacing: '2px', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            {hora}
          </div>
          <div style={{ fontSize: 'clamp(13px, 2.2vw, 20px)', color: '#9ca3af', marginTop: '10px', textTransform: 'capitalize' }}>
            {diaSem}, {diaFull}
          </div>
        </div>

        <div className="anim-pop-in" style={{ animationDelay: '0.4s', width: '100%', maxWidth: 'min(420px, 88vw)' }}>
          <button
            className="btn-iniciar"
            onClick={handleIniciarTurnero}
            style={{ width: '100%', background: '#22c55e', border: 'none', borderRadius: '20px', padding: 'clamp(18px, 3vw, 28px)', fontSize: 'clamp(17px, 2.8vw, 26px)', fontWeight: 800, color: '#fff', letterSpacing: '0.3px' }}
          >
            INICIAR TURNERO
          </button>
        </div>
      </div>
    );
  }

  /* PANTALLA: Ingreso RUT */
  if (!currentUser) {
    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    const keys     = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'K', 0, 'DEL'];

    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center px-5 md:px-10 py-4 md:py-5 border-b border-gray-100">
          <div className="w-8" />
          <h1 className="flex-1 text-center text-base md:text-xl font-semibold text-gray-700">
            Tótem de Ayuda
          </h1>
          <div className="w-8" />
        </div>

        {/* Body centrado */}
        <div className="flex-1 flex flex-col items-center px-6 md:px-16 pt-6 md:pt-10 pb-5">

          {/* Logo */}
          <img src={logoST} alt="Logo ST" className="h-16 md:h-28 w-auto object-contain mb-4 md:mb-7" />

          {/* Título */}
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 44px)', fontWeight: 800, color: '#111827', textAlign: 'center', lineHeight: 1.15, marginBottom: '8px' }}>
            Sistema de Turnos<br />Digital
          </h2>
          <p style={{ fontSize: 'clamp(13px, 2vw, 16px)', color: '#9ca3af', textAlign: 'center', marginBottom: 'clamp(20px, 3.5vw, 36px)' }}>
            Por favor, identifícate para solicitar tu atención.
          </p>

          {/* Etiqueta */}
          <div style={{ width: '100%', maxWidth: 'min(480px, 88vw)', marginBottom: '8px' }}>
            <span style={{ fontSize: 'clamp(10px, 1.4vw, 12px)', fontWeight: 700, letterSpacing: '0.12em', color: '#6b7280', textTransform: 'uppercase' }}>
              Ingresa tu RUT
            </span>
          </div>

          {/* Display RUT */}
          <div style={{ width: '100%', maxWidth: 'min(480px, 88vw)', marginBottom: 'clamp(14px, 2.5vw, 22px)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '14px',
              padding: 'clamp(16px, 3vw, 24px) clamp(18px, 3.5vw, 28px)',
            }}>
              <span style={{ fontFamily: 'monospace', fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700, letterSpacing: '0.05em', color: rut ? '#1f2937' : '#9ca3af' }}>
                {rut || '12.345.678-K'}
              </span>
              <IconIdCard />
            </div>
          </div>

          {/* Teclado */}
          <div style={{ width: '100%', maxWidth: 'min(480px, 88vw)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(8px, 1.5vw, 14px)', marginBottom: 'clamp(14px, 2.5vw, 22px)' }}>
            {keys.map((key, i) => (
              <button
                key={key}
                className="anim-key"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  height: 'clamp(60px, 8.5vw, 96px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: key === 'DEL' ? '13px' : 'clamp(22px, 3.8vw, 34px)',
                  fontWeight: 600,
                  color: '#1f2937',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  animationDelay: `${i * 35}ms`,
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

          {/* Botón continuar */}
          <div style={{ width: '100%', maxWidth: 'min(480px, 88vw)', marginBottom: '10px' }}>
            <button
              className="btn-continuar"
              onClick={handleRutSubmit}
              disabled={!rut}
              style={{
                width: '100%',
                background: '#22c55e',
                border: 'none',
                borderRadius: '18px',
                padding: 'clamp(15px, 2.5vw, 22px)',
                fontSize: 'clamp(15px, 2.2vw, 20px)',
                fontWeight: 700,
                color: '#fff',
                opacity: rut ? 1 : 0.45,
                cursor: rut ? 'pointer' : 'not-allowed',
              }}
            >
              Continuar →
            </button>
          </div>

          {/* Ayuda */}
          <div className="flex items-center gap-1.5 mt-1">
            <IconInfo />
            <span style={{ fontSize: 'clamp(11px, 1.6vw, 13px)', color: '#9ca3af' }}>
              ¿Necesitas ayuda? Solicita asistencia al personal.
            </span>
          </div>

        </div>
      </div>
    );
  }

  /* PANTALLA: Subcategorias CFT */
  if (selectedService === 'cft') {
    const cftItems = [
      { label: 'Tecnico en Enfermeria', service: 'tens',  icon: <IconMedic /> },
      { label: 'Area de Salud',         service: 'salud', icon: <IconShield /> },
      { label: 'Carreras',              service: 'cft',   icon: <IconGraduate /> },
    ];

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center px-5 md:px-10 py-4 md:py-5 border-b border-gray-100">
          <div className="w-8" />
          <h1 className="flex-1 text-center font-bold tracking-widest text-gray-400 uppercase" style={{ fontSize: 'clamp(10px, 1.5vw, 14px)' }}>
            Kiosko Digital CFT
          </h1>
          <div className="w-8" />
        </div>

        <div className="flex-1 flex flex-col items-center px-6 md:px-16 pt-8 md:pt-10 pb-8">
          <img src={logoST} alt="Logo ST" className="h-16 md:h-28 w-auto object-contain mb-5 md:mb-7" />

          <h2 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, color: '#111827', textAlign: 'center', lineHeight: 1.2, marginBottom: '10px' }}>
            Selecciona un area de CFT
          </h2>
          <p style={{ fontSize: 'clamp(13px, 2vw, 17px)', color: '#9ca3af', textAlign: 'center', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
            Elige la categoria para obtener tu ticket.
          </p>

          <div style={{ width: '100%', maxWidth: 'min(500px, 88vw)', display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.8vw, 16px)', marginBottom: 'clamp(20px, 3.5vw, 32px)' }}>
            {cftItems.map((item) => (
              <button
                key={item.service}
                className="btn-list"
                onClick={() => generarTurno(item.service, item.label)}
                disabled={generando}
                style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: 'clamp(14px, 2.2vw, 22px) 18px', display: 'flex', alignItems: 'center', gap: '14px', width: '100%', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', opacity: generando ? 0.55 : 1, cursor: generando ? 'not-allowed' : 'pointer', textAlign: 'left' }}
              >
                <div style={{ width: 'clamp(40px, 6vw, 52px)', height: 'clamp(40px, 6vw, 52px)', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <span style={{ flex: 1, fontSize: 'clamp(14px, 2.2vw, 20px)', fontWeight: 600, color: '#1f2937' }}>
                  {item.label}
                </span>
                <IconChevron />
              </button>
            ))}
          </div>

          <button
            className="btn-back"
            onClick={() => setSelectedService(null)}
            style={{ width: '100%', maxWidth: 'min(500px, 88vw)', background: '#f3f4f6', border: 'none', borderRadius: '18px', padding: 'clamp(13px, 2vw, 20px)', fontSize: 'clamp(13px, 2vw, 18px)', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            Volver atras
          </button>
        </div>
      </div>
    );
  }

  /* PANTALLA: Seleccion de Servicio */
  const services = [
    { key: 'cft',      label: 'CFT',             desc: 'Centro de Formacion Tecnica', icon: <IconGraduate /> },
    { key: 'ip',       label: 'IP',              desc: 'Instituto Profesional',       icon: <IconBank /> },
    { key: 'consulta', label: 'CONSULTAS',       desc: 'Informacion General',         icon: <IconQuestion /> },
    { key: 'esperas',  label: 'LISTA DE ESPERA', desc: 'Revisar Turnos Activos',      icon: <IconClock /> },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center px-5 md:px-10 py-4 md:py-5 border-b border-gray-100">
        <button
          onClick={resetSystem}
          style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: '#374151', display: 'flex', alignItems: 'center' }}
        >
          <IconArrowLeft />
        </button>
        <h1 className="flex-1 text-center font-bold text-gray-800" style={{ fontSize: 'clamp(15px, 2.5vw, 22px)' }}>
          Selecciona tu Servicio
        </h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex flex-col items-center px-6 md:px-16 pt-8 md:pt-10 pb-8">
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <img src={logoST} alt="Logo ST" className="h-16 md:h-28 w-auto object-contain mb-3 md:mb-4" />
          <span style={{ fontSize: 'clamp(10px, 1.4vw, 13px)', fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>
            Usuario Identificado
          </span>
          <span style={{ fontSize: 'clamp(24px, 4.5vw, 44px)', fontWeight: 800, color: '#111827' }}>
            RUT: {currentUser}
          </span>
        </div>

        <div style={{ width: '100%', maxWidth: 'min(500px, 88vw)', display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.8vw, 16px)', marginBottom: 'clamp(20px, 3.5vw, 32px)' }}>
          {services.map((svc) => (
            <button
              key={svc.key}
              className="btn-service"
              onClick={() => handleServiceSelect(svc.key)}
              disabled={generando}
              style={{ background: '#22c55e', border: 'none', borderRadius: '18px', padding: 'clamp(16px, 2.5vw, 26px) 20px', display: 'flex', alignItems: 'center', gap: '14px', width: '100%', boxShadow: '0 4px 14px rgba(34,197,94,0.28)', opacity: generando ? 0.55 : 1, cursor: generando ? 'not-allowed' : 'pointer', textAlign: 'left' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'clamp(14px, 2.2vw, 20px)', fontWeight: 800, color: '#14532d', marginBottom: '2px' }}>{svc.label}</div>
                <div style={{ fontSize: 'clamp(11px, 1.7vw, 16px)', color: '#166534' }}>{svc.desc}</div>
              </div>
              <div style={{ color: '#14532d', flexShrink: 0 }}>{svc.icon}</div>
            </button>
          ))}
        </div>

        <button
          className="btn-back"
          onClick={resetSystem}
          style={{ width: '100%', maxWidth: 'min(500px, 88vw)', background: '#f3f4f6', border: 'none', borderRadius: '18px', padding: 'clamp(13px, 2vw, 20px)', fontSize: 'clamp(13px, 2vw, 18px)', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <IconHome />
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Inicio;