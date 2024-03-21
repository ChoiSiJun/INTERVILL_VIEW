import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

interface UpdateButtonProps {
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function UpdateButton({
  buttonName = '수정',
  onClick = () => null,
}: UpdateButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default UpdateButton;
