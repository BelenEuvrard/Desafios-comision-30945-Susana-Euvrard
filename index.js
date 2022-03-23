class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

      getFullName(){
          return (`Mi nombre y apellido es ${this.nombre} ${this.apellido}`);
      }

       addMascota(nombre){
        return (`Mascota : ${this.mascotas.push(nombre)}`);
        
      }
      countMascotas(){
        return (`Total de Mascotas: ${this.mascotas.length}`)

      }

     addBook(nombre,autor){
         return (`Libro :${this.libros.push({nombre ,autor})}`)

     }

     getBookNames(){
         return this.libros.map(libro => libro.nombre)
        
     }

    }



let usuario2 = new Usuario('Belén','Euvrard',[], [])

console.log(usuario2.getFullName());
console.log(usuario2.addMascota('gato'));
console.log(usuario2.addMascota('Loro'));
console.log(usuario2.countMascotas());
console.log(usuario2.addBook('El día que dejo de nevar en Alaska', 'Alice Keller'));
console.log(usuario2.addBook('Orgullo y Prejuicio','Jane Austen'));
console.log("Los titulos de mis Libros son:", usuario2.getBookNames());
console.log(usuario2);