import { useState, useEffect } from "react";

import classes from "./Notification.module.css";

const Notification = (props) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (props.status !== "pending") return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [props.status]);

  const bgStyle =
    props.status === "rejected"
      ? "linear-gradient(90deg, #dc1e1e 0%, #a00a0a 100%)"
      : props.status === "success"
        ? "linear-gradient(90deg, #1ad1b9 0%, #0aa08c 100%)"
        : "linear-gradient(90deg, #1a91d1 0%, #0f64aa 100%)";

  return (
    <section className={classes.notification} style={{ background: bgStyle }}>
      <h2>
        {props.title}
        {props.status === "pending" ? dots : ""}
      </h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
