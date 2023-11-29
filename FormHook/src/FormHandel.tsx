import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const FormHandel = () => {
  // now add bydefault data in formhook
  // bydefault useform() accept an object

  const form = useForm<FormValues>({
    defaultValues: {
      username: "Usman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // hereappend in a function that useFieldArray offers
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
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

        {/* add nested objects in corresponding object
        this process supperpose in three stages
          add the type of data as object
          then add it in the default value as object
        now we will collect data of user twitter profile
            for this we will add an input field for twitter
            also we will declare it in the form values as object
        */}

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: {
                value: true,
                message: "Enter the twitter profile",
              },
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Faceboook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              required: {
                value: true,
                message: "Enter the facebook profile",
              },
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        {/* now we have to add user phone number primary and secondary
        this process will be done in three steps 
        1st add the array in type form
        second add the array in default value
        then write the jsx for phone number */}

        <div className="form-control">
          <label htmlFor="primary-phoneNumber">Primary Number</label>
          <input
            type="text"
            id="primary-phonenumber"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Enter the primary phone number",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phoneNumber">secondary Number</label>
          <input
            type="text"
            id="secondary-phonenumber"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "Enter the secondary phone number",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.message}</p>
        </div>

        {/* add new lable to access the list of phonenumber array
         */}
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}

                    // now add a button for delete phone number
                    // for this useFieldArray offers a remove function
                  />
                  {index > 0 && (
                    <button
                      className="btn-remove"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      remove Number
                    </button>
                  )}
                </div>
              );
            })}
            {/* now add to button to add new phone number 
            for this useFieldArray offers a function called append
            this will be callled in fields object */}
            <button type="button" onClick={() => append({ number: "" })}>
              Add another number
            </button>
          </div>
        </div>

        {/* now add the age field  */}

        <div className="form-control">
          <label htmlFor="age">age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "age is required",
              },
            })}
          />

          <p className="error">{errors.age?.message}</p>
        </div>

        {/* now add the date of birth */}
        <div className="form-control">
          <label htmlFor="dob">dob</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "dob is required",
              },
            })}
          />

          <p className="error">{errors.dob?.message}</p>
        </div>

        <button type="submit" className="btn-submit">
          submit
        </button>
      </form>

      {/* now we will pass the props todevTool with the object(control) as value */}
      <DevTool control={control} />
    </>
  );
};

export default FormHandel;
