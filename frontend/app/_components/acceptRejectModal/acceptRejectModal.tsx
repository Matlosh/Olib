'use client';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";

type AcceptRejectModalProps = {
  isOpen: boolean,
  setIsOpen: (opened: boolean) => void,
  message: string,
  onAccept?: () => void,
  onReject?: () => void
};

export default function AcceptRejectModal({
  isOpen,
  setIsOpen,
  message,
  onAccept,
  onReject
}: AcceptRejectModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="">Are you sure?</ModalHeader> 

            <ModalBody>
              <p>{message}</p>
            </ModalBody>

            <ModalFooter>
              <Button color="success" onPress={_ => {
                onAccept && onAccept();
                setIsOpen(false);
              }}>
               Accept
              </Button>

              <Button color="danger" onPress={_ => {
                onReject && onReject();
                setIsOpen(false);
              }}>
                Reject 
              </Button>
            </ModalFooter>
          </>   
        )}
      </ModalContent>
    </Modal>
  );
}