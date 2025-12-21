export interface LoginFormValues {
    login: string;
    password: string;
}

export interface RegisterFormValues extends LoginFormValues {
    confirmPassword: string;
}
