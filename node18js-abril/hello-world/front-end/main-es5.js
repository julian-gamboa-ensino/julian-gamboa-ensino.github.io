(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    "+oQJ":
    /*!*****************************************************************************!*\
      !*** ./src/app/components/comparador-canvas/comparador-canvas.component.ts ***!
      \*****************************************************************************/

    /*! exports provided: ComparadorCanvasComponent */

    /***/
    function oQJ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ComparadorCanvasComponent", function () {
        return ComparadorCanvasComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
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


      var ComparadorCanvasComponent = /*#__PURE__*/function () {
        function ComparadorCanvasComponent(renderer, el) {
          _classCallCheck(this, ComparadorCanvasComponent);

          this.renderer = renderer;
          this.el = el;
          this.fonte_image_1 = "";
          this.fonte_image_2 = "";
          this.id_image_1 = this.id + "-image-1";
          this.id_image_2 = "";
          this.x = 0;
          this.clicked = 0;
          this.slider;
          this.a, this.i, this.w, this.pos = 0;
        }

        _createClass(ComparadorCanvasComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            //console.log("this.intervalo  "+this.intervalo);
            this.id_image_1 = this.id + "-image-1";
            this.id_image_2 = this.id + "-image-2";
            this.img = document.getElementById(this.id);
            this.preparacion_elementos_DOM_abril_2022();
            this.temporizador_elementos_DOM_abril_2022(this.slider.style.left); //

            this.preparacion_eventos_DOM_abril_2022();
            this.canvasDesenha(this.fonte_image_1);
          }
          /*************************************************************************
           *************************************************************************/

        }, {
          key: "temporizador_elementos_DOM_abril_2022",
          value: function temporizador_elementos_DOM_abril_2022(inicial) {
            var _this = this;

            /*
                console.log(this.slider.style.left+"  this.slider.style.left (this.img.style.width) ");
             */
            this.intervalo = setInterval(function () {
              var previo = _this.slider.style.left;

              if (_this.slider.style.left === '0px') {
                _this.slider.style.left = inicial;
                _this.img.style.width = inicial;
              } else {
                _this.slider.style.left = '0px';
                _this.img.style.width = '0px';
              } //console.log(" event");

            }, 5 * 1000);
          }
          /*************************************************************************
          Os elementos são preparados para este componente,
          e POSTERIORMENTE
           os eventos são adicionados para o controle do slider.
           Projeto Base : https://stackblitz.com/edit/angular-ivy-czukze
          *************************************************************************/

        }, {
          key: "preparacion_elementos_DOM_abril_2022",
          value: function preparacion_elementos_DOM_abril_2022() {
            this.w = this.img.offsetWidth;
            var h = this.img.offsetHeight;
            var proporcionAncho = 2;
            this.img.style.width = this.w / proporcionAncho + 'px';
            this.slider = document.createElement('DIV');
            this.img.parentElement.insertBefore(this.slider, this.img); //Colocação do Style de forma programática:

            this.slider.style.width = '40px';
            this.slider.style.height = '40px';
            this.slider.style.position = 'absolute';
            this.slider.style.zIndex = '9';
            this.slider.style.cursor = 'ew-resize';
            this.slider.style.backgroundColor = '#2196F3';
            this.slider.style.opacity = '0.7';
            this.slider.style.borderRadius = '50%';
            this.slider.setAttribute('id', this.id + "-slider");
            this.slider.style.top = h / 2 - this.slider.offsetHeight / 2 + 'px';
            this.slider.style.left = this.w / proporcionAncho - this.slider.offsetWidth / proporcionAncho + 'px';
          }
          /*************************************************************************
          Eventos adicionados de forma separada.
          *************************************************************************/

        }, {
          key: "preparacion_eventos_DOM_abril_2022",
          value: function preparacion_eventos_DOM_abril_2022() {
            /*execute a function when the mouse button is pressed:*/
            this.slider.addEventListener('mousedown', this.slideReady_abril_2022.bind(this));
            /*and another function when the mouse button is released:*/

            window.addEventListener('mouseup', this.slideFinish.bind(this));
            /*or touched (for touch screens:*/

            this.slider.addEventListener('touchstart', this.slideReady_abril_2022.bind(this));
            /*and released (for touch screens:*/

            window.addEventListener('touchend', this.slideFinish.bind(this));
          }
          /*************************************************************************
          Evento: disparado quando o mouse é clicado (ou tocado), o que se chama de "mousedown".
          *************************************************************************/

        }, {
          key: "slideReady_abril_2022",
          value: function slideReady_abril_2022(e) {
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*the slider is now clicked and ready to move:*/

            this.clicked = 1;
            /*execute a function when the slider is moved:*/

            window.addEventListener('mousemove', this.slideMove.bind(this));
          }
        }, {
          key: "slideFinish",
          value: function slideFinish() {
            this.clicked = 0;
          }
          /*
          clearInterval(myInterval);
          */

        }, {
          key: "slideMove",
          value: function slideMove(e) {
            this.img = document.getElementById(this.id_image_2);

            if (this.clicked == 1) {
              //console.log("????  "+this.intervalo);
              clearInterval(this.intervalo);
              e = e.changedTouches ? e.changedTouches[0] : e;
              this.a = this.img.getBoundingClientRect();
              /*calculate the cursor's x coordinate, relative to the image:*/

              this.x = e.pageX - this.a.left;
              /*Importante: considerar las dimensiones de la página:*/

              this.x = this.x - window.pageXOffset; //console.log(" dimensiones de la página "+window.pageXOffset);

              this.pos = this.x;
              if (this.pos < 0) this.pos = 0;

              if (this.pos > this.w) {
                this.x = this.w;
                this.pos = this.w;
              } //console.log(' w de la página ' + this.w + '   NOVO ' + this.pos);


              this.img.style.width = this.x + 'px';
              this.slider.style.left = this.img.offsetWidth - this.slider.offsetWidth / 2 + 'px';
            }
          }
        }, {
          key: "comparar",
          value: function comparar() {
            this.img = this.el.nativeElement.querySelector('.img-comp');
            var element = document.getElementById('botao_comparar');
            element.style.display = 'none';
          } /// Canvas:

          /*
          clearInterval(myInterval);
          */

        }, {
          key: "canvasDesenha",
          value: function canvasDesenha(texto_canvas) {
            this.canvas = document.getElementById(this.id_image_1);
            var ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.font = '77px serif';
            ctx.strokeText(texto_canvas, this.canvas.offsetWidth / 4, this.canvas.offsetHeight / 2);
          } ///////

        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {
            //console.log("changes:any "+this.fonte_image_1);
            this.canvasDesenha(this.fonte_image_1);
          }
        }]);

        return ComparadorCanvasComponent;
      }();

      ComparadorCanvasComponent.ɵfac = function ComparadorCanvasComponent_Factory(t) {
        return new (t || ComparadorCanvasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]));
      };

      ComparadorCanvasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: ComparadorCanvasComponent,
        selectors: [["app-comparador-canvas"]],
        inputs: {
          id: "id",
          fonte_image_1: "fonte_image_1",
          fonte_image_2: "fonte_image_2"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
        decls: 6,
        vars: 3,
        consts: [["alt", "Image 1", 1, "card-img-top", 2, "height", "225px", "width", "100%", "display", "block"], [1, "img-comp-img"], [1, "card-img-top", 2, "height", "225px", "width", "100%", "display", "block", 3, "id"], [1, "img-comp-img", "img-comp-overlay", 3, "id"], ["alt", "Image 2", 1, "card-img-top", 2, "height", "225px", "width", "100%", "display", "block", 3, "src"]],
        template: function ComparadorCanvasComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "canvas", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Your browser");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.id_image_1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.id_image_2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.fonte_image_2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
          }
        },
        styles: ["*[_ngcontent-%COMP%] {box-sizing: border-box;}\n\n.img-comp-container[_ngcontent-%COMP%] {\n  position: relative;\n  height: 400px; \n}\n\n.img-comp-img[_ngcontent-%COMP%] {\n  position: absolute;\n  width: auto;\n  height: auto;\n  overflow:hidden;\n}\n\n.img-comp-slider[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index:9;\n  cursor: ew-resize;\n  width: 40px;\n  height: 40px;\n  background-color: #2196F3;\n  opacity: 0.7;\n  border-radius: 50%;\n}\n\n.img-comp-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display:block;\n  vertical-align:middle;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhcmFkb3ItY2FudmFzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsR0FBRyxzQkFBc0IsQ0FBQzs7QUFFMUI7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYSxFQUFFLDBDQUEwQztBQUMzRDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBR0E7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtBQUN2QiIsImZpbGUiOiJjb21wYXJhZG9yLWNhbnZhcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7Ym94LXNpemluZzogYm9yZGVyLWJveDt9XG5cbi5pbWctY29tcC1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogNDAwcHg7IC8qc2hvdWxkIGJlIHRoZSBzYW1lIGhlaWdodCBhcyB0aGUgaW1hZ2VzKi9cbn1cblxuLmltZy1jb21wLWltZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IGF1dG87XG4gIGhlaWdodDogYXV0bztcbiAgb3ZlcmZsb3c6aGlkZGVuO1xufVxuXG5cbi5pbWctY29tcC1zbGlkZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6OTtcbiAgY3Vyc29yOiBldy1yZXNpemU7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2RjM7XG4gIG9wYWNpdHk6IDAuNztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuXG4uaW1nLWNvbXAtaW1nIGltZyB7XG4gIGRpc3BsYXk6YmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOm1pZGRsZTtcbn1cblxuXG5cbiJdfQ== */"]
      });
      /***/
    },

    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! /home/julian/aula-backend-2022/front-end/src/main.ts */
      "zUnb");
      /***/
    },

    /***/
    "7PV1":
    /*!*******************************************************************!*\
      !*** ./src/app/components/lista-pastas/lista-pastas.component.ts ***!
      \*******************************************************************/

    /*! exports provided: ListaPastasComponent */

    /***/
    function PV1(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ListaPastasComponent", function () {
        return ListaPastasComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _services_get_lista_pastas_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../services/get-lista-pastas.service */
      "cZBa");
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      "1kSV");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      function ListaPastasComponent_li_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var etiquetas_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate2"]("href", "./", etiquetas_r1, "/", etiquetas_r1, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](etiquetas_r1);
        }
      }

      var ListaPastasComponent = /*#__PURE__*/function () {
        function ListaPastasComponent(activatedRoute, getFotosBucketService) {
          _classCallCheck(this, ListaPastasComponent);

          this.activatedRoute = activatedRoute;
          this.getFotosBucketService = getFotosBucketService;
          this.nome_pasta = [];
        }

        _createClass(ListaPastasComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.getUrl_imagem_METODO();
          }
        }, {
          key: "getUrl_imagem_METODO",
          value: function getUrl_imagem_METODO() {
            var _this2 = this;

            this.getFotosBucketService.getUrl_imagem("").subscribe(function (url_foto) {
              _this2.nome_pasta = url_foto.reverse(); //console.log("url_foto : String[] | undefined;    "+url_foto);
            }); ///////////////////////////////
          }
        }]);

        return ListaPastasComponent;
      }();

      ListaPastasComponent.ɵfac = function ListaPastasComponent_Factory(t) {
        return new (t || ListaPastasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_get_lista_pastas_service__WEBPACK_IMPORTED_MODULE_2__["GetListaPastasService"]));
      };

      ListaPastasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: ListaPastasComponent,
        selectors: [["app-lista-pastas"]],
        decls: 10,
        vars: 1,
        consts: [[1, "navbar", "navbar-expand-md", "navbar-dark", "bg-dark", "fixed-top"], ["id", "navbarsExampleDefault", 1, "collapse", "navbar-collapse"], [1, "navbar-nav", "mr-auto"], [1, "nav-item", "dropdown"], ["href", "", "id", "dropdown01", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle"], ["aria-labelledby", "dropdown01", 1, "dropdown-menu"], ["href", "./novo/novo", 1, "dropdown-item"], [4, "ngFor", "ngForOf"], [1, "dropdown-item", 3, "href"]],
        template: function ListaPastasComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ul", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Tecnologia");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "novo");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ListaPastasComponent_li_9_Template, 3, 3, "li", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.nome_pasta);
          }
        },
        directives: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbNavbar"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsaXN0YS1wYXN0YXMuY29tcG9uZW50LmNzcyJ9 */"]
      });
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "LMlh":
    /*!*****************************************************!*\
      !*** ./src/app/components/novos/novos.component.ts ***!
      \*****************************************************/

    /*! exports provided: KEY_CODE, NovosComponent */

    /***/
    function LMlh(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "KEY_CODE", function () {
        return KEY_CODE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "NovosComponent", function () {
        return NovosComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _services_get_fotos_bucket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../services/get-fotos-bucket.service */
      "YeuO");
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      "1kSV");
      /* harmony import */


      var _comparador_imagens_comparador_imagens_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../comparador-imagens/comparador-imagens.component */
      "vNvS");
      /* harmony import */


      var _janela_modal_classificar_janela_modal_classificar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../janela-modal-classificar/janela-modal-classificar.component */
      "kfPQ");
      /* harmony import */


      var _comparador_canvas_comparador_canvas_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../comparador-canvas/comparador-canvas.component */
      "+oQJ");

      var KEY_CODE;

      (function (KEY_CODE) {
        KEY_CODE[KEY_CODE["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
        KEY_CODE[KEY_CODE["LEFT_ARROW"] = 37] = "LEFT_ARROW";
        KEY_CODE[KEY_CODE["UP_ARROW"] = 38] = "UP_ARROW";
        KEY_CODE[KEY_CODE["DOWN_ARROW"] = 40] = "DOWN_ARROW";
      })(KEY_CODE || (KEY_CODE = {}));

      var NovosComponent = /*#__PURE__*/function () {
        function NovosComponent(activatedRoute, getFotosBucketService) {
          _classCallCheck(this, NovosComponent);

          this.activatedRoute = activatedRoute;
          this.getFotosBucketService = getFotosBucketService;
          this.etiqueta = "juridico";
          this.indice_imagen = 0;
          this.maximo_indice_imagen = 0;
          this.imagem = [];
        }
        /*
        Quando for procurado (https://docker-2-julian.herokuapp.com/saida_oficina/saida_oficina)
        ele vai coletar o parametro da URL
        
        (  { path: ':parametro/:parametro'<----------------------------,
        )
        Lembremos da definicao do APP-ROUTING.MODULE.TS:
             { path: ':parametro/:parametro', component: NovosComponent },
            */


        _createClass(NovosComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var par = this.activatedRoute.snapshot.paramMap.get('parametro');
            this.etiqueta = par + "";
            this.getUrl_imagem_METODO();
            this.avanco_certificados_automatico(this.indice_imagen);
          }
        }, {
          key: "avanco_certificados_automatico",
          value: function avanco_certificados_automatico(entrada) {
            var _this3 = this;

            //console.log("avanco_certificados_automatico "+entrada);
            setInterval(function () {
              _this3.avanco_certificados(entrada);
            }, 10 * 1000);
          }
        }, {
          key: "avanco_certificados",
          value: function avanco_certificados(entrada) {
            if (this.indice_imagen === this.maximo_indice_imagen) {
              this.indice_imagen = 0;
              console.log("avanco_certificados   " + this.indice_imagen);
            }

            this.indice_imagen++;
          }
        }, {
          key: "keyEvent",
          value: function keyEvent(event) {
            if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
              this.increment();
            }

            if (event.keyCode === KEY_CODE.LEFT_ARROW) {
              this.decrement();
            } //Verticais para acelerar a navegação:


            if (event.keyCode === KEY_CODE.UP_ARROW) {
              this.increment_10();
            }

            if (event.keyCode === KEY_CODE.DOWN_ARROW) {
              this.decrement_10();
            }
          }
        }, {
          key: "increment",
          value: function increment() {
            if (this.indice_imagen + 1 < this.maximo_indice_imagen) {
              this.indice_imagen++;
            }
          }
        }, {
          key: "decrement",
          value: function decrement() {
            if (this.indice_imagen > 0) {
              this.indice_imagen--;
            }
          } //Verticais para acelerar a navegação, em passos de 10

        }, {
          key: "increment_10",
          value: function increment_10() {
            if (this.indice_imagen + 10 < this.maximo_indice_imagen) {
              this.indice_imagen += 10;
            }
          }
        }, {
          key: "decrement_10",
          value: function decrement_10() {
            if (this.indice_imagen > 10) {
              this.indice_imagen -= 10;
            }
          }
        }, {
          key: "getUrl_imagem_METODO",
          value: function getUrl_imagem_METODO() {
            var _this4 = this;

            this.getFotosBucketService.getUrl_imagem(this.etiqueta).subscribe(function (url_foto) {
              //this.imagem = url_foto.reverse();    
              _this4.imagem = url_foto;
              console.log("url_foto : String[] | undefined;    " + url_foto);
              _this4.maximo_indice_imagen = url_foto.length;
            });
          }
        }]);

        return NovosComponent;
      }();

      NovosComponent.ɵfac = function NovosComponent_Factory(t) {
        return new (t || NovosComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_get_fotos_bucket_service__WEBPACK_IMPORTED_MODULE_2__["GetFotosBucketService"]));
      };

      NovosComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: NovosComponent,
        selectors: [["app-novos"]],
        hostBindings: function NovosComponent_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function NovosComponent_keyup_HostBindingHandler($event) {
              return ctx.keyEvent($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
          }
        },
        decls: 85,
        vars: 37,
        consts: [["id", "navbarHeader", 1, "bg-dark", "collapse"], [1, "container"], [1, "row"], [1, "col-sm-8", "col-md-7", "py-4"], [1, "text-white"], [1, "text-muted"], [1, "col-sm-4", "offset-md-1", "py-4"], [1, "list-unstyled"], ["href", "https://github.com/julian-gamboa-bahia", 1, "text-white"], ["href", "https://github.com/julian-gamboa-ensino", 1, "text-white"], ["href", "https://www.linkedin.com/in/julian-gamboa-bahia/", 1, "text-white"], [1, "navbar", "navbar-dark", "bg-dark", "box-shadow"], [1, "container", "d-flex", "justify-content-between"], ["href", "https://docker-2-julian.herokuapp.com", 1, "navbar-brand", "d-flex", "align-items-center"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "mr-2"], ["d", "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"], ["cx", "12", "cy", "13", "r", "4"], ["type", "button", "data-toggle", "collapse", "data-target", "#navbarHeader", "aria-controls", "navbarHeader", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler", "collapsed"], [1, "navbar-toggler-icon"], ["role", "main"], [1, "album", "py-5", "bg-light"], [1, "col-md-4"], [1, "card", "mb-4", "box-shadow"], ["id", "imagem-1", 3, "fonte_image_1", "fonte_image_2"], [3, "nome_imagem", "etiqueta_imagem"], ["id", "imagem-2", 3, "fonte_image_1", "fonte_image_2"], ["id", "imagem-3", 3, "fonte_image_1", "fonte_image_2"], ["id", "imagem-4", 3, "fonte_image_1", "fonte_image_2"], ["id", "imagem-5", 3, "fonte_image_1", "fonte_image_2"], ["id", "imagem-6", 3, "fonte_image_1", "fonte_image_2"], ["id", "imagem-7", 3, "fonte_image_1", "fonte_image_2"], ["id", "imagem-8", 3, "fonte_image_1", "fonte_image_2"], ["id", "imagem-9", 3, "fonte_image_1", "fonte_image_2"], ["href", "https://github.com/julian-gamboa-ensino/node-gestor-imagens"]],
        template: function NovosComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h4", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Fun\xE7\xF5es");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "\nSistema b\xE1sico de gest\xE3o de frota");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\nvisualiza\xE7\xE3o de notas fiscais, multas, etc..");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "\nDemo em Heroku");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h4", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Julian Gamboa");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "ul", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "a", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Github");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Github Eduativo");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Linkeind");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "a", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "svg", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "path", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "circle", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "strong");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "button", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "span", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "main", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "app-comparador-imagens", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "app-janela-modal-classificar", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "app-comparador-imagens", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "app-janela-modal-classificar", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "app-comparador-imagens", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "app-janela-modal-classificar", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "app-comparador-imagens", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "app-janela-modal-classificar", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "app-comparador-imagens", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](61, "app-janela-modal-classificar", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "app-comparador-imagens", 29);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "app-janela-modal-classificar", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "app-comparador-canvas", 30);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "app-janela-modal-classificar", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "app-comparador-imagens", 31);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "app-janela-modal-classificar", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "app-comparador-imagens", 32);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](78, "app-janela-modal-classificar", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "footer", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Colocado no meu ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "a", 33);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "Github de ensino");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](34);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.etiqueta, " (2022) ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_1", ctx.indice_imagen);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_2", ctx.imagem[ctx.indice_imagen]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("nome_imagem", ctx.imagem[ctx.indice_imagen]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("etiqueta_imagem", ctx.etiqueta);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_1", ctx.indice_imagen + 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_2", ctx.imagem[ctx.indice_imagen + 1]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("nome_imagem", ctx.imagem[ctx.indice_imagen]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("etiqueta_imagem", ctx.etiqueta);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_1", ctx.indice_imagen + 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_2", ctx.imagem[ctx.indice_imagen + 2]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("nome_imagem", ctx.imagem[ctx.indice_imagen + 2]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("etiqueta_imagem", ctx.etiqueta);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_1", ctx.indice_imagen + 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_2", ctx.imagem[ctx.indice_imagen + 3]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("nome_imagem", ctx.imagem[ctx.indice_imagen]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("etiqueta_imagem", ctx.etiqueta);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_1", ctx.indice_imagen + 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_2", ctx.imagem[ctx.indice_imagen + 4]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("nome_imagem", ctx.imagem[ctx.indice_imagen]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("etiqueta_imagem", ctx.etiqueta);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_1", ctx.indice_imagen + 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_2", ctx.imagem[ctx.indice_imagen + 5]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("nome_imagem", ctx.imagem[ctx.indice_imagen]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("etiqueta_imagem", ctx.etiqueta);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_1", ctx.indice_imagen + 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_2", ctx.imagem[ctx.indice_imagen + 6]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("nome_imagem", ctx.imagem[ctx.indice_imagen]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("etiqueta_imagem", ctx.etiqueta);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_1", ctx.indice_imagen + 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_2", ctx.imagem[ctx.indice_imagen + 7]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("nome_imagem", ctx.imagem[ctx.indice_imagen]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("etiqueta_imagem", ctx.etiqueta);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_1", ctx.indice_imagen + 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("fonte_image_2", ctx.imagem[ctx.indice_imagen + 8]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("nome_imagem", ctx.imagem[ctx.indice_imagen]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("etiqueta_imagem", ctx.etiqueta);
          }
        },
        directives: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbNavbar"], _comparador_imagens_comparador_imagens_component__WEBPACK_IMPORTED_MODULE_4__["ComparadorImagensComponent"], _janela_modal_classificar_janela_modal_classificar_component__WEBPACK_IMPORTED_MODULE_5__["JanelaModalClassificarComponent"], _comparador_canvas_comparador_canvas_component__WEBPACK_IMPORTED_MODULE_6__["ComparadorCanvasComponent"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3Zvcy5jb21wb25lbnQuY3NzIn0= */"]
      });
      /***/
    },

    /***/
    "NKX6":
    /*!***********************************************************************************!*\
      !*** ./src/app/components/select-classificador/select-classificador.component.ts ***!
      \***********************************************************************************/

    /*! exports provided: SelectClassificadorComponent */

    /***/
    function NKX6(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SelectClassificadorComponent", function () {
        return SelectClassificadorComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _services_get_fotos_bucket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../services/get-fotos-bucket.service */
      "YeuO");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      function SelectClassificadorComponent_option_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var etiquetas_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", etiquetas_r1, " ");
        }
      } // Serviço para consomer a API (método GET)


      var SelectClassificadorComponent = /*#__PURE__*/function () {
        function SelectClassificadorComponent(activatedRoute, getFotosBucketService) {
          _classCallCheck(this, SelectClassificadorComponent);

          this.activatedRoute = activatedRoute;
          this.getFotosBucketService = getFotosBucketService; //Uma vez feita a escolha da ETIQUETA será chamado o POST

          this.nova_etiqueta = ''; ////////////////////

          this.nome_pasta = ['classificar', 'considerar validade'];
        } //event handler for the select element's change event


        _createClass(SelectClassificadorComponent, [{
          key: "selectChangeHandler",
          value: function selectChangeHandler(event) {
            //update the ui
            this.nova_etiqueta = event.target.value;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.getUrl_imagem_METODO();
          }
        }, {
          key: "getUrl_imagem_METODO",
          value: function getUrl_imagem_METODO() {
            var _this5 = this;

            this.getFotosBucketService.getUrl_imagem("").subscribe(function (url_foto) {
              _this5.nome_pasta = url_foto.reverse();
            }); ///////////////////////////////
          }
        }]);

        return SelectClassificadorComponent;
      }();

      SelectClassificadorComponent.ɵfac = function SelectClassificadorComponent_Factory(t) {
        return new (t || SelectClassificadorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_get_fotos_bucket_service__WEBPACK_IMPORTED_MODULE_2__["GetFotosBucketService"]));
      };

      SelectClassificadorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: SelectClassificadorComponent,
        selectors: [["app-select-classificador"]],
        decls: 2,
        vars: 1,
        consts: [[3, "change"], [4, "ngFor", "ngForOf"]],
        template: function SelectClassificadorComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "select", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function SelectClassificadorComponent_Template_select_change_0_listener($event) {
              return ctx.selectChangeHandler($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SelectClassificadorComponent_option_1_Template, 2, 1, "option", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.nome_pasta);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWxlY3QtY2xhc3NpZmljYWRvci5jb21wb25lbnQuY3NzIn0= */"]
      });
      /***/
    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _components_lista_pastas_lista_pastas_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/lista-pastas/lista-pastas.component */
      "7PV1");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var AppComponent = function AppComponent() {
        _classCallCheck(this, AppComponent);
      };

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)();
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 3,
        vars: 0,
        consts: [["role", "main", 1, "container"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-lista-pastas");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "main", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "router-outlet");
          }
        },
        directives: [_components_lista_pastas_lista_pastas_component__WEBPACK_IMPORTED_MODULE_1__["ListaPastasComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"]
      });
      /***/
    },

    /***/
    "YeuO":
    /*!******************************************************!*\
      !*** ./src/app/services/get-fotos-bucket.service.ts ***!
      \******************************************************/

    /*! exports provided: GetFotosBucketService */

    /***/
    function YeuO(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GetFotosBucketService", function () {
        return GetFotosBucketService;
      });
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /*
      Serviço SIMPLES para consultar uma API que lista-se as fotos contidas num bucker
      */


      var GetFotosBucketService = /*#__PURE__*/function () {
        //"https://cv-julian-2022.s3.us-west-2.amazonaws.com/conteudo_pasta/";
        // injetando o HttpClient
        function GetFotosBucketService(httpClient) {
          _classCallCheck(this, GetFotosBucketService);

          this.httpClient = httpClient;
          this.url = //"https://docker-2-julian.herokuapp.com/";
          "http://localhost:3002/"; //http://localhost:4200/porno/porno
          // Headers

          this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
              'Content-Type': 'application/json'
            })
          };
        } // Obtém a lista de fotos conforme a ETIQUETA usada na consulta


        _createClass(GetFotosBucketService, [{
          key: "getUrl_imagem",
          value: function getUrl_imagem(etiqueta) {
            return this.httpClient.get(this.url + etiqueta) //+".json")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.handleError));
          } // Manipulação de erros

        }, {
          key: "handleError",
          value: function handleError(error) {
            var errorMessage = '';

            if (error.error instanceof ErrorEvent) {
              // Erro ocorreu no lado do client
              errorMessage = error.error.message;
            } else {
              // Erro ocorreu no lado do servidor
              errorMessage = "C\xF3digo do erro: ".concat(error.status, ", ") + "menssagem: ".concat(error.message);
            }

            console.log(errorMessage);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(errorMessage);
          }
        }]);

        return GetFotosBucketService;
      }();

      GetFotosBucketService.ɵfac = function GetFotosBucketService_Factory(t) {
        return new (t || GetFotosBucketService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]));
      };

      GetFotosBucketService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: GetFotosBucketService,
        factory: GetFotosBucketService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _components_novos_novos_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./components/novos/novos.component */
      "LMlh");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _components_lista_pastas_lista_pastas_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./components/lista-pastas/lista-pastas.component */
      "7PV1");
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      "1kSV");
      /* harmony import */


      var _components_janela_modal_classificar_janela_modal_classificar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./components/janela-modal-classificar/janela-modal-classificar.component */
      "kfPQ");
      /* harmony import */


      var _components_select_classificador_select_classificador_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./components/select-classificador/select-classificador.component */
      "NKX6");
      /* harmony import */


      var _components_comparador_logo_tech_certificado_comparador_logo_tech_certificado_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./components/comparador-logo-tech-certificado/comparador-logo-tech-certificado.component */
      "fBQq");
      /* harmony import */


      var _components_comparador_imagens_comparador_imagens_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./components/comparador-imagens/comparador-imagens.component */
      "vNvS");
      /* harmony import */


      var _components_comparador_canvas_comparador_canvas_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./components/comparador-canvas/comparador-canvas.component */
      "+oQJ");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || AppModule)();
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], _components_novos_novos_component__WEBPACK_IMPORTED_MODULE_3__["NovosComponent"], _components_lista_pastas_lista_pastas_component__WEBPACK_IMPORTED_MODULE_5__["ListaPastasComponent"], _components_janela_modal_classificar_janela_modal_classificar_component__WEBPACK_IMPORTED_MODULE_7__["JanelaModalClassificarComponent"], _components_select_classificador_select_classificador_component__WEBPACK_IMPORTED_MODULE_8__["SelectClassificadorComponent"], _components_comparador_logo_tech_certificado_comparador_logo_tech_certificado_component__WEBPACK_IMPORTED_MODULE_9__["ComparadorLogoTechCertificadoComponent"], _components_comparador_imagens_comparador_imagens_component__WEBPACK_IMPORTED_MODULE_10__["ComparadorImagensComponent"], _components_comparador_canvas_comparador_canvas_component__WEBPACK_IMPORTED_MODULE_11__["ComparadorCanvasComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"]]
        });
      })();
      /***/

    },

    /***/
    "cZBa":
    /*!******************************************************!*\
      !*** ./src/app/services/get-lista-pastas.service.ts ***!
      \******************************************************/

    /*! exports provided: GetListaPastasService */

    /***/
    function cZBa(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GetListaPastasService", function () {
        return GetListaPastasService;
      });
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /*
      Serviço SIMPLES para consultar uma API que lista-se as fotos contidas num bucker
      */


      var GetListaPastasService = /*#__PURE__*/function () {
        //"https://cv-julian-2022.s3.us-west-2.amazonaws.com/AGOSTO.json";
        //"https://cv-julian-2022.s3.us-west-2.amazonaws.com/pastas.json";
        // injetando o HttpClient
        function GetListaPastasService(httpClient) {
          _classCallCheck(this, GetListaPastasService);

          this.httpClient = httpClient;
          this.url = "http://localhost:3002/lista_pastas"; // Headers

          this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
              'Content-Type': 'application/json'
            })
          };
        } // Obtem todos os carros


        _createClass(GetListaPastasService, [{
          key: "getUrl_imagem",
          value: function getUrl_imagem(etiqueta) {
            return this.httpClient.get(this.url + etiqueta).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.handleError));
          } // Manipulação de erros

        }, {
          key: "handleError",
          value: function handleError(error) {
            var errorMessage = '';

            if (error.error instanceof ErrorEvent) {
              // Erro ocorreu no lado do client
              errorMessage = error.error.message;
            } else {
              // Erro ocorreu no lado do servidor
              errorMessage = "C\xF3digo do erro: ".concat(error.status, ", ") + "menssagem: ".concat(error.message);
            }

            console.log(errorMessage);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(errorMessage);
          }
        }]);

        return GetListaPastasService;
      }();

      GetListaPastasService.ɵfac = function GetListaPastasService_Factory(t) {
        return new (t || GetListaPastasService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]));
      };

      GetListaPastasService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: GetListaPastasService,
        factory: GetListaPastasService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    "fBQq":
    /*!***********************************************************************************************************!*\
      !*** ./src/app/components/comparador-logo-tech-certificado/comparador-logo-tech-certificado.component.ts ***!
      \***********************************************************************************************************/

    /*! exports provided: ComparadorLogoTechCertificadoComponent */

    /***/
    function fBQq(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ComparadorLogoTechCertificadoComponent", function () {
        return ComparadorLogoTechCertificadoComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var ComparadorLogoTechCertificadoComponent = /*#__PURE__*/function () {
        function ComparadorLogoTechCertificadoComponent() {
          _classCallCheck(this, ComparadorLogoTechCertificadoComponent);
        }

        _createClass(ComparadorLogoTechCertificadoComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return ComparadorLogoTechCertificadoComponent;
      }();

      ComparadorLogoTechCertificadoComponent.ɵfac = function ComparadorLogoTechCertificadoComponent_Factory(t) {
        return new (t || ComparadorLogoTechCertificadoComponent)();
      };

      ComparadorLogoTechCertificadoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: ComparadorLogoTechCertificadoComponent,
        selectors: [["app-comparador-logo-tech-certificado"]],
        decls: 2,
        vars: 0,
        template: function ComparadorLogoTechCertificadoComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "comparador-logo-tech-certificado works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wYXJhZG9yLWxvZ28tdGVjaC1jZXJ0aWZpY2Fkby5jb21wb25lbnQuY3NzIn0= */"]
      });
      /***/
    },

    /***/
    "kfPQ":
    /*!*******************************************************************************************!*\
      !*** ./src/app/components/janela-modal-classificar/janela-modal-classificar.component.ts ***!
      \*******************************************************************************************/

    /*! exports provided: JanelaModalClassificarComponent */

    /***/
    function kfPQ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "JanelaModalClassificarComponent", function () {
        return JanelaModalClassificarComponent;
      });
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      "1kSV");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _select_classificador_select_classificador_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../select-classificador/select-classificador.component */
      "NKX6");

      function JanelaModalClassificarComponent_ng_template_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Tecnologia ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "app-select-classificador");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function JanelaModalClassificarComponent_ng_template_0_Template_button_click_8_listener() {
            var modal_r2 = ctx.$implicit;
            return modal_r2.close("ETIQUETA: ");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\nTecnologia (", ctx_r1.etiqueta_imagem, ")\n");
        }
      }

      var JanelaModalClassificarComponent = /*#__PURE__*/function () {
        function JanelaModalClassificarComponent(modalService) {
          _classCallCheck(this, JanelaModalClassificarComponent);

          this.modalService = modalService;
          this.closeResult = ''; // Botão MODAL, cuja funcionalidade 

          this.funcionalidade_botao = 'funcionalidade_botao';
          this.nome_imagem = "";
          this.etiqueta_imagem = "";
        }

        _createClass(JanelaModalClassificarComponent, [{
          key: "open",
          value: function open(content) {
            var _this6 = this;

            this.modalService.open(content, {
              ariaLabelledBy: 'modal-basic-title'
            }).result.then(function (result) {
              _this6.closeResult = "PUT com a : ".concat(result);
            }, function (reason) {
              _this6.closeResult = "inputNumber ".concat(_this6.nome_imagem);
            });
          }
        }, {
          key: "getDismissReason",
          value: function getDismissReason(reason) {
            if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["ModalDismissReasons"].ESC) {
              return 'by pressing ESC';
            } else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["ModalDismissReasons"].BACKDROP_CLICK) {
              return 'by clicking on a backdrop';
            } else {
              return "with: ".concat(reason);
            }
          }
        }]);

        return JanelaModalClassificarComponent;
      }();

      JanelaModalClassificarComponent.ɵfac = function JanelaModalClassificarComponent_Factory(t) {
        return new (t || JanelaModalClassificarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbModal"]));
      };

      JanelaModalClassificarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: JanelaModalClassificarComponent,
        selectors: [["app-janela-modal-classificar"]],
        inputs: {
          nome_imagem: "nome_imagem",
          etiqueta_imagem: "etiqueta_imagem"
        },
        decls: 5,
        vars: 1,
        consts: [["content", ""], [1, "btn", "btn-lg", "btn-outline-primary", 3, "click"], [1, "modal-header"], ["id", "modal-basic-title", 1, "modal-title"], [1, "modal-body"], [1, "form-group"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-outline-dark", 3, "click"]],
        template: function JanelaModalClassificarComponent_Template(rf, ctx) {
          if (rf & 1) {
            var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, JanelaModalClassificarComponent_ng_template_0_Template, 10, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function JanelaModalClassificarComponent_Template_button_click_2_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);

              var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1);

              return ctx.open(_r0);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "hr");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\n", ctx.etiqueta_imagem, "\n");
          }
        },
        directives: [_select_classificador_select_classificador_component__WEBPACK_IMPORTED_MODULE_2__["SelectClassificadorComponent"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJqYW5lbGEtbW9kYWwtY2xhc3NpZmljYXIuY29tcG9uZW50LmNzcyJ9 */"]
      });
      /***/
    },

    /***/
    "vNvS":
    /*!*******************************************************************************!*\
      !*** ./src/app/components/comparador-imagens/comparador-imagens.component.ts ***!
      \*******************************************************************************/

    /*! exports provided: ComparadorImagensComponent */

    /***/
    function vNvS(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ComparadorImagensComponent", function () {
        return ComparadorImagensComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
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


      var ComparadorImagensComponent = /*#__PURE__*/function () {
        function ComparadorImagensComponent(renderer, el) {
          _classCallCheck(this, ComparadorImagensComponent);

          this.renderer = renderer;
          this.el = el;
          this.fonte_image_1 = "";
          this.fonte_image_2 = "";
          this.id_image_1 = this.id + "-image-1";
          this.id_image_2 = "";
          this.x = 0;
          this.clicked = 0;
          this.slider;
          this.a, this.i, this.w, this.pos = 0;
        }

        _createClass(ComparadorImagensComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            //console.log("this.intervalo  "+this.intervalo);
            this.id_image_1 = this.id + "-image-1";
            this.id_image_2 = this.id + "-image-2";
            this.img = document.getElementById(this.id);
            this.preparacion_elementos_DOM_abril_2022();
            this.temporizador_elementos_DOM_abril_2022(this.slider.style.left); //

            this.preparacion_eventos_DOM_abril_2022(); //this.canvasDesenha(this.fonte_image_1);
          }
          /*************************************************************************
           *************************************************************************/

        }, {
          key: "temporizador_elementos_DOM_abril_2022",
          value: function temporizador_elementos_DOM_abril_2022(inicial) {
            var _this7 = this;

            /*
                console.log(this.slider.style.left+"  this.slider.style.left (this.img.style.width) ");
             */
            this.intervalo = setInterval(function () {
              var previo = _this7.slider.style.left;

              if (_this7.slider.style.left === '0px') {
                _this7.slider.style.left = inicial;
                _this7.img.style.width = inicial;
              } else {
                _this7.slider.style.left = '0px';
                _this7.img.style.width = '0px';
              } //console.log(" event");

            }, 5 * 1000);
          }
          /*************************************************************************
          Os elementos são preparados para este componente,
          e POSTERIORMENTE
           os eventos são adicionados para o controle do slider.
           Projeto Base : https://stackblitz.com/edit/angular-ivy-czukze
          *************************************************************************/

        }, {
          key: "preparacion_elementos_DOM_abril_2022",
          value: function preparacion_elementos_DOM_abril_2022() {
            this.w = this.img.offsetWidth;
            var h = this.img.offsetHeight;
            var proporcionAncho = 2;
            this.img.style.width = this.w / proporcionAncho + 'px';
            this.slider = document.createElement('DIV');
            this.img.parentElement.insertBefore(this.slider, this.img); //Colocação do Style de forma programática:

            this.slider.style.width = '40px';
            this.slider.style.height = '40px';
            this.slider.style.position = 'absolute';
            this.slider.style.zIndex = '9';
            this.slider.style.cursor = 'ew-resize';
            this.slider.style.backgroundColor = '#2196F3';
            this.slider.style.opacity = '0.7';
            this.slider.style.borderRadius = '50%';
            this.slider.setAttribute('id', this.id + "-slider");
            this.slider.style.top = h / 2 - this.slider.offsetHeight / 2 + 'px';
            this.slider.style.left = this.w / proporcionAncho - this.slider.offsetWidth / proporcionAncho + 'px';
          }
          /*************************************************************************
          Eventos adicionados de forma separada.
          *************************************************************************/

        }, {
          key: "preparacion_eventos_DOM_abril_2022",
          value: function preparacion_eventos_DOM_abril_2022() {
            /*execute a function when the mouse button is pressed:*/
            this.slider.addEventListener('mousedown', this.slideReady_abril_2022.bind(this));
            /*and another function when the mouse button is released:*/

            window.addEventListener('mouseup', this.slideFinish.bind(this));
            /*or touched (for touch screens:*/

            this.slider.addEventListener('touchstart', this.slideReady_abril_2022.bind(this));
            /*and released (for touch screens:*/

            window.addEventListener('touchend', this.slideFinish.bind(this));
          }
          /*************************************************************************
          Evento: disparado quando o mouse é clicado (ou tocado), o que se chama de "mousedown".
          *************************************************************************/

        }, {
          key: "slideReady_abril_2022",
          value: function slideReady_abril_2022(e) {
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*the slider is now clicked and ready to move:*/

            this.clicked = 1;
            /*execute a function when the slider is moved:*/

            window.addEventListener('mousemove', this.slideMove.bind(this));
          }
        }, {
          key: "slideFinish",
          value: function slideFinish() {
            this.clicked = 0;
          }
          /*
          clearInterval(myInterval);
          */

        }, {
          key: "slideMove",
          value: function slideMove(e) {
            this.img = document.getElementById(this.id_image_2);

            if (this.clicked == 1) {
              //console.log("????  "+this.intervalo);
              clearInterval(this.intervalo);
              e = e.changedTouches ? e.changedTouches[0] : e;
              this.a = this.img.getBoundingClientRect();
              /*calculate the cursor's x coordinate, relative to the image:*/

              this.x = e.pageX - this.a.left;
              /*Importante: considerar las dimensiones de la página:*/

              this.x = this.x - window.pageXOffset; //console.log(" dimensiones de la página "+window.pageXOffset);

              this.pos = this.x;
              if (this.pos < 0) this.pos = 0;

              if (this.pos > this.w) {
                this.x = this.w;
                this.pos = this.w;
              } //console.log(' w de la página ' + this.w + '   NOVO ' + this.pos);


              this.img.style.width = this.x + 'px';
              this.slider.style.left = this.img.offsetWidth - this.slider.offsetWidth / 2 + 'px';
            }
          }
        }, {
          key: "comparar",
          value: function comparar() {
            this.img = this.el.nativeElement.querySelector('.img-comp');
            var element = document.getElementById('botao_comparar');
            element.style.display = 'none';
          } /// Canvas:

          /*
          clearInterval(myInterval);
          */

        }, {
          key: "LEVE_canvasDesenha",
          value: function LEVE_canvasDesenha(texto_canvas) {
            this.canvas = document.getElementById(this.id_image_1);
            var ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.font = '77px serif';
            ctx.strokeText(texto_canvas, this.canvas.offsetWidth / 4, this.canvas.offsetHeight / 2);
          } ///////

        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {//console.log("changes:any "+this.fonte_image_1);
            //this.canvasDesenha(this.fonte_image_1);
          }
        }]);

        return ComparadorImagensComponent;
      }();

      ComparadorImagensComponent.ɵfac = function ComparadorImagensComponent_Factory(t) {
        return new (t || ComparadorImagensComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]));
      };

      ComparadorImagensComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: ComparadorImagensComponent,
        selectors: [["app-comparador-imagens"]],
        inputs: {
          id: "id",
          fonte_image_1: "fonte_image_1",
          fonte_image_2: "fonte_image_2"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
        decls: 6,
        vars: 3,
        consts: [["alt", "Image 1", 1, "card-img-top", 2, "height", "225px", "width", "100%", "display", "block"], [1, "img-comp-img"], [1, "card-img-top", 2, "height", "225px", "width", "100%", "display", "block", 3, "id"], [1, "img-comp-img", "img-comp-overlay", 3, "id"], ["alt", "Image 2", 1, "card-img-top", 2, "height", "225px", "width", "100%", "display", "block", 3, "src"]],
        template: function ComparadorImagensComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "canvas", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Your browser");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.id_image_1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.id_image_2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.fonte_image_2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
          }
        },
        styles: ["*[_ngcontent-%COMP%] {box-sizing: border-box;}\n\n.img-comp-container[_ngcontent-%COMP%] {\n  position: relative;\n  height: 400px; \n}\n\n.img-comp-img[_ngcontent-%COMP%] {\n  position: absolute;\n  width: auto;\n  height: auto;\n  overflow:hidden;\n}\n\n.img-comp-slider[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index:9;\n  cursor: ew-resize;\n  width: 40px;\n  height: 40px;\n  background-color: #2196F3;\n  opacity: 0.7;\n  border-radius: 50%;\n}\n\n.img-comp-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display:block;\n  vertical-align:middle;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhcmFkb3ItaW1hZ2Vucy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEdBQUcsc0JBQXNCLENBQUM7O0FBRTFCO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWEsRUFBRSwwQ0FBMEM7QUFDM0Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUdBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxpQkFBaUI7RUFDakIsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixxQkFBcUI7QUFDdkIiLCJmaWxlIjoiY29tcGFyYWRvci1pbWFnZW5zLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIqIHtib3gtc2l6aW5nOiBib3JkZXItYm94O31cblxuLmltZy1jb21wLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiA0MDBweDsgLypzaG91bGQgYmUgdGhlIHNhbWUgaGVpZ2h0IGFzIHRoZSBpbWFnZXMqL1xufVxuXG4uaW1nLWNvbXAtaW1nIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogYXV0bztcbiAgaGVpZ2h0OiBhdXRvO1xuICBvdmVyZmxvdzpoaWRkZW47XG59XG5cblxuLmltZy1jb21wLXNsaWRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDo5O1xuICBjdXJzb3I6IGV3LXJlc2l6ZTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZGMztcbiAgb3BhY2l0eTogMC43O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cbi5pbWctY29tcC1pbWcgaW1nIHtcbiAgZGlzcGxheTpibG9jaztcbiAgdmVydGljYWwtYWxpZ246bWlkZGxlO1xufVxuXG5cblxuIl19 */"]
      });
      /***/
    },

    /***/
    "vY5A":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _components_novos_novos_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/novos/novos.component */
      "LMlh");
      /* harmony import */


      var _components_lista_pastas_lista_pastas_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./components/lista-pastas/lista-pastas.component */
      "7PV1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL"); //Componente para classificar as NOVAS fotos
      //Componente para ver a lista de pastas que funcionam como ETIQUETAS


      var routes = [//Por exempl,o "http://localhost:4200" lista as ETIQUETAS (pastas criadas na pasta de etiquetas)
      {
        path: '',
        component: _components_lista_pastas_lista_pastas_component__WEBPACK_IMPORTED_MODULE_2__["ListaPastasComponent"]
      }, //Por exempl,o "http://localhost:4200/livros" visualiza as fotos presentas em LIVROS
      {
        path: ':parametro/:parametro',
        component: _components_novos_novos_component__WEBPACK_IMPORTED_MODULE_1__["NovosComponent"]
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        });
      })();
      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map