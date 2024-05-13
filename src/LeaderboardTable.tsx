import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Theme } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';


// Import the function to get leaderboard data from API
import { getleaderboard } from 'updateLeaderboardWithPublicKey';

const LeaderboardText = styled(Typography)(({ theme }: { theme: Theme }) => ({
  leaderboardText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '3rem',
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    textShadow: `0 0 20px ${theme.palette.primary.main}`,
  },
}));

// Styled components for TableCell and TableRow
const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Interface for leaderboard entry
interface LeaderboardEntry {
  wallet_address: string;
  score: number;
}

const CustomizedTables = () => {
  const [leaderboardData, setLeaderboardData] = React.useState<LeaderboardEntry[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Adjust this as needed

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement> ) => {
    if (event) {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }
  };

  const calculateRank = (index:number) => {
    return index + 1 + page * rowsPerPage;
  };



  React.useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getleaderboard();
        if (response) {
          setLeaderboardData(response);
        }
      } catch (error) {
        console.error('Error fetching leaderboard: ', error);
      }
    };
  
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
       <LeaderboardText variant="h3">LEADERBOARD</LeaderboardText>
      <TableContainer component={Paper} style={{ maxWidth: '100%', overflowX: 'auto' }}>
        {/* <Table sx={{ minWidth: 700 }} aria-label="customized table"> */}
        <Table  aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell>Wallet Address</StyledTableCell>
              <StyledTableCell align="right">Score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{calculateRank(index)}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                <a href={`https://solscan.io/account/${row.wallet_address}`} target="_blank" rel="noopener noreferrer"  style={{ textDecoration: 'none', color: 'black' }}>
                  {row.wallet_address}
                </a>
                </StyledTableCell>
                <StyledTableCell align="right">{row.score}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ alignSelf: 'center', marginTop: '10px' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={leaderboardData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};  

export default CustomizedTables;
