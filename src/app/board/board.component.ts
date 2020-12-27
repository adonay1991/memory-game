import { NgStyle } from '@angular/common';
import { BuiltinType, ThisReceiver } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ElementRef } from '@angular/core';
import { Component, Renderer2, Input, OnInit } from '@angular/core';
import { card } from '../card/card.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent extends CardComponent implements OnInit {
  names: string[] = [];
  cards: card[] = [];

  @Input() card2: CardComponent;

  pulsar = [];
  turns: number = 0;
  points: number = 0;

  constructor(public renderer: Renderer2, public el: ElementRef) {
    super();
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
    let tempCards: string[] = [];
    this.names.forEach((card) => {
      tempCards.push(card);
      tempCards.push(card);
    });

    this.names = tempCards;

    // this.names = this.shuffle(this.names);

    this.cards = this.names.map((name) => ({
      name: name,
      background: '',
      visible: false,
      matched: false,
    }));
  }

  ngOnInit(): void {
    this.turnos();
  }

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

  decide(value: any) {
    this.pulsar.push(value.name);
    console.log(this.pulsar);

    if (this.pulsar.length % 2 !== 1) {
      // if (this.pulsar[0] === this.pulsar[1]) {
      //   alert('estas oprimiento la misma carta');
      //   this.pulsar = [];
      // }

      let pulsar2 = this.pulsar.slice(this.pulsar.length - 2);

      if (pulsar2.length === 2) {
        this.turns++;
        if (pulsar2[0] === pulsar2[1]) {
          this.cards.forEach((name) => {
            this.pulsar = [];
            if (name['name'] === pulsar2[0]) {
              name['background'] = 'green';
              // this.renderer.setStyle(
              //   this.el.nativeElement,
              //   'btn',
              //   '2px dashed olive'
              // );
              this.points++;
            }
          });
        } else {
          this.cards.forEach((name) => {
            if (name['name'] === pulsar2[0] && name['visible'] === true) {
              name['background'] = 'red';
              setTimeout(() => {
                name['background'] = 'white';
                name['visible'] = false;
              }, 2000);
            } else if (
              name['name'] === pulsar2[1] &&
              name['visible'] === true
            ) {
              name['background'] = 'red';
              setTimeout(() => {
                name['background'] = 'white';
                name['visible'] = false;
              }, 2000);

              console.log('salgo');
            }
          });
        }
      }
    }
  }

  turnos() {
    if (this.turns >= 10) {
      console.log(this.turns);

      alert('Haz perdido');
      window.location.reload;
    }
  }
}
