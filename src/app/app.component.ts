import { SelectionModel } from '@angular/cdk/collections';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  seasons: string[] = ['Padrão', '50 linhas'];

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  title = 'test';
  dataSource: any = [];
  resultsLength = 0;
  columnsToDisplay = ['name','email','client','username', 'actions'];
  dataSourceDC = ['name','email', 'client', 'username', 'actions'];
  dataColumns = [
    {id: 'name', name: 'Usuário', order: 0, selected: this.isColumnSelected('name')},
    {id: 'email', name: 'Email', order: 2, selected: this.isColumnSelected('email')},
    {id: 'client', name: 'Cliente', order: 1, selected: this.isColumnSelected('client')},
    {id: 'username', name: 'Perfil de Acesso', order: 3, selected: this.isColumnSelected('username')},
];

  selectionCols: SelectionModel<any> = new SelectionModel<any>(true, this.dataColumns.filter((item) => {
    return item.selected
}))

isAllColsSelected() {
  const numSelected = this.selectionCols.selected.length;
  const numRows = this.dataColumns.length;
  return numSelected === numRows;
}
masterToggle() {
  this.isAllColsSelected() ?
      this.selectionCols.clear() :
      this.dataColumns.forEach((row) => {
          this.selectionCols.select(row)
      });
}

isColumnSelected(col: any) {
  const values: any[] = []
  let items: any[] = []

  if (!values.length) return true

  values.map((val) => {
      if (val.id == col)
          items.push(val.id)
  })

  return items.indexOf(col) > -1
}
  constructor(private service : DataService){}
  ngAfterViewInit(): void {
    this.service.getUsers().subscribe((response) => {
      this.dataSource = response,
      console.log(response);
    })

    this.selectionCols.changed.subscribe((item) => {
      const dc = []
      let values = item.source.selected.sort((a, b) => {
          return a.order < b.order ? -1 : a.order > b.order ? 1 : 0
      })


      if (values.length) {
          values.map((r) => {
              dc.push(r.id)
          })
      }
      dc.push('actions')


      this.dataSourceDC = dc
  })
    throw new Error('Method not implemented.');
  }
  /*ngOnInit(){
    this.service.getUsers().subscribe((response) => {
      this.dataSource = response;
    })
  }
*/
console(e: any) {
  console.log(e)
}
}
