import { Component, HostListener, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Snake } from 'src/app/clases/snake';

const GRID_SIZE = [10,10]

type Position = number[];
const DIRECTION :any = {
  'ArrowDown': [1, 0],
  'ArrowUp' : [-1, 0],
  'ArrowRight' : [0, 1],
  'ArrowLeft' : [0, -1],
}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  ngOnInit(){
  }
  openForm = false;
  private readonly initialSize = 3;
  private readonly initialPos = [5,5];
  private readonly intervalo = 150;
  private subscription!: Subscription;

  direction:Position = DIRECTION.ArrowRight;
  food?:Position
  grid: any[][] = this.generateGrid();
  snake = new Snake(this.initialPos, true);
  directionClass!:string;
  perdio=false
  puntos=0;

  constructor() {
    this.generateInitialSnake();
    this.drawGrid();
   }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.perdio) return;
    const direction = DIRECTION[event.key] as number[]
    if ( direction ) {
      this.direction = direction;
      this.directionClass = event.key
      this.forcePosition();
    }
  }

  changeDirection(direction:string){
    const _direction = DIRECTION[direction] as number[]
    if ( _direction ) {
      this.direction = _direction;
      this.directionClass = direction
      this.forcePosition();
    }
  }

  forcePosition(){
    this.cicle()
    this.start();
  }

  range(n:number, fill?:any) {
    if (fill != undefined){
      return  [...Array(n).fill(fill)]
    }
    return  [...Array(n).keys()]
  }

  generateGrid(): boolean[][]{
    return this.range(GRID_SIZE[0]).map(_ => this.range(GRID_SIZE[1], false))
  }

  generateInitialSnake(){
    let pos = [...this.initialPos]
    this.range(this.initialSize).forEach(_ => {
      pos[1] += 1; 
      pos = [...pos]
      this.snake.updatePosition(pos, true)
    })
  }

  generateFood(){
    if (!!!this.food){
      const freeCells = this.grid.map(
        (col, i) => col.filter(val => !val).map((_, j) => [i,j])
      )
      .reduce(
        (acc:any, val) => [...acc, ...val],
        []
      )
      this.food=freeCells[Math.floor(Math.random() * freeCells.length)]
    }
    if (this.food){
      this.grid[this.food[0]][this.food[1]] = 'food'
    }
  }

  lost() {
    const vals = this.snake.getValues()
    return !!vals.splice(1, vals.length - 1)
    .find(part => part[0] == this.snake.position[0] && part[1]==this.snake.position[1])
  }

  start(){
    if (this.subscription){
      this.stop();
    }

    this.subscription = interval(this.intervalo)
    .subscribe( () => this.cicle(this))

    if(this.perdio){
      this.direction = DIRECTION.ArrowRight;
      this.perdio = false;
      this.food= undefined
      this.snake = new Snake(this.initialPos)
      this.puntos = 0;
      this.generateInitialSnake();
      this.drawGrid();
    }
  }

  cicle(that?: this){
    let _this = this;
    if(that){
      _this = that
    }

    const gridY = _this.grid.length - 1;
    const gridX = _this.grid[0].length - 1;

    const posY = _this.direction[0] + _this.snake.position[0]
    const posX = _this.direction[1] + _this.snake.position[1]

    const newPos = [
      posY < 0 ? gridY : posY > gridY ? 0 : posY,
      posX < 0 ? gridX : posX > gridX ? 0 : posX,
    ]

    let newPosHasFood = false;
    if(
      _this.food &&
      newPos[0] == _this.food[0] &&
      newPos[1] == _this.food[1]){
        _this.food = undefined
        newPosHasFood = true
        _this.puntos += 1;
    }

    if(_this.lost()){
      _this.stop();
      _this.perdio = true;
      _this.openForm = true;
    } else {
      _this.drawGrid();
    }

    _this.snake.updatePosition(newPos, newPosHasFood)
  }

  stop(){
    this.subscription.unsubscribe();
  }

  drawGrid(){
    this.grid = this.generateGrid();
    const snakeVals =this.snake.getValues();

    snakeVals.map(position => {
      this.grid[position[0]][position[1]] = true;
    })

    this.grid[this.snake.position[0]][this.snake.position[1]] = "head"

    this.generateFood();
  }

  handleClose(_:any){
    this.openForm = false
  }

}
