import "./menu.css";

const Menu = () => {
  return (
    <div className="menu-div">
      <h2>
        <a href="/">Pomodo<span>X</span></a>
      </h2>
      <div className="menu-button">
        <button>Setting</button>
        <button>Restart</button>
      </div>
    </div>
  );
};

export default Menu;
