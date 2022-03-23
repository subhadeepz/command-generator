import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles((theme) => ({
  gridText: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
    outline: "1px solid grey",
  },
  gridCopy: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
    outline: "1px solid grey",
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();
  const [branchName, setBranchName] = useState("");
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [commandArr, setCommandArr] = useState([
    "git staus",
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
    if(branchName !== "" && comment !== ""){
    let tempArr = commandArr;
    tempArr[5] = "git checkout " + branchName;
    tempArr[9] = "git commit -m '" + comment + "'";
    tempArr[10] = "git push origin " + branchName;
    setCommandArr(tempArr);
    setShow(true);}
    else {
      alert("Please enter Branch Name and Comment ")
    }
  };
  const handleClear = () => {
    if(show){
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
      }}
    >
      <div
        style={{
          marginTop: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">Generate github commands</Typography>
      </div>
      <div
        style={{
          marginTop: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container style={{ width: "60%", outline: "1px solid grey",borderRadius:"12px" }}>
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
                color="primary"
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
          }}
        >
          <Grid container style={{ width: "40%" }}>
            {commandArr.map((item, i) => {
              return (
                <>
                  <Grid
                    key={i + "text"}
                    item
                    xs={10}
                    className={classes.gridText}
                  >
                    <Typography variant="h6">{item}</Typography>
                  </Grid>
                  <Grid
                    key={i + "copy"}
                    item
                    xs={2}
                    className={classes.gridCopy}
                  >
                    <FileCopyIcon
                      fontSize="small"
                      onClick={() => {
                        navigator.clipboard.writeText(item);
                      }}
                    />
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
