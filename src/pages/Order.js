import React, { useState, useEffect } from 'react';
import { listMenus } from './../graphql/queries.js';
import { createMenu as createMenuMutation, deleteMenu as deleteMenuMutation, updateMenu as updateMenuMutiation} from './../graphql/mutations.js';
import { onCreateMenu, onDeleteMenu, onUpdateMenu } from './../graphql/subscriptions.js';
import { API, Storage } from 'aws-amplify';
import BasicCard from './../component/BasicCard.js'

const initialFormState = { name: '', cost: '' }
function Order(props) {
    const [menus, setMenus] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchMenus();
        API.graphql({ query: onCreateMenu}).subscribe({
        next: data => {
            fetchMenus();
        }
        });
        API.graphql({ query: onDeleteMenu}).subscribe({
        next: data => {
            fetchMenus();
        }
        })
        API.graphql({ query: onUpdateMenu}).subscribe({
        next: data => {
            fetchMenus();
        }
        })
    }, []);

    async function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        await Storage.put(file.name, file);
        fetchMenus();
    }
    async function fetchMenus() {
        const apiData = await API.graphql({ query: listMenus });
        const menusFromAPI = apiData.data.listMenus.items;
        await Promise.all(menusFromAPI.map(async menu => {
        if (menu.image) {
            const image = await Storage.get(menu.image);
            menu.image = image;
        }
        return menu;
        }))
        setMenus(apiData.data.listMenus.items);
    }

    async function createMenu() {
        if (!formData.name || !formData.cost) return;
        await API.graphql({ query: createMenuMutation, variables: { input: formData } });
        if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
        }
    }
    async function deleteMenu({ id }) {
        await API.graphql({ query: deleteMenuMutation, variables: { input: { id } }})
    }
    async function updateMenu(formData) {
        formData.description += 1;
        await API.graphql({ query: updateMenuMutiation, variables: { input: {
        id: formData.id,
        description: formData.description
        } }})
    }
    const OnChange = (e) => {
        setFormData({ ...formData, name: e.target.value });
    };
        return (
            <div className="App">
                <div style={{marginBottom: 30, float:"left"}}>
                {/* {
                menus.map(menu => (
                    <div key={menu.id || menu.name}>
                    <Menu mname={menu.name} cost={menu.cost}></Menu>
                    {/* <Button onClick={() => deleteNote(note)} variant="contained" style={{display:'inline'}}>+</Button>
                    <Button onClick={() => updateNote(note)} variant="contained" style={{display:'inline'}}>-</Button> }
                    {
                        menu.image && <img src={menu.image} style={{width: 400}} />
                    }
                    </div>
                ))
                } */}
                {
                menus.map(menu => (
                    <div key={menu.id || menu.name} style={{display:"inline-block"}}>
                    <BasicCard menu={menu}></BasicCard>
                    </div>
                ))
                }
                
                </div>
            </div>
        );
}

export default Order;