import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { ILibro } from 'src/app/models/ilibro';
import { LibrosService } from 'src/app/services/apis/libros.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pagination = {
    topSize: 500,
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'titulo',
    ascending: true
  };
  displayedColumns: string[] = ['titulo', 'sipnosis', 'npaginas'];
  libros!: MatTableDataSource<ILibro>;
  subRef$!: Subscription;

  constructor(
    private librosService: LibrosService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.loadLibros();
  };

  loadLibros(): void {
    const httpParams = new HttpParams()
    .set('PageNumber', this.pagination.pageNumber)
    .set('PageSize', this.pagination.pageSize);
    this.dataService.get<ILibro[]>(this.librosService.getUrlLibros(),  httpParams).subscribe(
      res => {
        this.libros = new MatTableDataSource<ILibro>(res.body!);
      }, err => {
        console.log('error obtenido productos');
        this.pagination.topSize = this.pagination.pageNumber - 1;
        this.pagination.pageNumber = this.pagination.topSize;
      }
    )
  }

  onNextPage(): void {
    if(this.pagination.pageNumber <= this.pagination.topSize){
    this.pagination.pageNumber++;
    this.loadLibros();
    }
  }

  onBackPage(): void {
    if(this.pagination.pageNumber > 1){
    this.pagination.pageNumber--;
    this.loadLibros();
   }
  }

  ngOnDestroy() : void{
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }
}




