const hamburguesa = $("#hamburguer");
hamburguesa.click(()=>{
  $("#nav").toggleClass("show")
})
////////////

document.querySelectorAll('.custom-select').forEach(setupSelector);

function setupSelector(selector) {
  selector.addEventListener('change', e => {
    console.log('changed', e.target.value)
  })

  selector.addEventListener('mousedown', e => {
    if(window.innerWidth >= 420) {// override look for non mobile
      e.preventDefault();

      const select = selector.children[0];
      const dropDown = document.createElement('ul');
      dropDown.className = "selector-options";

      [...select.children].forEach(option => {
        const dropDownOption = document.createElement('li');
        dropDownOption.textContent = option.textContent;
        dropDownOption.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          select.value = option.value;
          selector.value = option.value;
          select.dispatchEvent(new Event('change'));
          selector.dispatchEvent(new Event('change'));
          dropDown.remove();
        });

        dropDown.appendChild(dropDownOption);   
      });

      selector.appendChild(dropDown);

      // handle click out
      document.addEventListener('click', (e) => {
        if(!selector.contains(e.target)) {
          dropDown.remove();
        }
      });
    }
  });
}

// && &&
////////////
function form(){
    //////////lista de btns
  let btnSend = $("#send")
  let formG = $("#form")
  let nombre = $("#nombre")
  let apellido = $("#apellido")
  let correo = $("#correo")
  let asunto = $("#asunto")
  let mensaje = $("#mensaje")
  // Verificación
  function verificatione(){
    btnSend.prop('disabled', true)
    if(apellido.val() !== "" && nombre.val() !== "" && correo.val() !== "" && mensaje.val() !== "" && asunto.val() !== "Seleccionar")  {
      console.log("sape"); 
      $("input, textarea").val("")
      $(`<span class="success"><i class="fa-solid fa-check"></i>Formulario enviado con exito!</span>`).appendTo("#validator")
      function sendData(){
        Email.send({
        SecureToken : "9adb73de-28d4-4472-a1f8-838d780606fb",
        To : 'martin.ilarras1@gmail.com',
        From : "ilarrasm.dev@gmail.com",
        Subject : "[Mi porfolio] Nueva consulta",
        Body : "Sape Sapeeee"
        }).then(message => alert(message));
      }
      sendData();
    }else{

      $(`<span class="error"> <i class="fa-solid fa-triangle-exclamation"></i> error. Datos incorrectos</span>`).appendTo("#validator")

      console.log("error!")

      function error(){
        $(".error").remove()
        btnSend.prop('disabled', false)
      };

      setTimeout(error,2000);

    }
  }
  btnSend.click(verificatione)
  /// send
}
form()

