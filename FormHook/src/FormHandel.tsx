import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const FormHandel = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  //   register is a method that can be accessed by form

  // after using it in the field {...register} now track the progress
  // for this we will run the devtools command
  // npm install -D @hookform/devtools
  //   now import the devtool component in reactapp

  //   now we need to associate this component with form we are tracking
  // for this useHook returns a control object
  //   in theform object the control is that object

  const onSubmit = (data: FormValues) => {
    console.log("form submission", data);
  };
  //   now submit form
  // this procedure appertain to three steps
  // first define a function onSubmit that will be called after the buttion is pressed
  //   now define a handleSubmit function in the form object to destructure

  //   last step is to define the datatype of data parameter

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "username is required",
              },
            })}
          />

          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },

              // add custom validation
              // for this we use key-value-pair value
              // validate will be a function
              // this will take automatically an argument (fieldvalue)
              validate: (fieldvalue) => {
                return (
                  fieldvalue !== "admin@gmail.com" ||
                  "enter a different email address"
                );
              },
            })}
          />

          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "channel is required",
              },
            })}
          />

          <p className="error">{errors.channel?.message}</p>
        </div>

        <button type="submit">submit</button>
      </form>

      {/* now we will pass the props todevTool with the object(control) as value */}
      <DevTool control={control} />
    </>
  );
};

export default FormHandel;
