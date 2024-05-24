import "./progressBar.scss";

const ProgressBar = ({ step, stepDatas }) => {
  return (
    <div className="progressBarWrapper">
      <div
        className="progressBar"
        style={{
          width: step * (100 / (stepDatas.length - 1)) + "%",
        }}
      ></div>
    </div>
  );
};

export { ProgressBar };
