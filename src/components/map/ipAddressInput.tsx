import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const IpAddressInput = ({
  handleSubmitIpAddress,
  ipAddress,
}: {
  handleSubmitIpAddress: (ipAddress: string) => void;
  ipAddress: string | null;
}) => {
  const [value, setValue] = useState(ipAddress || "");
  return (
    <form
      className="absolute bottom-10 left-1/2 items-center px-2 grid grid-cols-[4fr_1fr] gap-x-2 transform -translate-x-1/2 max-w-80 w-[calc(100vw-0.5rem)] h-11 bg-zinc-800 rounded-lg z-[9999999]"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitIpAddress(value);
      }}
    >
      <Input
        type="text"
        className="bg-white h-7 rounded-sm"
        placeholder="Enter ip address..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="ipAddress"
        id="ipAddress"
        required
      />
      <Button variant="outline" className="cursor-pointer h-7 rounded-sm">
        Find
      </Button>
    </form>
  );
};

export default IpAddressInput;
