let idSeleccionadoParaEliminar = 0;
let idSeleccionadoParaActualizar = 0;

 function crearCliente(){
    const nombreClienteAlta = document.getElementById('nombreClienteAlta').value
    const direccionClienteAlta = document.getElementById('direccionClienteAlta').value
    const telefonoClienteAlta = document.getElementById('telefonoClienteAlta').value
    $.ajax({
        method:"POST",
        url: window.location.origin+"/api/clientes",
        data: {
            nombre:nombreClienteAlta,
            direccion:direccionClienteAlta,
            telefono:telefonoClienteAlta
        },
        success: function( result ) {
            let cliente = result.cliente;
            let tabla = $('#tabla-clientes').DataTable();
            let botones = generarBotones(cliente.id);
            let nuevoRenglon = tabla.row.add([cliente.nombre,cliente.direccion,cliente.telefono,botones]).node();
            $(nuevoRenglon).attr('id', 'renglon_'+cliente.id);
            tabla.draw(false);
        }
      });
}

function getClientes(){
    $.ajax({
        method:"GET",
        url: window.location.origin+"/api/clientes",
        data: {},
        success: function( result ) {
            if(result.estado==1){
                const clientes = result.clientes;
                $.noConflict();
                let tabla = $('#tabla-clientes').DataTable();
                clientes.forEach(cliente=>{
                    let botones = generarBotones(cliente.id_cliente);
                    let nuevoRenglon = tabla.row.add([cliente.nombre_cliente,cliente.direccion_clientes,cliente.telefono,botones]).node();
                    $(nuevoRenglon).attr('id', 'renglon_'+cliente.id_cliente);
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

function borrarCliente(){
    $.ajax({
        method:"DELETE",
        url: window.location.origin+"/api/clientes/"+idSeleccionadoParaEliminar,
        data: {},
        success: function( result ) {
            if (result.estado == 1){
                let tabla = $('#tabla-clientes').DataTable();
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
        url: window.location.origin+"/api/clientes/"+idSeleccionadoParaActualizar,
        data: {},
        success: function( result ) {
            if (result.estado == 1){
                let cliente = result.clientes;
                document.getElementById('nombreClienteActualizar').value=cliente.nombre_cliente;
                document.getElementById('direccionClienteActualizar').value=cliente.direccion_clientes;
                document.getElementById('telefonoClienteActualizar').value=cliente.telefono;
            } else {
                alert(result.mensaje);
            }   
        }
      });
} 


 function actualizarCliente(){
    let nombreCliente = document.getElementById('nombreClienteActualizar').value;
    let direccionCliente = document.getElementById('direccionClienteActualizar').value;
    let telefonoCliente = document.getElementById('telefonoClienteActualizar').value;

    $.ajax({
        method:"PUT",
        url: window.location.origin+"/api/clientes/"+idSeleccionadoParaActualizar,
        data: {
            nombre: nombreCliente,
            direccion: direccionCliente,
            telefono: telefonoCliente
        },
        success: function( result ) {
            if (result.estado == 1){
                let tabla = $('#tabla-clientes').DataTable();
                let renglonTemporal = tabla.row('#renglon_'+idSeleccionadoParaActualizar).data()
                renglonTemporal[0] = nombreCliente;
                renglonTemporal[1] = direccionCliente;
                renglonTemporal[2] = telefonoCliente;
                tabla.row('#renglon_'+idSeleccionadoParaActualizar).data(renglonTemporal).draw()
            } else {
                alert(result.mensaje);
            }   
        }
      });
} 

getClientes();