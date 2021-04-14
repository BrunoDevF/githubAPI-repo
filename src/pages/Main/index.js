import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars,FaTrash } from 'react-icons/fa';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles.js';
import api  from '../../services/api';


export default function Main(){
const [newRepo,setNewRepo] = useState('');
const [repositorios,setRepositorios] = useState([]);
const [loading, setLoading] = useState(false);

const handleDelete = useCallback((repo)=>{
    const find = repositorios.filter(r => r.name != repo);
    setRepositorios(find);
},[repositorios])

function handleInputChange(e){
    setNewRepo(e.target.value);
}
const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    async function submit(){
        setLoading(true);
        try {

            if(newRepo === ''){
                throw new Error("Voce Precisa indicar um repositorio");
            }

            const response = await api.get(`repos/${newRepo}`);
            const hasRepo = repositorios.find(repo => repo.name === newrepo);
            if(hasRepo){
                throw new Error('Repositorio duplicado')
            }


            const data = {
                name: response.data.full_name,
            }
            setRepositorios([...repositorios,data]);
            setNewRepo('');
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
        
    }
    submit();
},[newRepo,repositorios]);

return (
    <Container>
        <FaGithub size={25} />
        <h1>Meus repositorios</h1>

        <Form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="adicionar repositorios" 
            value={newRepo}
            onChange={handleInputChange}
            />

            <SubmitButton loading={loading ? 1 : 0}>
                {loading ? (
                    <FaSpinner color="#fff" size={15} />
                ) : 
                    <FaPlus color="#fff" size={14} />
                }
            </SubmitButton>
        </Form>

    <List>
        {repositorios.map(repo => {
            return (
            <li key={repo.name}>
                <span>
                    <DeleteButton onClick={()=>handleDelete(repo.name)}>
                        <FaTrash size={14} />
                    </DeleteButton>
                    {repo.name}
                </span>
                <a href="">
                    <FaBars size={20} />
                </a>
            </li>
            );
        })}
    </List>

    </Container>

);
}

