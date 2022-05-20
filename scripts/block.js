class Block {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.old = x;
        this.old = y;
        this.size = size;
    }

    teleportIfOutOfMap() {
        const maxSize = GAME_SIZE / this.size;
        if (this.x < 0) {
            this.x = maxSize;
        } else if (this.x > maxSize) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = maxSize;
        } else if (this.y > maxSize) {
            this.y = 0;
        }
    }

    SetPosition(x, y) {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }

    drawinit() {
        ctx.fillStyle = 'red';
        ctx.fillRect(0 * this.size, 0 * this.size, this.size, this.size);
    }
}

