"use client";

const SubscriptionLayout = ({ children }) => {
  return (
    // <RoutePersistedProvider>
    <div className="">
      <div className="mx-auto max-w-[1008px]">{children}</div>
    </div>
    // </RoutePersistedProvider>
  );
};

export default SubscriptionLayout;
