import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastService {
  private readonly msg = {
    success: {
      titleDefault: 'Listo',
      messageDefault: 'Complete',
    },
    error: {
      titleDefault: 'Upss',
      messageDefault: 'Cant do the action',
    },
    info: {
      titleDefault: 'Check the info',
      messageDefault: 'Ar u sure??',
    },
    warning: {
      titleDefault: 'Wait!',
      messageDefault: 'Ar u sure??',
    },
  };

  constructor(private readonly toast: ToastrService) {}

  success(message?: string, title?: string) {
    return this.toast.success(
      message || this.msg.success.messageDefault,
      title || this.msg.success.titleDefault
    );
  }

  error(message?: string, title?: string) {
    return this.toast.error(
      message || this.msg.error.messageDefault,
      title || this.msg.error.titleDefault
    );
  }
  info(message?: string, title?: string) {
    return this.toast.info(
      message || this.msg.info.messageDefault,
      title || this.msg.info.titleDefault
    );
  }
  warning(message?: string, title?: string) {
    return this.toast.warning(
      message || this.msg.warning.messageDefault,
      title || this.msg.warning.titleDefault
    );
  }
}
