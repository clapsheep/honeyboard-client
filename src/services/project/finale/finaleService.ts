import { Result } from "@/components/atoms/SearchDropDown/SearchDropDown";

export const handleLeaderOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  value: Result[],
  setValue: React.Dispatch<React.SetStateAction<Result[]>>,
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
) => {

  setInputValue(e.target.value);

  
}