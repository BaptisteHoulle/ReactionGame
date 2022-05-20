class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.blockSize = SQUARE_SIZE;
        this.blocks = [];
        this.addBlock(this.x, this.y);
        this.alive = true;
    }

    addBlock(x, y) {
        const block = new Block(x, y, this.blockSize);
        this.blocks.push(block);
    }

    init() {
        this.alive = true;
        this.blocks = [];
        const block = new Block(this.x, this.y, this.blockSize);
        this.blocks.push(block);
        block.draw();
    }

    moveHead() {
        const head = this.blocks[0];
        head.oldX = head.x;
        head.oldY = head.y;
        switch (CurrentDirection) {
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            default:
                break;
        }
        head.teleportIfOutOfMap();
    }

    CalculateNewBlockPosition() {
        let {
            x,
            y
        } = this.blocks[this.blocks.length - 1];

        switch (CurrentDirection) {
            case 'left':
                x += 1;
                break;
            case 'right':
                x -= 1;
                break;
            case 'up':
                y += 1;
                break;
            case 'down':
                y -= 1;
                break;
            default:
                break;
        }
        return {
            x,
            y
        };
    }

    eat() {
        const head = this.blocks[0];
        if (head.x === food.x && head.y === food.y) {
            food.setRandomPostion();
            const {
                x,
                y
            } = this.CalculateNewBlockPosition(head);
            this.addBlock(x, y);
        }
    }

    blockTouchHead(block) {
        const head = this.blocks[0];
        const headX = head.x;
        const headY = head.y;

        return (headX === block.x && headY === block.y);
    }


    update() {
        let snake = this;
        snake.moveHead();
        snake.eat();
        for (const [index, block] of snake.blocks.entries()) {
            if (index > 0) {
                const {
                    oldX,
                    oldY
                } = snake.blocks[index - 1];
                block.SetPosition(oldX, oldY);
                if (snake.blockTouchHead(block)) {
                    snake.alive = false;
                    snake.x = 0;
                    snake.y = 0;
                    document.getElementById('playagain').style.display = 'block';

                    document.getElementById('tryagain').addEventListener('click', function () {
                        snake.init();
                        update(true);
                        document.getElementById('playagain').style.display = 'none';
                    });
                }
            }

            block.draw();
        }
    }
}

