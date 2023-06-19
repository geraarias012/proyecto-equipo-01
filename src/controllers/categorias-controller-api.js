const { response, request } = require('express'); 
const { miConexion } = require('../database/db')
const categoriasAPI = {};

categoriasAPI.getTodasCategorias = async (request,response,next)=>{
    try{
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM categorias');
        if(rows.length>0){
            response.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                categorias:rows
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Registros no encontrados",
                categorias:[]
            })
        }
        } catch (error){
            next(error);
        }
}


categoriasAPI.getCategoriaPorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM categorias WHERE id_categoria = ?',[id]);
        if(rows.length>0){
            response.status(200).json({
                estado:1,
                mensaje:"Categoria encontrada",
                categorias:rows[0]
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada",
                categorias:rows
            })
        }
    } catch (error) {
        next(error)
    }

}

categoriasAPI.deleteCategoriaPorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM categorias WHERE id_categoria = ?',[id]);
        if(resultado[0].affectedRows>0){
            response.status(200).json({
                estado:1,
                mensaje:"Categoria eliminada",
            })
        } else {
            response.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada",

            })
        }
    } catch (error) {
        next(error)
    }

}

categoriasAPI.postCategoria = async (request,response,next)=>{
    try {
        const { nombre, observaciones} = request.body;
        if(nombre==undefined||observaciones==undefined){
            response.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros"
            })
        } else {
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO categorias(nombre_categoria,descripcion_categoria) VALUES(?,?)',[nombre,observaciones]);
            if(resultado[0].affectedRows>0){
                response.status(201).json({
                    estado:1,
                    mensaje:"Categoria creada",
                    categoria:{
                        id              :   resultado[0].insertId,
                        nombre          :   nombre,
                        observaciones   :   observaciones
                    }
                })
            } else {
                response.status(500).json({
                    estado:0,
                    mensaje:"Categoria no creada"
                })
            }
        }
    }
    catch (error) {
         next(error)
    }
}

categoriasAPI.putCategoriaPorID = async (request,response,next)=>{
    try {
        const { id } = request.params;
        const {nombre, observaciones} = request.body;
        if(nombre==undefined||observaciones==undefined){
            response.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros"
            })
        } else {
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE categorias SET nombre_categoria = ?, descripcion_categoria = ? WHERE id_categoria = ?',[nombre,observaciones,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    response.status(200).json({
                        estado:1,
                        mensaje:"Categoria actualizada",
                        categoria:{
                            id              :   resultado[0].insertId,
                            nombre          :   nombre,
                            observaciones   :   observaciones
                        }
                    })
                } else {
                    response.status(200).json({
                        estado:0,
                        mensaje:"Categoria no actualizada"
                    })
                }
            } else {
                response.status(404).json({
                    estado:0,
                    mensaje:"Categoria no encontrada"
                })
            } 
        }
    }
    catch (error) {
         next(error)
    }
}


module.exports=categoriasAPI;