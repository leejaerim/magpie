const SET_MENU = 'userReducer/SET_MENU';
const EDIT_MENU = 'userReducer/EDIT_USER';
const setMenu = arg => ({
    type: SET_MENU,
    data: arg,
});
const editMenu = (key, Cnt) => ({    
    type: EDIT_MENU,    
    data: {key, Cnt},
});

const dispatch = useDispatch();
        dispatch(      
            setMenu([        
                {          
                    mName: "김치찌개",         
                    Cnt: 0,          
                    Cost: 8000,        
                }
            ])    
        );
const {keys , objs} = useSelector((state)=>state);
const userData = keys.map((key) => objs[key]);
let Sum = 0
for(const i in userData){ Sum = Sum + userData[i].Cnt*userData[i].Cost}
dispatch(editMenu(key, val));