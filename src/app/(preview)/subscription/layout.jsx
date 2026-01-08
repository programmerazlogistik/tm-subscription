import { Toaster } from "@muatmuat/ui/Toaster";

const SubscriptionLayout = ({ children }) => {
  return (
    <div className="">
      <Toaster variant="muatparts" />
      <div className="mx-auto max-w-[1008px]">{children}</div>
    </div>
  );
};

export default SubscriptionLayout;
