"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  children?: (field: ControllerRenderProps<T>) => React.ReactNode;
  label?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

function FormFieldWrapper<T extends FieldValues>({
  control,
  name,
  children,
  label,
  ...props
}: Props<T>) {
  const { className, ...inputProps } = props;
  const camelCaseRegex = /(?=[A-Z])/;
  const formLabel = label || name.split(camelCaseRegex).join(" ");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={"capitalize"}>{formLabel}</FormLabel>
          <FormControl>
            {children ? children(field) : <Input {...field} {...inputProps} />}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormFieldWrapper };
