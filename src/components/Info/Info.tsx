import { Container } from "@mantine/core";

import classes from "./Info.module.scss";

export const Info: React.FC = () => {
  return (
    <Container className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.info}>
          Use <b className={classes.green}>Shift + Left Click</b> to mark the
          starting location
        </div>
        <div className={classes.info}>
          Use <b className={classes.red}>Ctrl + Left Click</b> to mark the
          ending location
        </div>
        <div className={classes.info}>
          Use <b className={classes.black}>Left Click</b> to draw walls
        </div>
      </div>
      <div className={classes.wrapper}>
        The slider controls the 'greediness' of the A* search. At higher levels,
        the algorithm may find a path much faster, though it may not be the
        absolute shortest route.
      </div>
    </Container>
  );
};
