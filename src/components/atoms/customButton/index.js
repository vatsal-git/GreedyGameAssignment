import "./index.css";

function CustomButton({ content, onClick, ...props }) {
  return (
    <div className="customButton">
      <button onClick={onClick} {...props}>
        {content}
      </button>
    </div>
  );
}

export default CustomButton;
