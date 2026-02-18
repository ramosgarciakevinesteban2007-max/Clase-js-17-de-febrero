document.addEventListener("DOMContentLoaded", function() {
   const usuario = document.getElementById("usuario")
   const password = document.getElementById("password")
   const mensaje = document.getElementById("mensaje")
   const formulario = document.getElementById("formulario")

   if (usuario) {
      usuario.addEventListener("input", function() {
         const valorOriginal = this.value

         this.value = this.value.toLowerCase()


         const filtrado = this.value.replace(/[^a-z0-9._-]/g, "")

         if (valorOriginal.length === 0) {
            if (mensaje) mensaje.textContent = "campo requerido"
            if (mensaje) mensaje.className = "form-text text-danger"
            this.style.border = "2px solid red"
         } else if (/[^a-z0-9._-]/.test(valorOriginal)) {
            if (mensaje) mensaje.textContent = "Está tratando de ingresar un valor incorrecto"
            if (mensaje) mensaje.className = "form-text text-danger"
            this.style.border = "2px solid red"
         } else if (filtrado.length < 3) {
            if (mensaje) mensaje.textContent = "El usuario debe tener mínimo 3 caracteres"
            if (mensaje) mensaje.className = "form-text text-danger"
            this.style.border = "2px solid red"
         } else {
            if (mensaje) mensaje.textContent = "usuario correcto"
            if (mensaje) mensaje.className = "form-text text-success"
            this.style.border = "2px solid green"
         }
         this.value = filtrado
      })
   }

   if (password) {
      password.addEventListener("input", function() {
         const mensajePassword = document.getElementById("mensaje-password")

         if (!mensajePassword) return

         if (this.value.length < 10) {
            mensajePassword.innerHTML = "<p class='text-danger'>La contraseña debe tener al menos 10 caracteres</p>"
            this.style.border = "2px solid red"
         } else {
            mensajePassword.innerHTML = "<p class='text-success'>Contraseña válida</p>"
            this.style.border = "2px solid green"
         }
      })
   }

   if (formulario) {
      formulario.addEventListener("submit", function(evento) {
         evento.preventDefault()

         const usuarioValido = usuario && usuario.value.length >= 3
         const passwordValido = password && password.value.length >= 10

         if (usuarioValido && passwordValido) {
            alert("¡Formulario enviado correctamente!\nUsuario: " + usuario.value + "\nContraseña: " + "*".repeat(password.value.length))
         } else {
            alert("Por favor, completa correctamente todos los campos")
         }
      })
   }
})
