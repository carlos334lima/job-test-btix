import { IUser } from "../../pages/UsersList";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

type IRenderList = {
  item: IUser;
  PressSelectUser: (value: IUser) => IUser | any;
};

export function RenderListUsers({ item, PressSelectUser }: IRenderList) {
  return (
    <Button onClick={() => PressSelectUser(item)}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={item?.name} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={item.name}
          secondary={
            <Box
              sx={{ display: "flex", flexDirection: "column", maxWidth: 220 }}
            >
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                E-mail: {item.email}
              </Typography>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Website: {item.website}
              </Typography>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Telefone: {item.phone}
              </Typography>
            </Box>
          }
        />
      </ListItem>
    </Button>
  );
}
