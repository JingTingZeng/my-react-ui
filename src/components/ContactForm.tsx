import React from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import * as Fields from "../libs/utils/inputValidation.util";

const ContactForm = () => {
  const methods = useForm();

  const handleSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input {...Fields.NameField}></Input>
          <Input {...Fields.EmailField}></Input>
          <Input {...Fields.PhoneField}></Input>
          <Input {...Fields.PasswordField}></Input>
          <div className="col-span-2">
            <Input
              label="description"
              type="text"
              id="description"
              placeholder="type anything.."
              multiLine={true}
              validation={{
                required: "This input is required.",
              }}
            ></Input>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <div className="sm:max-w-60 w-full">
            <Button onClick={handleSubmit} style="primary">
              Send
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
