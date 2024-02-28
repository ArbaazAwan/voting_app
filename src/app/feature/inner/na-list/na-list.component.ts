import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Column, SeatNA } from '../../../shared/models/model';
import { Table } from 'primeng/table';
import { HttpService } from '../../../shared/services/http.service';
import { API_ENPOINT } from '../../../shared/models/api-endpoints';
import {
  ToastService,
  ToastType,
} from '../../../shared/services/toast.service';
import { Subscription } from 'rxjs';
import { NaDetailComponent } from './na-detail/na-detail.component';

@Component({
  selector: 'app-na-list',
  templateUrl: './na-list.component.html',
  styleUrl: './na-list.component.scss',
})
export class NaListComponent implements OnInit, OnDestroy {
  @ViewChild('dt1') dt1!: Table;
  @ViewChild(NaDetailComponent) naDetailComponent!: NaDetailComponent;
  private _subscriptions: Subscription[] = [];
  seatNAList: SeatNA[] = [];
  activeNAList: SeatNA[] = [];
  cols!: Column[];
  selectedColumns!: Column[];
  toggleAllCheckboxes!: boolean;
  showAddNAModal: boolean = false;

  constructor(
    private _NAService: HttpService<SeatNA>,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { header: 'Seat Name', field: 'seatName' },
      { header: 'Province', field: 'province' },
      { header: 'Active', field: 'isActive' },
      { header: 'Action', field: '' },
    ];
    this.selectedColumns = this.cols;
    this.getNAList();
  }

  getNAList() {
    const sub1 = this._NAService.get(API_ENPOINT.GET_ALL_NA).subscribe({
      next: (res: any) => {
        if (!res.isSuccess) {
          this._toastService.showToast(ToastType.Error, 'NA List', res.msg);
          return;
        }
        this.seatNAList = res.data;

        //get all active nalist
        this.activeNAList = res.data.filter((x: SeatNA) => x.isActive);

        //set all check/uncheck checkbox
        if (this.seatNAList.length == this.activeNAList.length)
          this.toggleAllCheckboxes = true;
        else this.toggleAllCheckboxes = false;
      },
      error: (err) => {
        debugger;
      },
    });

    this._subscriptions.push(sub1);
  }

  postNASeat(data: SeatNA) {
    const sub1 = this._NAService.post(API_ENPOINT.Post_NA, data).subscribe({
      next: (res: any) => {
        if (!res.isSuccess) {
          this._toastService.showToast(
            ToastType.Error,
            'National Assembly',
            res.msg
          );
          return;
        }
      },
      error: (err) => {
        this._toastService.showToast(
          ToastType.Error,
          'National Assembly',
          'Error Occured while Posting NA'
        );
      },
    });
    this._subscriptions.push(sub1);
  }

  editNA(seatNA: SeatNA) {
    this.naDetailComponent.NAForm.patchValue({...seatNA});
    this.showAddNAModal = true;
    //TODO: to be implemented later
  }

  deleteNA(seatNA: SeatNA) {
    //TODO: to be implemented later
  }

  checkUncheckAll() {
    this.toggleAllCheckboxes = !this.toggleAllCheckboxes;

    //get all naIds
    const naIds = this.seatNAList.map((n: SeatNA) => n.id);

    const payLoad = {
      isActive: this.toggleAllCheckboxes,
      naids: naIds,
    };

    const sub1 = this._NAService
      .post(API_ENPOINT.Post_NA_Bulk_Status, payLoad)
      .subscribe({
        next: (res:any) => {
          if (!res.isSuccess) {
            this._toastService.showToast(
              ToastType.Error,
              'National Assembly',
              res.msg
            );
            return;
          }
        },
        error: (err) => {
            this._toastService.showToast(
              ToastType.Error,
              'National Assembly',
              'Error Occured while updating',
            );
        },
      });

    this._subscriptions.push(sub1);
  }

  checkUncheck(rowData: SeatNA) {
    this.postNASeat(rowData);
  }

  clear(table: Table) {
    table.clear();
  }

  filterGlobal(event: any) {
    this.dt1.filterGlobal(event.target.value, 'contains');
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
