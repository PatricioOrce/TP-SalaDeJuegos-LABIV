import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Carta {
  figura: string;
  valor: number;
}

const NUMERO_CARTAS = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const PALOS = ["♠", "♡", "♢", "♣"];

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayorMenorComponent implements OnInit {
  mazo!: Carta[];
  cartaJugador?: Carta;
  cartaAnterior?: Carta;
  resultado?: string;
  juegoTerminado = false;
  puntos: number = 0;
  openForm = false;

  handleClose(_: any) {
    this.openForm = false;
  }

  constructor(private router : Router) {}

  ngOnInit(): void {
    this.generarMazo();
    this.cartaJugador = this.mazo.pop();
  }

  shuffle(array: Carta[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  generarMazo() {
    const listaDePalos = PALOS.map((palo) =>
      NUMERO_CARTAS.map((numero, index) => ({
        figura: `${numero} ${palo}`,
        valor: index + 1,
      }))
    );

    const mazoSinMezclar = listaDePalos.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue],
      []
    );

    this.mazo = this.shuffle(mazoSinMezclar);
  }

  reiniciarJuego() {
    this.generarMazo();
    this.cartaJugador = this.mazo.pop();
    this.cartaAnterior = undefined;
    this.resultado = undefined;
    this.juegoTerminado = false;
    this.puntos = 0;
  }

  volverAlInicio() {
      this.router.navigate(['/home']);
    
  }

  proximaCarta(guess: '+' | '-') {
    if (this.juegoTerminado) return;

    const siguienteCarta = this.mazo.pop();
    const diff = (siguienteCarta?.valor || 0) - (this.cartaJugador?.valor || 0);
    this.cartaAnterior = this.cartaJugador;
    this.cartaJugador = siguienteCarta;

    if (diff == 0) {
      this.resultado = "Las cartas valían lo mismo, es un EMPATE!";
    } else if (diff > 0 && guess == '+') {
      this.resultado = "La carta era mayor. ¡Ganaste!";
      this.puntos += 1;
    } else if (diff < 0 && guess == '-') {
      this.resultado = "La carta era menor. ¡Ganaste!";
      this.puntos += 1;
    } else if (diff < 0 && guess == '+') {
      this.resultado = "La carta era menor. ¡Perdiste :(";
      this.puntos = 0;
    } else if (diff > 0 && guess == '-') {
      this.resultado = "La carta era mayor. ¡Perdiste :(";
      this.puntos = 0;
    }

    if (this.mazo.length == 0) {
      this.juegoTerminado = true;
      this.openForm = true;
    }
  }
}
