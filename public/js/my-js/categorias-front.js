let idSeleccionadoParaEliminar = 0;
let idSeleccionadoParaActualizar = 0;

 function crearCategoria(){
    const nombreCategoriaAlta = document.getElementById('nombreCategoriaAlta').value
    const observacionesCategoriaAlta = document.getElementById('observacionesCategoriaAlta').value
    $.ajax({
        method:"POST",
        url: window.location.origin+"/api/categorias",
        data: {
            nombre:nombreCategoriaAlta,
            observaciones:observacionesCategoriaAlta
        },
        success: function( result ) {
            let categoria = result.categoria;
            let tabla = $('#tabla-categorias').DataTable();
            let botones = generarBotones(categoria.id);
            let nuevoRenglon = tabla.row.add([categoria.nombre,categoria.observaciones,botones]).node();
            $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
            tabla.draw(false);
        }
      });
}

function getCategorias(){
    $.ajax({
        method:"GET",
        url: window.location.origin+"/api/categorias",
        data: {},
        success: function( result ) {
            if(result.estado==1){
                const categorias = result.categorias;
                $.noConflict();
                let tabla = $('#tabla-categorias').DataTable();
                categorias.forEach(categoria=>{
                    let botones = generarBotones(categoria.id_categoria);
                    let nuevoRenglon = tabla.row.add([categoria.nombre_categoria,categoria.descripcion_categoria,botones]).node();
                    $(nuevoRenglon).attr('id', 'renglon_'+categoria.id_categoria);
                    tabla.draw(false); 
                }) 
            } else {
                alert(result.mensaje);
            }
        }
      });
}

 function generarBotones(id){
    let botones = '<div class="d-flex">';
            botones+='<a onclick="IdentificarActualizar('+id+');" data-bs-toggle="modal" data-bs-target="#updateModal" class="btn btn-primary shadow btn-xs sharp me-1"><i class="fas fa-pencil-alt"></i></a>';
            botones+='<a onclick="IdentificarEliminar('+id+');" data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>';
        botones+='</div>';
    return botones;
}


function IdentificarEliminar(id){
    idSeleccionadoParaEliminar = id;

}

function borrarCategoria(){
    $.ajax({
        method:"DELETE",
        url: window.location.origin+"/api/categorias/"+idSeleccionadoParaEliminar,
        data: {},
        success: function( result ) {
            if (result.estado == 1){
                let tabla = $('#tabla-categorias').DataTable();
                tabla.row('#renglon_'+idSeleccionadoParaEliminar).remove().draw()
            } else {
                alert(result.mensaje);
            }   
        }
      });
}

function IdentificarActualizar(id){
    idSeleccionadoParaActualizar = id;
    $.ajax({
        method:"GET",
        url: window.location.origin+"/api/categorias/"+idSeleccionadoParaActualizar,
        data: {},
        success: function( result ) {
            if (result.estado == 1){
                let categoria = result.categorias;
                document.getElementById('nombreCategoriaActualizar').value=categoria.nombre_categoria;
                document.getElementById('observacionesCategoriaActualizar').value=categoria.descripcion_categoria;
            } else {
                alert(result.mensaje);
            }   
        }
      });
} 


 function actualizarCategoria(){
    let nombreCategoria = document.getElementById('nombreCategoriaActualizar').value;
    let observacionesCategoria = document.getElementById('observacionesCategoriaActualizar').value;

    $.ajax({
        method:"PUT",
        url: window.location.origin+"/api/categorias/"+idSeleccionadoParaActualizar,
        data: {
            nombre: nombreCategoria,
            observaciones: observacionesCategoria
        },
        success: function( result ) {
            if (result.estado == 1){
                let tabla = $('#tabla-categorias').DataTable();
                let renglonTemporal = tabla.row('#renglon_'+idSeleccionadoParaActualizar).data()
                renglonTemporal[0] = nombreCategoria;
                renglonTemporal[1] = observacionesCategoria;
                tabla.row('#renglon_'+idSeleccionadoParaActualizar).data(renglonTemporal).draw()
            } else {
                alert(result.mensaje);
            }   
        }
      });
} 

getCategorias();