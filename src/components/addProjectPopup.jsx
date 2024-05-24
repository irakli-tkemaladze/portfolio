import "./addProjectPopup.scss";
import { useEffect, useState } from "react";
import CrudServiceForProjects from "../services/projectsCrudService";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from "./progressBar";
const stepDatas = [
  { valueKey: "imgSrc" },
  {
    label: "project link",
    placeholder: "enter github link",
    valueKey: "href",
  },
  {
    label: "framework",
    placeholder: "enter framework name",
    valueKey: "framework",
  },
  {
    label: "project name",
    placeholder: "enter project name",
    valueKey: "projectName",
  },
];
const AddProjectPopup = () => {
  const [step, setStep] = useState(0);
  const { key } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    imgSrc: "",
    href: "",
    framework: "",
    projectName: "",
  });

  useEffect(() => {
    if (key) {
      const onDataChange = (item) => {
        const data = item.val();
        const newData = {
          imgSrc: data.imgSrc,
          href: data.href,
          framework: data.framework,
          projectName: data.projectName,
        };
        setProjectData(newData);
      };
      const projectRef = CrudServiceForProjects.getOne(key);
      projectRef.on("value", onDataChange);
      return () => {
        projectRef.off("value", onDataChange);
        clearLocalStorage();
      };
    } else {
      const now = new Date().getTime();
      const savedData = {
        imgSrc: "",
        href: "",
        framework: "",
        projectName: "",
      };
      if (localStorage["expires"] && now - localStorage["expires"] < 120000) {
        stepDatas.forEach((item) => {
          savedData[item.valueKey] = localStorage[item.valueKey] || "";
        });
      } else {
        clearLocalStorage();
      }
      setProjectData(savedData);
      setStep(0);
    }
  }, [key]);
  const inputValueChange = (e) => {
    const values = { ...projectData };
    values[stepDatas[step].valueKey] = e.target.value;
    saveToLocaleStorage(e.target.value);
    setProjectData(values);
  };
  const addPhoto = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes("image")) {
      alert("არასწორი ფოტოს ფორმატი");
      e.target.value = null;
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      saveToLocaleStorage(reader.result);
      setProjectData({ ...projectData, imgSrc: reader.result });
    };
    reader.readAsDataURL(file);
  };
  const clearPic = () => {
    setProjectData({ ...projectData, imgSrc: "" });
  };

  const saveToLocaleStorage = (value) => {
    localStorage.setItem(stepDatas[step].valueKey, value);
    localStorage.setItem("expires", new Date().getTime());
  };

  const clearLocalStorage = () => {
    stepDatas.forEach((item) => {
      localStorage.removeItem(item.valueKey);
    });
    localStorage.removeItem("expires");
  };

  const handleUpdateOrFinishClick = () => {
    if (projectData[stepDatas[step].valueKey].trim()) {
      if (key) {
        CrudServiceForProjects.update(key, { ...projectData });
      } else {
        CrudServiceForProjects.create({ ...projectData });
      }
      clearLocalStorage();
      navigate("/projects");
    }
  };

  const handleNextClick = () => {
    if (projectData[stepDatas[step].valueKey].trim()) {
      setStep(step + 1);
    }
  };
  return (
    <div className="addProjectOverlay">
      <div className="wrapper">
        <div className="inputsArea">
          {step === 0 && (
            <div className="imgArea">
              {projectData[stepDatas[step].valueKey] && (
                <img src={projectData[stepDatas[step].valueKey]} alt="" />
              )}
              {projectData[stepDatas[step].valueKey] ? (
                <button onClick={clearPic}> clear photo </button>
              ) : (
                <input onChange={addPhoto} type="file" />
              )}
            </div>
          )}

          {step > 0 && (
            <div className="projectInfoArea">
              <span>{stepDatas[step].label}</span>
              <input
                value={projectData[stepDatas[step].valueKey]}
                onChange={inputValueChange}
                type="text"
                placeholder={stepDatas[step].placeholder}
              />
            </div>
          )}
        </div>
        <div className="btn">
          {step > 0 && (
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
          <button
            onClick={
              step === stepDatas.length - 1
                ? handleUpdateOrFinishClick
                : handleNextClick
            }
          >
            {step === stepDatas.length - 1
              ? key
                ? "update"
                : "Finish"
              : "Next"}
          </button>
        </div>
        <ProgressBar step={step} stepDatas={stepDatas} />
      </div>
    </div>
  );
};

export { AddProjectPopup };
