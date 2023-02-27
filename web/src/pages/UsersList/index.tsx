import { useState, useEffect } from "react";

import { api } from "../../services/api";

import Header from "../../components/Header";
import { BottomTabs } from "../../components/BottomTabs";
import { RenderListUsers } from "../../components/ListUsers";
import { ModalDetailsUser } from "../../components/ModalDetailsUser";

import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Snackbar,
} from "@mui/material";

export type IUser = {
  email: string;
  username: string;
  name: string;
  website: string;
  phone: string;
  id: number;
  company: {
    name: string;
    bs: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    suite: string;
    zipcode: string;
    city: string;
    geo: {
      lat: string;
      long: string;
    };
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const UsersList = () => {
  const [snackError, setSnackError] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectUser, setSelectUser] = useState<IUser>({} as IUser);
  const [openModalDetails, setOpenModalDetails] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        setSnackError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function PressSelectUser(item: IUser) {
    setSelectUser(item);
    setTimeout(() => {
      setOpenModalDetails(true);
    }, 350);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header title="Usuários" />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="xl" fixed sx={{ height: "68vh" }}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Paper style={{ maxHeight: "100%", overflow: "auto" }}>
                {users.map((item) => (
                  <RenderListUsers
                    item={item}
                    PressSelectUser={PressSelectUser}
                  />
                ))}
              </Paper>
            )}
          </Container>
        </Grid>
        <Grid item xs={12} style={{ height: 200 }}>
          <Box
            component="span"
            m={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BottomTabs />
          </Box>
          <Snackbar
            open={snackError}
            autoHideDuration={500}
            onClose={() => setSnackError(false)}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              Houve Erro interno!
            </Alert>
          </Snackbar>
          {selectUser?.id && (
            <ModalDetailsUser
              open={openModalDetails}
              item={selectUser}
              handleClose={() => setOpenModalDetails(false)}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;
