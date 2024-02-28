import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Column, SeatPA } from '../../../shared/models/model';
import { ToastService, ToastType } from '../../../shared/services/toast.service';
import { HttpService } from '../../../shared/services/http.service';
import { API_ENPOINT } from '../../../shared/models/api-endpoints';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pa-list',
  templateUrl: './pa-list.component.html',
  styleUrl: './pa-list.component.scss'
})
export class PaListComponent {
  @ViewChild('dt1') dt1!: Table;
  // @ViewChild(PADetailComponent) paDetailComponent!: PaDetailComponent;
  private _subscriptions: Subscription[] = [];
  seatPAList: SeatPA[] = [];
  activePAList: SeatPA[] = [];
  cols!: Column[];
  toggleAllCheckboxes!: boolean;
  showAddPAModal: boolean = false;
  isTableLoading: boolean = false;

  constructor(
    private _PAService: HttpService<SeatPA>,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { header: 'PA Seat', field: 'pA_Seat' },
      { header: 'NA Seat', field: 'nA_Seat' },
      { header: 'Province', field: 'province' },
      { header: 'Active', field: 'isActive' },
      { header: 'Action', field: '' },
    ];
    this.getPAList();
  }

  getPAList() {
    this.isTableLoading = true;
    const sub1 = this._PAService.get(API_ENPOINT.GET_ALL_PA).subscribe({
      next: (res: any) => {
        if (!res.isSuccess) {
          this._toastService.showToast(ToastType.Error, 'PA List', res.msg);
          return;
        }
        this.seatPAList = res.data;

        //get all active PAlist
        this.activePAList = res.data.filter((x: SeatPA) => x.isActive);

        //set all check/uncheck checkbox
        if (this.seatPAList.length == this.activePAList.length)
          this.toggleAllCheckboxes = true;
        else this.toggleAllCheckboxes = false;
      },
      error: (err) => {
        this._toastService.showToast(ToastType.Error, 'PA List', err.message);
      },
    });

    this._subscriptions.push(sub1);
  }

  postPASeat(data: SeatPA) {
    const sub1 = this._PAService.post(API_ENPOINT.Post_PA, data).subscribe({
      next: (res: any) => {
        if (!res.isSuccess) {
          this._toastService.showToast(
            ToastType.Error,
            'Provincial Assembly Assembly',
            res.msg
          );
          return;
        }
      },
      error: (err) => {
        this._toastService.showToast(
          ToastType.Error,
          'Provincial Assembly',
          'Error Occured while Posting PA'
        );
      },
    });
    this._subscriptions.push(sub1);
  }

  editPA(seatPA: SeatPA) {
    // this.PADetailComponent.PAForm.patchValue({...seatPA});
    // this.showAddPAModal = true;
    //TODO: to be implemented later
  }

  deletePA(seatPA: SeatPA) {
    //TODO: to be implemented later
  }

  checkUncheckAll() {
    this.toggleAllCheckboxes = !this.toggleAllCheckboxes;

    //get all PAIds
    const paIds = this.seatPAList.map((n: SeatPA) => n.id);

    const payLoad = {
      isActive: this.toggleAllCheckboxes,
      PAids: paIds,
    };

    const sub1 = this._PAService
      .post(API_ENPOINT.Post_PA_Bulk_Status, payLoad)
      .subscribe({
        next: (res:any) => {
          if (!res.isSuccess) {
            this._toastService.showToast(
              ToastType.Error,
              'Provincial Assembly',
              res.msg
            );
            return;
          }
        },
        error: (err) => {
            this._toastService.showToast(
              ToastType.Error,
              'PAtioPAl Assembly',
              'Error Occured while updating',
            );
        },
      });

    this._subscriptions.push(sub1);
  }

  checkUncheck(rowData: SeatPA) {
    this.postPASeat(rowData);
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
