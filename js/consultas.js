const mascota = document.getElementById('mascota');
const veterinaria = document.getElementById('veterinaria');
const historia = document.getElementById("historia");
const diagnostico = document.getElementById('diagnostico');
const creado = document.getElementById('creado');
const editado = document.getElementById('editado');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaCosultas = document.getElementById('lista-consultas');



let consultas =[
    {
        mascota: "manchas",
        veterinaria: "natalia",
        historia: "",
        diagnostico: "el gato presenta colicos colicos abdominales por la ingestion de un alimento",
        creado: "15/02/2021",
        editado: ""
    }
];


var d = new Date();
var date = d.getDate() + '/' + (d.getMonth() + 1 ) + '/' + d.getUTCFullYear() + ' - ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();


function listarConsultas() {
    const htmlConsultas = consultas.map((consulta, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${consulta.mascota}</td>
    <td>${consulta.veterinaria}</td>
    <td>${consulta.historia}</td>
    <td>${consulta.diagnostico}</td>
    <td>${consulta.creado}</td>
    <td>${consulta.editado}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
      <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </div>
    </td>
  </tr>`).join("");
  listaCosultas.innerHTML = htmlConsultas;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    mascota: mascota.value,
    veterinaria: veterinaria.value,
    historia: historia.value,
    diagnostico: diagnostico.value,
    creado: date,
    editado: editado.value
  };
  const accion = btnGuardar.innerHTML;
  switch(accion) {
    case 'Editar':
      consultas[indice.value] = datos;
      break;
    default:
      consultas.push(datos);
      break;
  }
  
  listarConsultas();
  resetModal();
  
}

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModalCenter').modal('toggle');
    const consulta = consultas[index];
    mascota.value = consulta.mascota;
    veterinaria.value = consulta.veterinaria;
    historia.value = consulta.historia;
    diagnostico.value = consulta.diagnostico;
    creado.value = consulta.creado;
    editado.value = date;
    indice.value = index;
  }
} 

function resetModal() {
  mascota.value = '';
  veterinaria.value = '';
  historia.value = '';
  diagnostico.value = '';
  creado.value = '';
  editado.value = '';
  indice.value = '';
  btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
  return function clickEnEliminar() {
    consultas = consultas.filter((consulta, indiceConsulta)=>indiceConsulta !== index);
    listarConsultas();
  }
}

listarConsultas();


form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;