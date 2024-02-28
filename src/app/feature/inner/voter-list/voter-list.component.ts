import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterVoterComponent } from './register-voter/register-voter.component';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { Column, Voter } from '../../../shared/models/model';
import { ToastService, ToastType } from '../../../shared/services/toast.service';
import { HttpService } from '../../../shared/services/http.service';
import { API_ENPOINT } from '../../../shared/models/api-endpoints';

@Component({
  selector: 'app-voter-list',
  templateUrl: './voter-list.component.html',
  styleUrl: './voter-list.component.scss'
})
export class VoterListComponent implements OnInit {


  @ViewChild('dt1') dt1!: Table;
  @ViewChild(RegisterVoterComponent) naDetailComponent!: RegisterVoterComponent;
  private _subscriptions: Subscription[] = [];
  voterList: Voter[] = [];
  activeVoterList: Voter[] = [];
  cols!: Column[];
  toggleAllCheckboxes!: boolean;
  showRegisterVoterModal: boolean = false;

  constructor(
    private _voterService: HttpService<Voter>,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {

    //TODO: change accordingly
    this.cols = [
      { header: 'Seat Name', field: 'seatName' },
      { header: 'Province', field: 'province' },
      { header: 'Active', field: 'isActive' },
      { header: 'Action', field: '' },
    ];
    this.getVoterList();
  }

  getVoterList() {
    // const sub1 = this._voterService.get(API_ENPOINT.).subscribe({
    //   next: (res: any) => {
    //     if (!res.isSuccess) {
    //       this._toastService.showToast(ToastType.Error, 'Voter List', res.msg);
    //       return;
    //     }
    //     this.voterList = res.data;

    //     //get all active nalist
    //     this.activeVoterList = res.data.filter((x: Voter) => x.isActive);

    //     //set all check/uncheck checkbox
    //     if (this.voterList.length == this.activeVoterList.length)
    //       this.toggleAllCheckboxes = true;
    //     else this.toggleAllCheckboxes = false;
    //   },
    //   error: (err) => {
    //     debugger;
    //   },
    // });

    // this._subscriptions.push(sub1);
  }

  postVoter(data: Voter) {
    // const sub1 = this._voterService.post(API_ENPOINT., data).subscribe({
    //   next: (res: any) => {
    //     if (!res.isSuccess) {
    //       this._toastService.showToast(
    //         ToastType.Error,
    //         'Voter',
    //         res.msg
    //       );
    //       return;
    //     }
    //   },
    //   error: (err) => {
    //     this._toastService.showToast(
    //       ToastType.Error,
    //       'Voter',
    //       'Error Occured while Posting Voter'
    //     );
    //   },
    // });
    // this._subscriptions.push(sub1);
  }

  editVoter(voter: Voter) {
    this.naDetailComponent.voterForm.patchValue({...voter});
    this.showRegisterVoterModal = true;
    //TODO: to be implemented later
  }

  deleteVoter(voter: Voter) {
    //TODO: to be implemented later
  }

  checkUncheckAll() {
    // this.toggleAllCheckboxes = !this.toggleAllCheckboxes;

    // //get all naIds
    // const naIds = this.voterList.map((n: Voter) => n.id);

    // const payLoad = {
    //   isActive: this.toggleAllCheckboxes,
    //   naids: naIds,
    // };

    // const sub1 = this._voterService
    //   .post(API_ENPOINT., payLoad)
    //   .subscribe({
    //     next: (res:any) => {
    //       if (!res.isSuccess) {
    //         this._toastService.showToast(
    //           ToastType.Error,
    //           'Voter',
    //           res.msg
    //         );
    //         return;
    //       }
    //     },
    //     error: (err) => {
    //         this._toastService.showToast(
    //           ToastType.Error,
    //           'Voter',
    //           'Error Occured while updating',
    //         );
    //     },
    //   });

    // this._subscriptions.push(sub1);
  }

  checkUncheck(rowData: Voter) {
    this.postVoter(rowData);
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
