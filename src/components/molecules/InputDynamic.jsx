import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash, Plus } from "lucide-react";

const InputDynamic = ({
  etcCustom,
  disabled,
  handleAddInput,
  handleRemoveInput,
  handleInputChange,
}) => {
  return (
    <div className="space-y-1 grid gap-2">
      <Label className="font-bold">Lainnya</Label>
      {etcCustom.map((item, index) => (
        <span key={index} className="flex gap-3">
          {index + 1}.
          <Input
            id={`keterangan-${index}`}
            name={`keterangan-${index}`}
            type="text"
            placeholder="Masukkan keterangan"
            disabled={disabled}
            className="bg-bg-neumorphism !shadow-neumorphism-inner"
            onChange={(e) =>
              handleInputChange(index, "keterangan", e.target.value)
            }
            value={item.keterangan}
          />
          <span className="text-lg">=</span>
          <Input
            id={`nominal-${index}`}
            name={`nominal-${index}`}
            type="number"
            placeholder="Masukkan nominal"
            disabled={disabled}
            className="bg-bg-neumorphism !shadow-neumorphism-inner"
            onChange={(e) =>
              handleInputChange(index, "nominal", e.target.value)
            }
            value={item.nominal}
            min={0}
          />
          {index === etcCustom.length - 1 && (
            <Button
              type="button"
              variant="ghost"
              className="font-bold"
              onClick={handleAddInput}
            >
              <Plus className="text-green-500" />
            </Button>
          )}
          {index !== etcCustom.length - 1 && (
            <Button
              type="button"
              variant="ghost"
              className="font-bold"
              onClick={() => handleRemoveInput(index)}
            >
              <Trash className="text-red-500" />
            </Button>
          )}
        </span>
      ))}
    </div>
  );
};

export default InputDynamic;
