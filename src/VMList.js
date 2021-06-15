import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import { supabase } from "./supabase";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import VMTable from "./VMTable";
import NewVM from "./NewVM";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});
export default function VMList({ session }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getVMs();
  }, [session]);

  async function getVMs() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase.from("vms").select("*");

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        setData(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main-container">
      <div className="appbar-container">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {session.user.email}
            </Typography>
            <Button
              color="inherit"
              style={{ float: "right" }}
              onClick={() => setAddNew(!addNew)}
            >
              {addNew ? "View VMs" : "Add New"}
            </Button>
            <Button
              color="inherit"
              style={{ float: "right" }}
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      {addNew ? <NewVM /> : <VMTable data={data} />}
    </div>
  );
}
