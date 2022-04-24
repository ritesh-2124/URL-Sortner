import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

export const Sort = () => {
  const [state, setstate] = useState({
    longUrl: "",
    sortUrl: "",
  });
  const [get, setget] = useState([]);

  useEffect(() => {
    fatchData();
  }, []);

  const getData = () => {
    axios
      .post("https://websitesortnet.herokuapp.com/sortUrl", state)
      .then((res) => {
        console.log(res.data)
        fatchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fatchData = () => {
    axios
      .get("https://websitesortnet.herokuapp.com/sortUrl")
      .then((res) => {
        setget(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setData = (e) => {
    let { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            URL SORTENER
          </Typography>
        </Toolbar>
      </AppBar>
      <h2>ENTER YOUR URL HERE</h2>
      <Box>
        <TextField
          sx={{
            width: "500px",
            height: "55px",
            fontSize: "30px",
            marginLeft: "20px",
          }}
          id="outlined-basic"
          label="Enter Your Url"
          variant="outlined"
          name="longUrl"
          onChange={setData}
        />
        <TextField
          sx={{
            width: "500px",
            height: "55px",
            fontSize: "30px",
            marginLeft: "20px",
          }}
          id="outlined-basic"
          label="Enter Name You Want (Optional)"
          variant="outlined"
          name="sortUrl"
          onChange={setData}
        />

        <Button
          sx={{
            width: "250px",
            height: "55px",
            fontSize: "30px",
            marginLeft: "20px",
          }}
          variant="contained"
          onClick={getData}
        >
          Submit
        </Button>
      </Box>

      <TableContainer sx={{margin:"auto" , marginTop:"50px" , width:"800px" , height:"400px"}} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Your Link</TableCell>
              <TableCell align="right">Sort Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {get.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.longUrl}
                </TableCell>
                <TableCell align="right">   <a href= {row.longUrl} target="_blank" align="right">{row.sortUrl}</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
