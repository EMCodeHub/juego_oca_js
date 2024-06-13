
//COMENTARIOS  Inicializamos un conjunto de variables. Algunas de ellas nos almacenan números otras nos almacenan strings en arrays.


      var partidafinalizada = 0;
      var numJugadores = 0;
      var fichas = [];
      var jugadores = [];
      var podium = [];

     var resultadoRojo = 0;
      var resultadoAzul = 0;
      var resultadoVerde = 0;
      var resultadoAmarillo = 0;

      var fichasoperativas = [];

      var indiceFichaActual = 0;




// COMENTARIOS La función asignaturnos lo que hace es tomar el array fichas, donde se han guardado el nombre de las fichas que van 
// a participar en el juego.  Por ejemplo, se han seleccionado 3 fichas.  [azul, rojo, verde] ,  en la medida que estas fichas van llegando 
// a la meta, se van agregando a el array podium.  Y Lo que hace asinaturnos(),  es crear un nuevo array llamado fichasoperativas
// las cuales son aquellas que estan en tiempo real jugando la partida, porque el resto, ya habrán llegado a la meta.
// A  parte de ir generando los turnos cambiando el valor de la variable fichaActual, tambien esta funcion se encarga de hacer aparecer
// y desaparecer los botones que no sea su turno, con el fin de únicamente tener visible el boton dueño del turno.



      const asignaturnos = () => {


        fichasoperativas = fichas.filter((ficha) => !podium.includes(ficha));

        var fichaActual = fichasoperativas[indiceFichaActual];

        // Verificar si fichaActual es undefined y ajustar el índice en consecuencia
        if (fichaActual === undefined) {
          // Restablecer el índice a 0 cuando se alcanza el final del array
          indiceFichaActual = 0;
          fichaActual = fichasoperativas[indiceFichaActual];
        } else {
          // Incrementar el índice normalmente
          indiceFichaActual = (indiceFichaActual + 1) % fichasoperativas.length;
        }

        // Ocultar todos los divs de turno
        document.getElementById("botonrojoturno").style.display = "none";
        document.getElementById("botonazulturno").style.display = "none";
        document.getElementById("botonverdeturno").style.display = "none";
        document.getElementById("botonamarillaturno").style.display = "none";

        // Mostrar el div de turno correspondiente a la ficha actual
        if (fichaActual === "rojo") {
          document.getElementById("botonrojoturno").style.display = "block";
        } else if (fichaActual === "azul") {
          document.getElementById("botonazulturno").style.display = "block";
        } else if (fichaActual === "verde") {
          document.getElementById("botonverdeturno").style.display = "block";
        } else if (fichaActual === "amarilla") {
          document.getElementById("botonamarillaturno").style.display = "block";
        }

        // Verificar si la ficha actual es undefined
        if (fichasoperativas.length == 0) {
          $("#turnos").text("Ha terminado la partida");
        } else {
          // Si no es undefined, mostrar el turno de la ficha actual
          $("#turnos").text("Es el turno de " + fichaActual);
        }


        // Llamar a las funciones para mostrar las fichas y los dados después de actualizar la ficha actual
        mostrarFichasSeleccionadas();

        mostrarDadosSeleccionados();

        return fichaActual;


      };





      const nuevojuego = () => {
        location.reload();
      };






      const reiniciarpartida = () => {
        resultadoRojo = 0;
        resultadoAzul = 0;
        resultadoVerde = 0;
        resultadoAmarillo = 0;

        document
          .querySelectorAll(
            ".ficharoja, .fichaazul, .fichaverde, .fichaamarilla"
          )
          .forEach((elemento) => {
            elemento.style.left = "0px";
          });

        actualizarResultados();

        construyeobjetos();

        actualizarResultados();

        construyeobjetos();

        document.getElementById("partidafinalizada").style.display = "none";

        document.getElementById("podium").style.display = "none";

        document.getElementById("mensajeganador").style.display = "none";
      };





// COMENTARIOS  Esta función se encarga de recoger los valores existentes en el podium al finalizar la partida y "pintarlos" en nuestro
//documento html, mediante la inserción de html en el documento. Tambien nos dirá al final de la partida quien es el ganador.
//El ganador se conocerá por ser el primer elemento del array podium.

      function mostrarPodium() {


        var podiumHTML = "<h2>Podium</h2>";

        for (var i = 0; i < podium.length; i++) {
          podiumHTML += "<p>Posición " + (i + 1) + ": " + podium[i] + "</p>";
        }

        document.getElementById("podium").innerHTML = podiumHTML;

        // Añadir mensaje "ha ganado la ficha + podium[0]"

        if (podium.length > 0) {

          var mensajeGanador = "Ha ganado la ficha " + podium[0];

          document.getElementById("mensajeGanador").innerText = mensajeGanador;

          document.getElementById("mensajeGanador").style.display = "block";

          document.getElementById("reiniciarpartidabuton").style.display =
            "none";
        }
      }


//COMENTARIOS  Para tener la información más ordenada, he decidido trabajar con objetos de javascript que me van a almacenar un 
//conjunto de datos para cada jugador.  En tiempo real tendré los siguientes datos de cada jugador (jugador1, rojo, 15) por ejemplo.
//De manera que voy a tener en todo momento el jugador, su color de ficha, y la posición en la cual se encuentra su ficha.
//Este objeto será "pintado" para poder observar los resultados.
// La función construye objetos es llamada continuamente por otras funciones para ir actualizando los valores de los objetos en tiempo real.



      const construyeobjetos = () => {

// este pequeño objeto tiene la posición en la cual se encuentra cada ficha.

        var fichaposicion = {

          verde: resultadoVerde,
          azul: resultadoAzul,
          amarilla: resultadoAmarillo,
          rojo: resultadoRojo,

        };


        for (var i = 0; i < fichas.length; i++) {
          var jugador = {
            jugador: jugadores[i],
            colorFicha: fichas[i],
            posicion: fichaposicion[fichas[i]],
          };



          // Asigna un nombre único al objeto jugador

          var nombreJugador = "jugador" + (i + 1);

          // Asigna el objeto jugador al nombre correspondiente

          window[nombreJugador] = jugador;

        }

        // Comprueba si cada jugador está definido y luego imprime en la consola

        for (var i = 1; i <= fichas.length; i++) {
          var nombreJugador = "jugador" + i;
          if (window[nombreJugador]) {

            //console.log(window[nombreJugador]);

          }
        }


      };






      $(document).ready(function () {



        // Cada vez que cambie "numeroJugadores" el cual es un selector HTML , el array fichas se va a ir actualizando

        $("#numeroJugadores").change(function () {
          numJugadores = parseInt($(this).val());
          fichas = [];
          generarSeleccionesDeFicha();
        });



        // Una vez sabemos el numero de jugadores, le pediremos al usuario que nos rellene el color de las fichas, para ese
        //numero de usuarios concreto, si no conocemos el numero de jugadores, no sabremos qué informacion pedir luego.



        function generarSeleccionesDeFicha() {


          $("#seleccionFichas").empty();
          
          for (var i = 0; i < numJugadores; i++) {
            var selectFicha = $("<select>").addClass("fichaSeleccionada");
            selectFicha.append($("<option>").text("Seleccione ficha").val(""));
            selectFicha.append($("<option>").text("Rojo").val("rojo"));
            selectFicha.append($("<option>").text("Azul").val("azul"));
            selectFicha.append($("<option>").text("Verde").val("verde"));
            selectFicha.append($("<option>").text("Amarilla").val("amarilla"));

            var jugadorText = $("<p>").text("Jugador " + (i + 1));
            $("#seleccionFichas").append(jugadorText);
            $("#seleccionFichas").append(selectFicha);
          }
        }



// en el evento onchange, hacemos la asignación de ficha seleccionada para ir rellenando el array fichas.

        $(document).on("change", ".fichaSeleccionada", function () {

          var index = $(".fichaSeleccionada").index(this);
          var fichaSeleccionada = $(this).val();
          fichas[index] = fichaSeleccionada;


        });










  // Cuando se hace clic en el boton con identificador "iniciarpartida" iniciar partida se llaman a estas funciones

        $("#iniciarpartida").click(function () {

          mostrarFichasSeleccionadas();
          mostrarDadosSeleccionados();

        });




    // Esta función me va a mostrar en mi documento html únicamente las fichas presentes en el array fichas    

        function mostrarFichasSeleccionadas() {
          $(".ficharoja, .fichaazul, .fichaverde, .fichaamarilla").hide();
          for (var i = 0; i < fichas.length; i++) {
            if (fichas[i] === "rojo") {
              $(".ficharoja").show();
            } else if (fichas[i] === "azul") {
              $(".fichaazul").show();
            } else if (fichas[i] === "verde") {
              $(".fichaverde").show();
            } else if (fichas[i] === "amarilla") {
              $(".fichaamarilla").show();
            }
          }
        }

        // esta función me crea tantos jugadores como fichas existan
        // Un ejemplo, si tengo fichas [azul, verde, rojo]  me creará un array jugadores así-->  [jugador1, jugador2, jugador3]


        function mostrarDadosSeleccionados() {


          for (var i = 0; i < fichas.length; i++) {
            var jugador = "jugador" + (i + 1);
            jugadores.push(jugador);
          }

          $(".botonrojo, .botonazul, .botonverde, .botonamarilla").hide();

          for (var i = 0; i < fichas.length; i++) {
            var ficha = fichas[i];
            $(".boton" + ficha).show();
          }
        }
      });




      // Esta función es la encargada de lanzar los dados para la ficha roja
     // Si el resultadoRojo es mayor que 20, nos cambia el resultado a -->"meta"
     //además esta función llama a muchas otras funciones, como la de asignarturno(), construyeobjetos()....
     //Estas funciones son elementales para ir actualizando en tiempo real los resultados.
     // Despues de dadosroja(),  tenemos dadosazul(), etc.  Todas las funciones hacen lo mismo
     // ¿Podríamos haber hecho una sola función y pasarle por parámetros la ficha? si.



    
      function dadosroja() {


        if (resultadoRojo !== "meta") {
          var numeroAleatorio = Math.floor(Math.random() * 6) + 1;
          resultadoRojo += numeroAleatorio;
          if (resultadoRojo > 20) {
            resultadoRojo = "meta";
            podium.push("rojo");
            fichasoperativas = fichasoperativas.filter(
              (ficha) => ficha !== "rojo"
            );
            //console.log(fichasoperativas);
          }
          construyeobjetos();
          moverFicha(".ficharoja", numeroAleatorio);
          actualizarResultados();
          verificarFinPartida();
          asignaturnos();
        }


      }



      function dadosazul() {


        if (resultadoAzul !== "meta") {
          var numeroAleatorio = Math.floor(Math.random() * 6) + 1;
          resultadoAzul += numeroAleatorio;
          if (resultadoAzul > 20) {
            resultadoAzul = "meta";
            podium.push("azul");
            fichasoperativas = fichasoperativas.filter(
              (ficha) => ficha !== "azul"
            );
            //console.log(fichasoperativas);
          }
          construyeobjetos();
          moverFicha(".fichaazul", numeroAleatorio);
          actualizarResultados();
          verificarFinPartida();
          asignaturnos();
        }


      }



      function dadosverde() {


        if (resultadoVerde !== "meta") {
          var numeroAleatorio = Math.floor(Math.random() * 6) + 1;
          resultadoVerde += numeroAleatorio;
          if (resultadoVerde > 20) {
            resultadoVerde = "meta";
            podium.push("verde");
            fichasoperativas = fichasoperativas.filter(
              (ficha) => ficha !== "verde"
            );
            //console.log(fichasoperativas);
          }
          construyeobjetos();
          moverFicha(".fichaverde", numeroAleatorio);
          actualizarResultados();
          verificarFinPartida();
          asignaturnos();
        }
      }




      function dadosamarilla() {
        if (resultadoAmarillo !== "meta") {
          var numeroAleatorio = Math.floor(Math.random() * 6) + 1;
          resultadoAmarillo += numeroAleatorio;
          if (resultadoAmarillo > 20) {
            resultadoAmarillo = "meta";
            podium.push("amarilla");
            fichasoperativas = fichasoperativas.filter(
              (ficha) => ficha !== "amarilla"
            );
            //console.log(fichasoperativas);
          }
          construyeobjetos();
          moverFicha(".fichaamarilla", numeroAleatorio);
          actualizarResultados();
          verificarFinPartida();
          asignaturnos();
        }
      }






  //Esta función nos verifica si la partida ya terminó o no, para poder mostrar el podium


      function verificarFinPartida() {


        var totalFichas = fichas.length;

        var fichasMeta = 0;

        if (resultadoRojo === "meta") {
          fichasMeta++;
        }
        if (resultadoAzul === "meta") {
          fichasMeta++;
        }
        if (resultadoVerde === "meta") {
          fichasMeta++;
        }
        if (resultadoAmarillo === "meta") {
          fichasMeta++;
        }

        if (fichasMeta === totalFichas) {
          document.getElementById("partidafinalizada").style.display = "flex";

          mostrarPodium();
        }
      }



// esta función es la que se encarga de mover las fichas, hasta ahora es la única función que logra ANIMAR, nuestro documento.
// Nos mueve hacia la derecha unos pixeles directamente relacionados con el numero aleatoreo generado cuando hemos lanzado dados.


      function moverFicha(selector, numero) {


        var distancia = numero * 55;
        var posicionActual = parseFloat($(selector).css("left"));
        var nuevaPosicion = posicionActual + distancia;
        nuevaPosicion = Math.min(nuevaPosicion, 1150);
        $(selector).animate(
          {
            left: nuevaPosicion + "px",
          },
          1000,
          function () {
            if (nuevaPosicion >= 1150) {
              var color = $(selector).attr("class").split(" ")[0];
              alert("¡Ha llegado a la meta la " + color + "!");

              var partidafinalizada = 1;

              if (partidafinalizada === 1) {
                $("#resultadoRojo").text(resultadoRojo);
                $("#resultadoAzul").text(resultadoAzul);
                $("#resultadoVerde").text(resultadoVerde);
                $("#resultadoAmarilla").text(resultadoAmarilla);
              }
            }
          }
        );
      }



//Esta función nos actualiza en tiempo real lo que hemos pintado en el dom,  y cada vez que se llama, se pinta de nuevo con los nuevos
//valores, por ejemplo si ha cambiado (jugador.posicion), se pinta con ese cambio en el dom.


      function actualizarResultados() {

        var resultadosHTML = "<table>";
        for (var i = 1; i <= fichas.length; i++) {
          var nombreJugador = "jugador" + i;
          if (window[nombreJugador]) {
            var jugador = window[nombreJugador];
            resultadosHTML += "<tr>";
            resultadosHTML += "<td>Jugador " + i + "</td>";
            resultadosHTML += "<td>Color: " + jugador.colorFicha + "</td>";
            resultadosHTML += "<td>Posición: " + jugador.posicion + "</td>";
            resultadosHTML += "</tr>";
          }
        }
        resultadosHTML += "</table>";
        $("#resultadostiemporeal").html(resultadosHTML);


      }





 

