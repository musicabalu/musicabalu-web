# 🛠️ Comandos Útiles de Musicabalú

Aquí tienes siempre a mano los comandos principales que más vas a utilizar. Puedes mantener este archivo abierto en una pestaña de VSCode para copiar y pegar rápidamente en la terminal (recuerda estar siempre dentro de la carpeta `web26`).

## 🌐 Comandos de Vercel (Para subir la web)

**1. Iniciar sesión en Vercel (Cuando te da error "Not authorized")**
```bash
npx vercel login
```
*(Te preguntará con qué cuenta quieres entrar, normalmente GitHub o tu email, y te abrirá el navegador para confirmar).*

**2. Subir la web a PRODUCCIÓN (La versión definitiva que ve todo el mundo)**
```bash
npx vercel --prod
```

**3. Subir una versión de PRUEBA (Para ver cómo queda sin que afecte a la web real)**
```bash
npx vercel
```

**4. Descargar variables de entorno (Si añades claves en Vercel y quieres bajarlas a tu ordenador)**
```bash
npx vercel env pull .env.local
```

---

## 💻 Comandos de Desarrollo Local (Para probar en tu ordenador)

**1. Arrancar la web en tu ordenador (Para ver los cambios al instante)**
```bash
npm run dev
```
*(Una vez ejecutado, abre en tu navegador la dirección http://localhost:3000)*

**2. Instalar dependencias (Si añades alguna librería nueva o si clonas el proyecto desde cero)**
```bash
npm install
```

**3. Crear la versión de producción en local (Para comprobar que no hay errores antes de subir a Vercel)**
```bash
npm run build
```

---

## 💾 Comandos de Copia de Seguridad (GitHub)

**Para guardar todos tus cambios de forma segura en la nube:**

```bash
git add .
git commit -m "Descripción de los cambios de hoy"
git push
```
*(Recuerda que si te pide contraseña en el paso `git push`, debes usar tu Personal Access Token).*
