import Button from '@mui/material/Button';

interface CreateButton {
  buttonName: string;
  onClick?: () => void;
}

const CreateButton = ({ buttonName, onClick }: CreateButton) => {
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

export default CreateButton;
