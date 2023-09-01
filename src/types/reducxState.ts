interface IAction<T> {
  type: string;
  payload?: T;
  errors?: any;
  extraParams?: object;
}
