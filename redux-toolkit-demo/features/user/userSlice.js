const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios');
const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState= {
    loading: false,
    users: [],
    error:''
}

const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        let users = response.data.map(user => user.id);
        //console.log('user ======> '+users)
        return users;
    })
});

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        extraReducers: builder => {
            builder.addCase(fetchUsers.rejected, (state, action) => {
                
                state.loading= false
                state.users = []
                state.error = action.error.message
                //console.log('rejected with ', action.error.message)
            })
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading= false
                state.users = action.payload
                state.error = ''
                //console.log('success response ==> ',action.payload)
            })
            builder.addCase(fetchUsers.pending, state => {
                state.loading = true
            })
        }
    }
)

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;