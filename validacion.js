// let usuario = document.getElementById("usuario")

// usuario.addEventListener("keydown",function(evento){
//     if(evento.keyCode === 8){
//      evento.preventDefault()  
//      this.value += "borrando" 
//     }
// })

let usuario = document.getElementById("usuario")
let password = document.getElementById("password")
let mensaje = document.getElementById("mensaje")
 usuario.addEventListener("input",function(evento){
   this.value = this.value.toLowerCase()
   if(/[^a-z]/g.test(this.value)){
      mensaje.textContent ="Esta tratando de ingresar un valor incorrecto"
      this.style.borderColor = "red"
      this.borderColor = "2px solid"
   }
   else if (this.value){
      mensaje.textContent = "usuario correcto"
   }
   else{
      mensaje.textContent ="campo requerido"
       this.style.borderColor = "green"
       this.borderColor = "2px solid"
   }   
   this.value = valorOriginal.replace(/[^a-z]/g,"")
})

password.addEventListener("input",function(){
   let mensajePassword = document.getElementById("mensaje-password")
   
   if(this.value.length < 10){
      mensajePassword.innerHTML = "<p class='text-danger'>La contraseña debe tener al menos 10 caracteres</p>"
      this.style.borderColor = "red"
      this.style.border = "2px solid red"
   }
   else{
      mensajePassword.innerHTML = "<p class='text-success'>Contraseña válida</p>"
      this.style.borderColor = "green"
      this.style.border = "2px solid green"
   }
})
