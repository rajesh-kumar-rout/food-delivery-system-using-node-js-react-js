import { MdAdd, MdRemove } from "react-icons/md"

export default function QtyControl({ quantity, onChange }) {
    return (
        <div className="qty-control">
            <button className="qty-control-btn" onClick={() => onChange(quantity === 1 ? quantity : quantity - 1)}>
                <MdRemove size={24} />
            </button>

            <p className="qty-control-count">{quantity}</p>

            <button className="qty-control-btn" onClick={() => onChange(quantity + 1)}>
                <MdAdd size={24} />
            </button>
        </div>
    )
}