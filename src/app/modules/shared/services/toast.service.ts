import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastBaseService {
  private readonly successBase = {
    TitleDefault: 'Listo',
    MessageDefault: 'Complete',
  };
  private readonly errorBase = {
    TitleDefault: 'Upss',
    MessageDefault: 'Cant do the action',
  };
  private readonly infoBase = {
    TitleDefault: 'Check the info',
    MessageDefault: 'Ar u sure??',
  };
  private readonly warningBase = {
    TitleDefault: 'Wait!',
    MessageDefault: 'Ar u sure??',
  };

  constructor(private readonly toast: ToastrService) {}

  success(message?: string, title?: string) {
    return this.toast.success(
      message || this.successBase.MessageDefault,
      title || this.successBase.TitleDefault
    );
  }

  error(message?: string, title?: string) {
    return this.toast.error(
      message || this.errorBase.MessageDefault,
      title || this.errorBase.TitleDefault
    );
  }
  info(message?: string, title?: string) {
    return this.toast.info(
      message || this.infoBase.MessageDefault,
      title || this.infoBase.TitleDefault
    );
  }
  warning(message?: string, title?: string) {
    return this.toast.warning(
      message || this.warningBase.MessageDefault,
      title || this.warningBase.TitleDefault
    );
  }
}
