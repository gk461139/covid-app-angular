import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'country', 'confirmed', 'deaths', 'recovered', 'population'];
  dataSource: any;
  @ViewChild('pagination')
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  searchValue: any;
  sortedArray: any;
  constructor(private https: HttpClient) {
    this.getData();
  }

  ngOnInit(): void {

  }

  searchCountry(inputData: any) {
    this.searchValue = inputData.target.value;
    this.searchValue = this.searchValue.trim();
    this.searchValue = this.searchValue.toLowerCase();
    this.dataSource.filter = this.searchValue;
  }

  sortByCountry() {
    this.dataSource = [];
    this.sortedArray.sort((a: any, b: any) => a.country.localeCompare(b.country))
    this.dataSource = new MatTableDataSource<any>(this.sortedArray);
  }

  getData() {
    this.https.get('https://coronavirus-tracker-api.herokuapp.com/v2/locations').subscribe((response: any) => {
      this.dataSource = new MatTableDataSource<any>(response.locations);
      this.sortedArray = response.locations;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
