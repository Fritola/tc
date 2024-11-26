import AddCircle from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, CardMedia, IconButton, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import apiService from "../../services/api";
import { StyledBox } from "../login/login-styled";
import { ActionButtonContainer, CardContainer, CardContent, Container } from './dashboard-styled';

interface UsersInterface {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

interface UserData {
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data?: UsersInterface[]
}

export const Dashboard = () => {
  const [userData, setUserData] = useState<UserData>()
  const [page, setPage] = useState(1);
  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    id: 0
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

  return (
    <StyledBox>
      <h3>Dashboard</h3>
      <Container maxWidth="md">

        {userData?.data?.map((user) => (
          <CardContainer variant="outlined">
            <CardContent>

              <div>
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  alt={user.first_name}
                  src={user.avatar}>
                  {getInitials(user.first_name, user.last_name)}
                </Avatar>
              </div>

              <div>
                <Typography variant="h6">{user.first_name}</Typography>
                <Typography variant="h6">{user.last_name}</Typography>
                <Typography variant="subtitle2">{user.email}</Typography>
              </div>

              <ActionButtonContainer style={{ top: 0, right: 0, position: "absolute" }}>
                <IconButton aria-label="delete">
                  <DeleteIcon onClick={() => handleDelete(user.id)} />
                </IconButton>
              </ActionButtonContainer>

            </CardContent>
          </CardContainer>
        ))}

        <CardContainer variant="outlined">
          <CardContent>
            <div>
              <CardMedia
                sx={{ height: 100, width: 100, borderRadius: "50%" }}
              />
            </div>
            <div>
              <TextField id="standard-basic" label="First name" variant="standard" value={userForm.first_name} onChange={(e) => setUserForm((prev) => ({
                ...prev,
                first_name: e.target.value
              }))} />
              <TextField id="standard-basic" label="Last name" variant="standard" value={userForm.last_name} onChange={(e) => setUserForm((prev) => ({
                ...prev,
                last_name: e.target.value
              }))} />
              <TextField id="standard-basic" label="Email" variant="standard" value={userForm.email} onChange={(e) => setUserForm((prev) => ({
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
  )
}