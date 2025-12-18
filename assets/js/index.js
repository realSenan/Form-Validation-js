import {
  isEmail,
  maxLen,
  minLen,
  required,
} from "../helpers/formValidation.js";
import { formConfig } from "./form.js";

formConfig([
  {
    form: "#form1",
    rules: {
      email: [required(), isEmail()],
      password: [required(), minLen(6), maxLen(10)],
    },
    onSubmit: () => {},
  },
]);
