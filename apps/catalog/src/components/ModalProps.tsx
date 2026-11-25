/**
 * Shared Modal Props
 */
export interface ModalProps {
  /**
   * Determines if modal is visible
   */
  isModalOpen: boolean;
  /**
   * Setter for isModalOpen
   */
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
