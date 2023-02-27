import { Typography } from "@mui/material";
import "./style.scss";

type IHeader = {
  title: string;
};

export default function Header({ title }: IHeader) {
  return (
    <header>
      <Typography variant="h4" color="#fff">
        {title}
      </Typography>
    </header>
  );
}
