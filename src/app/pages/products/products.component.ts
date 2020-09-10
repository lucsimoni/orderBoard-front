import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [
    { id: '1', name:'chaise', description:'Description du produit', price:40, quantity:20},
    { id: '2', name:'table', description:'Description du produit', price:200, quantity:30},
    { id: '3', name:'tabouret', description:'Description du produit', price:20, quantity:10},
    { id: '4', name:'armoire', description:'Description du produit', price:150, quantity:23},
    { id: '5', name:'console', description:'Description du produit', price:100, quantity:25}
  ];
  public searchResults;

  constructor() { }

  ngOnInit(): void {
    this.searchResults = [...this.products];
  }

  search(event: any) {    
    this.searchResults = [];
    event = this.format(event.target.value.toString());    
    if (event) {
      this.products.forEach(product => {        
        if (this.format(product.name).startsWith(event))
          this.searchResults.push(product);
      });
    } else {
      this.searchResults = [...this.products];
    }
  }

  //Formatage des données de recherche
  format(element: any) {
    //On passe tout en minuscule
    element = element.toLowerCase();
    //On supprime les éventuels accents
    let accent = [
      /[\300-\306]/g, /[\340-\346]/g, // A, a
      /[\310-\313]/g, /[\350-\353]/g, // E, e
      /[\314-\317]/g, /[\354-\357]/g, // I, i
      /[\322-\330]/g, /[\362-\370]/g, // O, o
      /[\331-\334]/g, /[\371-\374]/g, // U, u
      /[\321]/g, /[\361]/g, // N, n
      /[\307]/g, /[\347]/g, // C, c
    ];
    let noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];
    for (var i = 0; i < accent.length; i++) {
      element = element.replace(accent[i], noaccent[i]);
    }
    return element;
  }

}
