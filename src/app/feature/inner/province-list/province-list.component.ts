import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Column, Province } from '../../../shared/models/model';
import { Table } from 'primeng/table';
import { HttpService } from '../../../shared/services/http.service';
import { API_ENPOINT } from '../../../shared/models/api-endpoints';
import {
  ToastService,
  ToastType,
} from '../../../shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrl: './province-list.component.scss',
})
export class ProvinceListComponent implements OnInit, OnDestroy {
  @ViewChild('dt1') dt1!: Table;
  private _subscriptions: Subscription[] = [];
  pageSize: number = 10;
  provinces: Province[] = [];
  activeProvinces: Province[] = [];
  cols!: Column[];

  constructor(
    private _toastService: ToastService,
    private _provinceService: HttpService<Province>
  ) {}

  ngOnInit(): void {
    this.cols = [
      { header: 'Display', field: 'display' },
      { header: 'Province', field: 'name' },
      { header: 'Active', field: 'isActive' },
    ];

    this.getProvinces();
  }

  getProvinces() {
    const sub1 = this._provinceService.get(API_ENPOINT.GetProvinces).subscribe({
      next: (res: any) => {
        if (!res.isSuccess) {
          this._toastService.showToast(ToastType.Error, 'Provinces', res.msg);
          return;
        }
        this.provinces = res.data;
        this.activeProvinces = res.data.filter(
          (p: Province) => p.isActive == true
        );
      },
      error: (err) => {
        this._toastService.showToast(
          ToastType.Error,
          'Provinces',
          'Error Occured While Getting Provinces'
        );
      },
    });
    this._subscriptions.push(sub1);
  }

  checkUncheckAll() {
    // TODO: Handle check/uncheck all logic here
    console.log('Check/Uncheck All');
  }

  checkUncheck(rowData: any) {
    // TODO: Handle check/uncheck for a single row logic here
    console.log('Check/Uncheck', rowData);
  }

  clear(table: Table) {
    table.clear();
  }

  filterGlobal(event: any) {
    this.dt1.filterGlobal(event.target.value, 'contains');
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
