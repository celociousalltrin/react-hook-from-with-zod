import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTech,
  deleteTech,
  getSingleTech,
  getTechs,
  techDataType,
  upadateTech,
} from "../react-query-service/method";
import { useState } from "react";

export const TechPosts = () => {
  const init: techDataType = {
    id: 0,
    title: "",
    description: "",
    frameworkType: "",
    releaseYear: 0,
  };

  const [tempTechs, setTempTechs] = useState(init);
  const [isEdit, setIsEdit] = useState(false);
  const [techId, setTechId] = useState<null | number | string>(null);
  const queryClient = useQueryClient();
  const {
    data: techList,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["techs"],
    queryFn: getTechs,
    select: (list) =>
      list.data.sort((a: techDataType, b: techDataType) => b.id - a.id),

    // list.data.map((o) => o),
  });

  const { mutateAsync: deleteAsync, status: deleteStatus } = useMutation({
    mutationFn: deleteTech,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["techs"], exact: true });
    },
  });

  if (isError) {
    console.log("tech List Error", error);
    alert("Error Ocurs");
  }

  const handleDelete = async (tech_id: number | string) => {
    try {
      await deleteAsync(tech_id);
    } catch (err) {
      alert("Delete Method wrong");
      console.log("🚀 ~ handleDelete ~ err:", err);
    }
  };
  console.log("Tech Post Component Render");
  return (
    <>
      {techId ? (
        <SingleTechComponent setTechId={setTechId} techId={techId} />
      ) : (
        <div>
          {isFetching && (
            <h1>Tech List Data is Fetching in Background........</h1>
          )}
          <Createtech
            temptechs={tempTechs}
            setTempTechs={setTempTechs}
            isEdit={isEdit}
            init={init}
            setIsEdit={setIsEdit}
          />
          <h1>All Techs</h1>
          {isLoading && <h1>Loading....</h1>}
          <div>
            {techList &&
              techList?.map((o: techDataType) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "2rem",
                    backgroundColor: "#d1d5ff",
                    margin: "2rem",
                    padding: "0.5rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  key={`tech_lst${o.id}`}
                  onClick={() => setTechId(o.id)}
                >
                  <p>{o.id}</p>
                  <p style={{ fontWeight: "bold", width: "10%" }}>{o.title}</p>
                  <p>{o.releaseYear}</p>
                  <button
                    type="button"
                    style={{
                      backgroundColor: "#6e7aff",
                      borderRadius: "5px",
                      padding: "10px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsEdit(true);
                      setTempTechs(o);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    style={{
                      borderRadius: "5px",
                      padding: "10px",
                      cursor: "pointer",
                      backgroundColor: "#ff6c37",
                      color: "white",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(o.id);
                    }}
                  >
                    {deleteStatus === "pending" ? "deleting" : "delete"}
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

const Createtech = ({
  temptechs,
  setTempTechs,
  isEdit,
  init,
  setIsEdit,
}: {
  temptechs: techDataType;
  setTempTechs: React.Dispatch<React.SetStateAction<techDataType>>;
  isEdit: boolean;
  init: techDataType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const { status, mutateAsync, error, isError } = useMutation({
    mutationFn: createTech,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["techs"],
        (oldData: { data: techDataType[] }) => {
          const result = {
            ...oldData,
            data: [data.data, ...oldData.data],
          };
          return result;
        }
      );
      queryClient.setQueryData(["techs", data.data.id], () => data);
      queryClient.setQueryData(["techsId", data.data.id], () => data);
    },
  });
  const {
    data,
    status: editStatus,
    mutate: updateTech,
  } = useMutation({
    mutationFn: upadateTech,
    onSuccess: (data) => {
      setTempTechs(init);
      setIsEdit(false);
      queryClient.setQueryData(
        ["techs"],
        (oldData: { data: techDataType[] }) => {
          console.log("🚀 ~ oldData:", oldData);
          const result = {
            ...oldData,
            data: oldData.data.map((o: techDataType) => {
              if (o.id === data.data.id) {
                return { ...o, ...data.data };
              } else {
                return o;
              }
            }),
          };
          return result;
        }
      );
      queryClient.setQueryData(["techs", data.data.id], () => data);
      queryClient.setQueryData(["techsId", data.data.id], () => data);
    },
    onError: (error) => {
      console.log("🚀 ~ error:", error);
      alert("Error Occurs when Editing");
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTechs({ ...temptechs, [e.target.name]: e.target.value });
  };
  if (isError) {
    console.log("adddddddddd", error);
    alert("Error Ocurs");
  }

  // const handleUpdate = async () => {
  //   try {
  //     const result = await updateMutateAsync({
  //       id: temptechs.id,
  //       data: temptechs,
  //     });
  //     setTempTechs(init);
  //   } catch (err) {
  //     alert("Something went wrong");
  //     console.log("🚀 ~ handleUpdate ~ err:", err);
  //   }
  // };

  const handleCreate = async () => {
    try {
      const result = await mutateAsync(temptechs);
      setTempTechs(init);
    } catch (err) {
      console.log("🚀 ~ handleCreate ~ err:", err);
    }
  };

  console.log("Create tech Post Component Render");

  return (
    <div>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <label style={{ display: "block" }}>id</label>
          <input
            type="number"
            onChange={handleChange}
            value={temptechs.id}
            name="id"
            placeholder="Enter id Number"
          />
        </div>
        <div>
          <label style={{ display: "block" }}>Title</label>
          <input
            type="text"
            onChange={handleChange}
            value={temptechs.title}
            name="title"
            placeholder="Enter Title"
          />
        </div>
        <div>
          <label style={{ display: "block" }}>Description</label>
          <input
            type="text"
            onChange={handleChange}
            value={temptechs.description}
            name="description"
            placeholder="Enter Description"
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        <div>
          <label style={{ display: "block" }}>Frame Work</label>
          <input
            type="text"
            onChange={handleChange}
            value={temptechs.frameworkType}
            name="frameworkType"
            placeholder="Enter frameworkType"
          />
        </div>
        <div>
          <label style={{ display: "block" }}>Release year</label>
          <input
            type="number"
            onChange={handleChange}
            value={temptechs.releaseYear}
            name="releaseYear"
            placeholder="Enter Release Year"
          />
        </div>
        {!isEdit ? (
          <button
            style={{
              backgroundColor: "#4ec9a4",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
            type="button"
            onClick={handleCreate}
          >
            {status === "pending" ? "Adding...." : "Add Techs "}
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "#84adea",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
            type="button"
            onClick={() => updateTech({ id: temptechs.id, props: temptechs })}
          >
            {editStatus === "pending" ? "Editing" : "Save"}
          </button>
        )}
      </div>
    </div>
  );
};

export const SingleTechComponent = ({
  setTechId,
  techId,
}: {
  setTechId: React.Dispatch<React.SetStateAction<string | number | null>>;
  techId: string | number | null;
}) => {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["techs", techId],
    queryFn: () => getSingleTech(techId as string | number),
    staleTime: 60000,
  });

  const {
    data: techName,
    isLoading: technameloading,
    isError: techisError,
    error: techError,
    isFetching: techIsFetching,
  } = useQuery({
    queryKey: ["techsId", techId],
    enabled: !!data?.data.id,
    staleTime: 60000,
    queryFn: () => getSingleTech(data?.data.id as string | number),
  });

  if (isError) {
    console.log("SINGLE TECH EROOR,,,,error", error);
    alert("Single Tech throws an error");
  }

  if (techisError) {
    alert("The Tech Name Fetching api error");
    console.log("Fetch Name api error", techError);
  }

  console.log("Single Tech COmponent Render");
  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <div>
          {/* {isFetching && (
            <h1>Single Tech api is Fetching in background........</h1>
          )} */}
          <button
            style={{
              backgroundColor: "#4f4f4f",
              borderRadius: "10px",
              padding: "10px",
              color: "white",
              cursor: "pointer",
            }}
            type="button"
            onClick={() => setTechId(null)}
          >
            Back to List
          </button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <p>id:{data?.data.id}</p>
              <p>Description:{data?.data.description}</p>
              <p>FrameWork Type:{data?.data.frameworkType}</p>
              <p>Release Year:{data?.data.releaseYear}</p>
            </div>
          </div>
          <h1>The tech title isonly display after the Single Tech is called</h1>
          {/* {techIsFetching && <h4>Tech Name is Fetching in Background</h4>} */}
          {technameloading ? (
            <h4>Tech Name APi is Fetching in Background...........</h4>
          ) : (
            <>
              <p>
                Tech Name is{" "}
                <span style={{ fontWeight: "bold" }}>
                  {techName?.data.title}
                </span>
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};
