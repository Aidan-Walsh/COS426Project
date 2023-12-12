import { Block, Shape } from ".";


class JBlock extends Shape {
    constructor(parent, x,y,z) {
        super(parent);

        this.items.push(new Block(parent, x, y, z, 2));
        this.items.push(new Block(parent, x + 1, y, z, 2));
        this.items.push(new Block(parent, x - 1, y, z, 2));
        this.items.push(new Block(parent, x - 1, y + 1, z, 2));
        for (const item of this.items){
            this.add(item);
        }
    }

    action(event){
        super.action(event);
        
        if (event.code === "KeyQ") {
            let willCollde = false;
            if (this.orientation == 0){
                if (this.items[1].checkCollision(this.items[1], -1, -1, 0)){
                    willCollde = true;
                }
                if (this.items[2].checkCollision(this.items[2], 1, 1, 0)){
                    willCollde = true;
                }
                if (this.items[3].checkCollision(this.items[3], 2, 0, 0)){
                    willCollde = true;
                }
                if (!willCollde){
                    this.items[1].position.x -= 2;
                    this.items[1].position.y -= 2;
                    this.items[2].position.x += 2;
                    this.items[2].position.y += 2;
                    this.items[3].position.x += 4;
                    this.orientation = 1;
                }
            }
            else if (this.orientation == 1){
                if (this.items[0].position.x == -5){
                    willCollde = true;
                }
                if (this.items[1].checkCollision(this.items[1], -1, 1, 0)){
                    willCollde = true;
                }
                if (this.items[2].checkCollision(this.items[2], 1, -1, 0)){
                    willCollde = true;
                }
                if (this.items[3].checkCollision(this.items[3], 0, -2, 0)){
                    willCollde = true;
                }
                if (!willCollde){
                    this.items[1].position.x -= 2;
                    this.items[1].position.y += 2;
                    this.items[2].position.x += 2;
                    this.items[2].position.y -= 2;
                    this.items[3].position.y -= 4;
                    this.orientation = 2;
                }
            }
            else if (this.orientation == 2){
                if (this.items[1].checkCollision(this.items[1], 1, 1, 0)){
                    willCollde = true;
                }
                if (this.items[2].checkCollision(this.items[2], -1, -1, 0)){
                    willCollde = true;
                }
                if (this.items[3].checkCollision(this.items[3], -2, 0, 0)){
                    willCollde = true;
                }
                if (!willCollde){
                    this.items[1].position.x += 2;
                    this.items[1].position.y += 2;
                    this.items[2].position.x -= 2;
                    this.items[2].position.y -= 2;
                    this.items[3].position.x -= 4;
                    this.orientation = 3;
                }
            }
            else if (this.orientation == 3){
                if (this.items[0].position.x == 5){
                    willCollde = true;
                }
                if (this.items[1].checkCollision(this.items[1], 1, -1, 0)){
                    willCollde = true;
                }
                if (this.items[2].checkCollision(this.items[2], -1, 1, 0)){
                    willCollde = true;
                }
                if (this.items[3].checkCollision(this.items[3], 0, 2, 0)){
                    willCollde = true;
                }
                if (!willCollde){
                    this.items[1].position.x += 2;
                    this.items[1].position.y -= 2;
                    this.items[2].position.x -= 2;
                    this.items[2].position.y += 2;
                    this.items[3].position.y += 4;
                    this.orientation = 0;
                }
            }
        }
    }
}

export default JBlock;