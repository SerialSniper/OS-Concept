class Window {
    static x = 200;
    static y = 50;
    static width = 640;
    static height = 360;

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
    
    static duration = 500;

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

    static async animate(canvas, ctx) {
        for(let i = 0, j = 0; i <= this.duration * 2; i += 10) {
            ctx.fillStyle = '#f00';

            if(i >= 0 && i <= this.duration)
                this.animation_width = i;
            
            if(i >= this.duration * 0.8 && i <= this.duration * 2)
                this.animation_top = Math.round((Icon.top - this.top) / this.duration * (j += 10));

            this.animation_bottom = this.animation_top + this.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height - Icon.height);

            ctx.beginPath();
            ctx.moveTo(this.left + this.left_vertices[0], this.animation_top + this.top);

            for(let y = this.animation_top; y <= this.animation_bottom; y++)
                ctx.lineTo(this.left + this.left_vertices[y] / this.duration * this.animation_width, y + this.top);

            for(let y = this.animation_bottom; y >= this.animation_top; y--)
                ctx.lineTo(this.right + this.right_vertices[y] / this.duration * this.animation_width, y + this.top);

            ctx.closePath();
            ctx.fill();
            
            // this.outLine(canvas, ctx);

            await new Promise(r => setTimeout(r, 1));
        }
    }

    static async animateUp(canvas, ctx) {
        for(let i = this.duration * 2, j = (this.duration * 1.2 + 10); i >= 0; i -= 10) {
            ctx.fillStyle = '#f00';

            if(i >= 0 && i <= this.duration)
                this.animation_width = i;
            
            if(i >= this.duration * 0.8 && i <= this.duration * 2)
                this.animation_top = Math.round((Icon.top - this.top) / this.duration * (j -= 10));
                
            this.animation_bottom = this.animation_top + this.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height - Icon.height);

            ctx.beginPath();
            ctx.moveTo(this.left + this.left_vertices[0], this.animation_top + this.top);

            for(let y = this.animation_top; y <= this.animation_bottom; y++)
                ctx.lineTo(this.left + this.left_vertices[y] / this.duration * this.animation_width, y + this.top);

            for(let y = this.animation_bottom; y >= this.animation_top; y--)
                ctx.lineTo(this.right + this.right_vertices[y] / this.duration * this.animation_width, y + this.top);

            ctx.closePath();
            ctx.fill();
            
            // this.outLine(canvas, ctx);

            await new Promise(r => setTimeout(r, 1));
        }
    }

    static outLine(canvas, ctx) {
        ctx.fillStyle = '#000';

        ctx.moveTo(this.left, this.top);
        
        for(let y = 0; y <= this.left_vertices.length; y++)
            ctx.lineTo(this.left + this.left_vertices[y], y + this.top);

        ctx.stroke();
        
        ctx.moveTo(this.right, this.top);

        for(let y = 0; y <= this.right_vertices.length; y++)
            ctx.lineTo(this.right + this.right_vertices[y], y + this.top);

        ctx.stroke();
    }

    static draw(canvas, ctx) {
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        this.genVertices();
        // this.outLine(canvas, ctx);

        $(document).on("click", function() {
            if(!this.done) {
                Window.animate(canvas, ctx);
                this.done = true;
            } else {
                Window.animateUp(canvas, ctx);
                this.done = false;
            }
        });
    }
}