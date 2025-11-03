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

export const createMessageStringFromErrorMessage = (errorMessage: ErrorMessage): string => {
    const violations = errorMessage.violations;
    let message = errorMessage.message;
    for (let i: number = 0; i < errorMessage.violations.length; i++) {
        const violation = violations[i];
        message += violation.nameField + " - " + violation.description
        if (i < errorMessage.violations.length - 1) {
            message += ", "
        }
    }
    return message;
}
