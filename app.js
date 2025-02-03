// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
//instrucciones: debe permitir ingresar nombres a traves  de un boton añadir
// cada vez que se ingrese un nombre, se debe ingresar a la lista de nombres
// debe tener validacion de datos de entrada, no acepta vacios
//sortear amigo, selecciona un nombre aletaorio de la lista y lo muestra en pantalla

//Crear un array para almacenar los nombres: Agregar nombres a la lista
let participantes = [];
//Implementa una función para agregar amigos

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    if (!nombre) {
        //aviso de nombre vacio
        alert("No se puede agregar un nombre vacío.");
        return;
    }
    //Actualizar el array de amigos
    if (!participantes.includes(nombre)) {
        participantes.push(nombre);
        //Limpiar el campo de entrada:
        actualizarLista();
        input.value = "";
    }
}
//genera el listado de amigos para ser sorteados
function actualizarLista() {
    //Obtener el elemento de la lista
    const lista = document.getElementById("listaAmigos");
    //Limpiar la lista existente
    lista.innerHTML = "";
    participantes.forEach((nombre) => {
        //Iterar sobre el arreglo:
        const li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}
// limitar el srteo con un minimo de 3 participantes
function asignarAmigoSecreto(participantes) {
    if (participantes.length < 3) {
        alert("Debe haber al menos 3 participantes.");
        return {};
    }

    let asignaciones = {};
    let disponibles = [...participantes];

    for (let participante of participantes) {
        let posibles = disponibles.filter(p => p !== participante);
        
        if (posibles.length === 0) {
            return asignarAmigoSecreto(participantes); // Reintentar en caso de bloqueo
        }
//Generar un índice aleatorio
        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        asignaciones[participante] = elegido;
        disponibles = disponibles.filter(p => p !== elegido);
    }

    return asignaciones;
}
//el control del boton sortear
function sortearAmigo() {
    const resultadoLista = document.getElementById("resultado");
    //Obtener el nombre sorteado:
    resultadoLista.innerHTML = "";
    const resultado = asignarAmigoSecreto(participantes);
    
    Object.keys(resultado).forEach(amigo => {

    //Mostrar el resultado en pantalla:
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${resultado[amigo]}`;
        resultadoLista.appendChild(li);
    });
}