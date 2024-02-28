import { v4 as uuidv4 } from 'uuid';
import { Country } from './model';

export const countries: Array<Country> = [
  {
    id: generateGUID(),
    name: 'United States',
    isActive: true,
  },
  {
    id: generateGUID(),
    name: 'Pakistan',
    isActive: true,
  },
  {
    id: generateGUID(),
    name: 'India',
    isActive: true,
  },
  {
    id: generateGUID(),
    name: 'China',
    isActive: true,
  },
  {
    id: generateGUID(),
    name: 'UK',
    isActive: false,
  },
];

export const NAList = [
  {
    seatName: 'test',
    id: 'test',
    provinceID: 'test',
    province: 'test',
    isActive: true,
    isNew: false,
  },
  {
    seatName: 'test',
    id: 'test',
    provinceID: 'test',
    province: 'test',
    isActive: true,
    isNew: false,
  },
  {
    seatName: 'test',
    id: 'test',
    provinceID: 'test',
    province: 'test',
    isActive: true,
    isNew: false,
  },
  {
    seatName: 'test',
    id: 'test',
    provinceID: 'test',
    province: 'test',
    isActive: true,
    isNew: false,
  },
  {
    seatName: 'test',
    id: 'test',
    provinceID: 'test',
    province: 'test',
    isActive: true,
    isNew: false,
  },
  {
    seatName: 'test',
    id: 'test',
    provinceID: 'test',
    province: 'test',
    isActive: true,
    isNew: false,
  },
];

export function generateGUID(): string {
  return uuidv4();
}
