import Button from '@mui/material/Button';

interface UpdateButton {
  buttonName: string;
  onClick?: () => void;
}

const UpdateButton = ({ buttonName, onClick }: UpdateButton) => {
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

export default UpdateButton;
