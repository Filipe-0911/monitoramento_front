import "./BtnMenu.css";

export default function BtnMenu({ onClick, menuEscondido }) {
    return (
        <div className="div__burger">
            <label className="burger_qx9VtLzJ38" htmlFor="burger_qx9VtLzJ38">
                <input type="checkbox" id="burger_qx9VtLzJ38" onClick={() => onClick()} checked={menuEscondido} readOnly/>
                    <span></span>
                    <span></span>
                    <span></span>
            </label>
        </div>
    )
}