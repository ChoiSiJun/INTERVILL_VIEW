import Button from '@mui/material/Button';

interface DeleteButton {
  buttonName: string;
  onClick?: () => void;
}

const DeleteButton = ({ buttonName, onClick }: DeleteButton) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        ml: 'auto',
        minWidth: '80px',
        margin: '30',
        marginTop: 2,
      }}
      onClick={onClick}
    >
      {buttonName}
    </Button>
  );
};

export default DeleteButton;
