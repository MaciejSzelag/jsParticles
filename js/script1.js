const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; //nalezy podac wielkosc canvas
canvas.height = window.innerHeight;

let particlesArray = [];


window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


const mouse = {
    x: undefined,
    y: undefined,
}

//stworzenie eventu na myszke na canvas

canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse.x, mouse.y)

    //tu na koncu. Nalezy z pomoca petli for dodac ilosc do tablicy
    //czyli new Class w push

    for( let i = 0; i < 2; i++){
        particlesArray.push(new Particle())
    }
})


//stworzenie klasy na tworzenie czasteczek 

class Particle {
    //najpierw tworzymy konstruktor ktory powinien zawierac event myszki, rozmiar, oraz predkosc z kierunkiem
    constructor() {
        this.x = mouse.x; //pozycja myszki x
        this.y = mouse.y; //pozycja myszki x
        this.size = Math.random() * 20 + 1; // randomowa wielkosc pomnozona razy 20 pixeli i dadany jeden pixel na kazdym
        this.speedX = Math.random() * 3 - 1.5; // losowy kieunek i predkosc pomnozony razy 3 i odjete 1.5 aby bylow szystko w rozych kierunkach
        this.speedY = Math.random() * 3 - 1.5; //jw


    }

    // metoda na aktualizowanie pozycji kierunku 
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }
    //metoda do tworzenia obiektu lub obiektow

    draw() {
        ctx.fillStyle = "white"; //wypeninienie koloru
        ctx.beginPath(); //poczatek sciezki
        //teraz nalerzy stworzyc okragly obiekt 
        //do tego uzyc mozna arc() ta metoda tworzy kolisty obiekt 
        // arc(x, y, radius, startAngle, endAngle)
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        //metoda  zmieniajaca wszystkie elenty w statyczne wartosci
        ctx.fill();

    }


}

//funkcja trzymajaca wartosci

function handleParticles() {
    // do tego nalezy uzyc petli for aby to robila za kazdym razem 
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

   for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance  = Math.sqrt(dx * dx + dy * dy);
            if(distance < 150){
                ctx.beginPath();
                // ctx.strokeStyle = particlesArray[i].color;
                ctx.strokeStyle = "white";
                // ctx.lineWidth = particlesArray[i].size / 10;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();

            }
        }
        //jesli obiekty bedzie mniejszy badz rowny wartosci.

        if (particlesArray[i].size <= 0.3) { //usuniecie size spowoduje efekt gwiazd (particlesArray[i].size)
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

//metoda uruchamiajaca cala animacje

function anim(){
    ctx.clearRect(0,0, canvas.width, canvas.height) // clearRect(x, y, width, height)
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height); //syntax clearRect(x, y, width, height).The CanvasRenderingContext2D.fillRect() method of the Canvas 2D API draws a rectangle that is filled according to the current fillStyle.
//uruchomienie funkcju trzymajace wartosci
    handleParticles();
    requestAnimationFrame(anim)
}
anim()
