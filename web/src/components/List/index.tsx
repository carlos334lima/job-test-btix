import React, { useEffect, useState } from "react";

import { api } from "../../services/api";
import { IPost } from "../../pages/PostsList";

import Divider from "@mui/material/Divider";
import { AccordionDetails, Alert, Avatar, List, Snackbar } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";

type IRenderList = {
  item: IPost;
};

type IComments = {
  body: string;
  name: string;
  email: string;
  id: number;
  userId: number;
};

type IRenderComments = {
  item: IComments;
};

export function RenderList({ item }: IRenderList) {
  const [comments, setComments] = useState<IComments[]>([]);
  const [snackError, setSnackError] = useState(false);

  useEffect(() => {
    callApi();
  }, []);

  function callApi() {
    api
      .get(`/posts/${item?.id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  function RenderComments({ item }: IRenderComments) {
    return (
      <>
        <ListItemAvatar>
          <Avatar alt={item.email} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={item.name}
          secondary={
            <React.Fragment>
              <Typography>{item.email}</Typography>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.body}
              </Typography>
            </React.Fragment>
          }
        />
      </>
    );
  }

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ListItem alignItems="flex-start">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">
              {item.title}{" "}
              <Typography sx={{ color: "#5f5f5f" }}>{item.body}</Typography>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {comments.map((item) => (
              <ListItem alignItems="flex-start" key={item?.id}>
                <RenderComments item={item} />
              </ListItem>
            ))}
            <Divider variant="inset" component="li" />
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <Snackbar
        open={snackError}
        autoHideDuration={500}
        onClose={() => setSnackError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Houve um Erro interno!
        </Alert>
      </Snackbar>
      <Divider variant="inset" component="li" />
    </List>
  );
}
