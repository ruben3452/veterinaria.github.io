const tipo = document.getElementById('tipo');
const sexo = document.getElementById('sexo');
const peso = document.getElementById('peso');
const raza = document.getElementById('raza');
const color = document.getElementById('color');
const edad = document.getElementById('edad');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaMascotas = document.getElementById('lista-mascotas');



let mascotas =[
    {
        tipo: "gato",
        sexo: "macho",
        peso: "3",
        raza: "siberiano",
        color: "gris",
        edad: "5",
        nombre: "manchas",
        dueno: "cristian"
    }
];

function listarMascotas() {
    const htmlMascotas = mascotas.map((mascota, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.sexo}</td>
    <td>${mascota.peso}</td>
    <td>${mascota.raza}</td>
    <td>${mascota.color}</td>
    <td>${mascota.edad}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.dueno}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
      <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </div>
    </td>
  </tr>`).join("");
  listaMascotas.innerHTML = htmlMascotas;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    tipo: tipo.value,
    sexo: sexo.value,
    peso: peso.value,
    raza: raza.value,
    color: color.value,
    edad: edad.value,
    nombre: nombre.value,
    dueno: dueno.value
  };
  const accion = btnGuardar.innerHTML;
  switch(accion) {
    case 'Editar':
      mascotas[indice.value] = datos;
      break;
    default:
      mascotas.push(datos);
      break;
  }
  
  listarMascotas();
  resetModal();
}

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModalCenter').modal('toggle');
    const mascota = mascotas[index];
    tipo.value = mascota.tipo;
    sexo.value = mascota.sexo;
    peso.value = mascota.peso;
    raza.value = mascota.raza;
    color.value = mascota.color;
    edad.value = mascota.edad;
    nombre.value = mascota.nombre;
    dueno.value = mascota.dueno;
    indice.value = index;
  }
} 

function resetModal() {
  tipo.value = '';
  sexo.value = '';
  peso.value = '';
  raza.value = '';
  color.value = '';
  edad.value = '';
  nombre.value = '';
  dueno.value = '';
  indice.value = '';
  btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
  return function clickEnEliminar() {
    mascotas = mascotas.filter((mascota, indiceMascota)=>indiceMascota !== index);
    listarMascotas();
  }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
