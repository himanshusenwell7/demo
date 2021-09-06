import { Component, ViewChild, ElementRef } from '@angular/core';
import { datasource } from './datas';
import { RowDDService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { PageSettingsModel, EditSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { TreeGrid, Freeze, Sort, Selection, RowDD , Page,Toolbar} from '@syncfusion/ej2-treegrid';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { SortEventArgs } from '@syncfusion/ej2-grids';
import * as XLSX from 'xlsx';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Dialog } from '@syncfusion/ej2-popups';

TreeGrid.Inject(Page, Toolbar, Selection);
import { jsPDF } from "jspdf";
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
TreeGrid.Inject(Sort, Page);
TreeGrid.Inject(RowDD);

import html2canvas from 'html2canvas';
TreeGrid.Inject(Freeze,Sort, Selection);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RowDDService,
    SelectionService]
})
export class AppComponent {
  data: any = [{}];
  public editSettings: EditSettingsModel | any;
  public toolbar: string[] | any
  pageSettings: PageSettingsModel = { pageSize: 6 };
  allowSelection= true
  selectionSettings= { type: 'Multiple', mode: 'Row' }


  title = 'demo';
  showMenu = false
  @ViewChild('menu') menu!: ElementRef
  fileName: string = "userList";
  selectOptions: any;

  constructor() {
    this.data = datasource;
    debugger
  }

  ngOnInit(): void {

    this.editSettings = {
      allowEditing: "true",
      allowAdding: "true",
      AllowDeleting: "true",
      mode: "row"

    }

    this.toolbar = ['Add', 'Edit', 'Delet', 'Update', 'Cancel']
    this.data = datasource;
    this.selectOptions = { type: 'Single' }; const newLocal = this.data = datasource;



  }
  contextMenu(event: any) {
    debugger
    event.preventDefault()
    this.menu.nativeElement.style.display = "block"
    this.menu.nativeElement.style.top = event.pageY + "px"
    this.menu.nativeElement.style.left = event.pageX + "px"
  }

  hideContext() {
    this.menu.nativeElement.style.display = "none"
  }
  exportexcel(): void {
    debugger
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName + ".xlsx");

  }
  exportPDF(): void {
    let DATA: any = document.getElementById('excel-table');
    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('angular-demo.pdf');
    });

  }
  ConvertToCSV() {
    const headerList = ['Task ID', 'Task Name', 'Start Date', 'End Date', 'Duration']
    let array = typeof this.data
      != 'object' ? JSON.parse(this.data
      ) : this.data
      ;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
