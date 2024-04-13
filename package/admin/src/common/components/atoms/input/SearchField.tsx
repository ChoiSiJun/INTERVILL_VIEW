import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export interface SearchFieldProps {
  searchInputRef: React.RefObject<HTMLInputElement>;
  onClick: () => void;
}

const SearchField = ({ searchInputRef, onClick }: SearchFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search..."
      inputRef={searchInputRef}
      InputProps={{
        endAdornment: (
          <IconButton type="submit" aria-label="search" onClick={onClick}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchField;
