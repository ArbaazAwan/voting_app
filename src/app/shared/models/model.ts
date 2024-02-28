export interface Country {
  id: string;
  name: string;
  isActive: boolean;
}

export interface Column {
  field: string;
  header: string;
}

export interface Province {
  id: string;
  name: string;
  isActive: boolean;
  display: number;
  countryID: string;
}

export interface SeatNA {
  id: string;
  provinceID: string;
  province: string;
  seatName: string;
  isActive: boolean;
  isNew: boolean;
}

export interface SeatPA {
  id: string;
  nA_ID: string;
  nA_Seat: string;
  province: string;
  pA_Seat: string;
  isActive: boolean;
}

export interface SeatUC {
  id: string;
  uC_Seat: string;
  isActive: boolean;
  pA_ID: string;
  pA_Seat: string;
  nA_Seat: string;
  province: string;
}

export interface SeatVC {
  id: string;
  vC_Seat: string;
  isActive: boolean;
  uC_ID: string;
  uC_Seat: string;
  pA_Seat: string;
  nA_Seat: string;
  province: string;
}

export interface Voter {
  imgPhoto: string;
  imgCNIC: string;
  imgCNIC2: string;
  id: string;
  villageTown_ID: string;
  voterName: string;
  voterCNIC: string;
  fatherName: string;
  fatherCNIC: string;
  dob: string;
  isActive: boolean;
  isNew: boolean;
  genderID: string;
  professionID: string;
  isQuranHafiz: boolean;
  educationID: string;
  googleLoc: {
    latitude: string;
    longitude: string;
    radius: string;
    name: string;
  };
}

export interface Response {
  isSuccess: boolean;
  msg: string;
  data: any;
}

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
