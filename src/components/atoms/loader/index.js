import "./index.css";

function Loader({ wrapperStyle, loaderStyle }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...wrapperStyle,
      }}
    >
      <div className="loader" style={loaderStyle} />
    </div>
  );
}

export default Loader;
