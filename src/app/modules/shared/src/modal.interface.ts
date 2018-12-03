export type modalAction = (modal: IModal) => Promise<any> | void;

export interface IModalActionBtn {
  text: string;
  action?: modalAction;
  isDisabled?: Function | boolean;
}

export interface IModalOptions {
  title: string;
  dismissible: boolean;
  primaryAction?: IModalActionBtn;
  secondaryAction?: IModalActionBtn;
  center?: boolean;
}

export interface IModalComponent {
  modalOptions: IModalOptions;

  setModal?(modal: IModal): void;

  modalOnOpen?(): void;

  modalOnClose?(): void;
}

export interface IModal {
  hide(): void;
}
