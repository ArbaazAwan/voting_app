import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Province, Response, SeatNA } from '../../../../shared/models/model';
import { HttpService } from '../../../../shared/services/http.service';
import { API_ENPOINT } from '../../../../shared/models/api-endpoints';
import { generateGUID } from '../../../../shared/models/pick-lists';

@Component({
  selector: 'app-na-detail',
  templateUrl: './na-detail.component.html',
  styleUrl: './na-detail.component.scss'
})
export class NaDetailComponent implements OnInit {

  NAForm!: FormGroup;
  provinceList: Province[] = [];

  constructor(
    private fb: FormBuilder,
    private _provinceService: HttpService<Province>,
    private _NAService: HttpService<SeatNA>,
  ){}

  ngOnInit(): void {
    this.NAForm = this.fb.group({
      id: [null],
      provinceID: [null],
      seatName: [null, Validators.required],
      isActive: [true, Validators.required],
      isNew: [false],
    });
    this.getProvinceList();
  }

  getProvinceList() {
    this._provinceService.get(API_ENPOINT.GetProvinces).subscribe({
      next: (res: any) => {
        this.provinceList = res.data;
      },
      error: (err) => {},
    });
  }

  postNASeat(seatNA: SeatNA) {
    this._NAService.post(API_ENPOINT.Post_NA, seatNA).subscribe({
      next: (res) => {
        debugger;
      },
      error: (err) => {
        debugger;
      },
    });
  }


  onSubmit() {
    const payLoad: SeatNA = this.NAForm.getRawValue();
    payLoad.id = generateGUID();
    payLoad.isNew = true;
    this.postNASeat(payLoad);
  }



}
