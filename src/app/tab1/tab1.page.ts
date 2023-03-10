import { Pelicula } from './../Interfaces/interfaces';
import { MoviesService } from './../services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  img = 'assets/no-image-banner.jpg';
  constructor(private moviesService: MoviesService) { }

  


  ngOnInit() {
    this.moviesService.getFeature().subscribe(resp => {
      //console.log (resp);
      this.peliculasRecientes = resp.results;
    });

 this.getPopulares();

  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.moviesService.getPopulares()
    .subscribe( resp => {
       //console.log('Populares', resp.results);
      const arrTemp = [ ...this.populares, ...resp.results ];
      this.populares = arrTemp;

    });
  }
}
