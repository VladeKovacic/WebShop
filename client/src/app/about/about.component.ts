import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ProductService } from '../product/product.service';
import { ProductParams } from '../product/productParams.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }
}
