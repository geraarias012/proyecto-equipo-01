const { response, request } = require('express'); 
const { miConexion } = require('../database/db')
const proveedoresAPI = {};

proveedoresAPI.getTodosProveedores = async (request,response,next)=>{
    try{
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM proveedores');
        if(rows.length>0){
            response.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                proveedores:rows
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Registros no encontrados",
                proveedores:[]
            })
        }
        } catch (error){
            next(error);
        }
}


proveedoresAPI.getProveedorPorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM proveedores WHERE id_proveedor = ?',[id]);
        if(rows.length>0){
            response.status(200).json({
                estado:1,
                mensaje:"Proveedor encontrado",
                proveedores:rows[0]
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Proveedor no encontrado",
                proveedores:rows
            })
        }
    } catch (error) {
        next(error)
    }

}

proveedoresAPI.deleteProveedorPorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM proveedores WHERE id_proveedor = ?',[id]);
        if(resultado[0].affectedRows>0){
            response.status(200).json({
                estado:1,
                mensaje:"Proveedor eliminado",
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Proveedor no encontrado",

            })
        }
    } catch (error) {
        next(error)
    }

}

proveedoresAPI.postProveedor = async (request,response,next)=>{
    try {
        const {nombre, direccion, telefono} = request.body;
        if(nombre==undefined||direccion==undefined||telefono==undefined){
            response.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros"
            })
        } else {
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO proveedores(nombre_proveedor,direccion_proveedor,telefono) VALUES(?,?,?)',[nombre,direccion,telefono]);
            if(resultado[0].affectedRows>0){
                response.status(201).json({
                    estado:1,
                    mensaje:"Proveedor creado",
                    proveedor:{
                        id              :   resultado[0].insertId,
                        nombre          :   nombre,
                        direccion       :   direccion,
                        telefono        :   telefono
                    }
                })
            } else {
                response.status(500).json({
                    estado:0,
                    mensaje:"Proveedor no creado"
                })
            }
        }
    }
    catch (error) {
         next(error)
    }
}

proveedoresAPI.putProveedorPorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const {nombre, direccion, telefono} = request.body;
        if(nombre==undefined||direccion==undefined||telefono==undefined){
            response.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros"
            })
        } else {
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE proveedores SET nombre_proveedor = ?, direccion_proveedor = ?, telefono = ? WHERE id_proveedor = ?',[nombre,direccion,telefono,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    response.status(200).json({
                        estado:1,
                        mensaje:"Proveedor actualizado",
                        proveedor:{
                            id              :   resultado[0].insertId,
                            nombre          :   nombre,
                            direccion       :   direccion,
                            telefono        :   telefono
                        }
                    })
                } else {
                    response.status(200).json({
                        estado:0,
                        mensaje:"Proveedor no actualizado"
                    })
                }
            } else {
                response.status(404).json({
                    estado:0,
                    mensaje:"Proveedor no encontrado"
                })
            } 
        }
    }
    catch (error) {
         next(error)
    }
}


module.exports=proveedoresAPI;