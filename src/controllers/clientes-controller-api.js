const { response, request } = require('express'); 
const { miConexion } = require('../database/db')
const clientesAPI = {};

clientesAPI.getTodosClientes = async (request,response,next)=>{
    try{
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM clientes');
        if(rows.length>0){
            response.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                clientes:rows
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Registros no encontrados",
                clientes:[]
            })
        }
        } catch (error){
            next(error);
        }
}


clientesAPI.getClientePorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM clientes WHERE id_cliente = ?',[id]);
        if(rows.length>0){
            response.status(200).json({
                estado:1,
                mensaje:"Cliente encontrado",
                clientes:rows[0]
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Cliente no encontrado",
                clientes:rows
            })
        }
    } catch (error) {
        next(error)
    }

}

clientesAPI.deleteClientePorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM clientes WHERE id_cliente = ?',[id]);
        if(resultado[0].affectedRows>0){
            response.status(200).json({
                estado:1,
                mensaje:"Cliente eliminado",
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Cliente no encontrado",

            })
        }
    } catch (error) {
        next(error)
    }

}

clientesAPI.postCliente = async (request,response,next)=>{
    try {
        const {nombre, direccion, telefono} = request.body;
        if(nombre==undefined||direccion==undefined||telefono==undefined){
            response.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros"
            })
        } else {
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO clientes(nombre_cliente,direccion_clientes,telefono) VALUES(?,?,?)',[nombre,direccion,telefono]);
            if(resultado[0].affectedRows>0){
                response.status(201).json({
                    estado:1,
                    mensaje:"Cliente creado",
                    cliente:{
                        id              :   resultado[0].insertId,
                        nombre          :   nombre,
                        direccion       :   direccion,
                        telefono        :   telefono
                    }
                })
            } else {
                response.status(500).json({
                    estado:0,
                    mensaje:"Cliente no creado"
                })
            }
        }
    }
    catch (error) {
         next(error)
    }
}

clientesAPI.putClientePorID = async (request,response,next)=>{
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
            const resultado = await conexion.query('UPDATE clientes SET nombre_cliente = ?, direccion_clientes = ?, telefono = ? WHERE id_cliente = ?',[nombre,direccion, telefono,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    response.status(200).json({
                        estado:1,
                        mensaje:"Cliente actualizado",
                        cliente:{
                            id              :   resultado[0].insertId,
                            nombre          :   nombre,
                            direccion       :   direccion,
                            telefono        :   telefono
                        }
                    })
                } else {
                    response.status(200).json({
                        estado:0,
                        mensaje:"Cliente no actualizado"
                    })
                }
            } else {
                response.status(404).json({
                    estado:0,
                    mensaje:"Cliente no encontrado"
                })
            } 
        }
    }
    catch (error) {
         next(error)
    }
}


module.exports=clientesAPI;