import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public isLoading: boolean = false;

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.utilsService.watchLoader().subscribe(enable => this.isLoading = enable);
  }

}
