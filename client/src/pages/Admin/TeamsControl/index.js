import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import network from '../../../services/network';
import AddTeam from '../../../components/Modals/AddTeam';
import AddTeamMembers from '../../../components/Modals/AddTeamMembers';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row, getAllTeams, handleAddMemberModal } = props;
    const [open, setOpen] = useState(false);

    const removeUserFromTeam = async (user) => {
        try {
            const isDeleteOk = prompt("What's your favorite cocktail drink?");
            if (isDeleteOk != null) {
                const response = await network.delete(`/api/v1/teams/remove-user?userId=${user}&teamId=${row.id}`);
                console.log(response);
                getAllTeams();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTeam = async (team) => {
        try {
            const isDeleteOk = prompt("What's your favorite cocktail drink?");
            if (isDeleteOk != null) {
                const response = await network.delete(`/api/v1/teams/remove-team/${team}`);
                console.log(response);
                getAllTeams();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const updateTeam = async (token, status) => {
    //     try {
    //         const isUpdateOk = prompt("Who's your favorite student?");
    //         if (isUpdateOk != null) {
    //             const newStatus = status === 'blocked' ? 'available' : 'blocked';
    //             const { data: allTokensFromServer } = await network.patch('/api/v1/git/', { token, status: newStatus });
    //             console.log(allTokensFromServer);
    //             getAllTeams();
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const classes = useRowStyles();
    return (
        <React.Fragment>
            <StyledTableRow className={classes.root}>
                <StyledTableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.teachers}</StyledTableCell>
                <StyledTableCell align="left">{new Date(row.updatedAt).toString().substring(0, 24)}</StyledTableCell>
                <StyledTableCell align="left">{new Date(row.createdAt).toString().substring(0, 24)}</StyledTableCell>
                <StyledTableCell align="left">
                    <Button onClick={() => deleteTeam(row.id)}>Delete Team</Button>
                </StyledTableCell>
                <StyledTableCell align="left">
                    <Button onClick={() => handleAddMemberModal(row.id)}>Add Team Members</Button>
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Team Members
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>User Id</StyledTableCell>
                                        <StyledTableCell align="left">User Name</StyledTableCell>
                                        <StyledTableCell align="left">Permission</StyledTableCell>
                                        <StyledTableCell align="left"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.Users.map(user => (<StyledTableRow key={user.userName}>
                                        <StyledTableCell component="th" scope="row">
                                            {user.id}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {user.userName}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {user.permission}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            <Button onClick={() => removeUserFromTeam(user.id)}>Remove User From team</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
    );
}
function TeamsControl() {
    const [allTeams, setAllTeams] = useState([]);
    const [openNewTeamModal, setOpenNewTeamModal] = useState(false);
    const [teamNameForMember, setTeamNameForMember] = useState(false);
    const [openAddMemberModal, setOpenAddMemberModal] = useState(false);


    async function getAllTeams() {
        try {
            const { data: allTeamsFromServer } = await network.get('/api/v1/teams/all-teams');
            setAllTeams(allTeamsFromServer);
        } catch (error) {
            console.error(error);
        }
    }

    const addNewTeam = () => {
        setOpenNewTeamModal(true);
    };

    const handleAddMemberModal = (team) => {
        setTeamNameForMember(team)
        setOpenAddMemberModal(true)
    }

    useEffect(() => {
        getAllTeams();
    }, []);

    return (
        <div className="admin" style={{ marginTop: '60px', textAlign: 'center' }}>
            <h1>Teams Management Area</h1>
            <AddTeam open={openNewTeamModal} setOpen={setOpenNewTeamModal} getAllTeams={getAllTeams} />
            <AddTeamMembers open={openAddMemberModal} setOpen={setOpenAddMemberModal} getAllTeams={getAllTeams} teamNameForMember={teamNameForMember} />
            <Button variant="contained" color="secondary">
                <Link to="/admin"><h2>Admin Router</h2></Link>
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={addNewTeam}
            >
                Add New Team
      </Button>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Teachers</StyledTableCell>
                            <StyledTableCell align="left">Created At</StyledTableCell>
                            <StyledTableCell align="left">Updated At</StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allTeams && allTeams.map((team) => (
                            <Row
                                key={team.id + team.name}
                                row={team}
                                getAllTeams={getAllTeams}
                                handleAddMemberModal={handleAddMemberModal}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TeamsControl;