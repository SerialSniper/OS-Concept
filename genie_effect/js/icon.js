class Icon {
    static x;
    static y;
    static width = 50;
    static height = 50;
    
    static top;
    static bottom;
    static left;
    static right;

    static draw(canvas, ctx) {
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height;
        this.top = this.y;
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;

        ctx.fillStyle = '#00f';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}