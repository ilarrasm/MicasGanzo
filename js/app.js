
const hamburguesa = $("#hamburguer");
hamburguesa.click(()=>{
  $("#nav").toggleClass("show")
})


// && carrousel

window.onload = function () {
  // Variables
  const testimonios = [
    {
      nombre: "Seyma",
      pais: "Turquía",
      img: 'assets/turquiaBall.svg',
      testimonio: `    Micas es mi profesora desde 2019. Fue muy fácil comunicarme con ella desde el 
      primer momento. Te entiende, te motiva, es divertida. Es una profesora que ama su trabajo y 
      lo hace muy bien!`
    },
    {
      nombre: "Tunde",
      pais: "EEUU",
      img: 'assets/eeuuBall.svg',
      testimonio: ` Micas was probably the best language teacher I've ever had. She was the first teacher out of 6 in 6 months to teach me Spanish, and she was by far the best. I learned so many fundamentals from her, and our small class loved her so much that the following month we asked her to keep teaching us even though we already had another teacher`
    },
    {
      nombre: "Danilo",
      pais: "Brasil",
      img: "assets/brazilBall.svg",
      testimonio: ` A Micaela foi com certeza a melhor professora de espanhol que já tive, ela tem muito conhecimento do idioma e traz discussões muito interessantes que enriquecem a aula. Recomendo sem sombra de dúvidas.`
    }
  ];
  const TIEMPO_INTERVALO_MILESIMAS_SEG = 10000;
  let posicionActual = 0;
  let $botonRetroceder = $(".back");
  let $botonAvanzar = $(".next")
  let $contenedor = $("#contenedor-carousel")
  let intervalo;
  // Funciones
  function porTestimonio(){
    $(".dot").click(function(){
      let index = $(".dot").index(this)
      console.log(index)
      posicionActual = index
      renderizar()
    })
  }
  porTestimonio()
  /**
   * 
   * 
   *	
   * Funcion que cambia la foto en la siguiente posicion
   */
  function pasarFoto() {
      if(posicionActual >= testimonios.length - 1) {
          posicionActual = 0;
      } else {
          posicionActual++;
      }
      renderizar();
  }

  /**
   * Funcion que cambia la foto en la anterior posicion
   */
  function retrocederFoto() {
      if(posicionActual <= 0) {
          posicionActual = testimonios.length - 1;
      } else {
          posicionActual--;
      }
      renderizar();
  }

  /**
   * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
   */
  function renderizar () {
      $contenedor.html(`
      <div class="flex-row--jusCenter align-center">
          <img class="flag" src=${testimonios[posicionActual].img} alt="bandera de ${testimonios[posicionActual].pais}">
          <div class="flex-column marginLeft-5">
              <span class="P2--strong">${testimonios[posicionActual].nombre}</span>
              <span class="P1-lite">Estudiante de ${testimonios[posicionActual].pais}</span>
          </div>
      </div>
      <p class="P1">${testimonios[posicionActual].testimonio}
      </p>`);
      $(".dot").removeClass("active") 
      $(".dot").eq(posicionActual).toggleClass("active")      
  }

  /**
   * Activa el autoplay de la imagen
   */
  function playIntervalo() {
      intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
  }

  // Eventos
  $botonAvanzar.click(pasarFoto);
  $botonRetroceder.click(retrocederFoto);
  // Iniciar
  playIntervalo()
  renderizar();
} 



//////////////////////////////


////////////
/// && nose
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
      function sendData(){
        const serviceID = 'default_service';
        const templateID = 'template_pyoteka';
        emailjs.sendForm(serviceID, templateID, '#form') 
        .then(function() {

          console.log('SUCCESS!');
          $("input, textarea").val("")
          $(`<span class="success"><i class="fa-solid fa-check"></i>Formulario enviado con exito!</span>`).appendTo("#validator")

        }, function(error) {

          console.log('FAILED...', error);

        });  
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

///////////
