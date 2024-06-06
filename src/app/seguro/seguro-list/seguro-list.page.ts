import { Component, OnInit } from '@angular/core';
import { collection, Firestore, doc, deleteDoc, query, limit, getDocs, startAfter, orderBy, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
type FirebaseTimestamp = {
  seconds: number;
  nanoseconds: number;
};

@Component({
  selector: 'app-seguro-list',
  templateUrl: './seguro-list.page.html',
  styleUrls: ['./seguro-list.page.scss'],
})
export class SeguroListPage implements OnInit {
  listaSeguros: any[] = [];
  li = 20;
  stAt: any;
  hayMasDatos: boolean = true;  
  lastVisible: any;
  isSearch: boolean = false;
  query = "";

  constructor(private readonly firestore: Firestore, private rt: Router) { }

  ngOnInit() {
    this.iniciar();
  }

  ionViewWillEnter() {
    this.iniciar();
  }

//Funcion vuelve a iniciar la pagina
  iniciar() {
    this.listaSeguros = [];
    this.lastVisible = null;
    this.listarSeguros();
  }
//Busqueda de listado
  listarSegurosSinFiltro = () => {
    // Obtiene la referencia a la colección en Firestore
    const segurosRef = collection(this.firestore, 'seguro');

    let q = undefined;
    if (this.lastVisible) {
      q = query(segurosRef, limit(this.li), startAfter(this.lastVisible));
    } else {
      q = query(segurosRef, limit(this.li));
    }
    // Ejecuta la consulta y obtiene los registros
    getDocs(q).then(re => {
      if (!re.empty) {
        this.lastVisible = re.docs[re.docs.length - 1];

        re.forEach(doc => {
          let seguro: any = doc.data();
          seguro.id = doc.id;
          this.listaSeguros.push(seguro);
        });
      }
    });
  }

  listarSeguros = () => {
    const segurosRef = collection(this.firestore, 'seguro');

    if ((this.query + "").length > 0) {
      let q = undefined;
      // Construye la consulta de Firestore dependiendo de si hay un último documento visible
      if (this.lastVisible) {
        q = query(segurosRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li),
          startAfter(this.lastVisible));
      } else {
        q = query(segurosRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li));
      }

      getDocs(q).then(re => {
        if (!re.empty) {
          let nuevoArray = new Array();

          for (let i = 0; i < re.docs.length; i++) {
            const doc: any = re.docs[i].data();
            if (doc.nombre.toUpperCase().startsWith(this.query.toUpperCase().charAt(0))) {
              nuevoArray.push(re.docs[i]);
            }
          }

          this.lastVisible = re.docs[nuevoArray.length - 1];
          for (let i = 0; i < nuevoArray.length; i++) {
            const doc: any = nuevoArray[i];
            let seguro: any = doc.data();
            seguro.id = doc.id;
            this.listaSeguros.push(seguro);
          }
        }
      });
    } else {
      this.listarSegurosSinFiltro();
    }
  }

  //Limpieza de lista
  clearSearch = () => {
    this.isSearch = false;
    this.query = "";
    this.listaSeguros = [];
    this.lastVisible = null;
    this.listarSeguros();
  }

  buscarSearch = (e: any) => {
    this.isSearch = false;
    this.query = e.target.value;
    this.listaSeguros = [];
    this.lastVisible = null;
    this.listarSeguros();
  }
// Define una función para la llamada del boton 'nuevo'
  nuevo = () => {
    this.rt.navigate(['/seguro-edit']);
  }
//Elimina el registro
  eliminarSeguro = (id: string) => {
    console.log('Eliminando seguro en Firebase...');
    deleteDoc(doc(this.firestore, 'seguro', id)).then(() => {
      console.log('Registro eliminado correctamente');
      // Actualizar la lista de registro después de eliminar
      this.iniciar();
    }).catch((error) => {
      console.error("Error al eliminar el registro: ", error);
      
    });
  }

  clickSearch = () => {
    this.isSearch = true;
  }
//Desplazamiento del scroll infinito
  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    if (this.hayMasDatos) {
      this.listarSeguros();
    }
    setTimeout(() => {
      ev.target.complete();
      if (!this.hayMasDatos) {
        ev.target.disabled = true;  
      }
    }, 500);
  }

  formatearFecha(timestamp: FirebaseTimestamp, locale: string = 'es-ES'): string {
    // Convierte los segundos del timestamp a milisegundos
    const milisegundos = (timestamp.seconds * 1000) + (timestamp.nanoseconds / 1000000);

  
    const fecha = new Date(milisegundos);

    
    const opciones: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };


    const fechaFormateada = fecha.toLocaleDateString(locale, opciones);
    /*Retorna el objeto timestamp del tipo FirebaseTimestamp 
    y lo formatea en una cadena de fecha según una configuración regional (locale)*/
    return fechaFormateada; 
  }
}