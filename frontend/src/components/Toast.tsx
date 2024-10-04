interface ToastProps {
  message: string;
  onCloseOverlay: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onCloseOverlay }) => {
  return (
    <div className="toast-overlay" onClick={onCloseOverlay}>
      <p className="toast">{message}</p>
    </div>
  );
};

export default Toast;
