import { IUser } from "../../pages/UsersList";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Modal from "@mui/material/Modal";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #a8a8a8",
  BorderRadius: 10,
  boxShadow: 24,
  p: 4,
};

type IModalDetailsUser = {
  open: boolean;
  handleClose: () => void; 
  item: IUser;
} 

export function ModalDetailsUser({ open, handleClose, item }: IModalDetailsUser) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={style}>
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={`Username: ${item?.username}`} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={`Nome: ${item?.name}`} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={`Email: ${item?.email}`} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={`Telefone: ${item?.phone}`} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={`Website: ${item?.website}`} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={`Empresa: ${item?.company.name}`} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText
                  primary={`Endereço: ${item?.address.street}, ${item?.address.suite}, ${item?.address.city}`}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </Modal>
  );
}
