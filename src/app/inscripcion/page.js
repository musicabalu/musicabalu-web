'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './inscripcion.module.css';

export default function InscripcionPage() {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Estado del formulario
  const [formData, setFormData] = useState({
    childName: '',
    childBirthDate: '',
    parentName: '',
    phone: '',
    email: '',
    groupId: '',
    paymentMethod: 'stripe',
    paymentFrequency: 'mensual',
    isEmpi: null,
    acceptedTerms: false,
    acceptedComms: false
  });

  // Cargar grupos desde la base de datos
  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch('/api/groups');
        if (res.ok) {
          const data = await res.json();
          setGroups(data);
        }
      } catch (err) {
        console.error("Error cargando grupos", err);
      }
    }
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones personalizadas
    const birthDate = new Date(formData.childBirthDate);
    const today = new Date();
    
    if (birthDate < new Date('2022-01-01')) {
      setError('La fecha de nacimiento del peque no puede ser anterior al año 2022.');
      setLoading(false);
      window.scrollTo(0, 0);
      return;
    }

    if (birthDate > today) {
      setError('La fecha de nacimiento no puede ser en el futuro.');
      setLoading(false);
      window.scrollTo(0, 0);
      return;
    }

    if (!/^[0-9]{9}$/.test(formData.phone)) {
      setError('El número de teléfono debe tener exactamente 9 dígitos.');
      setLoading(false);
      window.scrollTo(0, 0);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.(com|es|net|org)$/i.test(formData.email)) {
      setError('Por favor, introduce un correo electrónico válido (debe terminar en .com, .es, etc).');
      setLoading(false);
      window.scrollTo(0, 0);
      return;
    }

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al procesar la inscripción');
      }

      // Si el pago es por Stripe, redirigimos a la pasarela de pago (Checkout Session)
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        // Si el pago es en efectivo, redirigimos a una página de éxito
        router.push('/inscripcion/exito');
      }
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Inscripción Clases Presenciales</h1>
        <p className={styles.subtitle}>Rellena el formulario para reservar tu plaza (Matrícula: 25€)</p>

        <div style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '15px', borderRadius: '10px', marginBottom: '25px', fontSize: '0.9rem', border: '1px solid #ffeeba' }}>
          <p style={{ marginBottom: '10px' }}><strong>Antes de matricular es necesario consultar con Musicabalú (hola@musicabalu.com / 633715302) para confirmar que hay plazas disponibles y concretar el grupo de inscripción.</strong> Una vez cumplimentado te llegará una copia a tu email. Puedes guardarla para conservar datos de pago, calendario y demás funcionamiento del curso. Si no te ha llegado la copia, por favor coméntanoslo :)</p>
          <p style={{ margin: 0 }}>🎁 <strong>¡NUEVO! Bonus exclusivo para alumnos presenciales:</strong> Al matricularte en las clases presenciales, tu familia tendrá acceso 100% gratuito a La Comunidad Musicabalú (nuestra plataforma digital valorada en 5,90€/mes) durante el tiempo que sigas con nosotros. Tendréis a un clic nuestra biblioteca de canciones y recitados originales, y consejos en vídeo para integrar la música en vuestras rutinas de casa. (Nota: Te daremos acceso a la plataforma utilizando el mismo email que nos indiques en este formulario).</p>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <h3>Datos del Peque</h3>
            <div className={styles.inputGroup}>
              <label>Nombre y apellidos del peque</label>
              <input type="text" name="childName" required value={formData.childName} onChange={handleChange} placeholder="Ej: Lucas García" />
            </div>
            <div className={styles.inputGroup}>
              <label>Fecha de Nacimiento</label>
              <input type="date" name="childBirthDate" required min="2022-01-01" max={new Date().toISOString().split("T")[0]} value={formData.childBirthDate} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Datos de madre/padre</h3>
            <div className={styles.inputGroup}>
              <label>Nombre y Apellidos de madre/padre</label>
              <input type="text" name="parentName" required value={formData.parentName} onChange={handleChange} placeholder="Ej: María López" />
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Teléfono (Móvil)</label>
                <input type="tel" name="phone" required pattern="[0-9]{9}" maxLength="9" title="El teléfono debe tener 9 números (Ej: 600123456)" value={formData.phone} onChange={handleChange} placeholder="Ej: 600123456" />
              </div>
              <div className={styles.inputGroup}>
                <label>Correo Electrónico</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Vinculación con EMPI</h3>
            <p className={styles.helpText}>¿El alumno/a está matriculado en la Escuela Infantil EMPI en el curso 2026/2027?</p>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input type="radio" name="isEmpi" required checked={formData.isEmpi === true} onChange={() => setFormData(prev => ({...prev, isEmpi: true}))} />
                <span>Sí, es alumno/a de EMPI</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="isEmpi" required checked={formData.isEmpi === false} onChange={() => setFormData(prev => ({...prev, isEmpi: false}))} />
                <span>No (Externo)</span>
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Grupo y Horario</h3>
            <div className={styles.inputGroup}>
              <label>Selecciona el grupo presencial</label>
              <select name="groupId" required value={formData.groupId} onChange={handleChange}>
                <option value="" disabled>-- Elige un grupo --</option>
                {groups.length > 0 ? (
                  groups.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.name} - {g.schedule}
                    </option>
                  ))
                ) : (
                  <option value="test-group">Grupo de prueba (Cargando...)</option>
                )}
              </select>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Pago de Cuotas Mensuales / Trimestrales</h3>
            <p className={styles.helpText}>Selecciona cómo deseas abonar las cuotas una vez empiece el curso. (La matrícula de 25€ se abonará ahora).</p>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input type="radio" name="paymentMethod" value="stripe" checked={formData.paymentMethod === 'stripe'} onChange={handleChange} />
                <span>Domiciliación Bancaria Automática</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="paymentMethod" value="efectivo" checked={formData.paymentMethod === 'efectivo'} onChange={handleChange} />
                <span>Pago en Efectivo</span>
              </label>
            </div>
            
            <h4 style={{ marginTop: '20px', fontSize: '1rem', color: '#444' }}>¿Con qué frecuencia deseas pagar?</h4>
            <p className={styles.helpText} style={{ fontSize: '0.85rem' }}>Nota: En septiembre se abona solo medio mes. A partir de octubre podrás seguir con tu ciclo de pago normal.</p>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input type="radio" name="paymentFrequency" value="mensual" checked={formData.paymentFrequency === 'mensual'} onChange={handleChange} />
                <span>Mensual</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="paymentFrequency" value="trimestral" checked={formData.paymentFrequency === 'trimestral'} onChange={handleChange} />
                <span>Trimestral</span>
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Condiciones de Matriculación</h3>
            
            <details className={styles.termsDetails}>
              <summary>Leer Condiciones Generales y Política de Privacidad</summary>
              <div className={styles.termsContent}>
                <h4>CLASES Y FUNCIONAMIENTO</h4>
                <p>Las clases consistirán en una sesión semanal con una duración aproximada de 40-45 minutos y se ofrecerán en grupos de entre 6 y 12 niños. Los niños deberán asistir a las clases acompañados de su madre, padre o persona con la que mantengan algún vínculo afectivo (un solo adulto). Para garantizar la calidad de la experiencia musical y la concentración de los peques, es indispensable la participación activa del adulto acompañante y el respeto a las pautas y normas de funcionamiento del aula que el profesor indicará al inicio del curso.</p>

                <h4>GRUPOS</h4>
                <p>Para confirmar un grupo es necesario un mínimo de 6 niños inscritos. En caso de matricularse en un grupo que finalmente no llegue a este número mínimo de alumnos, cabe la posibilidad de que el grupo se cancele. En ese caso se le ofrecerá a los alumnos inscritos es este grupo otro horario disponible; en caso de no poder ubicarse en ningún otro grupo, el alumno podrá solicitar la devolución del importe de la matrícula.</p>
                <p>Propuesta inicial de grupos (esta información puede variar según demanda y/o necesidades). Inicialmente ofertamos 7 grupos para bebés (0-3 años) y dos para mayores (3 años). Teniendo en cuenta las plazas disponibles y las necesidades de cada familia, siempre os recomendaremos aquel grupo que, a priori, pueda encajar mejor para vuestro bebé.</p>
                <ul>
                  <li>Martes 16:30-17:15: 0 a 3 años (Bebés)</li>
                  <li>Martes 17:30-18:15: 0 a 3 años (Bebés)</li>
                  <li>Martes 18:30-19:15: 0 a 3 años (Bebés)</li>
                  <li>Jueves 16:30-17:15: 0 a 3 años (Bebés)</li>
                  <li>Jueves 17:30-18:15: 0 a 3 años (Bebés)</li>
                  <li>Jueves 18:30-19:15: 3 años (Mayores)</li>
                  <li>Viernes 16:30-17:15: 0 a 3 años (Bebés)</li>
                  <li>Viernes 17:30-18:15: 0 a 3 años (Bebés)</li>
                  <li>Viernes 18:30-19:15: 3 años (Mayores)</li>
                </ul>

                <h4>PRECIOS</h4>
                <p>Matrícula: 25€/alumno</p>
                <p>Cuota mensual:<br/>
                Matriculados en EMPI en el curso 26/27: 45€<br/>
                No matriculados en EMPI: 50€</p>
                <p>Cuota trimestral:<br/>
                Matriculados EMPI en el curso 26/27: 117€<br/>
                No matriculados en EMPI: 132€</p>

                <h4>MATRÍCULA Y RESERVA DE PLAZA</h4>
                <p>Para que esta reserva de plaza se haga efectiva el alumno tendrá que</p>
                <ul>
                  <li>Cumplimentar este formulario</li>
                  <li>Abonar el importe de la matrícula (25€)</li>
                </ul>
                <p>La matrícula funcionará como reserva de plaza. Si un alumno deja de asistir algún mes perderá el derecho a la plaza. La matrícula no se devuelve en ninguna circunstancia (salvo cancelación del grupo), ni tampoco los pagos mensuales o trimestrales ya realizados.</p>

                <h4>CUOTAS MENSUALES / TRIMESTRALES</h4>
                <p>Los pagos deben realizarse durante los primeros 5 días de cada mes o trimestre. Las personas que se incorporan con las clases comenzadas deben pagar mensualmente en el primer trimestre que estén. En el siguiente trimestre podrán cambiar a pago trimestral. Las mensualidades son fijas. No se descuentan ni festivos ni clases perdidas por causa del alumno. No hay posibilidad de clase suelta. Si un alumno se incorpora en un mes que ya esté empezado deberá pagar la mitad de la cuota mensual, independientemente de las clases que queden por disfrutar ese mes. En el caso de no querer continuar asistiendo a nuestras clases se deberá comunicar con al menos 15 días de antelación.</p>

                <h4>DESCUENTOS</h4>
                <p>Los hermanos podrán disfrutar de un 15% de descuento en el pago mensual y un 10% en el trimestral. La matrícula no lleva ningún tipo de descuento.</p>

                <h4>CALENDARIO</h4>
                <p>El curso 2026/27 comenzará el 16 de septiembre de 2026. Este mes se abonará sólo la mitad de la cuota. Los demás meses o trimestres deberá abonarse la mensualidad completa independientemente de las clases a las que se haya asistido. Seguiremos el calendario adjunto en este formulario; cada grupo tendrá 36 clases desde septiembre hasta junio. <a href="/calendario.jpg" target="_blank" style={{color: '#00B2E3', textDecoration: 'underline'}}>Haz clic aquí para ver el Calendario del Curso</a>.</p>
                <p>Los trimestres del curso serán:</p>
                <ol>
                  <li>Octubre-noviembre-diciembre</li>
                  <li>Enero-febrero-marzo</li>
                  <li>Abril-mayo-junio.</li>
                </ol>

                <h4>RECUPERACIÓN DE CLASES</h4>
                <p>Las clases perdidas por causa del alumno no se recuperan. Las clases perdidas por causa del profesor sí se recuperan. En este caso se ofrecerá una fecha de recuperación para todo el grupo; quien no pueda asistir no se le ofrecerá otra ni se le devolverá el dinero.</p>

                <h4>UBICACIÓN</h4>
                <p>Las clases de Musicabalú son un proyecto independiente de EMPI. Aunque la actividad se desarrolla desde 2016 en sus instalaciones y la intención es realizar todo el curso 2026/2027 en sus instalaciones, Musicabalú se reserva el derecho de modificar la ubicación de las clases dentro de la misma zona o ciudad por motivos de aforo, mejoras en las instalaciones o fuerza mayor, garantizando siempre la continuidad y calidad del servicio.</p>

                <h4>PROTECCIÓN DE DATOS PERSONALES</h4>
                <p>Responsable del tratamiento: Javier Muñoz Sánchez (en adelante, MUSICABALÚ). Finalidad: Gestionar su solicitud de inscripción, formalizar la matrícula para el curso/taller Musicabalú y mantener la comunicación necesaria para el desarrollo de la actividad. Legitimación: La base legal es la ejecución de la relación contractual de matriculación y el consentimiento expreso al enviar este formulario. Conservación: Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad. Destinatarios: No se cederán datos a terceros, salvo obligación legal. Derechos: Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad dirigiéndose por escrito a C/Sierra de Guadarrama, 26, 30163, Murcia, o a través del correo electrónico hola@musicabalu.com.</p>
              </div>
            </details>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="acceptedTerms" required checked={formData.acceptedTerms} onChange={handleChange} />
                <span>He leído y acepto la información sobre protección de datos y las condiciones generales del curso. *</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="acceptedComms" required checked={formData.acceptedComms} onChange={handleChange} />
                <span>Acepto recibir comunicaciones por parte de Musicabalú necesarias para el buen funcionamiento de las clases o avisos urgentes. *</span>
              </label>
            </div>
          </div>
          
          {formData.paymentMethod === 'stripe' && (
            <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #f59e0b', fontSize: '0.9rem', color: '#92400e' }}>
              <strong>ℹ️ Aviso sobre cobros recurrentes:</strong><br />
              Con el método de pago que elijas a continuación se te cobrarán las cuotas {formData.paymentFrequency === 'mensual' ? 'mensuales' : 'trimestrales'} automáticamente. Si en algún momento deseas cambiar de método de pago o utilizar otra cuenta, deberás avisarnos con antelación.
            </div>
          )}

          <button type="submit" disabled={loading} className={`btn btn-pink ${styles.submitBtn}`}>
            {loading ? 'Procesando...' : 'Completar Inscripción'}
          </button>
        </form>
      </div>
    </div>
  );
}
