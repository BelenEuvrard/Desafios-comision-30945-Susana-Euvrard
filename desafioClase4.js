



class Contenedor {

    constructor(archivo){
        this.archivo = archivo
        
    }
   
    save(producto) {
        let productos = [];
        productos.push(producto)
        producto.id = this.generarId(productos) + 1;
        const fs = require('fs')
        fs.writeFile(this.archivo, JSON.stringify(productos), error =>{
            if (error) {
                console.log('Error al Guardar el Archivo.');
            } else {
                
                console.log('Productos Guardados.');
            }
        })
    
    }
        
     generarId(productos) {
            let id = 1;
            productos.map(prod => {
                if (prod.id>id) {
                    id = prod.id;
                }
            })
            return id;
        }
    
    getById(Number, producto) {
            let productos = []; 
            const fs = require('fs');       
            productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
                if (error) {
                    console.log('No existen Productos.')
                    producto(null);
                } else {
                    productos = JSON.parse(contenido);
                    const prod = productos.find( prod => prod.id==Number);
                    producto(prod);
                }
            });
        }   

    getAll(all) {
            let productos = []; 
            const fs = require('fs');       
            productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
                if (error) {
                    console.log('No existen Productos.')
                    all(null);
                } else {
                    productos = JSON.parse(contenido);
                    all(productos);
                }
            });
        } 
        deleteById(Number) {
            let productos = []; 
            const fs = require('fs');       
            productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
                if (error) {
                    console.log('No existen Productos. Nada para Borrar')
                } else {
                    productos = JSON.parse(contenido);
                    const prod = productos.find( prod => prod.id==Number);
                    try {
                        if (prod.length==0) {
                            console.log(`No se Encontró el Producto con ID ${Number}`);
                        } else {
                            const i = productos.indexOf(prod);
                            console.log(`Indice ${i}`)
                            productos.splice(i, 1);
                            this.guardarProductos(productos)
                            console.log(`Producto con ID ${Number} Eliminado ¡¡¡¡`);
                        }
                    } catch {
                        console.log(`No se Encontró el Producto con ID ${Number}`);
                    }                
                }
            });
        }
    
        deleteAll() {
            const fs = require('fs');       
            fs.unlink(this.archivo, error => {
                if (error) {
                    console.log('No se Pudieron Eliminar los Productos.');
                } else {
                    console.log('Productos Eliminados.');
                }
            })  
        }
   
}


const nuevoProducto = {
    title: 'SAMSUNG GALAXY A12 - SM -A127M AZUL',                                                                                                                                 
    price: 32900,                                                                                                                                     
    thumbnail: 'imagen',   
}

const telefonos = new Contenedor('productos.json')

telefonos.save(nuevoProducto)

/* se dejo comentado las llamadas a modo que quede el productos.json con la primer llamada save*/

//telefonos.getById(2, (prod) => {
//    console.log('Producto Econtrado: '+JSON.stringify(prod));
//})

//telefonos.getAll((prods) => {
//    console.log('Conjunto de Productos: '+JSON.stringify(prods));
//})

//telefonos.deleteById(2);
//telefonos.deleteAll();

