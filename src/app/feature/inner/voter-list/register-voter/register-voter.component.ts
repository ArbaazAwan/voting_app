import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Province,
  SeatNA,
  SeatPA,
  SeatUC,
  SeatVC,
  Voter,
} from '../../../../shared/models/model';
import { HttpService } from '../../../../shared/services/http.service';
import { API_ENPOINT } from '../../../../shared/models/api-endpoints';
import { generateGUID } from '../../../../shared/models/pick-lists';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import {
  ToastService,
  ToastType,
} from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-register-voter',
  templateUrl: './register-voter.component.html',
  styleUrl: './register-voter.component.scss',
})
export class RegisterVoterComponent implements OnInit {
  voterForm!: FormGroup;
  genedersList: string[] = ['Male', 'Female', 'Other'];
  provinceList$!: Observable<Province[] | null>;
  naList$!: Observable<SeatNA[]>;
  paList$!: Observable<SeatPA[]>;
  ucList$!: Observable<SeatUC[]>;
  vcList$!: Observable<SeatVC[]>;

  private _selectedProvinceSubject = new BehaviorSubject<string | null>(null);
  private _selectedNASeatSubject = new BehaviorSubject<string | null>(null);
  private _selectedPASeatSubject = new BehaviorSubject<string | null>(null);
  private _selectedUCSeatSubject = new BehaviorSubject<string | null>(null);

  selectedProvince$ = this._selectedProvinceSubject.asObservable();
  selectedNASeat$ = this._selectedNASeatSubject.asObservable();
  selectedPASeat$ = this._selectedPASeatSubject.asObservable();
  selectedUCSeat$ = this._selectedUCSeatSubject.asObservable();

  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _voterService: HttpService<Voter>,
    private _provinceService: HttpService<Province>,
    private _naService: HttpService<SeatNA>,
    private _paService: HttpService<SeatPA>,
    private _ucService: HttpService<SeatUC>,
    private _vcService: HttpService<SeatVC>
  ) {
    this.formInit();
  }

  ngOnInit(): void {
    this.provinceList$ = this.getProvinceList();
    this.naList$ = this.getNAList();
    this.paList$ = this.getPAList();
    this.ucList$ = this.getUCList();
    this.vcList$ = this.getVCList();
  }

  formInit(): void {
    this.voterForm = this._fb.group({
      voterName: [null],
      fatherName: [null],
      voterCNIC: [null],
      voterEmail: [null, Validators.email], //missing field
      dob: [null],
      genderID: [], //missing list
      politicalParty: [null], //missing
      naId: [null], //missing field
      paId: [null], //missing field
      ucId: [null], //missing field
      vcId: [null], //missing field
      professionID: [null], //missing list
      locality: [null], //missing field
      electionContested: [null], //missing field
      remarks: [null], //missing field
    });
  }

  getProvinceList(): Observable<Province[]> {
    return this._provinceService.get(API_ENPOINT.GetProvinces).pipe(
      map((res: any) => {
        if (!res.isSuccess) {
          this._toastService.showToast(
            ToastType.Error,
            'Province List',
            res.msg
          );
        }
        return res.data;
      })
    );
  }

  getNAList(): Observable<SeatNA[]> {
    const naResponse$: any = this._naService.get(API_ENPOINT.GET_ALL_NA);
    return combineLatest(naResponse$, this.selectedProvince$).pipe(
      map(([naRes, selectedProvince]) => {
        const res: any = naRes;
        if (!res.isSuccess) {
          this._toastService.showToast(
            ToastType.Error,
            'National Assembly',
            res.msg
          );
        }
        return res.data.filter(
          (na: SeatNA) => na.provinceID === selectedProvince
        );
      })
    );
  }

  getPAList(): Observable<SeatPA[]> {
    const paList$ = this._paService.get(API_ENPOINT.GET_ALL_PA);

    return combineLatest(paList$, this.selectedNASeat$).pipe(
      map(([paRes, selectedNAId]) => {
        const res: any = paRes;
        if (!res.isSuccess) {
          this._toastService.showToast(
            ToastType.Error,
            'Provincial Assembly',
            res.msg
          );
        }
        return res.data.filter((pa: SeatPA) => pa.nA_ID == selectedNAId);
      })
    );
  }

  getUCList(): Observable<SeatUC[]> {
    const ucList$ = this._ucService.get(API_ENPOINT.GET_ALL_UC);
    return combineLatest(ucList$, this.selectedPASeat$).pipe(
      map(([ucRes, selectedPAId]) => {
        const res: any = ucRes;
        if (!res.isSuccess) {
          this._toastService.showToast(
            ToastType.Error,
            'Union Council',
            res.msg
          );
        }
        return res.data.filter((uc: SeatUC) => uc.pA_ID == selectedPAId);
      })
    );
  }

  getVCList(): Observable<SeatVC[]> {
    const vcList$ = this._vcService.get(API_ENPOINT.GET_ALL_VC);
    return combineLatest([vcList$, this.selectedUCSeat$]).pipe(
      map(([ucRes, selectedUCId]) => {
        const res: any = ucRes;
        if (!res.isSuccess) {
          this._toastService.showToast(
            ToastType.Error,
            'Village Council',
            res.msg
          );
        }
        return res.data.filter((vc: SeatVC) => vc.uC_ID == selectedUCId);
      })
    );
  }

  onProvinceSelected(event: any) {
    const provinceId = event.value;
    this._selectedProvinceSubject.next(provinceId);
    this._selectedNASeatSubject.next(null);
    this._selectedPASeatSubject.next(null);
    this._selectedUCSeatSubject.next(null);
  }

  onNASeatSelected(event: any) {
    const naId = event.value;
    this._selectedNASeatSubject.next(naId);
    this._selectedPASeatSubject.next(null);
    this._selectedUCSeatSubject.next(null);
  }

  onPASeatSelected(event: any) {
    const paId = event.value;
    this._selectedPASeatSubject.next(paId);
    this._selectedUCSeatSubject.next(null);
  }

  onUCSeatSelected(event: any) {
    const ucId = event.value;
    this._selectedUCSeatSubject.next(ucId);
  }

  onSubmit() {
    const formValue = this.voterForm.getRawValue();
    const voterObejct: Voter = {
      imgPhoto: '',
      imgCNIC: '',
      imgCNIC2: '',
      id: generateGUID(),
      villageTown_ID: '00000000-0000-0000-0000-000000000000',
      voterName: formValue.voterName || '',
      voterCNIC: formValue.voterCNIC || '',
      fatherName: formValue.fatherName || '',
      fatherCNIC: '',
      dob: formValue.dob || '',
      isActive: true,
      isNew: true,
      genderID: '00000000-0000-0000-0000-000000000000',
      professionID: '00000000-0000-0000-0000-000000000000',
      isQuranHafiz: false,
      educationID: '00000000-0000-0000-0000-000000000000',
      googleLoc: {
        latitude: '',
        longitude: '',
        radius: '',
        name: '',
      },
    };
    const payLoad = { ...voterObejct };
  }
}
