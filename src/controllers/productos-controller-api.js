const { response, request } = require('express'); 
const { miConexion } = require('../database/db')
const productosAPI = {};

productosAPI.getTodasProductos = async (request,response,next)=>{
    try{
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM productos');
        if(rows.length>0){
            response.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                productos:rows
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Registros no encontrados",
                productos:[]
            })
        }
        } catch (error){
            next(error);
        }
}


productosAPI.getProductoPorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM productos WHERE id_producto = ?',[id]);
        if(rows.length>0){
            response.status(200).json({
                estado:1,
                mensaje:"Producto encontrado",
                productos:rows[0]
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Producto no encontrado",
                productos:rows
            })
        }
    } catch (error) {
        next(error)
    }

}

productosAPI.deleteProductoPorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM productos WHERE id_producto = ?',[id]);
        if(resultado[0].affectedRows>0){
            response.status(200).json({
                estado:1,
                mensaje:"Producto eliminado",
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Producto no encontrado",

            })
        }
    } catch (error) {
        next(error)
    }

}

productosAPI.postProducto = async (request,response,next)=>{
    try {
        const {descripcion, precio, idCategoria, idProveedor} = request.body;
        if(descripcion==undefined||precio==undefined||idCategoria==undefined||idProveedor==undefined){
            response.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros"
            })
        } else {
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO productos(descripcion_producto,precio_producto,categorias_id_categoria,proveedores_id_proveedor) VALUES(?,?,?,?)',[descripcion,precio,idCategoria,idProveedor]);
            if(resultado[0].affectedRows>0){
                response.status(201).json({
                    estado:1,
                    mensaje:"Producto creado",
                    producto:{
                        id              :   resultado[0].insertId,
                        descripcion     :   descripcion,
                        precio          :   precio,
                        idCategoria     :   idCategoria,
                        idProveedor     :   idProveedor
                    }
                })
            } else {
                response.status(500).json({
                    estado:0,
                    mensaje:"Producto no creado"
                })
            }
        }
    }
    catch (error) {
         next(error)
    }
}

productosAPI.putProductoPorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const {descripcion, precio, idCategoria, idProveedor} = request.body;
        if(descripcion==undefined||precio==undefined||idCategoria==undefined||idProveedor==undefined){
            response.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros"
            })
        } else {
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE productos SET descripcion_producto = ?, precio_producto = ?, categorias_id_categoria = ?, proveedores_id_proveedor = ? WHERE id_producto = ?',[descripcion,precio,idCategoria,idProveedor,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    response.status(200).json({
                        estado:1,
                        mensaje:"Producto actualizado",
                        producto:{
                            id              :   resultado[0].insertId,
                            descripcion     :   descripcion,
                            precio          :   precio,
                            idCategoria     :   idCategoria,
                            idProveedor     :   idProveedor
                        }
                    })
                } else {
                    response.status(200).json({
                        estado:0,
                        mensaje:"Producto no actualizado"
                    })
                }
            } else {
                response.status(404).json({
                    estado:0,
                    mensaje:"Producto no encontrado"
                })
            } 
        }
    }
    catch (error) {
         next(error)
    }
}


module.exports=productosAPI;