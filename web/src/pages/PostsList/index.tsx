import { useState, useEffect } from "react";

import { api } from "../../services/api";
import Header from "../../components/Header";
import { RenderList } from "../../components/List";
import { BottomTabs } from "../../components/BottomTabs";

import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Snackbar,
} from "@mui/material";

export type IPost = {
  body: string;
  title: string;
  id: number;
  userId: number;
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

const PostsList = () => {
  const classes = useStyles();

  const [post, setPosts] = useState<IPost[]>([]);
  const [snackError, setSnackError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {
        setSnackError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header title="Posts" />
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
                {post.map((item) => (
                  <RenderList item={item} key={item?.id} />
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
        </Grid>
      </Grid>
    </div>
  );
};

export default PostsList;
