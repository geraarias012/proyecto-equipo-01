let idSeleccionadoParaEliminar = 0;
let idSeleccionadoParaActualizar = 0;

 function crearProveedor(){
    const nombreProveedorAlta = document.getElementById('nombreProveedorAlta').value
    const direccionProveedorAlta = document.getElementById('direccionProveedorAlta').value
    const telefonoProveedorAlta = document.getElementById('telefonoProveedorAlta').value
    $.ajax({
        method:"POST",
        url: window.location.origin+"/api/proveedores",
        data: {
            nombre:nombreProveedorAlta,
            direccion:direccionProveedorAlta,
            telefono:telefonoProveedorAlta
        },
        success: function( result ) {
            let proveedor = result.proveedor;
            let tabla = $('#tabla-proveedores').DataTable();
            let botones = generarBotones(proveedor.id);
            let nuevoRenglon = tabla.row.add([proveedor.nombre,proveedor.direccion,proveedor.telefono,botones]).node();
            $(nuevoRenglon).attr('id', 'renglon_'+proveedor.id);
            tabla.draw(false);
        }
      });
}

function getProveedores(){
    $.ajax({
        method:"GET",
        url: window.location.origin+"/api/proveedores",
        data: {},
        success: function( result ) {
            if(result.estado==1){
                const proveedores = result.proveedores;
                $.noConflict();
                let tabla = $('#tabla-proveedores').DataTable();
                proveedores.forEach(proveedor=>{
                    let botones = generarBotones(proveedor.id_proveedor);
                    let nuevoRenglon = tabla.row.add([proveedor.nombre_proveedor,proveedor.direccion_proveedor,proveedor.telefono,botones]).node();
                    $(nuevoRenglon).attr('id', 'renglon_'+proveedor.id_proveedor);
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

function borrarProveedor(){
    $.ajax({
        method:"DELETE",
        url: window.location.origin+"/api/proveedores/"+idSeleccionadoParaEliminar,
        data: {},
        success: function( result ) {
            if (result.estado == 1){
                let tabla = $('#tabla-proveedores').DataTable();
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
        url: window.location.origin+"/api/proveedores/"+idSeleccionadoParaActualizar,
        data: {},
        success: function( result ) {
            if (result.estado == 1){
                let proveedor = result.proveedores;
                document.getElementById('nombreProveedorActualizar').value=proveedor.nombre_proveedor;
                document.getElementById('direccionProveedorActualizar').value=proveedor.direccion_proveedor;
                document.getElementById('telefonoProveedorActualizar').value=proveedor.telefono;
            } else {
                alert(result.mensaje);
            }   
        }
      });
} 


function actualizarProveedor(){
    let nombreProveedor = document.getElementById('nombreProveedorActualizar').value;
    let direccionProveedor = document.getElementById('direccionProveedorActualizar').value;
    let telefonoProveedor = document.getElementById('telefonoProveedorActualizar').value;

    $.ajax({
        method:"PUT",
        url: window.location.origin+"/api/proveedores/"+idSeleccionadoParaActualizar,
        data: {
            nombre: nombreProveedor,
            direccion: direccionProveedor,
            telefono: telefonoProveedor
        },
        success: function( result ) {
            if (result.estado == 1){
                let tabla = $('#tabla-proveedores').DataTable();
                let renglonTemporal = tabla.row('#renglon_'+idSeleccionadoParaActualizar).data()
                renglonTemporal[0] = nombreProveedor;
                renglonTemporal[1] = direccionProveedor;
                renglonTemporal[2] = telefonoProveedor;
                tabla.row('#renglon_'+idSeleccionadoParaActualizar).data(renglonTemporal).draw()
            } else {
                alert(result.mensaje);
            }   
        }
      });
} 

getProveedores();