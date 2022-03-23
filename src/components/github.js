import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import "../index.css";
import Background from "../image/img2.jpg"


const useStyles = makeStyles((theme) => ({
  gridText: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
    outline: "1px solid grey",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    overflowX:"auto"
  },
  gridCopy: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
    outline: "1px solid grey",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();
  const [branchName, setBranchName] = useState("");
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [commandArr, setCommandArr] = useState([
    "git status",
    "git stash",
    "git checkout development",
    "git pull origin development",
    "git fetch",
    "git checkout",
    "git rebase development",
    "git stash pop",
    "git status",
    "git commit -m",
    "git push",
  ]);
  const handleSubmit = (e) => {
    if (branchName !== "" && comment !== "") {
      let tempArr = commandArr;
      tempArr[5] = "git checkout " + branchName;
      tempArr[9] = "git commit -m '" + comment + "'";
      tempArr[10] = "git push origin " + branchName;
      setCommandArr(tempArr);
      setShow(true);
    } else {
      alert("Please enter Branch Name and Comment ");
    }
  };
  const handleClear = () => {
    if (show) {
      setShow(false);
      setBranchName("");
      setComment("");
    }
  };

  const handleChangeBranch = (e) => {
    setBranchName(e.target.value);
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <div
      style={{
        width: "100vw",
        //minHeight:"100vh",
        //marginTop:"0px",
        // backgroundImage:`url(${Background})`,
        // backgroundSize: 'auto',
        // backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          paddingTop: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" style={{ fontFamily: "MyFont" }}>
          Generate github commands
        </Typography>
      </div>
      <div
        style={{
          marginTop: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          style={{
            width: "60%",
            outline: "1px solid grey",
            borderRadius: "12px",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              marginTop: "30px",
              justifyContent: "center",
            }}
          >
            <TextField
              required
              style={{ width: "90%" }}
              id="outlined-required"
              label="Branch Name"
              value={branchName}
              variant="outlined"
              onChange={handleChangeBranch}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "center",
            }}
          >
            <TextField
              required
              style={{ width: "90%" }}
              id="outlined-required"
              label="Comment"
              value={comment}
              variant="outlined"
              onChange={handleChangeComment}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              marginTop: "10px",
              marginBottom: "10px",
              justifyContent: "center",
            }}
          >
            {!show ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgb(0,255,0,0.2)",
                  border: "1px solid black",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleClear}>
                Clear
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
      {branchName !== "" && comment !== "" && show ? (
        <div
          style={{
            marginTop: "30px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom:"20px"
          }}
        >
          <Grid container style={{ width: "40%" }}>
            {commandArr.map((item, i) => {
              return (
                <>
                  <Grid
                    id={i + "text"}
                    key={i + "text"}
                    item
                    xs={10}
                    className={classes.gridText}
                  >
                    <Typography
                      id={i + "typogarphy"}
                      variant="h6"
                      style={{ fontFamily: "MyFont" }}
                    >
                      {item}
                    </Typography>
                  </Grid>
                  <Grid
                    id={i + "copy"}
                    key={i + "copy"}
                    item
                    xs={2}
                    className={classes.gridCopy}
                    onClick={() => {
                      commandArr.map((data, x) => {
                        document.getElementById(
                          x + "copy"
                        ).style.backgroundColor = "rgb(255,255,255)";
                        document.getElementById(
                          x + "text"
                        ).style.backgroundColor = "rgb(255,255,255)";
                        document.getElementById(
                          x + "typogarphy"
                        ).style.fontWeight = "normal";
                      });
                      document.getElementById(
                        i + "copy"
                      ).style.backgroundColor = "rgb(0,255,0,0.2)";
                      document.getElementById(
                        i + "text"
                      ).style.backgroundColor = "rgb(0,255,0,0.2)";
                      document.getElementById(
                        i + "typogarphy"
                      ).style.fontWeight = "bold";
                      navigator.clipboard.writeText(item);
                    }}
                  >
                    <FileCopyIcon fontSize="small" />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
