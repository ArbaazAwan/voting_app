import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warn',
  Info = 'info',
  Deleted = 'info',
  NotAuthorized = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToast(type: ToastType, summary: string, detail?: string): void {
    this.messageService.add({ severity: type, summary, detail });
  }
}
