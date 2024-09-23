type ErrorOrSuccessMessageBoxProps = {
    messageType: 'error' | 'success',
    message: string,
};

const ErrorOrSuccessMessageBox = ({ messageType, message }: ErrorOrSuccessMessageBoxProps) => {
  const boxStyles = messageType === 'error'
    ? 'bg-red-500'
    : 'bg-green';

    return (
        <div className={`mt-4 p-4 rounded-md ${boxStyles}`}>
            <p className="text-sm font-medium text-white text-center">{message}</p>
        </div>
    );
}

export default ErrorOrSuccessMessageBox;
