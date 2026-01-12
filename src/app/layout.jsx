import { Toaster } from "@muatmuat/ui/Toaster";

import "./globals.scss";
import { Providers } from "./providers";

export const metadata = {
  title: "TM - Subscription",
  description: "Back Office for Muatrans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className={`bg-white`}>
        <Providers>{children}</Providers>
        <Toaster
          variant="muatparts"
          appearance={{
            wrapperClassName:
              "z-[9999] !top-auto !bottom-[232px] !left-auto !right-[24px]",
          }}
        />
      </body>
    </html>
  );
}
