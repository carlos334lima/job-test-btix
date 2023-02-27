import { useState } from "react";

enum EBottomTabs {
  POSTS = 0,
  USERS = 1,
}

import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@mui/icons-material/Assignment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const BottomTabs = () => {
  const [value, setValue] = useState(EBottomTabs.POSTS);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/">
        <Fab variant="extended" color="primary">
          <AssignmentIcon className={classes.extendedIcon} />
          Posts
        </Fab>
      </Link>
      <Link to="/users">
        <Fab variant="extended" color="secondary">
          <GroupIcon className={classes.extendedIcon} />
          Usuários
        </Fab>
      </Link>
    </div>
  );
};

export { BottomTabs };
