import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ProductGroup } from 'src/app/_models/productGroup';
import { ProductGroupService } from 'src/app/_services/product-group.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }

}
