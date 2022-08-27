import { Component, OnInit, Renderer2,ElementRef,ViewChild, Input} from '@angular/core';


/*************************************************************************

Componente para comparar duas (02) imagens:


O componente pai (que contem o visual Boostrap) passará as fontes da imagem para este elemento. 
Lembrar do método (https://angular.io/guide/inputs-outputs) no qual se usam os @decorators 
para passar os valores para o componente filho.

Aprimoramento: 

i) Ajustar a imagem superior : 

preparacion_elementos_DOM_abril_2022


ii) Expandir <---Cronometrado
iii) Contrair



*************************************************************************/

@Component({
  selector: 'app-comparador-imagens',
  templateUrl: './comparador-imagens.component.html',
  styleUrls: ['./comparador-imagens.component.css']
})


export class ComparadorImagensComponent implements OnInit {

  @Input() id!: string;

  @Input() fonte_image_1:string;
  @Input() fonte_image_2:string;
  
  id_image_1:any;
  id_image_2:any;
  
  img: any;
  canvas: any;
  e: any;
  x: any;
  clicked: any;
  slider: any;
  a: any;
  i: any;
  w: any;
  pos: any;
  intervalo: any;

  ngOnInit(): void {    

    //console.log("this.intervalo  "+this.intervalo);
    
    this.id_image_1=this.id+"-image-1";
    this.id_image_2=this.id+"-image-2";

    this.img = document.getElementById(this.id);
    
    this.preparacion_elementos_DOM_abril_2022();

    this.temporizador_elementos_DOM_abril_2022(this.slider.style.left); //

    this.preparacion_eventos_DOM_abril_2022();

    // ??    setTimeout(() => { },500);
    
    this.canvasDesenha(this.fonte_image_1);

  }

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.fonte_image_1="";
    this.fonte_image_2="";

    this.id_image_1=this.id+"-image-1";
    this.id_image_2="";
    
    this.x = 0;
    this.clicked = 0;
    this.slider;
    this.a, this.i, 
    this.w, 
    this.pos=0;
  }
  /*************************************************************************

*************************************************************************/
temporizador_elementos_DOM_abril_2022(inicial:string): void {
  
/*
    console.log(this.slider.style.left+"  this.slider.style.left (this.img.style.width) ");  
 */
    

  this.intervalo=setInterval(() => { 
    
    var previo:String=this.slider.style.left;
    
    if(this.slider.style.left==='0px')
    {
      this.slider.style.left =inicial;
      this.img.style.width=inicial;
    }
    else
    {
      this.slider.style.left ='0px';
      this.img.style.width='0px';
    }   
    
    //console.log(" event");

  }, 1*1000); 
}
  /*************************************************************************
  Os elementos são preparados para este componente, 
  e POSTERIORMENTE
   os eventos são adicionados para o controle do slider.

Projeto Base : https://stackblitz.com/edit/angular-ivy-czukze
*************************************************************************/
preparacion_elementos_DOM_abril_2022(): void {

  
  this.w = this.img.offsetWidth;
  var h = this.img.offsetHeight;

  var proporcionAncho: number = 2;

  this.img.style.width = this.w / proporcionAncho + 'px';

  this.slider = document.createElement('DIV');
  this.img.parentElement.insertBefore(this.slider, this.img);

  //Colocação do Style de forma programática:

  this.slider.style.width = '40px';
  this.slider.style.height = '40px';

  this.slider.style.position = 'absolute';
  this.slider.style.zIndex = '9';
  this.slider.style.cursor = 'ew-resize';
  this.slider.style.backgroundColor = '#2196F3';
  this.slider.style.opacity = '0.7';
  this.slider.style.borderRadius = '50%';

  this.slider.setAttribute('id', this.id+"-slider");

  this.slider.style.top = h / 2 - this.slider.offsetHeight / 2 + 'px';
  
  this.slider.style.left =(this.w / proporcionAncho) - (this.slider.offsetWidth / proporcionAncho) +'px';

}

  /*************************************************************************
  Eventos adicionados de forma separada.
  *************************************************************************/

  preparacion_eventos_DOM_abril_2022(): void {
    /*execute a function when the mouse button is pressed:*/
    this.slider.addEventListener(
      'mousedown',
      this.slideReady_abril_2022.bind(this)
    );
    /*and another function when the mouse button is released:*/
    window.addEventListener('mouseup', this.slideFinish.bind(this));
    /*or touched (for touch screens:*/
    this.slider.addEventListener(
      'touchstart',
      this.slideReady_abril_2022.bind(this)
    );
    /*and released (for touch screens:*/
    window.addEventListener('touchend', this.slideFinish.bind(this));
  }


    /*************************************************************************
  Evento: disparado quando o mouse é clicado (ou tocado), o que se chama de "mousedown".
  *************************************************************************/
  slideReady_abril_2022(e: any): void {
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*the slider is now clicked and ready to move:*/
    this.clicked = 1;
    /*execute a function when the slider is moved:*/
    window.addEventListener('mousemove', this.slideMove.bind(this));
  }

  slideFinish(): void {
    this.clicked = 0;
  }

  /*
  clearInterval(myInterval);
  */
  
  slideMove(e: any): void {

   
    this.img = document.getElementById(this.id_image_2);   
    

    if (this.clicked == 1) {
      
//console.log("????  "+this.intervalo);
      clearInterval(this.intervalo);

      e = e.changedTouches ? e.changedTouches[0] : e;

      this.a = this.img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      this.x = e.pageX - this.a.left;

      /*Importante: considerar las dimensiones de la página:*/

      this.x = this.x - window.pageXOffset;

      //console.log(" dimensiones de la página "+window.pageXOffset);

      this.pos = this.x;

      if (this.pos < 0) this.pos = 0;

      if (this.pos > this.w) {
        this.x = this.w;
        this.pos = this.w;
      }
      //console.log(' w de la página ' + this.w + '   NOVO ' + this.pos);

      this.img.style.width = this.x + 'px';
      this.slider.style.left =
        this.img.offsetWidth - this.slider.offsetWidth / 2 + 'px';

      
    }
  }

  comparar(): void {
    this.img = this.el.nativeElement.querySelector('.img-comp');
    var element = document.getElementById('botao_comparar') as HTMLElement;
    element.style.display = 'none';
  }
/// Canvas:

  /*
  clearInterval(myInterval);
  */
  
  canvasDesenha(texto_canvas:string): void {
   
    this.canvas = document.getElementById(this.id_image_1);   
    
    const ctx = this.canvas.getContext('2d');

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.font = '77px serif';
    ctx.strokeText(texto_canvas, this.canvas.offsetWidth/4, this.canvas.offsetHeight/2);

  }
///////
ngOnChanges(changes:any) {
  //console.log("changes:any "+this.fonte_image_1);
  this.canvasDesenha(this.fonte_image_1);
}
/////////////////////////
////
}
