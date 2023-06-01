import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { PuntajeService } from 'src/app/servicios/puntaje.service';

const CANTIDAD_INTENTOS_FALLIDOS = 5;

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  readonly abecedario = (
    "A,B,C,D,E,F,G,H,I,J,K,L,M,N,Ñ,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",")
  );

  palabra!: string;
  intentosFallidos: number=0;
  letrasElegidas:string[]=[]
  juegoTerminado = false;
  intentos = CANTIDAD_INTENTOS_FALLIDOS
  openForm = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/diccionario.txt',{ responseType: 'text' })
      .pipe(
        // convertir texto a uppercase
        map(text => text.toUpperCase()),
        // sacar acentos
        map(text => this.removeAccents(text)),
        // separar cada linea
        map(text => text.split('\n')),
    ).subscribe(
      (words: string[]) => {
        this.palabra = words[Math.floor(Math.random()*words.length)]
      }
    )
  }

  letrasPalabra(){
    return this.palabra.trim().split('')
  }

  removeAccents = (str:string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  onlyUnique(value:string, index:number, self: string[]) {
    return self.indexOf(value) === index;
  }

  estaEnLaPalabra(letra:string){
    return !!!this.palabra.includes(letra)
  }

  gano(){
    return !!!this.letrasPalabra().find(letra => !this.letrasElegidas.includes(letra))
  }

  elegirLetra(letra:string){
    this.letrasElegidas.push(letra)
    if (!this.palabra.includes(letra)){
      this.intentosFallidos ++;
      this.intentos = CANTIDAD_INTENTOS_FALLIDOS - this.intentosFallidos
    }
    if (
      !(this.intentosFallidos < CANTIDAD_INTENTOS_FALLIDOS) ||
      this.gano()
      ) {
        this.juegoTerminado = true
        this.openForm = true
        // this.puntajeService.CreateScore(this.intentos * 5, 'ahorcado')
    }
  }

  handleClose(value: any){
    this.openForm = false;
  }

}
