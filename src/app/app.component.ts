import { AfterContentInit, Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterContentInit {
  numLinea = 3;
  cuentaTotal = 0;

  productos: {nombre: string; precio: number} []= [
    {nombre:'Baguette', precio:5},
    {nombre:'Pan de Barra', precio:2.5},
    {nombre:'Pan Arabe', precio: 3},
    {nombre:'Pan Bimbo', precio:3.75},
    {nombre:'Pan de Punta', precio: 4.5},
    {nombre:'Coca Cola', precio:2},
    {nombre:'Tabaco', precio:4.80}
  ]

  art = {
    linea: this.numLinea,
    nombre:"",
    precio:0,
    cantidad:0,
    total:0
  }

  lineaPedido = [{linea:1, nombre:'Tabaco', precio:4.80, cantidad:2, total:9.60},
  {linea:2, nombre:'Coca Cola', precio:2, cantidad:5, total:10}];

  hayRegistros(){
    return this.lineaPedido.length > 0;
  }

  ngAfterContentInit(): void {
    this.calcularPrecio()
  }

  setPrecio(){
    for(var i = 0; i < this.productos.length; i++){
      if(this.productos[i].nombre == this.art.nombre){
        this.art.precio = this.productos[i].precio;
      }  
    }
  }

  borrar(linea:number){
    for(let i = 0; i < this.lineaPedido.length; i++){
      if(this.lineaPedido[i].linea==linea){
        this.lineaPedido.splice(i , 1);
        this.art.linea = --this.numLinea; 
      }
    }
    this.calcularPrecio();
    return;
  }

  imprimirPedido(){
    let mensaje: string = "";
    if(this.lineaPedido.length > 0){
      mensaje+= "FACTURA PEDIDO\n"
      for(let i = 0; i < this.lineaPedido.length; i++){
        mensaje+= `${this.lineaPedido[i].linea}.- ${this.lineaPedido[i].nombre} -> ${this.lineaPedido[i].precio} -> ${this.lineaPedido[i].cantidad} -> ${this.lineaPedido[i].total}€` + "\n"
      }
      mensaje += `\nTOTAL: ${this.cuentaTotal} €`
      alert(mensaje);
    } else {
      alert("No se ha añadido ningun articulo al pedido")
    }
   
  }

  ordenarArray(){
    for(let i = 0; i < this.lineaPedido.length; i++){
      this.lineaPedido[i].linea = i + 1;
    }
    return;
  }

  agregar(){
    if(!this.art.nombre || !this.art.cantidad){
      alert("Debe seleccionar un producto e ingresar una cantidad")
    } else if(isNaN(this.art.cantidad) || this.art.cantidad < 0){
      alert("La cantidad debe ser un numero entero mayor a 0")
    } else {
      this.lineaPedido.push({linea:this.numLinea++,
                          nombre:this.art.nombre,
                          precio:this.art.precio,
                          cantidad: this.art.cantidad,
                          total: this.art.precio * this.art.cantidad});
      this.art.linea=this.numLinea;
      this.art.nombre="";	
      this.art.precio=0;    
      this.art.cantidad=0;
      this.art.total=0;
      this.calcularPrecio();
    }
  }


  modificar() {
    for(let x=0;x<this.lineaPedido.length;x++){
    if (this.lineaPedido[x].linea==this.art.linea){
      if(!this.art.nombre || !this.art.cantidad){
        alert("Debe seleccionar un producto e ingresar una cantidad")
        return;
      } else if(isNaN(this.art.cantidad) || this.art.cantidad < 0){
        alert("La cantidad debe ser un numero entero mayor a 0")
        return;
      } else {
        this.lineaPedido[x].nombre=this.art.nombre;
        this.lineaPedido[x].precio=this.art.precio;
        this.lineaPedido[x].cantidad= this.art.cantidad;
        this.lineaPedido[x].total= this.art.cantidad * this.art.precio;
        this.calcularPrecio();
        return;     
      }
    }
  }
  alert('No existe la linea de pedido ingresada');
}

  calcularPrecio(){
    let sumaTotal = 0;
    for(let i = 0; i < this.lineaPedido.length; i++){
      sumaTotal+= (this.lineaPedido[i].cantidad * this.lineaPedido[i].precio)
    }
    this.cuentaTotal = sumaTotal;
  }

  seleccionar(art: { linea: number; nombre: string; precio: number; cantidad:number; total:number}) {
    this.art.linea=art.linea;
    this.art.nombre=art.nombre;
    this.art.precio=art.precio;
    this.art.cantidad= art.cantidad;
    this.art.total= art.total;
  }
}
