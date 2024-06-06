import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, getDoc, doc, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seguro-edit',
  templateUrl: './seguro-edit.page.html',
  styleUrls: ['./seguro-edit.page.scss'],
})
export class SeguroEditPage implements OnInit {
  id: any;
  seguro: any = {
    codigo: '',
    nombre: '',
    apellido: '',
    fecha: null // Agregamos el campo para la fecha de inscripcion
  };

  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private rt: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      if (this.id) {
        this.obtenerSeguro(this.id);
      }
    });
  }


  incluirSeguro = () => {
    console.log('Agregando registro en Firebase...');
    let seguroRef = collection(this.firestore, 'seguro');

    addDoc(
      seguroRef,
      {
        codigo: (this.seguro.codigo)?(this.seguro.codigo):0,
        nombre: (this.seguro.nombre)?(this.seguro.nombre):"",
        apellido: (this.seguro.apellido)?(this.seguro.apellido):"",
        objeto: (this.seguro.objeto)?(this.seguro.objeto):"",
        monto: (this.seguro.monto)?(this.seguro.monto):0,
        fecha: (this.seguro.fecha)?(new Date(this.seguro.fecha)):new Date(),
        activo: (this.seguro.activo)?(this.seguro.activo):false,
      }

    ).then(doc => {
      console.log('registro agregado');
      this.volver();

    }
    );
  }
  editarSeguro = (id: string) => {
    console.log('Editando registro en Firebase...');
    const document = doc(this.firestore, 'seguro', this.id);

    updateDoc(
      document,
      {
        codigo: (this.seguro.codigo)?(this.seguro.codigo):0,
        nombre: (this.seguro.nombre)?(this.seguro.nombre):"",
        apellido: (this.seguro.apellido)?(this.seguro.apellido):"",
        objeto: (this.seguro.objeto)?(this.seguro.objeto):"",
        monto: (this.seguro.monto)?(this.seguro.monto):0,
        fecha: (this.seguro.fecha)?(new Date(this.seguro.fecha)):new Date(),
  
      }

    ).then(doc => {
      console.log('registro editado');
      this.volver();

    }
    );
  }



  obtenerSeguro = (id: string) => {

    const document = doc(this.firestore, 'seguro', id);

    

    getDoc(document).then(doc => {
      console.log('registro a editar', doc.data());
      this.seguro = doc.data();
      // Es un objeto Timestamp de Firestore, lo extrae y lo convierte a una cadena en formato ISO
      const timestamp = this.seguro.fecha; 
      this.seguro.fecha = timestamp.toDate().toISOString(); 
      
    }
    );
  }
 

  volver = () => {
    this.rt.navigate(['/seguro-list']);
  }

  accion = (id: string) => {
    if (this.id) {  
      this.editarSeguro(this.id);
    } else {
      this.incluirSeguro();
    }
    this.volver();
  }
}