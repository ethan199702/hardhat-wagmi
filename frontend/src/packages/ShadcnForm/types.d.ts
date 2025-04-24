export interface ShadcnFormField {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "select" | "checkbox";
  options?: { label: string; value: string | number }[];
  required?: boolean;
  placeholder?: string;
  defaultValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface ShadcnFormProps {
  fields: ShadcnFormField[];
  inline?: boolean;
  onSubmit: (data: Record<string, any>) => void;
  footer?: React.ReactNode | boolean;
}
