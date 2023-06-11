import { Component } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  pokemons : any[] = [];
  correctPokemon : any = {};

/**
 *
 */
constructor(private pokeApi : PokeapiService) {
  this.startGame();
  
}

async onChoose(value : string){
  if(value == this.correctPokemon.name){
    document.getElementById(value)?.classList.add("correct-option")
    await new Promise(f => setTimeout(f, 1000));
    this.startGame()
  }
  else{
    document.getElementById(value)?.classList.add("incorrect-option")
    await new Promise(f => setTimeout(f, 1000));
    this.startGame()
  }

}

startGame(){
  this.pokeApi.getPokemons().subscribe(x => {
    this.pokemons = x.pokemons;
    this.correctPokemon = x.correctPokemon;
    console.log(this.pokemons, this.correctPokemon)
  });
}

}
