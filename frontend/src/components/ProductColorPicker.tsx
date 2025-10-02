import type { ColorType } from "../models/product.model";

interface ProductColorPickerProps {
  selectedColor: ColorType;
  onColorChange: (color: ColorType) => void;
}

const ProductColorPicker: React.FC<ProductColorPickerProps> = ({
  selectedColor,
  onColorChange,
}) => {
  const colors: {
    type: ColorType;
    name: string;
    bgColor: string;
    borderColor: string;
  }[] = [
    {
      type: "yellow",
      name: "Yellow Gold",
      bgColor: "bg-yellow-400",
      borderColor: "border-yellow-500",
    },
    {
      type: "white",
      name: "White Gold",
      bgColor: "bg-gray-200",
      borderColor: "border-gray-400",
    },
    {
      type: "rose",
      name: "Rose Gold",
      bgColor: "bg-rose-300",
      borderColor: "border-rose-400",
    },
  ];

  return (
    <div>
      <div className="flex space-x-2">
        {colors.map((color) => (
          <button
            key={color.type}
            className={`
              w-6 h-6 rounded-full border-2 transition-all duration-200
              ${color.bgColor}
              ${
                selectedColor === color.type
                  ? `${color.borderColor} scale-110`
                  : "border-gray-300 hover:border-gray-400"
              }
            `}
            onClick={() => onColorChange(color.type)}
            title={color.name}
          />
        ))}
      </div>
      <div
        className="text-gray-500 mt-1 capitalize font-avenir font-normal"
        style={{ fontSize: "12px" }}
      >
        {selectedColor
          .replace("yellow", "Yellow Gold")
          .replace("white", "White Gold")
          .replace("rose", "Rose Gold")}
      </div>
    </div>
  );
};

export default ProductColorPicker;
