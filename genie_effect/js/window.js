class Window {
    static x = 200;
    static y = 50;
    static width = 640;
    static height = 480;

    static top = this.y;
    static bottom = this.y + this.height;
    static left = this.x;
    static right = this.x + this.width;

    static left_vertices = [];
    static right_vertices = [];

    static animation_top = 0;
    static animation_bottom = this.height;
    static animation_width = 0;

    static done = false;

    static sin(n) {
        return (Math.sin(n * Math.PI / 180) + 1) / 2;
    }

    static drawPixel(ctx, x, y) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + 1, y + 1);
        ctx.stroke();
    }

    static genVertices() {
        let w;
        let h = Icon.top - this.top;
        let k = 180 / h;

        w = Icon.left - this.left;
        for(let y = 0, deg = -90; y < h; y++, deg += k)
            this.left_vertices[y] = this.sin(deg) * w;

        w = Icon.right - this.right;
        for(let y = 0, deg = -90; y < h; y++, deg += k)
            this.right_vertices[y] = this.sin(deg) * w;
    }

    static async renderFrame(canvas, ctx) {

    }

    static async animate(canvas, ctx) {
        this.genVertices();

        let duration = 500;

        for(let i = 0, j = 0, k = 0; i <= duration * 3; i += 10) {
            if(i >= 0 && i <= duration)
                this.animation_width = i;
            
            if(i >= duration * 0.8 && i <= duration * 2)
                this.animation_bottom = Math.round(this.height + (Icon.top - this.bottom) / duration * (j += 10));

            if(i >= duration * 1.3 && i <= duration * 3)
                this.animation_top = Math.round((Icon.top - this.top) / duration * (k += 10));

            ctx.clearRect(0, 0, canvas.width, canvas.height - Icon.height);

            ctx.beginPath();
            ctx.moveTo(this.left_vertices[0], this.animation_top + this.top);

            for(let y = this.animation_top; y <= this.animation_bottom; y++)
                ctx.lineTo(this.left + this.left_vertices[y] / duration * this.animation_width, y + this.top);

            for(let y = this.animation_bottom; y >= this.animation_top; y--)
                ctx.lineTo(this.right + this.right_vertices[y] / duration * this.animation_width, y + this.top);

            ctx.closePath();
            ctx.fill();

            await new Promise(r => setTimeout(r, 1));
        }
    }

    static draw(canvas, ctx) {
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        $(document).on("click", function() {
            if(!this.done) {
                Window.animate(canvas, ctx);
                this.done = true
            }
        });
    }
}