const express = require('express');
const fs = require('fs');

const app = express()
const PORT = 3030;
let visitas = 0;
class Contenedor {
    constructor (archivo) {
        this.archivo = archivo;
    }

    save(producto, res) {
        let productos = []; 
               
        productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
            if (error) {
                console.log('No existen Productos.')
                producto.id = 1;
                productos = [];
                productos.push(producto);
                this.guardarProductos(productos);
                res('ok');
            } else {
                try {
                    productos = JSON.parse(contenido);
                    producto.id = this.generarId(productos) + 1;
                    productos.push(producto);
                    this.guardarProductos(productos);
                    res('ok');
                } catch {
                    // fs.unlink(this.archivo, error => {
                    //     if (error === false) {
                    //         console.log('Archivo Eliminado.');
                    //     }
                    // })
                    
                }                           
            }
        });
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
    guardarProductos(productos) {
         
        fs.writeFile(this.archivo, JSON.stringify(productos), error =>{
            if (error) {
                console.log('Error al Guardar el Archivo.');
            } else {
                console.log('Productos Guardados.');
            }
        })
    }
    getById(Number, producto) {
        let productos = []; 
             
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
             
        fs.unlink(this.archivo, error => {
            if (error) {
                console.log('No se Pudieron Eliminar los Productos.');
            } else {
                console.log('Productos Eliminados.');
            }
        })  
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const srv = app.listen(PORT, () => {
    const iphone13 = {
        title: 'Iphone 13 Pro Max 256 GB Sierra Blue',                                                                                                                                 
        price: 1199,                                                                                                                                     
        thumbnail: 'https://www.apple.com/v/iphone-13-pro/d/images/overview/design/finishes_1_sierra_blue__2bovafkl4yaa_large.jpg',             
    }
    const iphone12 = {
        title: 'Iphone 12 Pro Max 256 GB Sierra Blue',                                                                                                                                 
        price: 1000,                                                                                                                                     
        thumbnail: 'https://www.apple.com/v/iphone-12/key-features/e/images/overview/hero/hero_purple__dqiol61kx9oy_large.jpg',             
    }
    const iphone11 = {
        title: 'Iphone 11 Pro Max 256 GB Sierra Blue',                                                                                                                                 
        price: 800,                                                                                                                                     
        thumbnail: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=441&hei=529&fmt=jpeg&qlt=95&.v=1567022175704',             
    }
    const prod = new Contenedor('productos.json')
    prod.save(iphone13, res => {
         prod.save(iphone12, res => {
             prod.save(iphone11, res => {

             });
         });
    });
   console.log(`Servidor http escuchando en el puerto ${srv.address().port}`)
})

srv.on("error", error => console.log(`Error en servidor ${error}`))

function contenedorProd(nombre, price, thumbnail) {
    let html = `<h1 style="background-color: blue;">Producto SELECCIONADO</h1>`;
    html += `<br>`;
    html += `<ul>`
    html += `   <li>Nombre: ${nombre}</li>`
    html += `   <li>Precio USD: ${price}</li>`
    html += `<ul>`
    html += `<img style="width: 500px" src="${thumbnail}" alt="${nombre}"</td>`;
    html += `<br>`
    html += `<a href="/"> Inicio</a>`
    html += `<br>`
    html += `<a href="/productos"> Ver Productos</a>`;
    return html;
}

app.get('/', (req, res) => {
    res.send(`
        <h1> Bienvenido al Portal de Celulares Iphone.</h1>
        <br>
        <br>
        <a href="/productos"> Ver Productos</a>
        <br>
        <a href="/productoRandom"> Ver UN Producto</a>
    `); 
    
})

app.get('/productos', (req, res) => {
    const prod = new Contenedor('productos.json');
    prod.getAll( prods => {
        let html = `<h1 style="background-color: red;">Productos en Stock</h1>`;
        html += `<br>`
        html += `<table>`
        html += `   <tr>`
        html += `       <th>Nombre</th>`
        html += `       <th>Precio</th>`
        html += `       <th>Foto</th>`
        html += `   </tr>`
        for (let p of prods){
                  html += `<tr>`;
                  html += ` <td>${p.title}</td>`;  
                  html += ` <td> USD ${p.price}</td>`;  
                  html += ` <td><img style="width: 50px" src="${p.thumbnail}" alt="${p.title}"</td>`;  
                  html += `</tr>`;
        }
        html += `</table>`
        html += `<br>`
        html += `<a href="/"> Inicio</a>`
        html += `<br>`
        html += `<a href="/productoRandom"> Ver UN Producto</a>`
        res.send(html); 
    });
})

app.get('/productoRandom', (req, res) => {
    const prod = new Contenedor(`productos.json`);
    prod.getAll( prods => {
        const id = getRandomInt(1, prods.length)
        const prod = prods[id];
        res.send(contenedorProd(prod.title, prod.price, prod.thumbnail)); 
    });
})

