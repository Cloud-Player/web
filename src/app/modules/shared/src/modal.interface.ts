export type modalAction = (modal: IModal) => Promise<any> | void;

export interface IModalActionBtn {
  text: string;
  action?: modalAction;
}

export interface IModalOptions {
  title: string;
  dismissible: boolean;
  primaryAction?: IModalActionBtn;
  secondaryAction?: IModalActionBtn;
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
