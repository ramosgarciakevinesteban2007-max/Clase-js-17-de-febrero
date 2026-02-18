let usuario = document.getElementById("usuario")
let password = document.getElementById("password")
let mensaje = document.getElementById("mensaje")
let formulario = document.getElementById("formulario")

// Validación del usuario - permite letras, números, guiones (-) y puntos (.)
// Mínimo 3 caracteres de longitud
usuario.addEventListener("input", function(evento) {
   // Permitir solo letras, números, guiones y puntos
   this.value = this.value.replace(/[^a-zA-Z0-9.-]/g, "")
   
   if (this.value.length === 0) {
      mensaje.textContent = "Campo requerido"
      mensaje.className = "error-message"
      this.classList.remove("is-valid")
      this.classList.add("is-invalid")
   } 
   else if (this.value.length < 3) {
      mensaje.textContent = "Mínimo 3 caracteres de longitud"
      mensaje.className = "error-message"
      this.classList.remove("is-valid")
      this.classList.add("is-invalid")
   }
   else {
      mensaje.textContent = "Usuario válido"
      mensaje.className = "success-message"
      this.classList.remove("is-invalid")
      this.classList.add("is-valid")
   }
})

// Validación de contraseña
password.addEventListener("input", function() {
   let mensajePassword = document.getElementById("mensaje-password")
   
   if (this.value.length === 0) {
      mensajePassword.textContent = "Campo requerido"
      mensajePassword.className = "error-message"
      this.classList.remove("is-valid")
      this.classList.add("is-invalid")
   }
   else if (this.value.length < 10) {
      mensajePassword.textContent = "La contraseña debe tener al menos 10 caracteres"
      mensajePassword.className = "error-message"
      this.classList.remove("is-valid")
      this.classList.add("is-invalid")
   }
   else {
      mensajePassword.textContent = "Contraseña válida"
      mensajePassword.className = "success-message"
      this.classList.remove("is-invalid")
      this.classList.add("is-valid")
   }
})

// Validación del formulario al enviar
formulario.addEventListener("submit", function(evento) {
   evento.preventDefault()
   
   // Validar que ambos campos sean válidos
   if (usuario.value.length >= 3 && password.value.length >= 10) {
      alert("¡Formulario enviado correctamente!\nUsuario: " + usuario.value + "\nContraseña: " + "*".repeat(password.value.length))
      // Aquí iría el código para enviar el formulario al servidor
   } else {
      alert("Por favor, completa correctamente todos los campos")
   }
})
