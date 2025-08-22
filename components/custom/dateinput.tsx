import { Input } from "../ui/input";
import { Label } from "../ui/label";

type DateValue = {
  day: number;
  month: number;
  year: number;
};

type DateInputProps = {
  value: DateValue;
  onChange: (value: DateValue) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

export default function DateInput({ value, onChange }: DateInputProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex w-full gap-5">
      <Label className="flex flex-col items-start">
        <span>Day</span>
        <Input
          min={1}
          max={31}
          type="number"
          className="text-center h-[52px] w-[6ch]"
          placeholder="DD"
          value={Number.isFinite(value?.day) ? String(value.day) : ""}
          onChange={(e) =>
            onChange({ ...value, day: parseInt(e.target.value || "0", 10) })
          }
        />
      </Label>
      <Label className="flex flex-col items-start">
        <span>Month</span>
        <Input
          min={1}
          max={12}
          type="number"
          className="text-center h-[52px] w-[6ch]"
          placeholder="MM"
          value={Number.isFinite(value?.month) ? String(value.month) : ""}
          onChange={(e) =>
            onChange({ ...value, month: parseInt(e.target.value || "0", 10) })
          }
        />
      </Label>
      <Label className="flex flex-col items-start">
        <span>Year</span>
        <Input
          min={currentYear - 120}
          max={currentYear}
          type="number"
          className="text-center h-[52px] w-[8ch]"
          placeholder="YYYY"
          value={Number.isFinite(value?.year) ? String(value.year) : ""}
          onChange={(e) =>
            onChange({ ...value, year: parseInt(e.target.value || "0", 10) })
          }
        />
      </Label>
    </div>
  );
}
