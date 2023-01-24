import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import axios from 'axios';
// mock
import ADMINLIST from '../_mock/admin';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Admin', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'handleTrans', label: 'Handle', alignRight: false },
    { id: 'lastLogin', label: 'Last Login', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function AdminPage() {
    const [ADMINLIST, setADMINLIST] = useState([]);

    const [openMenu, setOpenMenu] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [isNoData, setIsNoData] = useState(false);

    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenu(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = ADMINLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ADMINLIST.length) : 0;

    const filteredUsers = applySortFilter(ADMINLIST, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    // ---- from axios
    const urlGetAdmin = `https://mocki.io/v1/74065996-34de-4518-8ded-0f0af1e70231`;

    const getDataAdminList = async () => {
        await axios(urlGetAdmin)
            .then((response) => {
                setADMINLIST(response.data);
                setIsNoData(false);
            })
            .catch((error) => {
                console.log(error.message);
                setIsNoData(true);
            })
    };

    useEffect(() => {
        getDataAdminList();
    }, []);

    // ----

    return (
        <>
            <Helmet>
                <title> Admin | Algolistic </title>
            </Helmet>

            <Container maxWidth='md'>
                <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
                    <Typography variant='h4' gutterBottom>
                        Admin
                    </Typography>
                    <Button variant='contained' startIcon={<Iconify icon='eva:plus-fill' />}>
                        New Admin
                    </Button>
                </Stack>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={ADMINLIST.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, name, role, handleTrans, status, avatarUrl, lastLogin } = row;
                                        const selectedUser = selected.indexOf(name) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role='checkbox' selected={selectedUser}>
                                                <TableCell padding='checkbox'>
                                                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                                                </TableCell>

                                                <TableCell component='th' scope='row' padding='none'>
                                                    <Stack direction='row' alignItems='center' spacing={2}>
                                                        <Avatar alt={name} src={avatarUrl} />
                                                        <Typography variant='subtitle2' noWrap>
                                                            {name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align='left'>{role}</TableCell>

                                                <TableCell align='left'>{handleTrans}</TableCell>

                                                <TableCell align='left'>{lastLogin}</TableCell>

                                                <TableCell align='left'>
                                                    <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                                                </TableCell>

                                                <TableCell align='right'>
                                                    <IconButton size='large' color='inherit' onClick={handleOpenMenu}>
                                                        <Iconify icon={'eva:more-vertical-fill'} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {(isNotFound || isNoData) && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}>
                                                    <Typography variant='h6' paragraph>
                                                        Not found
                                                    </Typography>

                                                    {isNotFound ? (
                                                        <Typography variant='body2'>
                                                            No results found for &nbsp;
                                                            <strong>&quot;{filterName}&quot;</strong>.
                                                            <br /> Try checking for typos or using complete words.
                                                        </Typography>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    {isNotFound || isNoData ? (
                        ''
                    ) : (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component='div'
                            count={ADMINLIST.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )}
                </Card>
            </Container>

            <Popover
                open={Boolean(openMenu)}
                anchorEl={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}>
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
