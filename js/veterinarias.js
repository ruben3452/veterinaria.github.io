const identificacion = document.getElementById('identificacion');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const ciudad = document.getElementById('ciudad');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaVeterinarias = document.getElementById('lista-veterinarias');



let veterinarias =[
    {
        identificacion: "123456789",
        ciudad: "bogota",
        nombre: "natalia",
        apellido: "acosta"
        
    }
];

function listarVeterinarias() {
    const htmlVeterinarias = veterinarias.map((veterinaria, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${veterinaria.identificacion}</td>
    <td>${veterinaria.ciudad}</td>
    <td>${veterinaria.nombre}</td>
    <td>${veterinaria.apellido}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
      <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </div>
    </td>
  </tr>`).join("");
  listaVeterinarias.innerHTML = htmlVeterinarias;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    identificacion: identificacion.value,
    ciudad: ciudad.value,
    nombre: nombre.value,
    apellido: apellido.value
  };
  const accion = btnGuardar.innerHTML;
  switch(accion) {
    case 'Editar':
      veterinarias[indice.value] = datos;
      break;
    default:
      veterinarias.push(datos);
      break;
  }
  
  listarVeterinarias();
  resetModal();
}

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModalCenter').modal('toggle');
    const veterinaria = veterinarias[index];
    nombre.value = veterinaria.nombre;
    identificacion.value = veterinaria.identificacion;
    apellido.value = veterinaria.apellido;
    ciudad.value = veterinaria.ciudad;
    indice.value = index;
  }
} 

function resetModal() {
  identificacion.value = '';
  nombre.value = '';
  apellido.value = '';
  ciudad.value = '';
  indice.value = '';
  btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
  return function clickEnEliminar() {
    veterinarias = veterinarias.filter((veterinaria, indiceVeterinaria)=>indiceVeterinaria !== index);
    listarVeterinarias();
  }
}

listarVeterinarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;