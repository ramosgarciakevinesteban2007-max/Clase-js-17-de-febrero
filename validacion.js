document.addEventListener("DOMContentLoaded", function() {
   const usuario = document.getElementById("usuario")
   const email = document.getElementById("email")
   const password = document.getElementById("password")
   const mensaje = document.getElementById("mensaje")
   const mensajeEmail = document.getElementById("mensaje-email")
   const mensajePassword = document.getElementById("mensaje-password")
   const passwordCounter = document.getElementById("password-counter")
   const passwordStrength = document.getElementById("password-strength")
   const togglePassword = document.getElementById("togglePassword")
   const formulario = document.getElementById("formulario")
   const formStatus = document.getElementById("form-status")
   const submitBtn = document.getElementById("submitBtn")

   let failedAttempts = 0
   let lockTimeout = null

   if (usuario) {
      usuario.addEventListener("input", function() {
         const valorOriginal = this.value
         this.value = this.value.toLowerCase()
         const filtrado = this.value.replace(/[^a-z0-9._-]/g, "")

         if (valorOriginal.length === 0) {
            mensaje.textContent = "Campo requerido"
            mensaje.className = "form-text text-danger"
            this.style.border = "2px solid red"
         } else if (/[^a-z0-9._-]/.test(valorOriginal)) {
            mensaje.textContent = "Está tratando de ingresar un valor incorrecto"
            mensaje.className = "form-text text-danger"
            this.style.border = "2px solid red"
         } else if (filtrado.length < 3) {
            mensaje.textContent = "El usuario debe tener mínimo 3 caracteres"
            mensaje.className = "form-text text-danger"
            this.style.border = "2px solid red"
         } else {
            mensaje.textContent = "Usuario correcto"
            mensaje.className = "form-text text-success"
            this.style.border = "2px solid green"
         }
         this.value = filtrado
      })
   }

   function evaluatePassword(str) {
      const checks = {
         length: str.length >= 10,
         lower: /[a-z]/.test(str),
         upper: /[A-Z]/.test(str),
         digit: /[0-9]/.test(str),
         special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(str)
      }
      const score = Object.values(checks).reduce((s, v) => s + (v ? 1 : 0), 0)
      let level = 'Débil'
      if (score >= 4) level = 'Fuerte'
      else if (score === 3) level = 'Media'
      return { checks, score, level }
   }

   if (password) {
      password.addEventListener("input", function() {
         if (!mensajePassword) return
         const val = this.value
         // contador
         if (passwordCounter) passwordCounter.textContent = `${val.length} caracteres`

         // fuerza
         const result = evaluatePassword(val)
         const parts = []
         if (!result.checks.length) parts.push('mínimo 10 caracteres')
         if (!result.checks.lower) parts.push('una letra minúscula')
         if (!result.checks.upper) parts.push('una letra mayúscula')
         if (!result.checks.digit) parts.push('un número')
         if (!result.checks.special) parts.push('un carácter especial')

         if (parts.length === 0) {
            mensajePassword.innerHTML = `<span class='text-success'>Contraseña válida (${result.level})</span>`
            passwordStrength.innerHTML = ''
            this.style.border = "2px solid green"
         } else {
            mensajePassword.innerHTML = `<span class='text-danger'>Contraseña insuficiente</span>`
            passwordStrength.innerHTML = `<small class='text-muted'>Faltan: ${parts.join(', ')}</small>`
            this.style.border = "2px solid red"
         }
      })

      if (togglePassword) {
         togglePassword.addEventListener('click', function() {
            if (password.type === 'password') {
               password.type = 'text'
               togglePassword.textContent = 'Ocultar'
            } else {
               password.type = 'password'
               togglePassword.textContent = 'Mostrar'
            }
         })
      }
   }

   if (email) {
      email.addEventListener('input', function() {
         const val = this.value.trim()
         if (val.length === 0) {
            mensajeEmail.textContent = ''
            this.style.border = ''
            return
         }
         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
         if (!regex.test(val)) {
            mensajeEmail.textContent = 'Correo no válido'
            mensajeEmail.className = 'form-text text-danger'
            this.style.border = '2px solid red'
         } else {
            mensajeEmail.textContent = 'Correo válido'
            mensajeEmail.className = 'form-text text-success'
            this.style.border = '2px solid green'
         }
      })
   }

   function lockForm(seconds) {
      if (!formStatus) return
      const inputs = [usuario, email, password, submitBtn, togglePassword]
      inputs.forEach(el => { if (el) el.disabled = true })
      let remaining = seconds
      formStatus.innerHTML = `<div class='text-danger'>Formulario bloqueado por ${remaining} segundos</div>`
      lockTimeout = setInterval(() => {
         remaining -= 1
         if (remaining <= 0) {
            clearInterval(lockTimeout)
            lockTimeout = null
            inputs.forEach(el => { if (el) el.disabled = false })
            formStatus.innerHTML = ''
            failedAttempts = 0
         } else {
            formStatus.innerHTML = `<div class='text-danger'>Formulario bloqueado por ${remaining} segundos</div>`
         }
      }, 1000)
   }

   if (formulario) {
      formulario.addEventListener("submit", function(evento) {
         evento.preventDefault()

         if (lockTimeout) return

         // validations
         const usuarioValido = usuario && usuario.value.length >= 3 && /^[a-z0-9._-]+$/.test(usuario.value)
         const emailValido = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
         const pwdEval = evaluatePassword(password ? password.value : '')
         const passwordValido = pwdEval.checks.length && pwdEval.checks.lower && pwdEval.checks.upper && pwdEval.checks.digit

         // collect messages
         let ok = true
         if (!usuarioValido) {
            mensaje.textContent = 'Usuario inválido (mínimo 3 caracteres, solo letras/números/.-_)'
            mensaje.className = 'form-text text-danger'
            usuario.style.border = '2px solid red'
            ok = false
         }
         if (!emailValido) {
            mensajeEmail.textContent = 'Correo inválido'
            mensajeEmail.className = 'form-text text-danger'
            email.style.border = '2px solid red'
            ok = false
         }
         if (!passwordValido) {
            mensajePassword.innerHTML = `<span class='text-danger'>Contraseña no cumple los requisitos</span>`
            password.style.border = '2px solid red'
            ok = false
         }

         if (ok) {
            // success: show message in the view and clear form
            formStatus.innerHTML = `<div class='text-success'>Formulario enviado correctamente</div>`
            formulario.reset()
            // reset visuals
            [mensaje, mensajeEmail, mensajePassword, passwordStrength].forEach(el => { if (el) el.innerHTML = '' })
            [usuario, email, password].forEach(el => { if (el) el.style.border = '' })
            if (passwordCounter) passwordCounter.textContent = '0 caracteres'
            failedAttempts = 0
         } else {
            failedAttempts += 1
            formStatus.innerHTML = `<div class='text-danger'>Hay errores en el formulario. Intentos fallidos: ${failedAttempts}</div>`
            if (failedAttempts >= 3) {
               lockForm(30)
            }
         }
      })
   }
})
