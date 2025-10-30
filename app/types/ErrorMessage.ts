export interface Violation {
    nameField: string;
    description: string;
}

export interface ErrorMessage {
    timestamp: string;
    message: string;
    violations: Violation[];
}

export const isErrorMessage = (obj: any): obj is ErrorMessage => {
  return obj && Array.isArray(obj.items);
}
