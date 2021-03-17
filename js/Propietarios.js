const identificacion = document.getElementById('identificacion');
const ciudad = document.getElementById('ciudad');
const barrio = document.getElementById('barrio');
const direccion = document.getElementById('direccion');
const telefono = document.getElementById('telefono');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaDuenos = document.getElementById('lista-duenos');



let duenos =[
    {
        identificacion: "1234545879",
        ciudad: "bogota",
        barrio: "normandia",
        direccion: "calle 15 a n 1-65",
        telefono: "3003456781",
        nombre: "cristian",
        apellido: "aponte"
        
    }
];

function listarDuenos() {
    const htmlDuenos = duenos.map((dueno, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${dueno.identificacion}</td>
    <td>${dueno.ciudad}</td>
    <td>${dueno.barrio}</td>
    <td>${dueno.direccion}</td>
    <td>${dueno.telefono}</td>
    <td>${dueno.nombre}</td>
    <td>${dueno.apellido}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
      <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </div>
    </td>
  </tr>`).join("");
  listaDuenos.innerHTML = htmlDuenos;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    identificacion: identificacion.value,
    ciudad: ciudad.value,
    barrio: barrio.value,
    direccion: direccion.value,
    telefono: telefono.value,
    nombre: nombre.value,
    apellido: apellido.value
  };
  const accion = btnGuardar.innerHTML;
  switch(accion) {
    case 'Editar':
      duenos[indice.value] = datos;
      break;
    default:
      duenos.push(datos);
      break;
  }
  
  listarDuenos();
  resetModal();
}

function editar(index) {
  return function Click() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModalCenter').modal('toggle');
    const dueno = duenos[index];
    identificacion.value = dueno.identificacion;
    ciudad.value = dueno.ciudad;
    barrio.value = dueno.barrio;
    direccion.value = dueno.direccion;
    telefono.value = dueno.telefono;
    nombre.value = dueno.nombre;
    apellido.value = dueno.apellido;
    indice.value = index;
  }
} 

function resetModal() {
  identificacion.value = '';
  ciudad.value = '';
  barrio.value = '';
  direccion.value = '';
  telefono.value = '';
  nombre.value = '';
  apellido.value = '';
  indice.value = '';
  btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
  return function clickEnEliminar() {
    duenos = duenos.filter((dueno, indiceDueno)=>indiceDueno !== index);
    listarDuenos();
  }
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;