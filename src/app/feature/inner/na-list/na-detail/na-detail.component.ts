import { Component, OnInit } from '@angular/core';
import { ControlConfig, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControlConfig, Province, SeatNA } from '../../../../shared/models/model';
import { HttpService } from '../../../../shared/services/http.service';
import { API_ENPOINT } from '../../../../shared/models/api-endpoints';
import { generateGUID } from '../../../../shared/models/pick-lists';

@Component({
  selector: 'app-na-detail',
  templateUrl: './na-detail.component.html',
  styleUrl: './na-detail.component.scss',
})
export class NaDetailComponent implements OnInit {

  NAForm!: FormGroup;
  controlConfig: FormControlConfig[] = [];
  provinceList: Province[] = [];

  constructor(
    private fb: FormBuilder,
    private _provinceService: HttpService<Province>,
    private _NAService: HttpService<SeatNA>,
  ){
    this.controlConfig = [
      { name: 'username', value: '', validators: [Validators.required], type: 'text' },
      { name: 'age', value: '', validators: [Validators.required, Validators.min(18)], type: 'number' },
      { name: 'dob', value: '', validators: [Validators.required], type: 'date' },
      { name: 'date of joining', value: '', validators: [Validators.required], type: 'date' }
    ];;
  }

  ngOnInit(): void {

    this.NAForm = this.fb.group({
      id: [null],
      provinceID: [null],
      seatName: [null, Validators.required],
      isActive: [true, Validators.required],
      isNew: [false],
    });

    this.getProvinceList();

    const initialValues = {
      username: 'JohnDoe',
      age: 25,
      dob: '1990-01-01'
    };

    this.patchForm(initialValues, this.controlConfig);
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

  patchForm(initialValues: any, controlConfig: FormControlConfig[]) {
    controlConfig.forEach(control => {
      control.value = initialValues[control.name];
    });
  }


  onSubmit() {
    const payLoad: SeatNA = this.NAForm.getRawValue();
    payLoad.id = generateGUID();
    payLoad.isNew = true;
    this.postNASeat(payLoad);
  }



}
