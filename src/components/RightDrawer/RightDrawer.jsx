"use client";

import React from "react";

import { Drawer as DrawerPrimitive } from "vaul";

import IconComponent from "@/components/IconComponent/IconComponent";

import { cn } from "@/lib/utils";

/**
 * The root component that provides context for the right drawer, powered by Vaul.
 * @param {import("vaul").DrawerProps} props
 */
export const RightDrawer = (props) => (
  <DrawerPrimitive.Root direction="right" {...props} />
);

/**
 * A component that triggers the opening of the right drawer.
 * @param {React.ComponentProps<typeof DrawerPrimitive.Trigger>} props
 */
export const RightDrawerTrigger = (props) => (
  <DrawerPrimitive.Trigger {...props} />
);

/**
 * The main content container for the right drawer.
 * @param {React.ComponentProps<typeof DrawerPrimitive.Content>} props
 */
export const RightDrawerContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay
          data-stack-item="true"
          className="fixed inset-0 z-50 bg-black/30"
        />
        <DrawerPrimitive.Content
          ref={ref}
          data-stack-content="true"
          className={cn(
            "fixed bottom-0 right-0 top-0 z-50 flex h-full w-[400px] flex-col bg-white shadow-xl",
            className
          )}
          {...props}
        >
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    );
  }
);
RightDrawerContent.displayName = "RightDrawerContent";

/**
 * A container for the drawer's header content.
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
export const RightDrawerHeader = ({ className, children, ...props }) => (
  <div
    className={cn("flex items-center justify-between p-8", className)}
    {...props}
  >
    {children}
  </div>
);
RightDrawerHeader.displayName = "RightDrawerHeader";

/**
 * A component for the title within the drawer header.
 * @param {React.ComponentProps<typeof DrawerPrimitive.Title>} props
 */
export const RightDrawerTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn("text-xl font-bold text-neutral-900", className)}
      {...props}
    />
  )
);
RightDrawerTitle.displayName = "RightDrawerTitle";

/**
 * A pre-styled button that closes the drawer.
 * @param {object} props
 * @param {string} [props.className] - Additional classes for the button.
 */
export const RightDrawerClose = ({ className, children }) => (
  <DrawerPrimitive.Close asChild>
    <button type="button" className={cn("", className)} aria-label="Close">
      {children || (
        <IconComponent
          src="/icons/close24.svg"
          className="h-6 w-6 text-primary-600"
        />
      )}
    </button>
  </DrawerPrimitive.Close>
);
RightDrawerClose.displayName = "RightDrawerClose";

/**
 * A container for the drawer's body content.
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
export const RightDrawerBody = ({ className, ...props }) => (
  <div
    className={cn("flex-1 overflow-y-auto p-8 pt-0", className)}
    {...props}
  />
);
RightDrawerBody.displayName = "RightDrawerBody";

/**
 * A container for the drawer's footer content.
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
export const RightDrawerFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "mt-auto flex items-center justify-center gap-4 border-t border-neutral-200 p-4",
      className
    )}
    {...props}
  />
);
RightDrawerFooter.displayName = "RightDrawerFooter";
