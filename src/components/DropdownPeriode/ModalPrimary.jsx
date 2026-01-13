"use client";

import { createContext, useContext, useRef, useState } from "react";

import { IconComponent } from "@muatmuat/ui/IconComponent";
import { ImageComponent } from "@muatmuat/ui/ImageComponent";
import * as Dialog from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

import centerPrimary from "./img/center.png";
import leftPrimary from "./img/left.png";
import rightPrimary from "./img/right.png";

const ModalContext = createContext({
  open: false,
  withCloseButton: true,
  closeOnOutsideClick: false,
});

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("useModal must be used within a Modal");
  }
  return context;
};

export const Modal = ({
  children,
  open: controlledOpen,
  onOpenChange,
  withCloseButton = true,
  closeOnOutsideClick = false,
  ...props
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpenState) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpenState);
    }
    onOpenChange?.(newOpenState);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <ModalContext.Provider
        value={{ open: isOpen, withCloseButton, closeOnOutsideClick, ...props }}
      >
        {children}
      </ModalContext.Provider>
    </Dialog.Root>
  );
};

export const ModalTitle = ({ className, children, withClose }) => {
  if (withClose) {
    return (
      <div className="flex w-full items-start justify-center">
        <Dialog.Title
          className={cn(
            "flex-grow text-center text-sm font-bold text-[#1B1B1B]",
            className
          )}
        >
          {children}
        </Dialog.Title>
        <ModalClose asChild>
          <button
            aria-label="Close"
            className="flex-shrink-0 focus:outline-none"
          >
            <IconComponent
              src="/icons/close12.svg"
              className="size-2.5 text-[#176CF7]"
            />
          </button>
        </ModalClose>
      </div>
    );
  }

  return (
    <Dialog.Title
      className={cn(
        "text-center text-base font-bold text-neutral-900",
        className
      )}
    >
      {children}
    </Dialog.Title>
  );
};

export const ModalTrigger = ({ className, children, asChild = true }) => {
  return (
    <Dialog.Trigger asChild={asChild} className={className}>
      {children}
    </Dialog.Trigger>
  );
};

export const ModalContent = ({
  type = "muatmuat",
  children,
  className,
  appearance,
  ...props
}) => {
  const { withCloseButton = true, closeOnOutsideClick = false } = useModal();
  const dialogRef = useRef(null);

  const closeIconStyles = {
    bo: "size-3 text-primary-700",
    muatmuat: "size-6 md:size-5 text-primary-700",
    muatparts: "size-6 md:size-5 text-muat-parts-non-800",
    "muatparts-plus": "size-6 md:size-5 text-muat-parts-member-900",
    muattrans: "size-6 md:size-5 text-muat-trans-secondary-900",
    lightbox: "size-6 md:size-5 text-primary-700",
    primary: "size-6 md:size-5 text-blue-500",
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        data-stack-item="true"
        className={cn(
          "fixed inset-0 z-[50] bg-black/25",
          "data-[state=open]:animate-overlay-show",
          "data-[state=closed]:fade-out-0 md:data-[state=closed]:animate-out",
          appearance?.backgroundClassName
        )}
      >
        {type === "lightbox" && (
          <Dialog.Close className="absolute left-4 top-[55px] z-[9998] block text-white md:hidden">
            <IconComponent
              className="text-white"
              src="/icons/close20.svg"
              width={24}
              height={24}
            />
          </Dialog.Close>
        )}
      </Dialog.Overlay>

      <Dialog.Content
        ref={dialogRef}
        data-stack-content="true"
        onEscapeKeyDown={(e) => {
          const stackItems = Array.from(
            document.querySelectorAll('[data-stack-item="true"]')
          );
          const isTopmost =
            dialogRef.current?.parentElement?.parentElement ===
            stackItems[stackItems.length - 1];
          if (!isTopmost) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          if (!closeOnOutsideClick) {
            e.preventDefault();
          }
        }}
        {...props}
        className={cn(
          "fixed left-1/2 top-1/2 z-[51] -translate-x-1/2 -translate-y-1/2",
          "rounded-xl bg-neutral-50 shadow-lg",
          "md:data-[state=open]:animate-content-show",
          "md:data-[state=closed]:animate-content-hide",
          type === "lightbox" && "bg-transparent shadow-none",
          className
        )}
      >
        {children}
        {withCloseButton && (
          <Dialog.Close className="absolute right-2 top-2 z-50">
            <IconComponent
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-full bg-neutral-50",
                closeIconStyles[type] || closeIconStyles.muattrans,
                type === "bo" && "right-4 top-3",
                appearance?.closeButtonClassname
              )}
              src="/icons/close20.svg"
            />
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const headerBackgroundVariants = {
  muattrans: "bg-muat-trans-primary-400",
  "muatparts-plus": "bg-muat-parts-member-900",
  primary: "bg-primary-700",
};

const headerkiriSrc = {
  muattrans: "/img/header-modal/header-kiri.svg",
  "muatparts-plus": "/img/header-modal/header-kiri-muatparts-plus.svg",
  primary: leftPrimary.src,
};

const headerHeaderSrc = {
  muattrans: "/img/header-modal/muatmuat-brown.svg",
  "muatparts-plus": "/img/header-modal/muatparts-plus.svg",
  primary: centerPrimary.src,
};

const headerKananSrc = {
  muattrans: "/img/header-modal/header-kanan.svg",
  "muatparts-plus": "/img/header-modal/header-kanan-muatparts-plus.svg",
  primary: rightPrimary.src,
};

export const ModalHeader = ({ className, variant = "muattrans" }) => {
  const leftSrc = headerkiriSrc[variant];
  const centerSrc = headerHeaderSrc[variant];
  const rightSrc = headerKananSrc[variant];

  return (
    <div
      className={cn(
        "relative flex h-[70px] justify-between overflow-hidden rounded-t-xl",
        headerBackgroundVariants[variant],
        className
      )}
    >
      <div>
        {leftSrc && (
          <ImageComponent
            alt="svg header modal kiri"
            src={leftSrc}
            width={70}
            height={70}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="my-auto">
        {centerSrc && (
          <ImageComponent
            alt="logo muatmuat header coklat"
            src={centerSrc}
            width={48}
            height={48}
            className="h-full w-full"
          />
        )}
      </div>
      <div>
        {rightSrc && (
          <ImageComponent
            alt="svg header modal kanan "
            src={rightSrc}
            width={70}
            height={70}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export const ModalFooter = ({ className, children }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 rounded-b-xl bg-white px-6 pb-9 pt-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ModalClose = ({ asChild = true, children }) => {
  return <Dialog.Close asChild={asChild}>{children}</Dialog.Close>;
};
