import {
  Controller,
  FieldValues,
  useForm,
  useFieldArray,
  FieldError,
} from "react-hook-form";
import {
  FormIdType,
  formatFormData,
  mimickAPiCall,
} from "../utils/common-function";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { getUserAlbums, getUsersPost, getusers } from "../service/methods";
import { useEffect, useState } from "react";
import { addressJson, userData } from "../utils/common-data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../component/strict-drop";
import ReactDatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formSchema,
  formSchemaType,
  transformString,
} from "../utils/validation-schema";
import { DevTool } from "@hookform/devtools";

type ListTypes = {
  label: string;
  value: number | string;
};

const UserForm = () => {
  const [postsList, setPostsList] = useState<ListTypes[]>([]);
  const [tempPosts, setTempPosts] = useState<null | any[]>(null);
  const [tempAlbumsList, setTempAlbumsList] = useState([]);

  const defValue = {
    name: "default nbame",
    user_name: "defal user anme",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    gender: "",
    colors: [],
    userId: null,
    postsId: [],
    albumId: null,
    dob: "",
    address: {
      country: null,
      state: null,
      city: null,
      street: null,
    },
    port_name: "dasdsaasd",
  };

  const defaultFormValue = async () => {
    try {
      const res = await mimickAPiCall({
        data: defValue,
        ms: 1000,
      });
      return res;
    } catch (err) {
      console.log("🚀 ~ defaultFormValue ~ err:", err);
    }
  };

  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    formState: {
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
    },
    getValues,
    setValue,
    trigger,
    resetField,
  } = useForm({
    // defaultValues: defaultFormValue,
    resolver: zodResolver(formSchema),
  });

  console.log("🚀 ~ UserForm ~ isValid:", isValid);

  // console.log("ERRORS", errors);

  const { fields, append, remove, move } = useFieldArray<any>({
    control,
    name: "postsId",
  });

  const onSubmit = async (data: formSchemaType | FieldValues) => {
    // console.log("🚀 ~ onSubmit ~ data:", data);
    // const result = formatFormData({
    //   input: data,
    //   keys: ["albumId", "postsId", "userId", "dob"],
    //   dates: ["dob"],
    // });

    // console.log("🚀 ~ onSubmit ~ result:", result);

    await mimickAPiCall({
      ms: 3000,
    });
    reset();
    reset({
      albumId: "",
      userId: "",
      postsId: [],
      address: {
        country: "",
        state: "",
        city: "",
        street: "",
      },
    });
  };

  const [portname, user_Id, user_name, address] = watch([
    "port_name",
    "userId",
    "user_name",
    "address",
  ]);

  const { country, state, city } = address || {};

  useEffect(() => {
    if (user_Id) {
      setValue("albumId", null);
      setTempPosts(null);
    }
  }, [user_Id]);

  // const handleUserMenuOpen = async () => {
  //   try {
  //     const result = await getusers();
  //     setUserList(
  //       result && result.data.length > 0
  //         ? result.data.map(
  //             ({ name, id }: { name: string; id: string | number }) => ({
  //               label: name,
  //               value: id,
  //             })
  //           )
  //         : []
  //     );
  //   } catch (err) {
  //     console.log("🚀 ~ handleUserMenuOpen ~ err:", err);
  //   }
  // };

  const handlePostsMenuOpen = async () => {
    try {
      const userCustomId = getValues("userId") ?? { value: 5 };

      const result = await getUsersPost(userCustomId.value);
      setPostsList(
        result && result.data.length > 0
          ? result.data.map(({ title, id }: { title: string; id: number }) => ({
              label: title.slice(0, 15),
              value: id,
            }))
          : []
      );
    } catch (err) {
      console.log("🚀 ~ handlePostsMenuOpen ~ err:", err);
    }
  };

  const loadUers = async (input: string): Promise<any> => {
    try {
      const result = await new Promise((res) =>
        setTimeout(() => {
          res(
            userData
              .filter(({ name }) =>
                name.toLowerCase().includes(input.toLowerCase())
              )
              .map(({ name, id }) => ({ label: name, value: id }))
          );
        }, 1000)
      );
      return result;
    } catch (err) {
      console.log("🚀 ~ loadUers ~ err:", err);
    }
  };

  const loadUserAlbums = async (
    input: string,
    inputId: string | number | null
  ) => {
    try {
      let result;
      if (!!inputId) {
        const response = await getUserAlbums(inputId);
        result = response.data.map(
          ({ id, title }: { id: unknown; title: unknown }) => ({
            label: title,
            value: id,
          })
        );
      } else {
        result = [];
      }
      return result;
    } catch (err) {
      console.log("🚀 ~ loadUserAlbums ~ err:", err);
    }
  };

  const handleAlbumMenuOpen = async (inputId: string | number | null) => {
    try {
      const response = await getUserAlbums(inputId as string | number);
      let res = response.data.map(
        ({ id, title }: { id: unknown; title: string }) => ({
          label: title.slice(0, 15),
          value: id,
        })
      );

      setTempAlbumsList(res);
    } catch (err) {
      console.log("🚀 ~ loadUserAlbums ~ err:", err);
    }
  };

  const onDroppableDrag = (data: any) => {
    if (!data.destination) return;
    move(data.source.index, data.destination.index);
  };

  const isValidated = () => {
    trigger(["user_name", "dob", "address.city"]);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <button
          style={{ backgroundColor: isSubmitting ? "lightblue" : "lightgreen" }}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
        <button
          style={{ margin: "3px", backgroundColor: "red" }}
          onClick={isValidated}
          type="button"
        >
          Trigger Validation
        </button>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Name</label>
            <input {...register("name")} />
            <p>{errors.name?.message?.toString()}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>userName</label>
            <input {...register("user_name")} />
            {user_name && (
              <p style={{ color: "blue" }}>{`@${transformString(
                user_name
              )}`}</p>
            )}
            <p>{errors.user_name?.message?.toString()}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Email</label>
            <input type="email" {...register("email")} />
            <p>{errors.email?.message?.toString()}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Phone number</label>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <PhoneInput
                      {...field}
                      country={"in"}
                      countryCodeEditable={false}
                    />
                    <p>{errors.phone_number?.message?.toString()}</p>
                  </>
                );
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Password</label>
            <input {...register("password")} type="password" />
            <p>{errors.password?.message?.toString()}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Confirm Password</label>
            <input {...register("confirm_password")} type="password" />
            <p>{errors.confirm_password?.message?.toString()}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Date of Birth</label>
            {/* <ReactDatePicker
              placeholderText="Date Of Birth"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              maxDate={new Date(2002, 0, 1)}
              minDate={new Date(1970, 0, 1)}
              openToDate={new Date(1970, 0, 1)}
              selected={
                dateofbirth ? new Date(dateofbirth) : new Date(1970, 0, 1)
              }
              dateFormat="dd/MM/yyyy"
              onChange={(date: any) => setValue("dob", date?.toISOString())}
            /> */}

            <Controller
              name="dob"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <ReactDatePicker
                      {...field}
                      placeholderText="Date Of Birth"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      maxDate={new Date(2002, 0, 1)}
                      minDate={new Date(1970, 0, 1)}
                      openToDate={new Date(1970, 0, 1)}
                      dateFormat="dd/MM/yyyy"
                      selected={field.value ? new Date(field.value) : null}
                      ref={(ref) => {
                        field.ref({
                          focus: ref && ref.setFocus,
                        });
                      }}
                    />
                    <p>{errors.dob?.message?.toString()}</p>
                  </>
                );
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Country</label>
            <Controller
              name="address.country"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      {...field}
                      options={addressJson.map((o) => ({
                        label: o.label,
                        value: o.value,
                      }))}
                      onChange={(data) => {
                        field.onChange(data);
                        ["state", "city", "street"].forEach((o) =>
                          setValue(`address.${o}`, null)
                        );
                      }}
                    />
                    <p>
                      {(
                        errors.address as { country?: { message?: string } }
                      )?.country?.message?.toString()}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>State</label>
            <Controller
              name="address.state"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      {...field}
                      options={addressJson
                        .find((o) => o.value === country?.value)
                        ?.states.map((xx) => ({
                          label: xx.label,
                          value: xx.label,
                        }))}
                      onChange={(data) => {
                        field.onChange(data);
                        ["city", "street"].forEach((o) =>
                          setValue(`address.${o}`, null)
                        );
                      }}
                      isDisabled={!country && !dirtyFields?.state}
                    />
                    {(errors.address as any)?.state?.message?.toString()}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>City</label>
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      {...field}
                      options={addressJson
                        .find((o) => o.value === country?.value)
                        ?.states.find((xx) => xx.label === state?.value)
                        ?.cities.map((oo) => ({
                          label: oo.label,
                          value: oo.label,
                        }))}
                      onChange={(data) => {
                        field.onChange(data);
                        setValue("address.street", null);
                      }}
                      isDisabled={!state && !dirtyFields?.city}
                    />
                    {(
                      errors.address as { city?: { message?: string } }
                    )?.city?.message?.toString()}
                  </>
                );
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Street</label>
            <Controller
              name="address.street"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      {...field}
                      options={addressJson
                        .find((o) => o.value === country?.value)
                        ?.states.find((xx) => xx.label === state?.value)
                        ?.cities.find((oo) => oo.label === city?.value)
                        ?.streets.map((x) => ({ label: x, value: x }))}
                      isDisabled={!city && !dirtyFields?.street}
                    />
                    {(
                      errors.address as { street?: { message?: string } }
                    )?.street?.message?.toString()}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Select Gender</label>
            <label>
              <input type="radio" value="male" {...register("gender")} />
              Male
            </label>
            <label>
              <input type="radio" value="female" {...register("gender")} />
              Female
            </label>
            <label>
              <input type="radio" value="other" {...register("gender")} />
              Other
            </label>
            <p>{errors.gender?.message?.toString()}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Favourite Colour</label>
            <label>
              <input type="checkbox" value="red" {...register("colors")} />
              RED
            </label>
            <label>
              <input type="checkbox" value="blue" {...register("colors")} />
              Blue
            </label>
            <label>
              <input type="checkbox" value="green" {...register("colors")} />
              GREEN
            </label>
            <label>
              <input type="checkbox" value="yellow" {...register("colors")} />
              YELLOW
            </label>
            <label>
              <input type="checkbox" value="pink" {...register("colors")} />
              PINK
            </label>
            <p>{errors.colors?.message?.toString()}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>users</label>
            <Controller
              name="userId"
              control={control}
              render={({ field }) => {
                return (
                  <AsyncSelect
                    {...field}
                    // when we give default option true the load option data will be auto loaded
                    defaultOptions={true}
                    loadOptions={(search) => loadUers(search)}
                  />
                );
              }}
            />
            <p>{errors.userId?.message?.toString()}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Albums</label>
            <Controller
              name="albumId"
              control={control}
              render={({ field }) => {
                return (
                  <AsyncSelect
                    {...field}
                    // when we give default option true the load option data will be auto loaded
                    defaultOptions={tempAlbumsList}
                    onMenuOpen={() =>
                      handleAlbumMenuOpen(
                        user_Id && (user_Id as FormIdType).value
                      )
                    }
                    loadOptions={(search) =>
                      loadUserAlbums(
                        search,
                        user_Id && (user_Id as FormIdType).value
                      )
                    }
                    isDisabled={!user_Id && !dirtyFields?.albumId}
                  />
                );
              }}
            />
            <p>{errors.albumId?.message?.toString()}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Posts</label>
            <Controller
              name="postsId"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <AsyncSelect
                      {...field}
                      defaultOptions={postsList}
                      onMenuOpen={handlePostsMenuOpen}
                      isDisabled={!user_Id && !dirtyFields?.postsId}
                      onChange={(data) => setTempPosts(data)}
                      value={tempPosts}
                    />
                    <p>{errors.postsId?.message?.toString()}</p>
                  </>
                );
              }}
            />
            <button
              type="button"
              onClick={() => {
                append(tempPosts);
                setTempPosts(null);
              }}
              disabled={!tempPosts}
              style={{ backgroundColor: "lightseagreen", margin: "1rem" }}
            >
              Add Post
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>PortFolio Name</label>
            <input {...register("port_name")} />
            <p>
              https://celo:
              <span style={{ color: "blue" }}>{transformString(portname)}</span>
            </p>
            <p>{errors.port_name?.message?.toString()}</p>
          </div>
          <DragDropContext onDragEnd={onDroppableDrag}>
            <StrictModeDroppable
              children={(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    padding: "1rem",
                    backgroundColor: snapshot.isDraggingOver
                      ? "lightyellow"
                      : "",
                  }}
                >
                  {fields.map((item, index, arr) => {
                    return (
                      <Draggable
                        draggableId={item.id.toString()}
                        index={index}
                        key={item.id}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div
                              {...provided.dragHandleProps}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginBottom: "0.8rem",
                                backgroundColor: snapshot.isDragging
                                  ? "grey"
                                  : "lightgrey",
                                border: "2p solid black",
                                borderRadius: "7px",
                                padding: "10px",
                              }}
                            >
                              <li>{item && (item as any).label}</li>
                              <button
                                type="button"
                                style={{ backgroundColor: "lightsalmon" }}
                                onClick={() => remove(index)}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "lightcoral" }}
                                onClick={() => move(index, index - 1)}
                                disabled={index === 0}
                              >
                                up
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "lightslategrey" }}
                                onClick={() => move(index, index + 1)}
                                disabled={arr.length === index + 1}
                              >
                                Down
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
              droppableId="postsList"
            />
          </DragDropContext>
          <div>
            <label>
              <input type="checkbox" {...register("terms")} />
              Tearms and Condition
            </label>
            <p>{errors.terms?.message?.toString()}</p>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default UserForm;
