import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Column, SeatUC } from '../../../shared/models/model';
import { Subscription } from 'rxjs';
import { HttpService } from '../../../shared/services/http.service';
import { ToastService, ToastType } from '../../../shared/services/toast.service';
import { API_ENPOINT } from '../../../shared/models/api-endpoints';

@Component({
  selector: 'app-uc-list',
  templateUrl: './uc-list.component.html',
  styleUrl: './uc-list.component.scss'
})
export class UcListComponent {

  @ViewChild('dt1') dt1!: Table;
  // @ViewChild(UCDetailComponent) paDetailComponent!: PaDetailComponent;
  private _subscriptions: Subscription[] = [];
  seatUCList: SeatUC[] = [];
  activeUCList: SeatUC[] = [];
  cols!: Column[];
  toggleAllCheckboxes!: boolean;
  showAddUCModal: boolean = false;
  isTableLoading: boolean = false;

  constructor(
    private _UCService: HttpService<SeatUC>,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { header: 'Seat UC', field: 'uC_Seat' },
      { header: 'PA Seat', field: 'pA_Seat' },
      { header: 'NA Seat', field: 'nA_Seat' },
      { header: 'Province', field: 'province' },
      { header: 'Active', field: 'isActive' },
      { header: 'Action', field: '' },
    ];
    this.getUCList();
  }

  getUCList() {
    this.isTableLoading = true;
    const sub1 = this._UCService.get(API_ENPOINT.GET_ALL_UC).subscribe({
      next: (res: any) => {
        debugger
        if (!res.isSuccess) {
          this._toastService.showToast(ToastType.Error, 'UC List', res.msg);
          return;
        }
        this.seatUCList = res.data;

        //get all active UClist
        this.activeUCList = res.data.filter((x: SeatUC) => x.isActive);

        //set all check/uncheck checkbox
        if (this.seatUCList.length == this.activeUCList.length)
          this.toggleAllCheckboxes = true;
        else this.toggleAllCheckboxes = false;
      },
      error: (err) => {
        debugger
        this._toastService.showToast(ToastType.Error, 'UC List', err.message);
      },
    });

    this._subscriptions.push(sub1);
  }

  postUCSeat(data: SeatUC) {
    // const sub1 = this._UCService.post(API_ENPOINT.Post_UC, data).subscribe({
    //   next: (res: any) => {
    //     if (!res.isSuccess) {
    //       this._toastService.showToast(
    //         ToastType.Error,
    //         'UCtioUCl Assembly',
    //         res.msg
    //       );
    //       return;
    //     }
    //   },
    //   error: (err) => {
    //     this._toastService.showToast(
    //       ToastType.Error,
    //       'UCtioUCl Assembly',
    //       'Error Occured while Posting UC'
    //     );
    //   },
    // });
    // this._subscriptions.push(sub1);
  }

  editUC(seatUC: SeatUC) {
    // this.UCDetailComponent.UCForm.patchValue({...seatUC});
    // this.showAddUCModal = true;
    //TODO: to be implemented later
  }

  deleteUC(seatUC: SeatUC) {
    //TODO: to be implemented later
  }

  checkUncheckAll() {
    this.toggleAllCheckboxes = !this.toggleAllCheckboxes;

    // get all UCIds
    const ucIds = this.seatUCList.map((n: SeatUC) => n.id);

    const payLoad = {
      isActive: this.toggleAllCheckboxes,
      ucids: ucIds,
    };

    const sub1 = this._UCService
      .post(API_ENPOINT.Post_UC_Bulk_Status, payLoad)
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
              'UCtioUCl Assembly',
              'Error Occured while updating',
            );
        },
      });

    this._subscriptions.push(sub1);
  }

  checkUncheck(rowData: SeatUC) {
    this.postUCSeat(rowData);
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
