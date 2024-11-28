import AddCircle from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Avatar, Button, CardMedia, IconButton, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Header } from '../../components/Header';
import apiService from "../../services/api";
import { StyledBox } from "../login/login-styled";
import { ActionButtonContainer, CardContainer, CardContent, Container } from './dashboard-styled';
import { UserData, UsersInterface } from './dashboard-types';

export const Dashboard = () => {
  // const { mode, setMode } = useColorScheme();

  const [userData, setUserData] = useState<UserData>()
  const [page, setPage] = useState(1);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    id: 0
  })

  const [tempData, setTempData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await apiService.listUsers(page, 6);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [page]);

  const handleDelete = (id: number) => {
    const filteredUsers = userData?.data?.filter((user) => user.id !== id)
    setUserData((prev) => ({
      ...prev,
      data: filteredUsers,
    }))
  };

  const handleCreate = () => {
    setUserForm({ email: "", first_name: "", last_name: "", id: 0 })

    const currentUsers = userData?.data;
    const randomId = Math.floor(Math.random() * 1000000);
    userForm.id = randomId;

    currentUsers?.push(userForm)
    setUserData((prev) => ({
      ...prev,
      data: currentUsers,
    }))
  }

  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.split('')[0]
    const lastInitial = lastName.split('')[0]
    return firstInitial + lastInitial
  }


  const handleEditClick = (user: UsersInterface) => {
    setEditUserId(user.id);
    setTempData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

  const handleSaveClick = () => {
    setUserData((prev) => ({
      ...prev,
      data: prev?.data?.map((user) =>
        user.id === editUserId
          ? { ...user, ...tempData }
          : user
      ),
    }));
    setEditUserId(null);
  };

  // const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setMode(event.target.checked ? 'dark' : 'light');
  // };


  return (
    <>
      <div>
        <Header />
      </div>

      <StyledBox>
        <h3>Dashboard</h3>
        <Container maxWidth="md">

          {userData?.data?.map((user) => (
            <CardContainer sx={[
              (theme) => ({
                color: '#fff',
                backgroundColor: theme.palette.primary.main,
                ...theme.applyStyles('dark', {
                  backgroundColor: theme.palette.secondary.main,
                }),
                '&:hover': {
                  boxShadow: theme.shadows[3],
                  backgroundColor: theme.palette.primary.dark,
                  ...theme.applyStyles('dark', {
                    backgroundColor: theme.palette.secondary.dark,
                  }),
                },
              }),
            ]} variant="outlined">
              <CardContent>

                <div>
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    alt={user.first_name}
                    src={user.avatar}>
                    {getInitials(user.first_name, user.last_name)}
                  </Avatar>
                </div>

                {editUserId !== user.id ? <div>
                  <Typography variant="h6">{user.first_name}</Typography>
                  <Typography variant="h6">{user.last_name}</Typography>
                  <Typography variant="subtitle2">{user.email}</Typography>
                </div> : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextField label="First name" variant="standard" value={tempData.first_name} onChange={(e) => setTempData((prev) => ({
                      ...prev,
                      first_name: e.target.value
                    }))} />
                    <TextField label="Last name" variant="standard" value={tempData.last_name} onChange={(e) => setTempData((prev) => ({
                      ...prev,
                      last_name: e.target.value
                    }))} />
                    <TextField label="Email" variant="standard" value={tempData.email} onChange={(e) => setTempData((prev) => ({
                      ...prev,
                      email: e.target.value
                    }))} />
                    <Button sx={[(theme) => ({
                      color: theme.palette.text.primary
                    })]} onClick={handleSaveClick}>Save</Button>

                  </div>
                )}

                <ActionButtonContainer style={{ top: 0, right: 0, position: "absolute" }}>
                  <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => handleDelete(user.id)} />
                  </IconButton>

                  <IconButton>
                    <EditIcon onClick={() => handleEditClick(user)} />
                  </IconButton>
                </ActionButtonContainer>

              </CardContent>
            </CardContainer>
          ))}

          <CardContainer sx={[
            (theme) => ({
              color: '#fff',
              backgroundColor: theme.palette.primary.main,
              ...theme.applyStyles('dark', {
                backgroundColor: theme.palette.secondary.main,
              }),
              '&:hover': {
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.primary.dark,
                ...theme.applyStyles('dark', {
                  backgroundColor: theme.palette.secondary.dark,
                }),
              },
            }),
          ]} variant="outlined">
            <CardContent>
              <div>
                <CardMedia
                  sx={{ height: 100, width: 100, borderRadius: "50%" }}
                />
              </div>
              <div>
                <TextField label="First name" variant="standard" value={userForm.first_name} onChange={(e) => setUserForm((prev) => ({
                  ...prev,
                  first_name: e.target.value
                }))} />
                <TextField label="Last name" variant="standard" value={userForm.last_name} onChange={(e) => setUserForm((prev) => ({
                  ...prev,
                  last_name: e.target.value
                }))} />
                <TextField label="Email" variant="standard" value={userForm.email} onChange={(e) => setUserForm((prev) => ({
                  ...prev,
                  email: e.target.value
                }))} />
              </div>

              <ActionButtonContainer>
                <IconButton aria-label="delete">
                  <AddCircle onClick={handleCreate} />
                </IconButton>
              </ActionButtonContainer>

            </CardContent>
          </CardContainer>
        </Container>
        <Pagination count={userData?.total_pages} onChange={(_, page) => setPage(page)} />

      </StyledBox>
    </>
  )
}