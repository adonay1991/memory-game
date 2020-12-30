import { BuiltinType, ThisReceiver } from '@angular/compiler';

import { Component, Input, OnInit } from '@angular/core';
import { card } from '../card/card.component';
import { CardComponent } from '../card/card.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})

/**
 * Extencion de la clase de CardComponent con EXTENDS
 */
export class BoardComponent extends CardComponent implements OnInit {
  /**
   * @property name // definimos array vacio @type string para proxima iteracion
   * @property card // definimos array vacion con @type card exportado de la clase de CardComponent
   * @property pulsar // definimos array vacio para proxima iteracion
   * @property turns & points // definimos dos priedades con valor inical para la iterancion de puntos y turnos con @type number
   */
  names: string[] = [];
  cards: card[] = [];
  pulsar = [];
  turns: number = 0;
  points: number = 0;

  // TODO:   // COMENTARIOS EN EL CODIGO // EXPLICACION DEL JUEGO

  constructor() {
    super();
    /**
     * se utiliza la propiedad name para crear un primer array estatico que se debe iterar en las cards
     */
    this.names = [
      'adonay',
      'jacobo',
      'elisa',
      'elisabet',
      'luis-marin',
      'luis-clar',
      'mónica',
      'sunil',
      'angelines',
      'paloma',
      'jordi',
      'marçal',
    ];

    /**
     * se crea variable con @type string para iterar la lista names y hacer un push doble para que pueda
     * iterar todos los nombres por duplicado para crear la pareja de cada nombre
     */
    let tempCards: string[] = [];
    this.names.forEach((card) => {
      tempCards.push(card);
      tempCards.push(card);
    });

    /**
     * Definimos que nuestra propiedad names es = a TempCards
     */
    this.names = tempCards;

    /**
     * Se utiliza la @function shuffle para que el array creado nos lo devuelva desordenado
     */
    this.names = this.shuffle(this.names);

    /**
     * Se utiliza el .map para crear una nueva array para poder comparar con el array estatica (this.names)
     */
    this.cards = this.names.map((name) => ({
      name: name,
      background: '',
      visible: false,
      matched: false,
    }));
  }

  ngOnInit(): void {
    this.gameInstruccion();
  }

  /**
   * @function Shuffle que nos devuelve el array desordando
   * @param a con @type string
   *
   */
  shuffle(a: string[]) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  /**
   * Metodo Decide que tiene un[CardClick] en el componente board.html que recibe un evento desde card.html
   * @param value
   */

  decide(value: any) {
    /**
     *Comprobacion que nos dice que si el value.background es diferente a green ejecute el resto de codigo
     * Con esto conseguimos que una vez que tengamos  bloqueadas las cards ya matcheadas
     */
    if (value.background != 'green') {
      this.pulsar.push(value);

      /**
       * Hacemos una comprobacion de que nuestro array tenga valores pares para poder entrar en la comprobacion
       */
      if (this.pulsar.length % 2 !== 1) {
        /**
         * se crea variable Pulsar2 y que nos compruebe los dos ultimos valores que se reciben cuando recibimos el evento
         */
        let pulsar2 = this.pulsar.slice(this.pulsar.length - 2);

        if (pulsar2.length === 2) {
          /**
           * comprobacion si los nombres de las cards clicadas son iguales
           */
          if (pulsar2[0].name === pulsar2[1].name) {
            this.cards.forEach((name) => {
              this.pulsar = [];
              if (
                name['name'] === pulsar2[0].name &&
                name['visible'] &&
                pulsar2[0].visible
              ) {
                name['background'] = 'green';
                this.points++;
              }
            });

            /**
             * comprobacion para los nombres de las cards no coinciden
             */
          } else {
            this.cards.forEach((name) => {
              if (
                name['name'] === pulsar2[0].name &&
                name['visible'] === true
              ) {
                name['background'] = 'red';
                this.turns++;
                this.pulsar = [];
                setTimeout(() => {
                  name['background'] = 'white';
                  name['visible'] = false;
                }, 500);
              } else if (
                name['name'] === pulsar2[1].name &&
                name['visible'] === true
              ) {
                name['background'] = 'red';
                this.pulsar = [];
                setTimeout(() => {
                  name['background'] = 'white';
                  name['visible'] = false;
                }, 500);
              }
            });
          }

          /**
           * comprobacion para el limite de turnos y el limete de puntos (limite de turnos 25 una vez llegado aqui se corta el juego y se recarga)
           * (Limite de puntos 24, una vez alcanzada esta cantidad de puntos, se supera el juego y se recarga)
           */

          if (this.turns == 25) {
            alert('haz perdido');
            window.location.reload();
          } else {
            if (this.points == 24) {
              alert('Enhorabuena los haz conseguido');
              window.location.reload();
            }
          }
        }
      }
    }
  }

  /**
   * Metodo para la activacion de juego mediande boton START GAME
   */
  startGame() {
    $('.board').css('display', 'flex');
  }

  gameInstruccion() {
    alert(
      'This is a simple memory game. This game is about several cards with internal names which we must get the pair of each card//Keep in mind that you will have a limit of 25 turns to find all the pairs and a point limit of 24 to achieve victory// Click on Start Game when you are ready and enjoy, It is not difficult at all: D'
    );
  }
}
