let idSeleccionadoParaEliminar = 0;
let idSeleccionadoParaActualizar = 0;

 function crearProducto(){
    const descripcionProductoAlta = document.getElementById('descripcionProductoAlta').value
    const precioProductoAlta = document.getElementById('precioProductoAlta').value
    const categoriaProductoAlta = document.getElementById('categoriaProductoAlta').value
    const proveedorProductoAlta = document.getElementById('proveedorProductoAlta').value
    $.ajax({
        method:"POST",
        url: window.location.origin+"/api/productos",
        data: {
            descripcion:descripcionProductoAlta,
            precio:precioProductoAlta,
            idCategoria:categoriaProductoAlta,
            idProveedor:proveedorProductoAlta
        },
        success: function( result ) {
            let producto = result.producto;
            let tabla = $('#tabla-productos').DataTable();
            let botones = generarBotones(producto.id_producto);
            let nuevoRenglon = tabla.row.add([producto.descripcion,producto.precio,producto.idCategoria,producto.idProveedor,botones]).node();
            $(nuevoRenglon).attr('id', 'renglon_'+producto.id_producto);
            tabla.draw(false);
        }
      });
}

function getProductos(){
    $.ajax({
        method:"GET",
        url: window.location.origin+"/api/productos",
        data: {},
        success: function( result ) {
            if(result.estado==1){
                const productos = result.productos;
                $.noConflict();
                let tabla = $('#tabla-productos').DataTable();
                productos.forEach(producto=>{
                    let botones = generarBotones(producto.id_producto);
                    let nuevoRenglon = tabla.row.add([producto.descripcion_producto,producto.precio_producto,producto.categorias_id_categoria,producto.proveedores_id_proveedor,botones]).node();
                    $(nuevoRenglon).attr('id', 'renglon_'+producto.id_producto);
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
            botones+='<a onclick="javascript: (function() { IdentificarActualizar('+id+'); selectCategoria(); selectProveedor(); })();" data-bs-toggle="modal" data-bs-target="#updateModal" class="btn btn-primary shadow btn-xs sharp me-1"><i class="fas fa-pencil-alt"></i></a>';
            botones+='<a onclick="IdentificarEliminar('+id+');" data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>';
        botones+='</div>';
    return botones;
}


function IdentificarEliminar(id){
    idSeleccionadoParaEliminar = id;

}

function borrarProducto(){
    $.ajax({
        method:"DELETE",
        url: window.location.origin+"/api/productos/"+idSeleccionadoParaEliminar,
        data: {},
        success: function( result ) {
            if (result.estado == 1){
                let tabla = $('#tabla-productos').DataTable();
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
        url: window.location.origin+"/api/productos/"+idSeleccionadoParaActualizar,
        data: {},
        success: function( result ) {
            if (result.estado == 1){
                let producto = result.productos;
                document.getElementById('descripcionProductoActualizar').value=producto.descripcion_producto;
                document.getElementById('precioProductoActualizar').value=producto.precio_producto;
                document.getElementById('categoriaProductoActualizar').value=producto.categorias_id_categoria;
                document.getElementById('proveedorProductoActualizar').value=producto.proveedores_id_proveedor;
            } else {
                alert(result.mensaje);
            }   
        }
      });
} 


 function actualizarProducto(){
    const descripcionProductoAlta = document.getElementById('descripcionProductoActualizar').value
    const precioProductoAlta = document.getElementById('precioProductoActualizar').value
    const categoriaProductoAlta = document.getElementById('categoriaProductoActualizar').value
    const proveedorProductoAlta = document.getElementById('proveedorProductoActualizar').value

    $.ajax({
        method:"PUT",
        url: window.location.origin+"/api/productos/"+idSeleccionadoParaActualizar,
        data: {
            descripcion: descripcionProductoAlta,
            precio: precioProductoAlta,
            idCategoria: categoriaProductoAlta,
            idProveedor: proveedorProductoAlta
        },
        success: function( result ) {
            if (result.estado == 1){
                let tabla = $('#tabla-productos').DataTable();
                let renglonTemporal = tabla.row('#renglon_'+idSeleccionadoParaActualizar).data()
                renglonTemporal[0] = descripcionProductoAlta;
                renglonTemporal[1] = precioProductoAlta;
                renglonTemporal[2] = categoriaProductoAlta;
                renglonTemporal[3] = proveedorProductoAlta;
                tabla.row('#renglon_'+idSeleccionadoParaActualizar).data(renglonTemporal).draw()
            } else {
                alert(result.mensaje);
            }   
        }
      });
} 

function selectCategoria(){
    let opciones;
    $.ajax({
        method:"GET",
        url: window.location.origin+"/api/categorias",
        data: {},
        success: function( result ) {
            if(result.estado==1){
                const categorias = result.categorias;
                categorias.forEach(categoria=>{
                    opciones+='<option value='+categoria.id_categoria+'>'+categoria.nombre_categoria+'</option>';
                }) 
                document.getElementById('categoriaProductoAlta').innerHTML = opciones;
                document.getElementById('categoriaProductoActualizar').innerHTML = opciones;
            } else {
                alert(result.mensaje);
            }
        }
      });
}

function selectProveedor(){
    let opciones1;
    $.ajax({
        method:"GET",
        url: window.location.origin+"/api/proveedores",
        data: {},
        success: function( result ) {
            if(result.estado==1){
                const proveedores = result.proveedores;
                proveedores.forEach(proveedor=>{
                    opciones1+='<option value="'+proveedor.id_proveedor+'">'+proveedor.nombre_proveedor+'</option>';
                }) 
                document.getElementById('proveedorProductoAlta').innerHTML = opciones1;
                document.getElementById('proveedorProductoActualizar').innerHTML = opciones1;
            } else {
                alert(result.mensaje);
            }
        }
      });
}


getProductos();
