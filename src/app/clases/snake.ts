type Position = number[];

export class Snake {
  position!: Position;
  isHead = false;
  child?:Snake;

  constructor(initialPos:Position, isHead=false){
    this.position = initialPos
    this.isHead = isHead
  }

  updatePosition(newPos: Position, hasFood: boolean=false){
    const currPos = [...this.position]

    if (
      newPos[0] == this.position[0] &&
      newPos[1] == this.position[1]
    ) return;

    if(this.child){
      this.child.updatePosition(currPos, hasFood)
    } else if (hasFood){
      this.child = new Snake(currPos);
    }
    this.position = [...newPos];
  }

  getValues(acc:Position[]=[]): Position[]{
    const positions = [...acc, [...this.position]]
    if (this.child){
      return this.child.getValues(positions)
    }
    return positions;
  }
}
