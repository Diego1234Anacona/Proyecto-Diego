var input_nombre = document.getElementById('nombre_user')
var input_telefono = document.getElementById('telefono_user')
var input_direccion = document.getElementById('direccion_user')

function guardar_data() {
 
    let contador_data = 1
    if (localStorage.getItem("contador") == null) {
        localStorage.setItem('contador', contador_data)
    } else {
        contador_data = localStorage.getItem("contador")
    }
    var nombre = document.getElementById('nombre_user').value
    var telefono = document.getElementById('telefono_user').value
    var direccion = document.querySelector('#direccion_user').value
    localStorage.setItem("nombre_" + contador_data, nombre)
    localStorage.setItem("telefono_" + contador_data, telefono)
    localStorage.setItem("direccion_" + contador_data, direccion)
    contador_data = parseInt(contador_data) + 1
    localStorage.setItem("contador", contador_data)
    console.log(contador_data)

    let contador_actual = parseInt(contador_data) - 1
    listado_data(contador_actual)
    document.getElementById("mi_formulario").reset()

}

function listado_data(contador_actual = 1, actualiza_tabla = false) {
   
    let body_tabla = document.querySelector("#data-usuario-read")
    let titulo_formulario = document.querySelector("#titulo_accion_formulario")
    titulo_formulario.innerHTML = `Insertar nuevo dato`

    if (actualiza_tabla) {
        let contador_futuro = localStorage.getItem('contador')
           
        for (let id_dato = 1; id_dato < contador_futuro; id_dato++) {
            if (localStorage.getItem('nombre_' + id_dato) != null && localStorage.getItem('telefono_' + id_dato) != null && localStorage.getItem('direccion_' + id_dato)) {
                body_tabla.innerHTML += `
                <tr>
                    <td>${localStorage.getItem('nombre_' + id_dato)}</td>
                    <td>${localStorage.getItem('telefono_' + id_dato)}</td>
                    <td>${localStorage.getItem('direccion_' + id_dato)}</td>
                    <td>
                        <i class="fas fa-pen mx-2" onclick="editar_elemento(${id_dato})"></i>
                        <i class="fas fa-trash mx-2" onclick="borrar_elemento(${id_dato})"></i>
                    </td>
                </tr>
                `
            }
        }
        
    } else {
        body_tabla.innerHTML += `
        <tr>
            <td>${localStorage.getItem('nombre_' + contador_actual)}</td>
            <td>${localStorage.getItem('telefono_' + contador_actual)}</td>
            <td>${localStorage.getItem('direccion_' + contador_actual)}</td>
            <td>
                <i class="fas fa-pen mx-2" onclick="editar_elemento(${contador_actual})"></i>
                <i class="fas fa-trash mx-2" onclick="borrar_elemento(${contador_actual})"></i>
            </td>
        </tr>
        `
    }
}
listado_data(1, true)

function editar_elemento(indice_dato) {
    let boton = document.getElementById("boton_formulario")
    boton.setAttribute('onclick', `editar_elemento_accion(${indice_dato})`)
    let titulo_formulario = document.querySelector("#titulo_accion_formulario")
    titulo_formulario.innerHTML = `Actualizar dato`
    input_nombre.value = localStorage.getItem("nombre_" + indice_dato)
    input_telefono.value = localStorage.getItem("telefono_" + indice_dato)
    input_direccion.value = localStorage.getItem("direccion_" + indice_dato)
    console.log(input_nombre)
    console.log(input_telefono)
    console.log(input_direccion)
}

function editar_elemento_accion(indice_dato) {
    console.log(indice_dato)
    var nombre_actualizacion = document.getElementById('nombre_user').value
    var telefono_actualizacion = document.getElementById('telefono_user').value
    var direccion_actualizacion = document.querySelector('#direccion_user').value
      

    localStorage.setItem("nombre_" + indice_dato, nombre_actualizacion)
    localStorage.setItem("telefono_" + indice_dato, telefono_actualizacion)
    localStorage.setItem("direccion_" + indice_dato, direccion_actualizacion)
      
    
    let body_tabla = document.querySelector("#data-usuario-read")
    body_tabla.innerHTML = ''
    let titulo_formulario = document.querySelector("#titulo_accion_formulario")
    titulo_formulario.innerHTML = `Insertar nuevo dato`
    listado_data(1, true)
    let boton = document.getElementById("boton_formulario")
    boton.setAttribute('onclick', `guardar_data()`)
    document.getElementById("mi_formulario").reset()
}



function borrar_elemento(id_dato) {
    Swal.fire({
        title: 'Esta seguro de eliminar el dato?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            let body_tabla = document.querySelector("#data-usuario-read")
            body_tabla.innerHTML = ''

            localStorage.removeItem("nombre_" + id_dato)
            localStorage.removeItem("telefono_" + id_dato)
            localStorage.removeItem("direccion_" + id_dato)
            listado_data(1, true)


            Swal.fire({
                title: 'Se elimino el dato',
                icon: 'success'
            })
            document.getElementById("mi_formulario").reset()
        }
    })
}