import { useEffect, useState } from "react";
import "./addProjectPopup.css";
import CrudServiceForProjects from "../services/projectsCrudService";
import { useNavigate, useParams } from "react-router-dom";

function AddProjectPopup() {
  const [step, setStep] = useState(0);
  const { key } = useParams();
  const navigate = useNavigate();
  const [addProjectBySteps, setAddProjectBySteps] = useState([
    {
      value: "",
    },
    {
      value: "",
      label: "project link",
      placeholder: "enter github link",
    },
    {
      value: "",
      label: "framework",
      placeholder: "enter framework name",
    },
    {
      value: "",
      label: "project name",
      placeholder: "enter project name",
    },
  ]);

  useEffect(() => {
    if (key) {
      CrudServiceForProjects.getOne(key).on("value", (item) => {
        const data = item.val();
        const cloneValues = [...addProjectBySteps];
        cloneValues[0].value = data.imgSrc;
        cloneValues[1].value = data.href;
        cloneValues[2].value = data.framework;
        cloneValues[3].value = data.projectName;
        setAddProjectBySteps(cloneValues);
      });
    } else {
      const cloneValues = [...addProjectBySteps].map((item) => {
        return { ...item, value: "" };
      });
      setAddProjectBySteps(cloneValues);
      setStep(0);
    }
  }, [key]);
  const inputValueChange = (e) => {
    const newValue = [...addProjectBySteps];
    newValue[step].value = e.target.value;
    setAddProjectBySteps(newValue);
  };
  const addPhoto = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes('image')) {
      alert('არასწორი ფოტოს ფორმატი')
      e.target.value = null
      return
    }
    const reader = new FileReader();
    reader.onload = () => {
      const newPic = [...addProjectBySteps];
      newPic[step].value = reader.result;
      setAddProjectBySteps(newPic);
    };
    reader.readAsDataURL(file);
  };
  const clearPic = () => {
    const newPic = [...addProjectBySteps];
    newPic[step].value = "";
    setAddProjectBySteps(newPic);
  };

  const handleNextOrFinishClick = () => {
    if (!addProjectBySteps[step].value.trim()) {
      return;
    }
    if (step < addProjectBySteps.length - 1) {
      setStep(step + 1);
    } else if (step === addProjectBySteps.length - 1) {
      const sendData = {
        imgSrc: addProjectBySteps[0].value,
        href: addProjectBySteps[1].value,
        framework: addProjectBySteps[2].value,
        projectName: addProjectBySteps[3].value,
      };
      if (key) {
        CrudServiceForProjects.update(key, sendData);
      } else {
        CrudServiceForProjects.create(sendData);
      }
      navigate("/projects");
    }
  };
  return (
    <div className="addProjectOverlay">
      <div className="wrapper">
        <div className="inputsArea">
          {step === 0 ? (
            <div className="imgArea">
              {addProjectBySteps[step].value ? (
                <img src={addProjectBySteps[step].value} alt="" />
              ) : null}
              {addProjectBySteps[step].value ? (
                <button onClick={clearPic}> clear photo </button>
              ) : (
                <input onChange={addPhoto} type="file" />
              )}
            </div>
          ) : null}

          {step > 0 ? (
            <div className="projectInfoArea">
              <span>{addProjectBySteps[step].label}</span>
              <input
                value={addProjectBySteps[step].value}
                onChange={inputValueChange}
                type="text"
                placeholder={addProjectBySteps[step].placeholder}
              />
            </div>
          ) : null}
        </div>
        <div className="btn">
          {step === 0 ? null : (
            <button
              onClick={() => {
                if (step > 0) {
                  setStep(step - 1);
                }
              }}
            >
              Back
            </button>
          )}
          <button onClick={handleNextOrFinishClick}>
            {step === addProjectBySteps.length - 1
              ? key
                ? "update"
                : "Finish"
              : "Next"}
          </button>
        </div>
        <div
          style={{
            height: ".5rem",
            width: "100%",
            padding: "2px",
            border: "1px solid black",
            borderRadius: ".5rem",
          }}
        >
          <div
            style={{
              borderRadius: ".5rem",
              height: "100%",
              backgroundColor: "green",
              width: step * (100 / (addProjectBySteps.length - 1)) + "%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export { AddProjectPopup };
